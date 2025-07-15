import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder";
import { getAllBank, deleteBankAccount } from "@/services/bank";
import useBankStore from "@/store/feature/bankStand";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { DataTableBank } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IBankTable } from "@/types/input/bank";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Userlist() {
    const { accessToken, user } = useAuthStore();
    const { loading, setData, setLoading, setError, data } = useBankStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            const response = await deleteBankAccount(accessToken || '', id);
            if (response.success) {
                toast.success("Bank Account deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["bank-management"] });
            } else {
                toast.error(response.error);
            }
        },
    });

    const columns: ColumnDef<IBankTable>[] = [
        {
            accessorKey: "BankType",
            header: "Nama Bank",
        },
        {
            accessorKey: "BankName",
            header: "Pemilik Rekening",
        },
        {
            accessorKey: "BankNo",
            header: "Nomor Rekening",
        },
        {
            accessorKey: "noHp",
            header: "Konfirmasi Whatsapp",
        },
        {
            accessorKey: "id",
            header: "Action",
            cell({ row }) {
                return (
                    <div>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/apps/management/bank/update/${row.original.id}`)}
                        >
                            Ubah
                        </Button>
                        {user?.role === "SU" && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    toast(
                                        "Are you sure you want to delete this bank account?",
                                        {
                                            action: {
                                                label: "Delete",
                                                onClick: () => mutateDelete(row.original.id),
                                            },
                                            cancel: {
                                                label: "Cancel",
                                                onClick: () => {},
                                            },
                                        }
                                    );
                                }}
                            >
                                Hapus
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    const { error } = useQuery({
        queryKey: ['bank-management'],
        queryFn: async () => {
            const response = await getAllBank(accessToken || "");
            if (response.success) {
                setData(response.data);
                setLoading(false);
                return response.data;
            }
        },
        staleTime: 0,
    });

    if (error) {
        setError(error.message);
        return (
            <div>
                Terjadi kesalahan {error.message}
            </div>
        );
    }

    if (loading || isDeleting) {
        return <LoadingSolder />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bank Account</h1>
                <Button onClick={() => navigate('/apps/management/bank/new')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Bank
                </Button>
            </div>
            <DataTableBank columns={columns} data={data ?? []} />
        </div>
    );
}