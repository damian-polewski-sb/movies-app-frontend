import { MediaData } from "./media.types";

export enum ListType {
  Watched = "Watched",
  ToWatch = "ToWatch",
}

export type List = {
  id: number;
  entries?: MediaData[];
  listType: ListType;
};
