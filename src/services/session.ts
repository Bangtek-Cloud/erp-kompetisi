import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
  error: string;
}


export const getAllUserSession = async (accessToken: string) => {
  try {
    const response = await genericsInstance.get("/session", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.error)
    }
    throw new Error("Terjadi kesalahan")
  }
}

export const revokeSession = async (accessToken: string, uid: string) => {
  try {
    const response = await genericsInstance.delete("/session/"+uid, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.error)
    }
    throw new Error("Terjadi kesalahan")
  }
}
