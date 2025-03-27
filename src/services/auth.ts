import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
  error: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await genericsInstance.post("/user/login", {
      email,
      password,
    });
    if(!response){
      throw new Error("Gagal login user!")
    }
    return response.data;
  } catch (error) {
    if(error instanceof Error){
      throw new Error(error.message)
    }
  }
};

export const fetchUser = async (accessToken: string) => {
  try {
    const response = await genericsInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;

  } catch (error) {
    if(error instanceof Error){
      const axiosError = error as AxiosError<ErrorResponse>; 
      return {
        error: axiosError.response?.data.error,
      }
    }
  }
};

export const refreshToken = async (token: string) => {
  const response = await genericsInstance.post("/user/refresh", {
    refreshToken: token,
  })
  if (response.status === 200) {
    return response.data;
  }
};

export const RegisterUser = async (name: string, email: string, password: string) => {
  const response = await fetch(import.meta.env.VITE_BASE_URL_GENERICS+"/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const res = await response.json()
    throw new Error(res.message);
  }

  return response.json();
}