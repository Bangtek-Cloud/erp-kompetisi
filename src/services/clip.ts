import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllClip = async (params: {
    page: number;
    limit: number;
}) => {
    const query = new URLSearchParams(params as any).toString();
    try {
        const response = await genericsInstance.get(`clip?${query}`)
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

export const createClip = async (data: any) => {
    try {
        const response = await genericsInstance.post('clip', data);
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

export const deleteClip = async (id: string) => {
    try {
        const response = await genericsInstance.delete(`clip/${id}`);
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

export const getClipById = async (id: string) => {
    try {
        const response = await genericsInstance.get(`clip/${id}`);
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

export const updateClip = async (id: string, data: any) => {
    try {
        const response = await genericsInstance.put(`clip/${id}`, data);
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