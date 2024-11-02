import { forwardRef, Fragment, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

import { PostType } from "./types";

import { CommentsSection } from "./comments-section";
import { getLinkToMediaPage } from "utils/media-utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useCurrentUser } from "hooks/use-current-user";

interface PostProps {
  post: PostType;
  handleDelete: () => void
}

export const Post = forwardRef<HTMLDivElement, PostProps>(({ post, handleDelete }, ref) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { isCurrentUser } = useCurrentUser();

  const { firstName, lastName, profilePicture } = post?.user;
  const { likes, comments } = post?._count;

  const posterUrl = post.posterUrl || "/img/default-media-poster.jpg";

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      className="p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg"
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={profilePicture}
            alt="user"
            draggable={false}
          />
          <div>
            <Link className="flex flex-col" to={`/profile/${post.userId}`}>
              <span className="font-medium">{`${firstName} ${lastName}`}</span>
              <span className="text-sm">
                <ReactTimeAgo date={post.createdAt} />
              </span>
            </Link>
          </div>
        </div>
        <div>
          {isCurrentUser(post.userId) && (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="text-white">
                <MoreHorizIcon />
              </MenuButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <MenuItems className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-1">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-red-700 text-white" : "text-red-700"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={handleDelete}
                        >
                          Remove Review
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
      <div className="flex gap-4 p-4">
        <img
          className="object-cover h-48 overflow-hidden rounded cursor-pointer"
          src={posterUrl}
          alt="movie poster"
          draggable={false}
          onClick={() =>
            navigate(getLinkToMediaPage(post.mediaId, post.mediaType))
          }
        />
        <div>
          <h2
            className="text-lg font-semibold cursor-pointer"
            onClick={() =>
              navigate(getLinkToMediaPage(post.mediaId, post.mediaType))
            }
          >
            {post.title}
          </h2>
          {post.rating && (
            <span className="italic">Rating: {post.rating}/10</span>
          )}
          <p className="font-light">{post.content}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-1 cursor-pointer" onClick={handleLike}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <span className="text-sm">{likes}</span>
        </div>
        <div
          className="flex gap-1 cursor-pointer"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <CommentIcon />
          <span className="text-sm">{comments}</span>
        </div>
      </div>
      {commentOpen && <CommentsSection />}
    </div>
  );
});
