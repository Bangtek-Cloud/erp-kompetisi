import { getPendingTournaments } from "@/services/tournament";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { AlertCircle, ChevronRight, CreditCard, MoveRight, Wallet } from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "@/store/feature/authStand";
export default function PendingTransaction() {
    const { accessToken } = useAuthStore();
    const { data, error } = useQuery({
        queryKey: ["pendingTransaction"],
        queryFn: async () => {
            const response = await getPendingTournaments(accessToken as string);
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data;
        },
        staleTime: 0
    });

    if (!data) {
        return null;
    }
    if (data.length === 0) {
        return null;
    }
    if (error) {
        return (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium">Terjadi kesalahan saat memuat data.</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }
    return (
        <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm m-4">
            {/* Header dengan Accent Color dari Tema */}
            <div className="flex items-center gap-4 bg-secondary/30 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-audiowide text-sm tracking-wide uppercase">
                        Pembayaran Tertunda ({data.length})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Selesaikan transaksi Anda untuk mengamankan slot.
                    </p>
                </div>
            </div>

            {/* List Transaksi */}
            <div className="divide-y divide-border">
                {data.map((tournament: any) => (
                    <Link
                        key={tournament.id}
                        to={`/apps/tournament/confirm/${tournament.id}`}
                        className="group flex items-center justify-between p-4 transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-muted p-2 group-hover:bg-background">
                                <Wallet className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-suse text-sm font-medium">
                                {tournament.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100">
                            LANJUTKAN
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}