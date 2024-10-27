import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { MediaGallery } from "components/media/media-gallery";
import { useAxiosPrivate } from "hooks/use-axios-private";

import { List, ListType } from "./types/list.types";

interface ProfileMediaGalleryProps {
  userId: number;
}

const getUserLists = (userId: number) => `/lists/user/${userId}`;

export const ProfileMediaGallery = ({ userId }: ProfileMediaGalleryProps) => {
  const [watchedList, setWatchedList] = useState<List>();
  const [toWatchList, setToWatchList] = useState<List>();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = getUserLists(userId);
        const response = await axiosPrivate.get(url);

        const lists = response?.data as List[];

        const watched = lists.find(
          (list) => list.listType === ListType.Watched
        );

        if (watched) {
          setWatchedList(watched);
        }

        const toWatch = lists.find(
          (list) => list.listType === ListType.ToWatch
        );

        if (toWatch) {
          setToWatchList(toWatch);
        }
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchData();
  }, [axiosPrivate, userId]);

  return (
    <div className="flex flex-col gap-4">
      <MediaGallery
        label={"Watched"}
        media={watchedList?.entries ?? []}
        handleSeeAllClick={() =>
          watchedList?.id ? navigate(`/lists/${watchedList?.id}`) : undefined
        }
      />
      <MediaGallery
        label={"To Watch"}
        media={toWatchList?.entries ?? []}
        handleSeeAllClick={() =>
          toWatchList?.id ? navigate(`/lists/${toWatchList?.id}`) : undefined
        }
      />
    </div>
  );
};
