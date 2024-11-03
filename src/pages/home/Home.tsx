import { Fragment } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

import { MediaType } from "components/media/types";
import { TrendingMediaGallery } from "components/media/trending-media-gallery";
import { PostsGallery } from "components/posts/posts-gallery";
import { Button } from "components/ui";

export const HomePage = () => {
  return (
    <div className="flex max-w-screen-xl py-4 mx-auto">
      <main className="w-2/3">
        <TabGroup>
          <TabList className="flex justify-end gap-1 mx-6">
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button className={clsx({ "bg-pink-700": selected })}>
                  Global
                </Button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button className={clsx({ "bg-pink-700": selected })}>
                  Following
                </Button>
              )}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PostsGallery />
            </TabPanel>
            <TabPanel>
              <PostsGallery showFollowing/>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
      <aside className="w-1/3">
        <div className="flex flex-col gap-4">
          <TrendingMediaGallery mediaType={MediaType.Movie} />
          <TrendingMediaGallery mediaType={MediaType.Show} />
        </div>
      </aside>
    </div>
  );
};
