import { IUser } from "@/types/user";
import { create } from "zustand";

interface IUserStore {
    data: IUser[]
    meta?: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
    loading: boolean;
    error: string | null;
    setData: (data: any[], meta: any) => void;
    setError: (error: string) => void;
    setLoading: (status: boolean) => void;
}

const useUserStore = create<IUserStore>((set) => ({
    data: [],
    meta: {
        page: 0,
        limit: 0,
        total: 0,
        totalPages: 0
    },
    loading: true,
    error: null,
    setData: (data, meta) => set({ data, meta }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading })
}));

export default useUserStore;
