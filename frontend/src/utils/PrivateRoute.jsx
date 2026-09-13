import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PrivateRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return null;

  return user ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" state={{ from: location }} />
  );
}

export default PrivateRoute;
