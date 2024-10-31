import { Post } from "./post";
import { PostType } from "./types";

interface PostsGalleryProps {
  posts: PostType[];
}

export const PostsGallery = ({ posts }: PostsGalleryProps) => {
  return (
    <div className="flex flex-col gap-8 px-6">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      {!posts && <p className="italics">No posts to display</p>}
    </div>
  );
};
