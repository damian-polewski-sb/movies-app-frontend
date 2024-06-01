import { useAuth } from "hooks/use-auth";
import { useRefreshToken } from "hooks/use-refresh-token";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth?.accessToken, refresh]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
