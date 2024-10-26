import { Box, Spinner } from "components/ui";
import { MediaTile } from "./media-tile";
import { MediaData, MediaType } from "./types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface MediaGalleryProps {
  label?: string;
  media: MediaData[];
  mediaType?: MediaType;
  isFetchingData?: boolean;
  fetchCallback?: () => Promise<void>;
  totalElements?: number | undefined;
}

export const MediaGallery = ({
  label,
  media = [],
  mediaType,
  isFetchingData = false,
  fetchCallback,
  totalElements,
}: MediaGalleryProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    const paginate = async () => {
      if (
        inView &&
        !isFetchingData &&
        fetchCallback &&
        (!totalElements || media.length < totalElements)
      )
        fetchCallback();
    };

    paginate();
  }, [fetchCallback, inView, isFetchingData, media.length, totalElements]);

  return (
    <Box label={label}>
      <div className="flex flex-wrap gap-2">
        {media?.length === 0 && !isFetchingData && (
          <p className="italic">Nothing to display here...</p>
        )}
        {media.map((element, index) => (
          <MediaTile
            media={element}
            mediaType={mediaType}
            ref={media.length === index + 1 ? ref : null}
          />
        ))}
        {isFetchingData && <Spinner />}
      </div>
    </Box>
  );
};
