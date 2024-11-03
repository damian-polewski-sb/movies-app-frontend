import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCurrentUser } from "hooks/use-current-user";
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
  followingCount: number;
  followersCount: number;
  isFollowed: boolean;
  reviewsCount: number;
  likesCount: number;
}

const getUserDataUrl = (userId: number) => `/users/${userId}`;

const getFollowUrl = (userId: number) => `/users/${userId}/follow`;

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
  followingCount,
  followersCount,
  reviewsCount,
  likesCount,
}: {
  followingCount: number;
  followersCount: number;
  reviewsCount: number;
  likesCount: number;
}) => {
  return (
    <div className="flex justify-center py-4 pt-8 lg:pt-4">
      <div className="p-3 mr-4 text-center">
        <span className="block text-xl font-bold tracking-wide uppercase">
          {followingCount}
        </span>
        <span className="text-sm text-blueGray-400">Following</span>
      </div>
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData>();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const { userId } = useParams();
  const { isCurrentUser } = useCurrentUser();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) throw new Error();

        const response = await axiosPrivate.get(
          getUserDataUrl(parseInt(userId))
        );

        const user = response.data as UserData

        setUser(user);
        setIsFollowed(user.isFollowed);
        setIsLoading(false);
      } catch {
        toast.error("User not found!");
        navigate("/home");
      }
    };

    fetchData();
  }, [axiosPrivate, navigate, userId]);

  if (!user || isLoading) {
    return <Spinner />;
  }

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axiosPrivate.delete(getFollowUrl(user.id));
        setUser({
          ...user,
          followersCount: user.followersCount - 1,
        });
      } else {
        await axiosPrivate.post(getFollowUrl(user.id));
        setUser({
          ...user,
          followersCount: user.followersCount + 1,
        });
      }
      setIsFollowed((prev) => !prev);
    } catch (error) {
      toast.error(error as string);
    }
  };

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
              followingCount={user.followingCount}
              followersCount={user.followersCount}
              reviewsCount={user.reviewsCount}
              likesCount={user.likesCount}
            />
          </div>
          <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right">
            <div className="flex justify-center px-3 py-6">
              {!isCurrentUser(user.id) && (
                <FollowButton
                  isFollowed={isFollowed}
                  handleClick={handleFollow}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <section className="w-2/3">
          <PostsGallery userId={userId ? parseInt(userId) : undefined} />
        </section>
        <aside className="w-1/3">
          <ProfileMediaGallery userId={user.id} />
        </aside>
      </div>
    </Container>
  );
};
