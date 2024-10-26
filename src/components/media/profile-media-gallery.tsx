import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks/use-axios-private";

import { List, ListType } from "./types/list.types";
import { MediaData } from "./types";

import { MediaGallery } from "components/media/media-gallery";

interface ProfileMediaGalleryProps {
  userId: number;
}

const getUserLists = (userId: number) => `/lists/user/${userId}`;


export const ProfileMediaGallery = ({ userId }: ProfileMediaGalleryProps) => {
  const [watchedList, setWatchedList] = useState<MediaData[]>([]);
  const [toWatchList, setToWatchList] = useState<MediaData[]>([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = getUserLists(userId);
        const response = await axiosPrivate.get(url);

        const lists = response?.data as List[];

        const watched =
          lists.find((list) => list.listType === ListType.Watched)?.entries ??
          [];

        setWatchedList(watched);

        const toWatch =
          lists.find((list) => list.listType === ListType.ToWatch)?.entries ??
          [];

        setToWatchList(toWatch);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchData();
  }, [axiosPrivate, userId]);

  return (
    <div className="flex flex-col gap-4">
      <MediaGallery label={"Watched"} media={watchedList} />
      <MediaGallery label={"To Watch"} media={toWatchList} />
    </div>
  );
};
