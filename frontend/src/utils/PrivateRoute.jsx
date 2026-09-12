import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PrivateRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate replace to="/login" />;
}

export default PrivateRoute;
