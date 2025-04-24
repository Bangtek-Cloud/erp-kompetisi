import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllWebsiteSections = async (accessToken: string) => {
    try {
        const response = await genericsInstance.get('/web', {
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

export const getWebsiteSectionByRouteId = async (url: string) => {
    try {
        const response = await genericsInstance.get(`/web/url/${url}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal mengambil section");
        }
        throw new Error("Gagal mengambil section");
    }
}

export const createWebsiteSection = async (accessToken: string, data: any) => {
    try {
        const response = await genericsInstance.post('/web', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal membuat section");
        }
        throw new Error("Gagal membuat section");
    }
}

export const getWebsiteSectionById = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.get(`/web/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal mengambil section");
        }
        throw new Error("Gagal mengambil section");
    }
}

export const updateWebsiteSection = async (accessToken: string, id: string, data: any) => {
    try {
        const response = await genericsInstance.put(`/web/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal mengupdate section");
        }
        throw new Error("Gagal mengupdate section");
    }
}

export const deleteWebsiteSection = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.delete(`/web/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal menghapus section");
        }
        throw new Error("Gagal menghapus section");
    }
}
