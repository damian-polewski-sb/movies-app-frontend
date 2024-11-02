import { forwardRef, useState } from "react";

import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

import { PostType } from "./types";

import { CommentsSection } from "./comments-section";

interface PostProps {
  post: PostType;
}

export const Post = forwardRef<HTMLDivElement, PostProps>(
  ({ post }, ref) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentOpen, setCommentOpen] = useState<boolean>(false);

    const { firstName, lastName, profilePicture } = post?.user;
    const { likes, comments } = post?._count;

    const handleLike = () => {
      setIsLiked((prev) => !prev);
    };

    return (
      <div className="p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg" ref={ref}>
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
            <MoreHorizIcon />
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <img
            className="object-cover h-48 overflow-hidden rounded"
            src={post.posterUrl}
            alt="movie poster"
            draggable={false}
          />
          <div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            {post.rating && <span>Rating: {post.rating}/10</span>}
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
  }
);
