import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";


const RedirectRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/apps" replace />;
  }

  return <Outlet />;
};

export default RedirectRoute;
