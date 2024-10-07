import { LabeledContentDisplay } from "./labeled-content-display";

export const TrendingDisplay = () => {
  // Temporary data
  const trendingMovies = [
    {
      id: 1,
      title: "Knights of the Zodiac",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg",
    },
    {
      id: 2,
      title: "Run Rabbit Run",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/n34lYVoFy1C2lc02i7eaZFWznuN.jpg",
    },
    {
      id: 3,
      title: "Indiana Jones and the Dial of Destiny",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
    },
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    },
  ];

  const trendingShows = [
    {
      id: 1,
      title: "The Witcher",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    },
    {
      id: 2,
      title: "Hijack",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/alInNt9xbSPTI2YWYMQB78P1E7G.jpg",
    },
    {
      id: 3,
      title: "Secret Invasion",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/3rINdUPSy9AklJg74jWHOyUXuZd.jpg",
    },
    {
      id: 4,
      title: "Tom Clancy's Jack Ryan",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/u7iHICDItwAoHZjwTwoBmPHql4G.jpg",
    },
  ];

  return (
    <div className="flex flex-col gap-4 text-white">
      <LabeledContentDisplay content={trendingMovies} label="Trending Movies" />
      <LabeledContentDisplay
        content={trendingShows}
        label="Trending TV Shows"
      />
    </div>
  );
};
