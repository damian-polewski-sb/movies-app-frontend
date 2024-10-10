import { axiosPrivate } from "api/axios";
import { ContentType, LabeledContentDisplay } from "./labeled-content-display";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      <LabeledContentDisplay
        label="Trending Movies"
        content={trendingMovies}
        contentType={ContentType.Movie}
      />
      <LabeledContentDisplay
        label="Trending TV Shows"
        content={trendingShows}
        contentType={ContentType.Show}
      />
    </div>
  );
};
