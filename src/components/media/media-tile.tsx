import { forwardRef } from "react";

import { useNavigate } from "react-router-dom";

import { getLinkToMediaPage } from "utils/media-utils";

import { MediaData, MediaType } from "./types";

import { Tooltip } from "components/ui";

interface MediaTileProps {
  media: MediaData;
  mediaType?: MediaType;
}

export const MediaTile = forwardRef<HTMLImageElement, MediaTileProps>(
  ({ media, mediaType = MediaType.Movie }, ref) => {
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
          onClick={() => navigate(getLinkToMediaPage(media.id, media.mediaType ?? mediaType))}
          ref={ref}
        />
      </Tooltip>
    );
  }
);
