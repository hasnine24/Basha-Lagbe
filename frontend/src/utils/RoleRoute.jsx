import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function RoleRoute({ allowedRoles }) {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate replace to="/properties" />;
  }

  return <Outlet />;
}

export default RoleRoute;
