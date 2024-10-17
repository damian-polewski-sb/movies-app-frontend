import { useNavigate } from "react-router-dom";
import { MediaData, MediaType } from "./types";
import { Tooltip } from "components/ui/tooltip";

interface MediaTileProps {
  media: MediaData;
  mediaType: MediaType;
}

export const MediaTile = ({ media, mediaType }: MediaTileProps) => {
  const navigate = useNavigate();

  const getMediaLink = (id: number, mediaType: MediaType): string =>
    `${mediaType === MediaType.Movie ? "/movies" : "/shows"}/${id}`;

  return (
    <Tooltip content={media.title} placement="bottom">
      <img
        className="object-cover w-[calc(25%-0.5rem)] overflow-hidden rounded cursor-pointer"
        src={media.posterUrl}
        alt={media.title}
        key={media.id}
        draggable={false}
        onClick={() => navigate(getMediaLink(media.id, mediaType))}
      />
    </Tooltip>
  );
};
