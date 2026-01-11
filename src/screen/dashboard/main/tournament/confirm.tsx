import { rupiahFormat } from "@/lib/utils";
import { deleteContestant, getTournamentByIdAndUsingUser } from "@/services/tournament";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder";
import { 
    CheckCircle2, 
    Clock, 
    CreditCard, 
    ExternalLink, 
    Store, 
    Package, 
    User, 
    AlertTriangle,
    ArrowLeft,
    Receipt
} from "lucide-react";

export default function ConfirmTournament() {
    const { tournamentId } = useParams();
    const queryClient = useQueryClient();
    const { user, accessToken } = useAuthStore();
    const [tournament, setTournament] = useState<{loading: boolean, data: any}>({
        loading: true,
        data: null
    });
    const navigate = useNavigate();

    const { mutate: deletMutation } = useMutation({
        mutationFn: async (id: number) => {
            const response = await deleteContestant(id, accessToken as string);
            if (response.success === false) {
                toast.error(response.error);
            } else {
                toast.success('Pendaftaran berhasil dibatalkan');
                queryClient.invalidateQueries({ queryKey: ['notificationsTournament'] });
                queryClient.invalidateQueries({ queryKey: ['pendingTransaction'] });
                navigate('/apps/tournament');
            }
        },
    });

    useEffect(() => {
        const fetchTournament = async () => {
            const response = await getTournamentByIdAndUsingUser(tournamentId as string, accessToken || '');
            if (response.error || !response.data) {
                setTournament({ loading: false, data: null });
                return;
            }
            setTournament({ loading: false, data: response.data });
        };
        fetchTournament();
    }, [user, accessToken, tournamentId]);

    const formatPhoneNumber = (phoneNumber: string | null | undefined): string | null => {
        if (!phoneNumber) return null;
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.startsWith('08')) return '62' + cleaned.substring(1);
        if (cleaned.startsWith('0')) return '62' + cleaned.substring(1);
        return cleaned;
    };

    if (tournament.loading) return <LoadingSolder />;
    if (!tournament.data) return <div className="h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
        <h1 className="text-xl font-bold">Data pendaftaran tidak ditemukan</h1>
        <Button onClick={() => navigate('/apps/tournament')}>Kembali</Button>
    </div>;

    const selectedPackage = tournament.data.tournament.price.find((p: any) => p.key === tournament?.data?.optionPrice);
    const isVerified = tournament.data.isVerified;

    return (
        <main className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header Area */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </Button>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground italic">ID: #{tournament.data.id}</span>
                        {isVerified ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 px-3 py-1">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Terverifikasi
                            </Badge>
                        ) : (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 px-3 py-1">
                                <Clock className="w-3.5 h-3.5 mr-1" /> Menunggu Verifikasi
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Payment & Status Instructions */}
                    <div className="lg:col-span-2 space-y-6">
                        {!isVerified && (
                            <Card className="border-amber-200 bg-amber-50/30 overflow-hidden">
                                <CardHeader className="bg-amber-100/50 pb-4">
                                    <CardTitle className="text-lg flex items-center gap-2 text-amber-900">
                                        <CreditCard className="w-5 h-5 text-amber-700" /> Instruksi Pembayaran
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                                                <p className="text-xs font-bold text-amber-600 uppercase mb-2">Tujuan Transfer</p>
                                                <p className="text-sm text-muted-foreground uppercase font-medium">{tournament.data?.tournament?.event?.bank?.BankType}</p>
                                                <p className="text-2xl font-mono font-bold tracking-tighter text-slate-900 my-1">
                                                    {tournament.data?.tournament?.event?.bank?.BankNo}
                                                </p>
                                                <p className="text-sm font-medium">a.n. {tournament.data?.tournament?.event?.bank?.BankName}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="text-sm space-y-3">
                                                <div className="flex gap-3">
                                                    <span className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                                                    <p>Transfer sesuai <b>Total Bayar</b> di rincian tagihan.</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <span className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                                                    <p>Screenshot atau foto bukti transfer Anda.</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <span className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                                                    <p>Kirim bukti ke panitia melalui link WhatsApp di bawah.</p>
                                                </div>
                                            </div>
                                            
                                            {tournament.data?.tournament?.event?.bank?.noHp && (
                                                <Button asChild className="mt-6 bg-green-600 hover:bg-green-700 text-white w-full">
                                                    <Link target="_blank" to={'https://wa.me/' + formatPhoneNumber(tournament.data?.tournament?.event?.bank?.noHp)}>
                                                        Kirim Bukti via WhatsApp <ExternalLink className="w-4 h-4 ml-2" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {isVerified ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-bold text-green-900">Pembayaran Terverifikasi</h2>
                                <p className="text-green-700 mt-2 max-w-md">Terima kasih! Pembayaran Anda sudah kami terima. Silakan cek email atau dashboard secara berkala untuk info turnamen.</p>
                            </div>
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex gap-4 items-start">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900 leading-none mb-2">Menunggu Konfirmasi</h3>
                                    <p className="text-sm text-blue-700">Setelah Anda mengirim bukti transfer, tim kami akan melakukan pengecekan maksimal dalam 1x24 jam.</p>
                                </div>
                            </div>
                        )}

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" /> Informasi Kontestan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2">
                                    <div className="flex justify-between font-medium">
                                        <span className="text-muted-foreground">Tipe</span>
                                        <span>{tournament.data.playerType}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span className="text-muted-foreground">Status Pendaftar</span>
                                        <span className="text-primary">User Terdaftar</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <Store className="w-4 h-4 text-primary" /> Informasi Toko
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2">
                                    <div className="flex justify-between font-medium">
                                        <span className="text-muted-foreground">Nama Toko</span>
                                        <span>{tournament.data.storeName || "-"}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-right">
                                        <span className="text-muted-foreground">Lokasi</span>
                                        <span className="max-w-[150px] truncate">{tournament.data.storeAddress || "-"}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Invoice Details */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-lg border-2 border-slate-200">
                            <CardHeader className="border-b bg-slate-50">
                                <div className="flex items-center gap-2">
                                    <Receipt className="w-5 h-5 text-slate-500" />
                                    <CardTitle className="text-lg">Ringkasan Invoice</CardTitle>
                                </div>
                                <p className="text-xs text-muted-foreground">Dibuat pada {new Date(tournament.data.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Package className="w-3.5 h-3.5" /> Paket {selectedPackage?.value}
                                        </span>
                                        <span className="font-semibold">{rupiahFormat(selectedPackage?.amount || 0)}</span>
                                    </div>

                                    {tournament.data.usingLogo && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Biaya Logo</span>
                                            <span className="font-semibold text-green-600">+{rupiahFormat(tournament.data.tournament.usingLogoPrice)}</span>
                                        </div>
                                    )}

                                    <Separator className="my-4" />

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-bold uppercase text-muted-foreground">Total Pembayaran</p>
                                            <p className="text-2xl font-bold text-primary tracking-tight">{rupiahFormat(tournament.data.price)}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-2" />
                                
                                <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase uppercase leading-none">Peralatan</p>
                                    <p className="text-sm font-medium leading-none">
                                        {tournament.data.equipmentSource ? 'Bawa Sendiri' : 'Disediakan Panitia'}
                                    </p>
                                    {tournament.data.equipmentOwned && (
                                        <ul className="text-[11px] list-disc list-inside text-muted-foreground">
                                            {JSON.parse(tournament.data.equipmentOwned).map((item: string, i: number) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {!isVerified && (
                                    <div className="pt-6">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                                                    Batalkan Pendaftaran
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="flex items-center gap-2">
                                                        <AlertTriangle className="w-5 h-5 text-red-500" /> Batalkan?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat dibatalkan. Semua data pendaftaran Anda akan dihapus secara permanen.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deletMutation(tournament.data.id)} className="bg-red-600">
                                                        Ya, Batalkan
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </main>
    );
}