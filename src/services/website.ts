import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllWebsiteSections = async () => {
    try {
        const response = await genericsInstance.get('/hero');
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

export const upsertHero = async (data: any) => {
    try {
        const response = await genericsInstance.post('/hero', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

export const getWebsiteSectionById = async (id: string) => {
    try {
        const response = await genericsInstance.get(`/web/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal mengambil section");
        }
        throw new Error("Gagal mengambil section");
    }
}

export const updateWebsiteSection = async (id: string, data: any) => {
    try {
        const response = await genericsInstance.put(`/web/${id}`, data);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal mengupdate section");
        }
        throw new Error("Gagal mengupdate section");
    }
}

export const deleteWebsiteSection = async (id: string) => {
    try {
        const response = await genericsInstance.delete(`/web/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error || "Gagal menghapus section");
        }
        throw new Error("Gagal menghapus section");
    }
}
