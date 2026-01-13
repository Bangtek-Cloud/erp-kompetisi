import { AxiosError } from "axios";
import genericsInstance from "./generics-client"


interface ErrorResponse {
    error: string;
    success?: boolean;
}

export const getAllEvents = async (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    isActive?: string
}) => {
    const query = new URLSearchParams(params as any).toString();
    try {
        const response = await genericsInstance.get(`events?${query}`)
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

export const getEventById = async (id: string) => {
    try {
        const response = await genericsInstance.get('events/' + id)
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

export const createEvent = async (data: FormData) => {
    try {
        const response = await genericsInstance.post('events', data, {
            headers: {
                "Content-Type": "multipart/form-data",
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

export const updateEvent = async (id: string, data: FormData) => {
    try {
        const response = await genericsInstance.put('events/' + id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
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

export const deleteEvent = async (id: string,) => {
    try {
        const response = await genericsInstance.delete('events/' + id)
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