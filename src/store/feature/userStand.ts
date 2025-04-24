import { create } from "zustand";

interface IUserStore {
    data: any[];
    loading: boolean;
    error: string | null;
    setData: (data: any[]) => void;
    setError: (error: string) => void;
    setLoading: (status: boolean) => void;
}

const useUserStore = create<IUserStore>((set) => ({
    data: [],
    loading: true,
    error: null,
    setData: (data) => set({ data }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading })
}));

export default useUserStore;
