import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    message: string;
    success?: boolean;
}

export const getAllBank = async () => {
    try {
        const response = await genericsInstance.get('/bank')
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                error: axiosError.response?.data.message,
            };
        }
    }
}

export const createBankAccount = async (data: FormData) => {
    try {
        const response = await genericsInstance.post('/bank', data);
        console.log(response.data)
        if (response.data.success === false) {
            return {
                error: response.data.error
            }
        }
        return response.data;

    } catch (error) {
        console.log('heree')
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.log(axiosError.response?.data.message)
            return {
                error: axiosError.response?.data.message
            }
        }
        return { error: "Gagal membuat akun bank" }
    }
}

export const updateBankAccount = async (id: string, data: any) => {
    try {
        const response = await genericsInstance.put('/bank/' + id, data);
        if (response.data.success === false) {
            return {
                error: response.data.error
            }
        }
        return response.data;

    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.log(axiosError.response?.data.message)
            return {
                error: axiosError.response?.data.message
            }
        }
        return { error: "Gagal membuat akun bank" }
    }
}

export const deleteBankAccount = async (id: string) => {
    try {
        const response = await genericsInstance.delete('bank/' + id)
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                message: axiosError.response?.data.message,
            };
        }
    }
}

export const getBankById = async (id: string) => {
    try {
        const response = await genericsInstance.get('/bank/'+ id);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                error: axiosError.response?.data.message,
            };
        }
    }
}