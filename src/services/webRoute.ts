import genericsInstance from "./generics-client";
import { AxiosError } from "axios";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllWebRoute = async (accessToken: string) => {
    try {
        const response = await genericsInstance.get('/web/route', {
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

export const getWebRouteById = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.get(`/web/route/${id}`, {
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

export const createWebsiteRoute = async (accessToken: string, data: { path: string, url: string }) => {
    try {
        const response = await genericsInstance.post('/web/route', data, {
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

export const updateWebsiteRoute = async (accessToken: string, id: string, data: { path: string, url: string }) => {
    try {
        const response = await genericsInstance.put(`/web/route/${id}`, data, {
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

export const deleteWebsiteRoute = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.delete(`/web/route/${id}`, {
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