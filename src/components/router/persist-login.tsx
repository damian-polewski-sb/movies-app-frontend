import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import { useAuth } from "hooks/use-auth";
import { useCurrentUser } from "hooks/use-current-user";
import { useRefreshToken } from "hooks/use-refresh-token";

import { Spinner } from "components/ui/spinner";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setUserData } = useAuth();

  const refresh = useRefreshToken();
  const { fetchUserData } = useCurrentUser();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        await fetchUserData();
      } catch (err) {
        console.error(err);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth?.accessToken, fetchUserData, refresh, setUserData]);

  return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};
