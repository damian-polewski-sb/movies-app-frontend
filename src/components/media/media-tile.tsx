import { useNavigate } from "react-router-dom";
import { MediaData, MediaType } from "./types";
import { Tooltip } from "components/ui/tooltip";
import { forwardRef } from "react";
import { isMovie } from "utils/media-utils";

interface MediaTileProps {
  media: MediaData;
  mediaType: MediaType;
}

const getLinkToMediaPage = (id: number, mediaType: MediaType): string =>
  `${isMovie(mediaType) ? "/movies" : "/shows"}/${id}`;

export const MediaTile = forwardRef<HTMLImageElement, MediaTileProps>(
  ({ media, mediaType }, ref) => {
    const navigate = useNavigate();

    const posterUrl = media.posterUrl || "/img/default-media-poster.jpg"

    return (
      <Tooltip content={media.title} placement="bottom">
        <img
          className="object-cover w-[calc(25%-0.5rem)] overflow-hidden rounded cursor-pointer"
          src={posterUrl}
          alt={media.title}
          key={media.id}
          draggable={false}
          onClick={() => navigate(getLinkToMediaPage(media.id, mediaType))}
          ref={ref}
        />
      </Tooltip>
    );
  }
);
