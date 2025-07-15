import { fetchUser, loginUser } from "@/services/auth";
import useAuthStore from "@/store/feature/authStand";
import { IUser } from "@/types/user";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  getUser: () => Promise<void>;

  loadingUser: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { zusLoginSuccess, accessToken, refreshToken, zusSetUser, user, zusLogout } = useAuthStore();

  const [loadingUser, setLoadingUser] = useState(true);

  const signIn = async (email: string, password: string) => {
    const data = await loginUser(email, password)
    if (data.error) {
      toast.error(data.error)
      return false
    }
    else {
      zusLoginSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      return true
    }
  }

  const getUser = async () => {
    if (!accessToken) return;
    try {
      const data = await fetchUser(accessToken);
      if(data.error){
        toast.error(data.error);
        zusLogout()
      }
      zusSetUser(data);
      setLoadingUser(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      zusLogout()
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, getUser, accessToken, refreshToken, user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  )
};
