import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/feature/authStand";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";


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
      <div className="flex items-center justify-center h-screen">
        <img src="/images/solder.svg" alt="solder" className="w-32 h-32 animate-spin" />
      </div>
    )
  }

  return <Outlet />
};

export default ProtectedRoute;
