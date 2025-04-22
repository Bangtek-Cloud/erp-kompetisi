import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/feature/authStand";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import LoadingSolder from "./loading-solder";

const ProtectedRoute = () => {
  const { accessToken } = useAuthStore();
  const { getUser, loadingUser } = useAuth();

  useEffect(() => {
    getUser()
  }, [])

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />
  }

  if (loadingUser) {
    return (
      <LoadingSolder />
    )
  }

  return <Outlet />
};

export default ProtectedRoute;
