import { axiosPrivate } from "api/axios";
import { MediaGallery } from "../media/media-gallery";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MediaType } from "components/media/types";

export const TrendingDisplay = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);

  useEffect(() => {
    const fetchTrendingMoviesData = async () => {
      try {
        const response = await axiosPrivate.get("/content/trending-movies");

        setTrendingMovies(response?.data);
      } catch (error) {
        toast.error(error as string);
      }
    };

    const fetchTrendingShowsData = async () => {
      try {
        const response = await axiosPrivate.get("/content/trending-shows");

        setTrendingShows(response?.data);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchTrendingMoviesData();
    fetchTrendingShowsData();
  }, []);

  return (
    <div className="flex flex-col gap-4 text-white">
      <MediaGallery
        label="Trending Movies"
        media={trendingMovies}
        mediaType={MediaType.Movie}
      />
      <MediaGallery
        label="Trending TV Shows"
        media={trendingShows}
        mediaType={MediaType.Show}
      />
    </div>
  );
};
