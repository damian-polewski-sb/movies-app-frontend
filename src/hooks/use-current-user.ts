import { useAxiosPrivate } from "./use-axios-private";
import { useAuth } from "./use-auth";
import { List } from "components/media/types/list.types";
import { UserDataObject } from "context/auth-provider";

const getUserDataUrl = () => "/users/me";

const getUsersListsUrl = (userId: number) => `/lists/user/${userId}`;

export const useCurrentUser = () => {
  const { userData, setUserData } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const isCurrentUser = (userId: number) => userData?.id === userId

  const fetchUserData = async () => {
    const getMeResponse = await axiosPrivate.get(getUserDataUrl());

    const user = getMeResponse?.data;

    const userListsResponse = await axiosPrivate.get(getUsersListsUrl(user.id));

    const lists = userListsResponse?.data?.map((list: List) => ({
      id: list.id,
      listType: list.listType,
    }));

    const userData = {
      ...user,
      lists,
    };

    setUserData(userData);
  };

  return { ...(userData as UserDataObject), isCurrentUser, fetchUserData };
};
