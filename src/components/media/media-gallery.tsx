import { Box } from "components/ui";
import { MediaTile } from "./media-tile";
import { MediaData, MediaType } from "./types";

interface MediaGalleryProps {
  label?: string;
  media: MediaData[];
  mediaType: MediaType;
}

export const MediaGallery = ({ label, media, mediaType }: MediaGalleryProps) => {
  return (
    <Box label={label}>
      <div className="flex flex-wrap justify-between gap-2">
        {media.map((element) => (
          <MediaTile media={element} mediaType={mediaType} />
        ))}
      </div>
    </Box>
  );
};
