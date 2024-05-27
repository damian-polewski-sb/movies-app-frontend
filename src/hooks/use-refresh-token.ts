import axios from "api/axios";

import { useAuth } from "hooks/use-auth";

const REFRESH_URL = "/auth/refresh";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });

    /// @ts-expect-error
    setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken}
    });

    return response.data.accessToken
  };

  return refresh
};
