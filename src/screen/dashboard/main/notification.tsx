import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllTournamentByUserId } from "@/services/tournament";
import useAuthStore from "@/store/feature/authStand";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { 
    Clock, 
    CheckCircle2, 
    AlertCircle, 
    CalendarX, 
    Eye, 
    CreditCard, 
    Calendar,
    Trophy,
    ChevronRight
} from "lucide-react";
import LoadingSolder from "@/components/loading-solder";
import { cn } from "@/lib/utils";

function NotificationPage() {
    const { accessToken } = useAuthStore();

    const { data: tournament, isPending } = useQuery({
        queryKey: ['notificationsTournament'],
        queryFn: async () => {
            const response = await getAllTournamentByUserId(accessToken as string);
            if (response.error) throw new Error(response.error);
            return response.data;
        }
    });

    if (isPending) return <LoadingSolder />;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 w-full">
            {/* Header Ringkas */}
            <div className="flex items-end justify-between mb-6 border-b pb-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Turnamen Saya</h1>
                    <p className="text-xs text-muted-foreground">Kelola pendaftaran dan status pembayaran</p>
                </div>
                <Badge variant="outline" className="text-[11px] font-medium px-2 py-0">
                    {tournament?.length || 0} Terdaftar
                </Badge>
            </div>

            <div className="flex flex-col gap-2">
                {tournament && tournament.length > 0 ? (
                    tournament.map((item: any) => {
                        const isExpired = new Date(item.tournament.startDate) < new Date();
                        const isVerified = item.isVerified;

                        return (
                            <Card 
                                key={item.id} 
                                className={cn(
                                    "group transition-all hover:bg-slate-50 border shadow-none",
                                    isExpired && "opacity-75 bg-slate-50/50"
                                )}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center p-3 gap-3">
                                    
                                    {/* Icon & Info Utama */}
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                            isVerified ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600",
                                            isExpired && "bg-slate-200 text-slate-500"
                                        )}>
                                            <Trophy className="w-5 h-5" />
                                        </div>
                                        
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h3 className="text-sm font-bold truncate leading-none">
                                                    {item.tournament.name}
                                                </h3>
                                                {isVerified ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                ) : !isExpired && (
                                                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(item.tournament.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                                <span className="font-medium px-1.5 py-0 border rounded bg-white capitalize">
                                                    {item.playerType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Action */}
                                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0">
                                        
                                        {/* Status Badge Ringkas */}
                                        <div className="flex flex-col items-end mr-2">
                                            {isExpired ? (
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selesai</span>
                                            ) : isVerified ? (
                                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Terbayar</span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Perlu Bayar</span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {isExpired ? (
                                                <Button disabled variant="ghost" size="sm" className="h-8 text-[11px]">
                                                    <CalendarX className="w-3.5 h-3.5 mr-1" /> Expired
                                                </Button>
                                            ) : (
                                                <Link to={`/apps/tournament/confirm/${item.id}`}>
                                                    <Button 
                                                        size="sm" 
                                                        variant={isVerified ? "outline" : "default"}
                                                        className={cn(
                                                            "h-8 text-[11px] px-3 gap-1.5",
                                                            !isVerified && "bg-amber-600 hover:bg-amber-700 shadow-sm"
                                                        )}
                                                    >
                                                        {isVerified ? (
                                                            <><Eye className="w-3.5 h-3.5" /> Detail</>
                                                        ) : (
                                                            <><CreditCard className="w-3.5 h-3.5" /> Bayar Sekarang</>
                                                        )}
                                                        <ChevronRight className="w-3 h-3 opacity-50" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        );
                    })
                ) : (
                    /* Compact Empty State */
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                        <p className="text-sm text-muted-foreground">Tidak ada turnamen yang diikuti.</p>
                        <Button asChild variant="link" size="sm" className="mt-1">
                            <Link to="/apps/tournament">Cari turnamen sekarang</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationPage;