import { useEffect } from "react";
import { io } from "socket.io-client";

import { Notification } from "components/navbar/types";

const BASE_URL = "http://localhost:8080";

export const useSocket = (userId: number, handleNotification: (notification: Notification) => void) => {
  useEffect(() => {
    if (userId) {
      const socket = io(BASE_URL);

      socket.emit("subscribe", userId);

      socket.on("notification", (notification) => {
        handleNotification(notification)
      });
    }
  }, [handleNotification, userId]);
};
