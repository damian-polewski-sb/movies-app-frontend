import Posts from "components/Posts/Posts";
import { TrendingMediaGallery } from "components/trending-display/trending-display";
import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { useAuth } from "hooks/use-auth";
import { useAxiosPrivate } from "hooks/use-axios-private";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const getUserDataUrl = (userId: number) => `/users/${userId}`;

const FollowButton = ({
  isFollowed,
  handleClick,
}: {
  isFollowed: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      className="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none"
      type="button"
      onClick={handleClick}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

const StatsDisplay = ({
  followersCount,
  reviewsCount,
  likesCount,
}: {
  followersCount: number;
  reviewsCount: number;
  likesCount: number;
}) => {
  return (
    <div className="flex justify-center py-4 pt-8 lg:pt-4">
      <div className="p-3 mr-4 text-center">
        <span className="block text-xl font-bold tracking-wide uppercase">
          {followersCount}
        </span>
        <span className="text-sm text-blueGray-400">Followers</span>
      </div>
      <div className="p-3 mr-4 text-center">
        <span className="block text-xl font-bold tracking-wide uppercase">
          {reviewsCount}
        </span>
        <span className="text-sm text-blueGray-400">Reviews</span>
      </div>
      <div className="p-3 text-center lg:mr-4">
        <span className="block text-xl font-bold tracking-wide uppercase">
          {likesCount}
        </span>
        <span className="text-sm text-blueGray-400">Likes</span>
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const { userId } = useParams();
  const { userData } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          if (!userId) throw new Error()

          const response = await axiosPrivate.get(
            getUserDataUrl(parseInt(userId))
          );

          setUser(response?.data);
          setIsLoading(false);
        } catch {
          toast.error("User not found!");
          navigate("/home");
        }
    };

    fetchData();
  }, [axiosPrivate, navigate, userId]);

  /// @ts-expect-error
  const isCurrentUser = parseInt(userId) === userData?.id;

  if (!user || isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="flex flex-col max-w-screen-xl px-4">
      <div className="flex flex-col w-full min-w-0 px-6 py-4 text-white bg-gray-900 rounded-lg drop-shadow-lg">
        <div className="flex flex-wrap justify-center">
          <div className="flex items-center justify-center px-4 fw-full lg:w-3/12 lg:order-1">
            <div className="w-40 h-40 overflow-hidden rounded-full shadow-xl">
              <img src={user.profilePicture} alt="user" />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12 lg:order-2">
            <div className="mt-6 text-center">
              <h3 className="mb-2 text-4xl font-semibold leading-normal text-blueGray-700">
                {`${user.firstName} ${user.lastName}`}
              </h3>
            </div>
            <StatsDisplay
              followersCount={20}
              reviewsCount={10}
              likesCount={59}
            />
          </div>
          <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right">
            <div className="flex justify-center px-3 py-6">
              {!isCurrentUser && (
                <FollowButton isFollowed={false} handleClick={() => {}} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <section className="w-2/3">
          <Posts />
        </section>
        <aside className="w-1/3">
          <TrendingMediaGallery />
        </aside>
      </div>
    </Container>
  );
};
