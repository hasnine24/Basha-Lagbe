import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PublicRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return user ? <Navigate replace to="/" /> : <Outlet />;
}

export default PublicRoute;
