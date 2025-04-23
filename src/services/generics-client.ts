import axios from "axios";
import { refreshToken } from "./auth";
import useAuthStore from "@/store/feature/authStand";

const genericsInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_GENERICS,
  headers: {
    "Content-Type": "application/json",
  },

});

// if status 403 then logout
genericsInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 440) {
      const { zusLogout } = useAuthStore.getState();
      zusLogout(); 
      window.dispatchEvent(new CustomEvent('authError', { detail: { message: 'Sesi Anda telah berakhir. Silakan login kembali.' } }));
      localStorage.removeItem("auth-storage");
      (window as any).Toastify({
        text: "Sesi Anda telah berakhir. Silakan login kembali.",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
      setTimeout(() => {
        window.location.href = "/auth";
      }, 3000);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { zusLoginSuccess, refreshToken: Ref } = useAuthStore.getState();
        const tokenResult = await refreshToken(Ref || "");
    
        // Simpan ke zustand
        zusLoginSuccess({
          accessToken: tokenResult.accessToken,
          refreshToken: tokenResult.refreshToken,
        });
    
        // Tambahkan ke header
        originalRequest.headers["Authorization"] = `Bearer ${tokenResult.accessToken}`;
        return genericsInstance(originalRequest); 
      } catch (err) {
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
}
);

export default genericsInstance;