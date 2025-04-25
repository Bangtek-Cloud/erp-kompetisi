import { getPendingTournaments } from "@/services/tournament";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
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
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
            <p className="font-medium">Anda memiliki {data.length} pembayaran tertunda.</p>
            <p className="text-sm">Silakan lanjutkan transaksi untuk menyelesaikannya.</p>
            <ul className="mt-4">
                {data.map((tournament: any) => (
                    <Link to={`/apps/tournament/confirm/${tournament.id}`} key={tournament.id}>
                        <div key={tournament.id} className="text-sm flex items-center">
                            <div>{`- ${tournament.name}`}</div>
                            <Button className="ml-2" variant="link">
                                <MoveRight className="mr-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}