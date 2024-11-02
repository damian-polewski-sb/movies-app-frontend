import { useEffect, useRef, useState } from "react";
import { Post } from "./post";
import { PostType } from "./types";
import { toast } from "react-toastify";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useInView } from "react-intersection-observer";
import { Box, Spinner } from "components/ui";

interface PostsGalleryProps {
  userId?: number;
}

const getPostsUrl = (page: number, userId: number | undefined) =>
  `/posts?page=${page}${userId ? `&userId=${userId}` : ""}`;

const getDeleteReviewUrl = (postId: number) => `/posts/${postId}`;

const getLikeUrl = (postId: number) => `/posts/${postId}/like`;

export const PostsGallery = ({ userId }: PostsGalleryProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(false);
  const initialRender = useRef(true);

  const axiosPrivate = useAxiosPrivate();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      const response = await axiosPrivate.get(getPostsUrl(page, userId));

      const newPosts = response?.data?.posts ?? [];
      const numberOfPosts = response?.data?.pagination?.totalPosts;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setTotalPosts(numberOfPosts);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      toast.error(error as string);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const fetchInitialPosts = async () => {
      if (!isLoading && !isInitialLoad) {
        await fetchPosts();
        setIsInitialLoad(true);
      }
    };

    fetchInitialPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const paginate = async () => {
      if (
        isInitialLoad &&
        inView &&
        !isLoading &&
        (!totalPosts || posts.length < totalPosts)
      ) {
        await fetchPosts();
      }
    };

    paginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoad, inView, isLoading, posts.length, totalPosts]);

  const handleLike = async (postId: number) => {
    try {
      await axiosPrivate.post(getLikeUrl(postId));

      setPosts(
        posts.map((post) => {
          if (post.id !== postId) return post;

          return {
            ...post,
            _count: {
              ...post._count,
              likes: post._count.likes++,
            },
          };
        })
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleUnlike = async (postId: number) => {
    try {
      await axiosPrivate.delete(getLikeUrl(postId));

      setPosts(
        posts.map((post) => {
          if (post.id !== postId) return post;

          return {
            ...post,
            _count: {
              ...post._count,
              likes: post._count.likes--,
            },
          };
        })
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDeleteReview = async (postId: number) => {
    try {
      await axiosPrivate.delete(getDeleteReviewUrl(postId));

      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Review has been deleted successfully!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-6">
      {posts.length === 0 && !isLoading && (
        <Box>
          <p className="italic">No posts to display...</p>
        </Box>
      )}
      {posts.map((post, index) => (
        <Post
          post={post}
          key={post.id}
          ref={posts.length === index + 1 ? ref : null}
          handleLike={() => handleLike(post.id)}
          handleUnlike={() => handleUnlike(post.id)}
          handleDelete={() => handleDeleteReview(post.id)}
        />
      ))}
      {isLoading && <Spinner />}
    </div>
  );
};
