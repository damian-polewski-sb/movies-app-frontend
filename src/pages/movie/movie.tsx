import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface MovieData {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  posterUrl: string;
}

const getMoviesDataUrl = (movieId: number) => `/movies/${movieId}`;

export const MoviePage = () => {
  const { movieId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        try {
          const response = await axiosPrivate.get(
            getMoviesDataUrl(parseInt(movieId))
          );

          setMovie(response?.data);
          setIsLoading(false);
        } catch {
          toast.error("Movie not found!");
          navigate("/home");
        }
      } else {
        toast.error("Movie not found!");
        navigate("/home");
      }
    };

    fetchData();
  }, [axiosPrivate, navigate, movieId]);

  if (!movie || isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="flex flex-col max-w-screen-xl px-4">
      <div className="flex flex-col w-full min-w-0 p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
        <div className="flex flex-wrap justify-center py-6">
          <div className="flex items-center justify-center w-full lg:w-2/12">
            <img
              className="object-cover overflow-hidden rounded h-60"
              src={movie.posterUrl}
              alt="movie poster"
            />
          </div>
          <div className="flex flex-col w-full px-4 lg:w-8/12">
            <div className="flex flex-col justify-center w-full px-4 lg:justify-between lg:flex-row">
              <h3 className="flex justify-center mb-2 text-4xl font-semibold leading-normal">
                {movie.title}
              </h3>
              <span className="flex justify-center px-3 py-6">
                {`Rating: ${Math.floor(movie.rating)}/10`}
              </span>
            </div>
            <div className="w-full px-4">
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
