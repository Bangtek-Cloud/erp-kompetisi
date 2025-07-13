import { IResAccount } from "@/types/account";
import { create } from "zustand";

interface ITrx {
    data: IResAccount
    loading: boolean;
    error: string | null;
   setData: (data: IResAccount) => void;
    setError: (error: string) => void;
    setLoading: (status: boolean) => void;
}

const useTransactionStore = create<ITrx>((set) => ({
    data: {
        accounts: [],
        total: 0,
        totalPage: 0,
        totalCredit: 0,
        totalDebit: 0,
        balance: 0,
        totalPerPage: 0
    },
    loading: true,
    error: null,
    setData: (data: IResAccount) => set({ data }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading })
}));

export default useTransactionStore;
