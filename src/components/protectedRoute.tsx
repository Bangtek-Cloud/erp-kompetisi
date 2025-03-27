import { fetchUser } from "@/services/auth";
import { RootState } from "@/store";
import { setUser } from "@/store/feature/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";


const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!accessToken || user) return;
   const getUser = async () => {
     const user = await fetchUser(accessToken || "");
     if(user.error){
      toast.error(user.error)
      return
    } else {
       dispatch(setUser(user));
    }
   }

   getUser();
  }, [accessToken, dispatch]);

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
