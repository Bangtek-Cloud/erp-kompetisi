import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllTournamentByUserId } from "@/services/tournament";
import useAuthStore from "@/store/feature/authStand";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Clock, CheckCircle, AlertCircle, CalendarX, Eye, CreditCard } from "lucide-react";

function NotificationPage() {
    const { accessToken } = useAuthStore();

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
        <div className="p-6 w-full">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Notifikasi</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                        {tournament?.length || 0} Tournament
                    </Badge>
                </div>
            </div>

            <div className="space-y-4">
                {tournament && tournament.map((item: any) => (
                    <Card key={item.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-primary">
                        <div className="flex items-start p-6">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">{item.tournament.name}</h3>
                                    {new Date(item.tournament.startDate) < new Date() ? (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                            <Clock className="w-3 h-3 mr-1" />
                                            Event Selesai
                                        </Badge>
                                    ) : (
                                        <Badge variant={item.isVerified ? 'default' : 'destructive'} className="flex items-center">
                                            {item.isVerified ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Sudah Dibayar
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    Belum Dibayar
                                                </>
                                            )}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {new Date(item.tournament.startDate).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {item.tournament.description}
                                </p>
                                <div className="flex justify-end">
                                    {new Date(item.tournament.startDate) < new Date() ? (
                                        <Button disabled variant="outline" size="sm" className="gap-2">
                                            <CalendarX className="w-4 h-4" />
                                            Event Sudah Selesai
                                        </Button>
                                    ) : (
                                        <Link to={`/apps/tournament/confirm/${item.tournament.id}`}>
                                            <Button size="sm" className="gap-2">
                                                {item.isVerified ? (
                                                    <>
                                                        <Eye className="w-4 h-4" />
                                                        Lihat Detail
                                                    </>
                                                ) : (
                                                    <>
                                                        <CreditCard className="w-4 h-4" />
                                                        Bayar Sekarang
                                                    </>
                                                )}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;