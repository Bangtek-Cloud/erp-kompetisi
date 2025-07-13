import { AxiosError } from "axios";
import genericsInstance from "./generics-client";
import { IAccountForm } from "@/types/account";

interface ErrorResponse {
  error: string;
}


export const GET_TRANSACTION = async (accessToken: string | "", page: number, eventId?: string) => {
  try {
    const response = await genericsInstance.get(`/account?page=${page}&perPage=8&eventId=${eventId}`, {
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

export const NEW_TRANSACTION = async (accessToken: string | "", form: IAccountForm) => {
  try {
    const response = await genericsInstance.post("/account", form, {
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

export const UPDATE_TRANSACTION = async (accessToken: string | "", id: string, form: IAccountForm) => {
  try {
    const response = await genericsInstance.put("/account/" + id, form, {
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

export const DELETE_TRANSACTION = async (accessToken: string | "", id: string) => {
  try {
    const response = await genericsInstance.delete(`/account/${id}`, {
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