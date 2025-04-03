import axios from "axios";
import { refreshToken } from "./auth";

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
    if (error.response.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 3000);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const newAccessToken = await refreshToken(await localStorage.getItem("refreshToken") || "");
            localStorage.setItem('accessToken', newAccessToken.accessToken)
            localStorage.setItem('refreshToken', newAccessToken.refreshToken)
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken.accessToken}`;
            return genericsInstance(originalRequest); 
        } catch (err) {
            return Promise.reject(err);
        }
    }
    
    return Promise.reject(error);
}
);

export default genericsInstance;