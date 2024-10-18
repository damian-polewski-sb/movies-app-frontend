import { MediaType } from "components/media/types";

export const getMediaTypeFromPath = (path: string): MediaType =>
  path.split("/").includes("movies") ? MediaType.Movie : MediaType.Show;