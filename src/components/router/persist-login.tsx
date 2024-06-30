import { useAuth } from "hooks/use-auth";
import { useFetchCurrentUser } from "hooks/use-fetch-current-user";
import { useRefreshToken } from "hooks/use-refresh-token";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  const refresh = useRefreshToken();
  const fetchData = useFetchCurrentUser();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        await fetchData();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth?.accessToken, fetchData, refresh]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
