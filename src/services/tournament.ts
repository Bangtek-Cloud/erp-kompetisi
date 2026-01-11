import { AxiosError } from "axios";
import genericsInstance from "./generics-client";

interface ErrorResponse {
    error: string;
    success?: boolean;
    alreadyRegistered?: boolean;
}

export const getAllTournaments = async (param: {
    page: number;
    limit: number;
    search?: string;
}
) => {
    const query = new URLSearchParams(param as any).toString();
    try {
        const response = await genericsInstance.get("/tournaments?" + query);
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

export const updateTournament = async (accessToken: string, id: string, data: any) => {
    try {
        const response = await genericsInstance.put(`/tournaments/${id}`, data, {
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

export const deleteTournament = async (id: string, accessToken: string) => {
    try {
        const response = await genericsInstance.delete(`/tournaments/${id}`, {
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

export const getTournamentById = async (id: string, accessToken: string) => {
    try {
        const response = await genericsInstance.get(`/tournaments/${id}`, {
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

export const createTournament = async (accessToken: string, data: any) => {
    try {
        const response = await genericsInstance.post("/tournaments/new", data, {
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

export const createParticipant = async (accessToken: string, id: string, data: FormData) => {
    try {
        const response = await genericsInstance.post("/contestants/" + id, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                error: axiosError.response?.data.error,
                alreadyRegistered: axiosError.response?.data.alreadyRegistered,
            };
        }
    }
}

export const getTournamentByIdAndUsingUser = async (id: string, accessToken: string) => {
    try {
        const response = await genericsInstance.get(`/contestants/user/${id}`, {
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

export const getPendingTournaments = async (accessToken: string) => {
    try {
        const response = await genericsInstance.get("/tournaments/pending", {
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

export const deleteContestant = async (id: number, accessToken: string) => {
    try {
        const response = await genericsInstance.delete(`/contestants/${id}`, {
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

export const getAllTournamentByUserId = async (accessToken: string) => {
    try {
        const response = await genericsInstance.get("/tournaments/all", {
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

export const updateContestantById = async (id: number, data: any, accessToken: string) => {
    try {
        const response = await genericsInstance.put("/contestants/" + id, data, {
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

export const exportDataTournament = async (id: string, status: string, accessToken: string) => {
    try {
        const response = await genericsInstance.get(`/contestants/export/${id}/${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'peserta-turnamen.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.error("Export error:", axiosError);
        }
    }
}
