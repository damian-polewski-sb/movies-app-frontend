import SendIcon from "@mui/icons-material/Send";

import { Comment } from "./comment";
import { Input, Spinner } from "components/ui";
import { InputVariant } from "components/ui/input";
import { useCurrentUser } from "hooks/use-current-user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommentType } from "./types";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type CommentsFormData = {
  content: string;
};

const CommentsSchema: ZodType<CommentsFormData> = z.object({
  content: z
    .string()
    .min(1, { message: "Comment must by at least 1 character" })
    .max(150, { message: "Comment must be 150 characters or less" }),
});

const getCommentsUrl = (postId: number) => `/posts/${postId}/comments`;

const getDeleteCommentUrl = (commentId: number) =>
  `/posts/comments/${commentId}`;

interface CommentsSectionProps {
  postId: number;
  setCommentsCount: Dispatch<SetStateAction<number>>;
}

export const CommentsSection = ({
  postId,
  setCommentsCount,
}: CommentsSectionProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const axiosPrivate = useAxiosPrivate();
  const { profilePicture } = useCurrentUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentsFormData>({
    resolver: zodResolver(CommentsSchema),
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);

        const response = await axiosPrivate.get(getCommentsUrl(postId));

        setComments(response?.data ?? []);
        setIsLoading(false);
      } catch (error) {
        toast.error(error as string);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [axiosPrivate, postId]);

  const handleAddComment = async (data: CommentsFormData) => {
    try {
      const response = await axiosPrivate.post(
        getCommentsUrl(postId),
        JSON.stringify({ content: data.content })
      );

      const newComment = response.data;

      setComments((oldComments) => [newComment, ...oldComments]);
      setCommentsCount((prev) => prev + 1);
      reset();
      toast.success("Comment has been added!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axiosPrivate.delete(getDeleteCommentUrl(commentId));

      setComments(comments.filter((comment) => comment.id !== commentId));
      setCommentsCount((prev) => prev - 1);
      toast.success("Comment has been removed!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full gap-4 my-3">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={profilePicture}
          alt="user"
          draggable={false}
        />
        <form
          className="flex w-full gap-4"
          onSubmit={handleSubmit(handleAddComment)}
        >
          <Input
            type="text"
            error={errors?.content?.message || ""}
            placeholder="Write a comment..."
            variant={InputVariant.Dark}
            register={{ ...register("content") }}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
      {comments.length === 0 && !isLoading && (
        <p className="italic">No comments yet to display...</p>
      )}
      <div className="flex flex-col w-full gap-4">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            handleDelete={() => handleDeleteComment(comment.id)}
            key={comment.id}
          />
        ))}
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};
