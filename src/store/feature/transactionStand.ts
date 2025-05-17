import { create } from "zustand";

interface ITrx {
    data: any[];
    loading: boolean;
    error: string | null;
    setData: (data: any[]) => void;
    setError: (error: string) => void;
    setLoading: (status: boolean) => void;
}

const useTransactionStore = create<ITrx>((set) => ({
    data: [],
    loading: true,
    error: null,
    setData: (data) => set({ data }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading })
}));

export default useTransactionStore;
