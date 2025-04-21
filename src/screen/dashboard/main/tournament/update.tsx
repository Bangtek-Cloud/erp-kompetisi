import { useState, useEffect } from "react";
import { createTournament, getTournamentById, updateTournament } from "@/services/tournament";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllEvents } from "@/services/event";
import { IEvent } from "@/types/event";
import useAuthStore from "@/store/feature/authStand";

interface TournamentFormProps {
    actionType: "create" | "update";
}

export default function TournamentUpdatePage({ actionType }: TournamentFormProps) {
    const { tournamentId } = useParams<{ tournamentId?: string }>();
    const { accessToken } = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [rules, setRules] = useState<string[]>([""]);
    const [disabled, setDisabled] = useState(true);
    const [prizes, setPrizes] = useState<{ title: string; value: string }[]>([{ title: "", value: "" }]);
    const [prices, setPrices] = useState<{ key: number; description: string; value: string; amount: number }[]>([{ key: 1, value: "", amount: 0, description: "" }]);
    const [usingLogoPrice, setUsingLogoPrice] = useState(0);
    const [status, setStatus] = useState<"UPCOMING" | "ONGOING" | "COMPLETE">("UPCOMING");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventId, setEventId] = useState("");


    useEffect(() => {
        if (actionType === "update" && tournamentId) {
            const fetchTournamentData = async () => {
                const tournament = await getTournamentById(tournamentId, accessToken || "");
                if (!tournament) return;

                const datas = tournament.data;
                setName(datas.name);
                setEventId(datas.eventId);
                setDescription(datas.description);
                setLocation(datas.location);
                setStartDate(datas.startDate);
                setEndDate(datas.endDate);
                setMaxParticipants(datas.maxParticipants);
                setRules(datas.rules || []);
                setPrizes(datas.prize || []);
                setPrices(datas.price || []);
                setStatus(datas.status || "UPCOMING");
                setDisabled(datas.disabled || false);
                setUsingLogoPrice(datas.usingLogoPrice || 0);
                setLoading(false)
            };
            fetchTournamentData();
        } else {
            setLoading(false)
        }
    }, [tournamentId, actionType, accessToken]);

    const { data: Events, isFetching, error } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await getAllEvents(accessToken || "");
            if (response?.error) {
                return new Error(response.error);
            }
            if (response?.success) {
                return response.data;
            }
            return [];
        }
    })

    const handleCreateOrUpdate = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const tournamentData = {
            name,
            description,
            startDate,
            endDate,
            maxParticipants,
            location,
            rules,
            disabled,
            status,
            eventId,
            prize: prizes,
            price: prices,
            usingLogoPrice,
        };

        try {
            if (!name || !description || !location || !startDate || !endDate || !rules.length || !prizes.length || !prices.length) {
                toast.error("Semua field harus diisi");
                setIsSubmitting(false);
                return;
            }
            if (actionType === "update" && !tournamentId) {
                toast.error("ID Turnamen tidak ditemukan");
                setIsSubmitting(false);
                return;
            }
            if (actionType === "create") {
                const response = await createTournament(accessToken as string, tournamentData);
                if (response.error) {
                    toast.error(response.error);
                    setIsSubmitting(false);
                    return;
                } else {
                    toast.success("Turnamen berhasil dibuat");
                    queryClient.invalidateQueries({ queryKey: ["tournaments"] });
                    navigate("/apps/tournament");
                }
            } else {
                const response = await updateTournament(accessToken as string, tournamentId as string, tournamentData);
                if (response.error) {
                    toast.error(response.error);
                    setIsSubmitting(false);
                    return;
                } else {
                    toast.success("Turnamen berhasil diperbarui");
                    queryClient.invalidateQueries({ queryKey: ["tournaments"] });
                    navigate("/apps/tournament");
                }
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat memperbarui / membuat turnamen");
            setIsSubmitting(false);
        }
        setIsSubmitting(false);
    };

    if (!accessToken) {
        return <div className="text-center">Loading...</div>;
    }

    if (actionType === "update" && !tournamentId) {
        return <div className="text-center">ID Turnamen tidak ditemukan</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Gagal mendapatkan data event</p>
            </div>
        )
    }
    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        )
    }
    if (!accessToken) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        )
    }
    if(Events.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Tidak ada event yang ditemukan</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <ScrollArea className="h-full mt-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <Button variant="outline" onClick={() => navigate("/apps/tournament")}>
                            <MoveLeft className="mr-2" />
                            Kembali ke Daftar Turnamen
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">
                            {actionType === "create" ? "Buat Turnamen Baru" : "Update Turnamen"}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Form untuk membuat atau memperbarui turnamen
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8 gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label className="mb-4">Acara</Label>
                                <Select value={eventId} onValueChange={(value) => setEventId(value)} defaultValue={eventId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Events.map((event: IEvent) => (
                                                <SelectItem key={event.id} value={event.id}>
                                                    {event.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="name">Nama Turnamen</Label>
                                <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Turnamen" />
                            </div>
                            <div className="grid w-full items-center gap-2 mt-4">
                                <Label htmlFor="name">Deskripsi Turnamen</Label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="font-bold text-lg mt-4">
                                Detail Turnamen
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-2 mt-4 space-y-4">
                                <div>
                                    <Label>Mulai Turnamen</Label>
                                    <Input type="datetime-local" value={moment(startDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setStartDate(new Date(e.target.value))} />
                                </div>
                                <div>
                                    <Label>Selesai Turnamen</Label>
                                    <Input type="datetime-local" value={moment(endDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setEndDate(new Date(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-2 mt-4">
                                <Label>Jumlah Maksimal Turnamen</Label>
                                <Input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value))} placeholder="0 untuk tidak terbatas" />
                            </div>

                            <div className="grid w-full items-center gap-2 mt-4">
                                <Label>Lokasi Turnamen</Label>
                                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lokasi" />
                            </div>
                            <Separator className="my-4" />
                            <div className="bg-muted-foreground text-secondary p-4 rounded-md mt-4">
                                <div className="mb-4 font-bold">Syarat & Ketentuan Turnamen</div>
                                {rules.map((rule, index) => (
                                    <div className="mb-8">
                                        <div key={index}>
                                            <div className="grid w-full items-center gap-2 mt-4">
                                                <Label htmlFor={`rule-${index}`}>Paragraf {index + 1}</Label>
                                                <div className="flex gap-4">
                                                    <Input value={rule} onChange={(e) => {
                                                        const newRules = [...rules];
                                                        newRules[index] = e.target.value;
                                                        setRules(newRules);
                                                    }} placeholder={`Paragraf ${index + 1}`} />
                                                    <Button variant="destructive" onClick={() => {
                                                        const newRules = rules.filter((_, i) => i !== index);
                                                        setRules(newRules);
                                                    }}><Trash2 /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button className="dark:text-secondary text-black" variant={'outline'} onClick={() => setRules([...rules, ""])}><Plus /> Tambah Aturan</Button>

                                <Separator className="my-4" />
                                <div className="mb-4 font-bold">Pengaturan Harga</div>
                                {prices.map((price, index) => (
                                    <div key={index} className="flex gap-4 mt-2 mb-4">
                                        <div className="grid w-full items-center gap-2 mt-4">
                                            <Label htmlFor={`rule-${index}`}>Paket {index + 1}</Label>
                                            <Input
                                                value={price.value}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const updatedPrices = [...prices];
                                                    updatedPrices[index].value = e.target.value;
                                                    setPrices(updatedPrices);
                                                }}
                                                placeholder={`Nama Paket ${index + 1}`}
                                            />
                                        </div>
                                        <div className="grid w-full items-center gap-2 mt-4">
                                            <Label htmlFor={`rule-${index}`}>Deskripsi {index + 1}</Label>
                                            <Input
                                                type="text"
                                                value={price.description}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const updatedPrices = [...prices];
                                                    updatedPrices[index].description = e.target.value;
                                                    setPrices(updatedPrices);
                                                }}
                                                placeholder={`Deskripsi ${index + 1}`}
                                            />
                                        </div>
                                        <div className="grid w-full items-center gap-2 mt-4">
                                            <Label htmlFor={`rule-${index}`}>Harga {index + 1}</Label>
                                            <Input
                                                type="number"
                                                value={price.amount}
                                                min={10}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const updatedPrices = [...prices];
                                                    updatedPrices[index].amount = parseInt(e.target.value);
                                                    setPrices(updatedPrices);
                                                }}
                                                placeholder={`Jumlah Harga ${index + 1}`}
                                            />
                                        </div>
                                        <div className="flex items-center mt-4">
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    const updatedPrices = prices.filter((_, i) => i !== index);
                                                    setPrices(updatedPrices);
                                                }}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button className="dark:text-secondary text-black" variant={'outline'} onClick={() => setPrices([...prices, { key: prices.length + 1, value: "", amount: 0, description: "" }])}>Tambah Harga</Button>
                                <div className="mt-4">
                                    <label>Biaya tambahan menggunakan logo</label>
                                    <Input value={usingLogoPrice} type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsingLogoPrice(parseInt(e.target.value))} placeholder="Masukkan biaya tambahan untuk logo" />
                                </div>

                                <Separator className="my-4" />
                                <div className="mb-4 font-bold">Pengaturan Hadiah</div>
                                {prizes.map((prize, index) => (
                                    <div key={index} className="flex gap-4 mt-2 mb-4">
                                        <Input
                                            value={prize.title}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const updatedPrizes = [...prizes];
                                                updatedPrizes[index].title = e.target.value;
                                                setPrizes(updatedPrizes);
                                            }}
                                            placeholder={`Judul Hadiah ${index + 1}, contoh: Juara ${index + 1}`}
                                        />
                                        <Input
                                            value={prize.value}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const updatedPrizes = [...prizes];
                                                updatedPrizes[index].value = e.target.value;
                                                setPrizes(updatedPrizes);
                                            }}
                                            placeholder={`Hadiah ${index + 1}, contoh: Uang tunai Rp1.000.000`}
                                        />
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                const updatedPrizes = prizes.filter((_, i) => i !== index);
                                                setPrizes(updatedPrizes);
                                            }}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                ))}
                                <Button className="dark:text-secondary text-black" variant={'outline'} onClick={() => setPrizes([...prizes, { title: "", value: "" }])}>Tambah Hadiah</Button>
                            </div>
                            <div className="grid w-full items-center gap-2 mt-4">
                                <Label>Event aktif ?</Label>
                                <div className="flex items-center space-x-2">
                                    <Switch id="eventDisable" onCheckedChange={() => setDisabled(!disabled)} checked={disabled ? false : true} />
                                    <Label htmlFor="eventDisable">Event ini {disabled ? 'Dimatikan' : 'Aktif'}</Label>
                                </div>
                            </div>
                            <div className="grid w-full items-center gap-2 mt-4">
                                <label>Status</label>
                                <select
                                    value={status}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as "UPCOMING" | "ONGOING" | "COMPLETE")}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="UPCOMING">Akan Datang</option>
                                    <option value="ONGOING">Sedang Berjalan</option>
                                    <option value="COMPLETE">Selesai</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isSubmitting} className="w-full" onClick={handleCreateOrUpdate}>{isSubmitting ? 'Loading...' : actionType === "create" ? "Buat Turnamen" : "Perbarui Turnamen"}</Button>
                    </CardFooter>
                </Card>
            </ScrollArea>
        </div >
    );
}
