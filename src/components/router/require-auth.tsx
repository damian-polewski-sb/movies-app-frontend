import { useAuth } from "hooks/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
