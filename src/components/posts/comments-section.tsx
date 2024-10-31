import SendIcon from "@mui/icons-material/Send";

import { Comment } from "./comment";
import { useAuth } from "hooks/use-auth";
import { Input } from "components/ui";
import { InputVariant } from "components/ui/input";

export const CommentsSection = () => {
  const { userData } = useAuth()

  // Temporary data
  const comments = [
    {
      id: 1,
      name: "Jan Kowalski",
      userId: 3,
      profilePicture:
        "https://res.cloudinary.com/dbtce39z1/image/upload/v1719329643/hzmqxahulcvkcd4ef6tl.jpg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      name: "Ewa Materac",
      userId: 4,
      profilePicture:
        "https://res.cloudinary.com/dbtce39z1/image/upload/v1719329643/hzmqxahulcvkcd4ef6tl.jpg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit hic dolorem numquam voluptatem libero asperiores aperiam.",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-4 my-4">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={userData?.profilePicture}
          alt="user"
          draggable={false}
        />
        <Input
          type="text"
          placeholder="Write a comment..."
          variant={InputVariant.Dark}
        />
        <button>
          <SendIcon />
        </button>
      </div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};
