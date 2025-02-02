import { MediaType } from "components/media/types";

export const isMovie = (mediaType: MediaType) => mediaType === MediaType.Movie;

export const isShow = (mediaType: MediaType) => mediaType === MediaType.Show;

export const getLinkToMediaPage = (id: number, mediaType: MediaType): string =>
  `${isMovie(mediaType) ? "/movies" : "/shows"}/${id}`;

