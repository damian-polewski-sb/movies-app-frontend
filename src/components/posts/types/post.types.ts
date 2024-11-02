import { MediaType } from "components/media/types";

export type PostType = {
  id: number;
  userId: number;
  title: string;
  mediaId: number;
  mediaType: MediaType;
  posterUrl: string;
  rating: number;
  content?: string;
  createdAt: Date;
  user: { firstName: string; lastName: string; profilePicture: string };
  _count: { likes: number; comments: number };
  isLiked: boolean,
};
