import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks/use-axios-private";

import { MediaGallery } from "components/media/media-gallery";
import { MediaType } from "components/media/types";
import { isMovie } from "utils/media-utils";

interface TrendingMediaGalleryProps {
  mediaType?: MediaType;
}

const getTrendingMediaDataUrl = (mediaType: MediaType) =>
  isMovie(mediaType)
    ? "/content/trending-movies"
    : "/content/trending-shows";

export const TrendingMediaGallery = ({
  mediaType = MediaType.Movie,
}: TrendingMediaGalleryProps) => {
  const [trendingMedia, setTrendingMedia] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = getTrendingMediaDataUrl(mediaType)
        const response = await axiosPrivate.get(url);

        setTrendingMedia(response?.data ?? []);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchData();
  }, [axiosPrivate, mediaType]);

  const galleryLabel = `Trending ${
    isMovie(mediaType) ? "Movies" : "Shows"
  }`;

  return (
    <MediaGallery
      label={galleryLabel}
      media={trendingMedia}
      mediaType={mediaType}
    />
  );
};
