import { useAxiosPrivate } from "./use-axios-private";
import { useAuth } from "./use-auth";
import { List } from "components/media/types/list.types";

const getUserDataUrl = () => "/users/me";

const getUsersListsUrl = (userId: number) => `/lists/user/${userId}`;

export const useFetchCurrentUser = () => {
  const { setUserData } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
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

  return fetchData;
};
