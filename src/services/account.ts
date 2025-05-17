import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
  }

  
export const GET_TRANSACTION = async (accessToken: string | "") => {
    try {
        const response = await genericsInstance.get("/transaction", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          throw new Error(axiosError.response?.data.error)
        }
        throw new Error("Terjadi kesalahan")
      }
}

export const GET_DONORS = async (accessToken: string | "") => {
    try {
        const response = await genericsInstance.get("/donor", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          throw new Error(axiosError.response?.data.error)
        }
        throw new Error("Terjadi kesalahan")
      }
}

export const GET_ASSETS = async (accessToken: string | "") => {
    try {
        const response = await genericsInstance.get("/asset", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          throw new Error(axiosError.response?.data.error)
        }
        throw new Error("Terjadi kesalahan")
      }
}