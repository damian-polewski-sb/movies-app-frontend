import ReactTimeAgo from "react-time-ago";

import { Close } from "@mui/icons-material";

import { Notification } from "./types";

interface NotificationTileProps {
  notification: Notification;
  handleMarkAsRead: () => void;
}

export const NotificationTile = ({
  notification,
  handleMarkAsRead,
}: NotificationTileProps) => (
  <div className="relative flex justify-between p-4 rounded-lg group gap-x-6 hover:bg-gray-50">
    <p>{notification.message}</p>
    <div className="flex gap-2 text-nowrap">
      <ReactTimeAgo date={notification.createdAt} />
      <div className="cursor-pointer" onClick={handleMarkAsRead}>
        <Close />
      </div>
    </div>
  </div>
);
