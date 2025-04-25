import useAuthStore from "@/store/feature/authStand";
import { Navigate, Outlet } from "react-router";


const RedirectRoute = () => {
  const {accessToken} = useAuthStore()

  if (accessToken) {
    return <Navigate to="/apps" replace />;
  }

  return <Outlet />;
};

export default RedirectRoute;
