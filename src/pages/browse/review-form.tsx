import { zodResolver } from "@hookform/resolvers/zod";
import { MediaType } from "components/media/types";
import { Button, Input } from "components/ui";
import { InputVariant } from "components/ui/input";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";

export type ReviewFormData = {
  rating: number;
  content?: string;
};

export const ReviewSchema: ZodType<ReviewFormData> = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating must be at most 10" }),
  content: z
    .string()
    .max(200, { message: "Content must be 200 characters or less" })
    .optional(),
});

const getAddReviewUrl = (mediaId: number, mediaType: MediaType) =>
  `/posts/${mediaType}/${mediaId}/review`;

interface ReviewFormProps {
  mediaId: number;
  mediaType: MediaType;
  handleClose: () => void
}

export const ReviewForm = ({ mediaId, mediaType, handleClose }: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewSchema),
  });

  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: ReviewFormData) => {
    try {
        await axiosPrivate.post(getAddReviewUrl(mediaId, mediaType), data);
        
        handleClose()
        toast.success('Review has been added!')
    } catch (error) {
        toast.error(error as string)
    }
  };

  return (
    <form
      className="flex flex-col gap-5 bg-gray-900"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="number"
        error={errors?.rating?.message || ""}
        label="Rating"
        variant={InputVariant.Dark}
        register={{ ...register("rating") }}
      />
      <Input
        type="text"
        error={errors?.content?.message || ""}
        label="Review"
        variant={InputVariant.Dark}
        register={{ ...register("content") }}
      />
      <Button type="submit">Submit review</Button>
    </form>
  );
};
