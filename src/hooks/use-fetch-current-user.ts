import { useAxiosPrivate } from "./use-axios-private";
import { useAuth } from "./use-auth";

const GET_USER_DATA_URL = "/users/me";

export const useFetchCurrentUser = () => {
  const { setUserData } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    const response = await axiosPrivate.get(GET_USER_DATA_URL);

    setUserData(response?.data)
  };

  return fetchData;
};
