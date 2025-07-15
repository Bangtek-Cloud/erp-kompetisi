import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    message: string;
    success?: boolean;
}

export const getAllBank = async (accessToken: string) => {
    try {
        const response = await genericsInstance.get('/bank', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
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

export const createBankAccount = async (accessToken: string, data: any) => {
    try {
        const response = await genericsInstance.post('/bank', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
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

export const updateBankAccount = async (accessToken: string, id: string, data: any) => {
    try {
        const response = await genericsInstance.put('/bank/' + id, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
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

export const deleteBankAccount = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.delete('bank/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
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

export const getBankById = async (accessToken: string, id: string) => {
    try {
        const response = await genericsInstance.get('/bank/'+ id, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
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