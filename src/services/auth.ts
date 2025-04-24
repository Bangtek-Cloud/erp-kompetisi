import { AxiosError } from "axios";
import genericsInstance from "./generics-client";
import { ErrorType } from "@/types/errorType";

interface ErrorResponse {
  error: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await genericsInstance.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorType>;
      return {
        error: axiosError.response?.data.message,
      }
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
    if (error instanceof Error) {
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
  try {
    const response = await genericsInstance.post("/user/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorType>;
      return {
        error: axiosError.response?.data.message,
      }
    }
  }
}

export const updateUser = async (data: any, accessToken: string) => {
  try {
    const response = await genericsInstance.put('user/updateMe', data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      };
    }
  }
}

export const getAllUser = async (accessToken: string) => {
  try {
    const response = await genericsInstance.get("/user/all-user", {
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

export const changePasswordUser = async (data: any, accessToken: string | null) => {
  try {
    const response = await genericsInstance.put('user/update-password', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      };
    }
  }
}

export const fetchUserById = async (id: string | undefined, accessToken: string | null) => {
  try {
    const response = await genericsInstance.get("/user/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;

  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      }
    }
  }
};

export const forceUpdatePasswordHandler = async (data: any, accessToken: string | null) => {
  try {
    const response = await genericsInstance.put('user/force-update-password', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      };
    }
  }
}

export const forceUpdateUser = async (id: string |undefined ,data: any, accessToken: string) => {
  try {
    const response = await genericsInstance.put('user/force-update/'+id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      };
    }
  }
}

export const changeRoleUser = async (data: any, accessToken: string) => {
  try {
    const response = await genericsInstance.post('user/changerole', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return {
        error: axiosError.response?.data.error,
      };
    }
  }
}