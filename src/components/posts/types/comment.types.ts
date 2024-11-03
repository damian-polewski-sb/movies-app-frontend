export type CommentType = {
  id: number;
  createdAt: Date;
  content: string;
  userId: number
  user: {
    firstName: string,
    lastName: string,
    profilePicture: string
  }
};
