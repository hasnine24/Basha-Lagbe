import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PublicRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return null;

  const destination = location.state?.from?.pathname || location.state?.from || "/profile";
  return user ? <Navigate replace to={destination} /> : <Outlet />;
}

export default PublicRoute;
