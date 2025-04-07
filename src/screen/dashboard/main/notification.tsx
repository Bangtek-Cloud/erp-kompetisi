import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllTournamentByUserId } from "@/services/tournament";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function NotificationPage() {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    const { data: tournament, isPending } = useQuery({
        queryKey: ['notificationsTournament'],
        queryFn: async () => {
            const response = await getAllTournamentByUserId(accessToken as string);
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data;
        }
    })

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Notifikasi</h1>

            <div className="mb-6">
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Tournaments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tournament && tournament.map((item: any) => (
                            <div key={item.id} className="mb-4">
                                <h2 className="text-lg font-semibold">
                                    {item.tournament.name}
                                    {new Date(item.tournament.startDate) < new Date() ? (
                                        <span className="text-gray-500 text-xs ml-2">Event selesai</span>
                                    ) : (
                                        <Badge variant={item.isVerified ? 'default' : 'destructive'} className="ml-2">
                                            {item.isVerified ? 'Sudah dibayar' : 'Belum dibayar'}
                                        </Badge>
                                    )}
                                </h2>
                                <p className="text-sm text-gray-600">{item.tournament.description}</p>
                                {new Date(item.tournament.startDate) < new Date() ? (
                                    <Button disabled className="mt-2" size={'sm'}>
                                        Event sudah selesai
                                    </Button>
                                ) :
                                    (
                                        <Link to={`/apps/tournament/confirm/${item.tournament.id}`} className="mt-2">
                                            <Button size={'sm'} className="mt-2">
                                                {item.isVerified ? 'Lihat Detail' : 'Bayar Sekarang'}
                                            </Button>
                                        </Link>
                                    )
                                }
                                <Separator className="my-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NotificationPage;