import { useAuth } from "./use-auth";
import { useAxiosPrivate } from "./use-axios-private";

const LOGOUT_URL = "/auth/logout";

export const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.post(LOGOUT_URL);

      /// @ts-expect-error
      setAuth(null);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
