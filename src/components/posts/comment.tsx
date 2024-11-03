import ReactTimeAgo from "react-time-ago";

import { MoreVert } from "@mui/icons-material";

import { CommentType } from "./types";
import { useCurrentUser } from "hooks/use-current-user";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

interface CommentProps {
  comment: CommentType;
  handleDelete: () => void;
}

export const Comment = ({ comment, handleDelete }: CommentProps) => {
  const { isCurrentUser } = useCurrentUser();

  return (
    <div className="flex w-full gap-5">
      <img
        className="object-cover w-8 h-8 rounded-full"
        src={comment.user.profilePicture}
        alt="user"
        draggable={false}
      />
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between">
          <span className="font-semibold">{`${comment.user.firstName} ${comment.user.lastName}`}</span>
          <div className="flex gap-1 text-xs">
            <span>
              <ReactTimeAgo date={comment.createdAt} />
            </span>
            {isCurrentUser(comment.userId) && (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="text-white">
                  <MoreVert />
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
                            Remove Comment
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
        <p className="text-gray-400">{comment.content}</p>
      </div>
    </div>
  );
};
