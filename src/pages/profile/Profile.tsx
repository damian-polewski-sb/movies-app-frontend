import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "hooks/use-auth";
import { useAxiosPrivate } from "hooks/use-axios-private";

import { Button } from "components/ui";
import { Container } from "components/ui/container";
import { Spinner } from "components/ui/spinner";
import { ProfileMediaGallery } from "components/media/profile-media-gallery";
import { PostsGallery } from "components/posts/posts-gallery";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const tempPosts = [
  {
    id: 1,
    name: "Robert Lewandowski",
    userId: 1,
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Robert_Lewandowski%2C_FC_Bayern_M%C3%BCnchen_%28by_Sven_Mandel%2C_2019-05-27%29_01.jpg",
    movieId: 569094,
    movieTitle: "Spider-Man: Across the Spider-Verse",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    content: "Good movie! Highly recommended",
    rating: 7,
  },
  {
    id: 2,
    name: "Robert Makłowicz",
    userId: 2,
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg/800px-Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg",
    movieId: 502356,
    movieTitle: "The Super Mario Bros. Movie",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    content: "Plans to watch it!",
  },
  {
    id: 3,
    name: "Robert Kubica",
    userId: 3,
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Robert_Kubica_2019_Formula_One_tests_Barcelona_%28cropped%29.jpg/800px-Robert_Kubica_2019_Formula_One_tests_Barcelona_%28cropped%29.jpg",
    movieId: 603692,
    movieTitle: "John Wick: Chapter 4",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    content: "Watched it!",
  },
  {
    id: 4,
    name: "Robert Makłowicz",
    userId: 2,
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg/800px-Augusty%C5%84ski_%26_Mak%C5%82owicz_na_Malcie_cropped.jpg",
    movieId: 667538,
    movieTitle: "Transformers: Rise of the Beasts",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    content:
      "Plot is predictable but action scenes are cool to watch. Overall it is decent movie.",
    rating: 5,
  },
];

const getUserDataUrl = (userId: number) => `/users/${userId}`;

const FollowButton = ({
  isFollowed,
  handleClick,
}: {
  isFollowed: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button onClick={handleClick}>{isFollowed ? "Unfollow" : "Follow"}</Button>
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
        if (!userId) throw new Error();

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
          <PostsGallery posts={tempPosts} />
        </section>
        <aside className="w-1/3">
          <ProfileMediaGallery userId={user.id} />
        </aside>
      </div>
    </Container>
  );
};
