import { MediaType } from "components/media/types";
import { TrendingMediaGallery } from "components/media/trending-media-gallery";
import { PostsGallery } from "components/posts/posts-gallery";

export const HomePage = () => {
  return (
    <div className="flex max-w-screen-xl py-4 mx-auto">
      <main className="w-2/3">
        <PostsGallery />
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
