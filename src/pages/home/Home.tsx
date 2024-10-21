import { MediaType } from "components/media/types";
import Posts from "components/Posts/Posts";
import { TrendingMediaGallery } from "components/media/trending-media-gallery";

export const HomePage = () => {
  return (
    <div className="flex max-w-screen-xl py-4 mx-auto">
      <main className="w-2/3">
        <Posts />
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
