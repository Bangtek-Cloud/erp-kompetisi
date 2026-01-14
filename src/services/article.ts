import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllArticle = async (params: {
    page: number;
    limit: number;
}) => {
    const query = new URLSearchParams(params as any).toString();
    try {
        const response = await genericsInstance.get(`article?${query}`)
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

export const createArticle = async (data: any) => {
    try {
        const response = await genericsInstance.post('article', data, {
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

export const deleteArticle = async (id: string) => {
    try {
        const response = await genericsInstance.delete(`article/${id}`);
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

export const getArticleById = async (id: string) => {
    try {
        const response = await genericsInstance.get(`article/${id}`);
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

export const updateArticle = async (id: string, data: any) => {
    try {
        const response = await genericsInstance.put(`article/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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