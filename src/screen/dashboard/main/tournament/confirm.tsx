import { rupiahFormat } from "@/lib/utils";
import { deleteContestant, getTournamentByIdAndUsingUser } from "@/services/tournament";
import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

interface iP {
    key: number;
    optionPrice: string;
}

export default function ConfirmTournament() {
    const { tournamentId } = useParams();
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.auth.user);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const [tournament, setTournament] = useState<any>({
        loading: true,
        data: null
    });
    const navigate = useNavigate();

    const { mutate: deletMutation } = useMutation({
        mutationFn: async (id: number) => {
            const response = await deleteContestant(id, accessToken as string);
            if (response.success === false) {
                toast.error(response.error);
                return;
            } else {
                toast.success('Pendaftaran berhasil dibatalkan');
                queryClient.invalidateQueries({ queryKey: ['notificationsTournament'] });
                queryClient.invalidateQueries({ queryKey: ['pendingTransaction'] });
                navigate('/apps/tournament');
                setTournament({
                    loading: false,
                    data: null
                });

            }
        },
    })

    useEffect(() => {
        const fetchTournament = async () => {
            const response = await getTournamentByIdAndUsingUser(tournamentId as string, accessToken || '');
            if (response.error) {
                toast.error(response.error);
                setTournament({
                    loading: false,
                    data: null
                });
                return;
            }
            if (!response.data) {
                toast.error('Data tidak ditemukan');
                setTournament({
                    loading: false,
                    data: null
                });
                return;
            }
            setTournament({
                loading: false,
                data: response.data
            });
        };
        fetchTournament();
    }, [user, accessToken]);


    if (tournament.loading && !tournament.data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (!tournament.data && !tournament.loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
            </div>
        );
    }

    if (!user || !accessToken) {
        return;
    }

    if (user.id !== tournament.data.userId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Anda tidak memiliki akses ke halaman ini</h1>
            </div>
        );
    }

    const selectedPackage = tournament.data.tournament.price.find((p: iP) => p.key === tournament?.data?.optionPrice);
    return (
        <main className="md:min-h-[100vh] container mx-auto p-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Detail pendaftaran kontestan</h1>
                <div className="shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Cara Pembayaran</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Transfer ke rekening BRI: 0878 0100 5002 505 a.n. Norman Chandra</li>
                        <li>
                            Upload bukti pembayaran ke nomor WA <Link className="bg-muted p-2" to={'https://wa.me/628998087576'}>{'+62 899-8087-576'} 🔗</Link>
                        </li>
                        <li>Tunggu verifikasi dari panitia</li>
                    </ol>
                    <h2 className="text-xl font-semibold mt-6 mb-4 border-b pb-2">Rincian Pendaftaran</h2>
                    <div className="p-6 rounded-xl shadow-md border space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">INVOICE</h2>
                                <p className="text-sm text-muted-foreground">#{tournament.data.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm">Tanggal: {new Date(tournament.data.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm">Status:
                                    {tournament.data.isVerified ? (
                                        <span className="text-green-600 font-medium">Terverifikasi</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Belum diverifikasi</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Nama Kontestan</span>
                                <span>{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Jenis Kontestan</span>
                                <span>{tournament.data.playerType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Paket</span>
                                <span>{selectedPackage ? `${selectedPackage.value}` : 'Tidak ditemukan'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Harga Paket</span>
                                <span>{selectedPackage ? rupiahFormat(selectedPackage.amount) : '-'}</span>
                            </div>
                            {tournament.data.usingLogo && (
                                <div className="flex justify-between">
                                    <span className="font-medium">Biaya Logo</span>
                                    <span>{rupiahFormat(tournament.data.tournament.usingLogoPrice)}</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                                <span>Total Bayar</span>
                                <span>{rupiahFormat(tournament.data.price)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl shadow-md border space-y-6 mt-4">
                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <h3 className="font-bold text-lg">Informasi Tambahan</h3>

                            {tournament.data.storeName && (
                                <div className="flex justify-between">
                                    <span>Nama Toko</span>
                                    <span className="text-right">{tournament.data.storeName}</span>
                                </div>
                            )}

                            {tournament.data.storeAddress && (
                                <div className="flex justify-between">
                                    <span>Alamat Toko</span>
                                    <span className="text-right">{tournament.data.storeAddress}</span>
                                </div>
                            )}

                            {tournament.data.equipmentSource && (
                                <div className="flex justify-between">
                                    <span>Sumber Peralatan</span>
                                    <span className="text-right">{tournament.data.equipmentSource ? 'Sendiri' : 'Panitia'}</span>
                                </div>
                            )}

                            {tournament.data.equipmentOwned && (
                                <div>
                                    <p className="font-medium">Peralatan yang Dibawa:</p>
                                    <ul className="list-disc list-inside pl-4 mt-1">
                                        {JSON.parse(tournament.data.equipmentOwned).map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {tournament.data.isVerified === false && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md mt-6">
                            <h2 className="text-lg font-semibold">Pendaftaran Anda Belum Diverifikasi</h2>
                            <p>Silakan tunggu konfirmasi dari panitia.</p>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="mt-4">Batalkan pendaftaran</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi pembatalan?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Jika anda membatalkan pendaftaran, semua data yang terkait dengan pendaftaran ini akan dihapus dan tidak dapat dipulihkan.
                                            apabila anda yakin ingin melanjutkan, silakan klik tombol "Lanjutkan" di bawah ini.
                                            <br />
                                            <br />
                                            Jika anda sudah melakukan pembayaran, silakan hubungi panitia untuk meminta pengembalian dana.
                                            <br />
                                            Apakah anda yakin ingin melanjutkan?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deletMutation(tournament?.data?.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                    {tournament.data.isVerified === true && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-md shadow-md mt-6">
                            <h2 className="text-lg font-semibold">Pendaftaran Anda Telah Diverifikasi</h2>
                            <p>Silakan lanjutkan ke pembayaran.</p>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}