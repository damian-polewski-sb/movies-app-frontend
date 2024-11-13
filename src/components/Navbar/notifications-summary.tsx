import { Fragment, useCallback, useEffect, useState } from "react";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";

import { useCurrentUser } from "hooks/use-current-user";

import { NotificationTile } from "./notification-tile";
import { Notification } from "./types";
import { toast } from "react-toastify";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useSocket } from "hooks/use-socket";

const getNotificationsUrl = () => "/notifications";

const markAllAsReadUrl = () => "/notifications/read-all";

const markAsReadUrl = (notificationId: number) =>
  `/notifications/${notificationId}/read`;

export const NotificationsSummary = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const axiosPrivate = useAxiosPrivate();
  const { id } = useCurrentUser();

  const handleNotification = useCallback(
    (notification: Notification) => {
      setNotifications([notification, ...notifications]);
    },
    [notifications]
  );

  useSocket(id, handleNotification);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(getNotificationsUrl());

        setNotifications(response?.data ?? []);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  const handleMarkAllAsRead = async () => {
    try {
      await axiosPrivate.patch(markAllAsReadUrl());
      setNotifications([]);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await axiosPrivate.patch(markAsReadUrl(notificationId));
      setNotifications(
        notifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Popover className="relative">
      <PopoverButton className="text-white">
        <Badge
          badgeContent={
            notifications.filter((notification) => !notification.isRead).length
          }
          color="primary"
        >
          <NotificationsIcon />
        </Badge>
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute z-10 flex w-screen px-4 mt-4 -translate-x-1/2 left-1/2 max-w-max max-h-96">
          <div className="flex-auto w-screen max-w-md overflow-auto text-sm leading-6 text-gray-600 bg-white shadow-lg rounded-xl ring-1 ring-gray-900/5">
            <div className="p-4">
              {notifications.length >= 2 && (
                <div
                  className="flex justify-end mr-8 cursor-pointer"
                  onClick={handleMarkAllAsRead}
                >
                  <span className="font-bold">Mark all as read</span>
                </div>
              )}
              {notifications.length === 0 && (
                <span className="italic">No notifications to display...</span>
              )}
              {notifications.map((notification) => (
                <NotificationTile
                  key={notification.id}
                  notification={notification}
                  handleMarkAsRead={() => handleMarkAsRead(notification.id)}
                />
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
