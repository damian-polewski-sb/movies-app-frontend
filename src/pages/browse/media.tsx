import { MediaType } from "components/media/types";
import { List, ListType } from "components/media/types/list.types";
import { Button } from "components/ui";
import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { useAuth } from "hooks/use-auth";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isMovie } from "utils/media-utils";
import { getMediaTypeFromPath } from "utils/router-utils";

interface MediaData {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  posterUrl: string;
}

const getMediaDataUrl = (mediaId: number, mediaType: MediaType) =>
  isMovie(mediaType) ? `/content/movie/${mediaId}` : `/content/show/${mediaId}`;

const getUserWatchListUrl = (userId: number, listType: ListType) =>
  `/lists/user/${userId}/${
    listType === ListType.Watched ? "watched" : "to-watch"
  }`;

const addOrRemoveListEntry = (listId: number) => `/lists/${listId}/entries`;

export const MediaPage = () => {
  const location = useLocation();
  const mediaType = getMediaTypeFromPath(location.pathname);
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { userData } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [media, setMedia] = useState<MediaData | null>(null);
  const [watchedStatus, setWatchedStatus] = useState<boolean>(false);
  const [toWatchStatus, setToWatchStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        if (!id) throw new Error();

        const response = await axiosPrivate.get(
          getMediaDataUrl(parseInt(id), mediaType)
        );

        setMedia(response?.data);
        setIsLoading(false);
      } catch {
        toast.error("Media not found!");
        navigate("/home");
      }
    };

    const fetchWatchedStatus = async () => {
      try {
        if (!id || !userData?.id) throw new Error();

        const response = await axiosPrivate.get(
          getUserWatchListUrl(userData.id, ListType.Watched)
        );

        const list = response?.data?.entries ?? [];
        const isEntryOnTheList = !!list.find(
          (entry: List) => entry.id === parseInt(id)
        );

        setWatchedStatus(isEntryOnTheList);
      } catch (error) {
        toast.error(error as string);
      }
    };

    const fetchToWatchStatus = async () => {
      try {
        if (!id || !userData?.id) throw new Error();

        const response = await axiosPrivate.get(
          getUserWatchListUrl(userData.id, ListType.ToWatch)
        );

        const list = response?.data?.entries ?? [];
        const isEntryOnTheList = !!list.find(
          (entry: List) => entry.id === parseInt(id)
        );

        setToWatchStatus(isEntryOnTheList);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchMediaData();
    fetchWatchedStatus();
    fetchToWatchStatus();
  }, [axiosPrivate, navigate, id, mediaType, userData]);

  if (!media || isLoading) {
    return <Spinner />;
  }

  const handleToggleWatched = async () => {
    try {
      const listId = userData?.lists.find(
        (list) => list.listType === ListType.Watched
      )?.id;

      if (!listId) throw new Error();

      const body = {
        mediaId: media.id,
        mediaType: mediaType,
      };

      if (watchedStatus) {
        await axiosPrivate.delete(addOrRemoveListEntry(listId), {
          data: {
            ...body,
          },
        });
        toast.success("Removed from the list!");
      } else {
        await axiosPrivate.post(
          addOrRemoveListEntry(listId),
          JSON.stringify({ ...body })
        );
        toast.success("Added to the list!");
      }

      setWatchedStatus((prev) => !prev);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleToggleToWatch = async () => {
    try {
      const listId = userData?.lists.find(
        (list) => list.listType === ListType.ToWatch
      )?.id;

      if (!listId) throw new Error();

      const body = {
        mediaId: media.id,
        mediaType: mediaType,
      };

      if (toWatchStatus) {
        await axiosPrivate.delete(addOrRemoveListEntry(listId), {
          data: {
            ...body,
          },
        });
        toast.success("Removed from the list!");
      } else {
        await axiosPrivate.post(
          addOrRemoveListEntry(listId),
          JSON.stringify({ ...body })
        );
        toast.success("Added to the list!");
      }

      setToWatchStatus((prev) => !prev);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Container className="flex flex-col max-w-screen-xl px-4">
      <div className="flex flex-col w-full min-w-0 p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
        <div className="flex flex-wrap justify-center py-6">
          <div className="flex items-center justify-center w-full lg:w-2/12">
            <img
              className="object-cover overflow-hidden rounded h-60"
              src={media.posterUrl}
              alt="movie poster"
            />
          </div>
          <div className="flex flex-col w-full px-4 lg:w-8/12">
            <div className="flex flex-col justify-center w-full px-4 lg:justify-between lg:flex-row">
              <h3 className="flex justify-center mb-2 text-4xl font-semibold leading-normal">
                {media.title}
              </h3>
              <span className="flex justify-center px-3 py-6">
                {`Rating: ${Math.floor(media.rating)}/10`}
              </span>
            </div>
            <div className="w-full px-4">
              <p>{media.overview}</p>
            </div>
            <div className="flex pt-5 justify-evenly">
              <Button onClick={handleToggleWatched}>
                {watchedStatus ? "Watched" : "Add to Watched"}
              </Button>
              <Button onClick={handleToggleToWatch}>
                {toWatchStatus ? "Plans to watch" : "Add to Plan to watched"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
