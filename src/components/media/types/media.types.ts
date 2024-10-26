export enum MediaType {
  Movie = "movie",
  Show = "show",
}

export type MediaData = {
  id: number;
  title: string;
  posterUrl: string;
  mediaType?: MediaType;
};
