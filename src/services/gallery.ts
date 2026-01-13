import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getGallery = async (params: {
    page: number;
    limit: number;
}) => {
    const query = new URLSearchParams(params as any).toString();
    try {
        const response = await genericsInstance.get(`gallery?${query}`)
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                error: axiosError.response?.data.error,
            };
        }
    }
}

export const createGallery = async (data: any) => {
    try {
        const response = await genericsInstance.post('gallery', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

export const deleteGallery = async (id: string) => {
    try {
        const response = await genericsInstance.delete(`gallery/${id}`);
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