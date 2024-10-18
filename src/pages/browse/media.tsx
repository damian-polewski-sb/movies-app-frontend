import { MediaType } from "components/media/types";
import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMediaTypeFromPath } from "utils/router-utils";

interface MediaData {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  posterUrl: string;
}

const getMediaDataUrl = (id: number, mediaType: MediaType) =>
  mediaType === MediaType.Movie
    ? `/content/movie/${id}`
    : `/content/show/${id}`;

export const MediaPage = () => {
  const location = useLocation();
  const mediaType = getMediaTypeFromPath(location.pathname);
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [media, setMedia] = useState<MediaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error();

        const response = await axiosPrivate.get(
          getMediaDataUrl(parseInt(id), mediaType)
        );

        setMedia(response?.data);
        setIsLoading(false);
      } catch {
        toast.error("Media not found!");
        navigate("/home");
      }
    };

    fetchData();
  }, [axiosPrivate, navigate, id, mediaType]);

  if (!media || isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="flex flex-col max-w-screen-xl px-4">
      <div className="flex flex-col w-full min-w-0 p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
        <div className="flex flex-wrap justify-center py-6">
          <div className="flex items-center justify-center w-full lg:w-2/12">
            <img
              className="object-cover overflow-hidden rounded h-60"
              src={media.posterUrl}
              alt="movie poster"
            />
          </div>
          <div className="flex flex-col w-full px-4 lg:w-8/12">
            <div className="flex flex-col justify-center w-full px-4 lg:justify-between lg:flex-row">
              <h3 className="flex justify-center mb-2 text-4xl font-semibold leading-normal">
                {media.title}
              </h3>
              <span className="flex justify-center px-3 py-6">
                {`Rating: ${Math.floor(media.rating)}/10`}
              </span>
            </div>
            <div className="w-full px-4">
              <p>{media.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
