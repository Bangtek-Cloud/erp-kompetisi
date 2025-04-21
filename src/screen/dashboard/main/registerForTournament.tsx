import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { createParticipant, getTournamentById } from "@/services/tournament";
import { useNavigate, useParams } from "react-router";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Plus, Terminal, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { rupiahFormat } from "@/lib/utils";
import { toast } from "sonner";
import useAuthStore from "@/store/feature/authStand";

export default function RegisterForTournament() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { tournamentId: id } = useParams();
    const { user, accessToken } = useAuthStore();
    const formRef = useRef(null);

    const { isPending, error, data: tournament } = useQuery({
        queryKey: ['tournament', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await getTournamentById(id as string, accessToken || "");
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data;
        },
        placeholderData: keepPreviousData,
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    const [formData, setFormData] = useState({
        playerType: "",
        equipmentSource: "false",
        usingLogo: "true",
        logo: null as File | null,
        storeName: "",
        equipmentOwned: [""],
        storeAddress: "",
        optionPrice: 0,
        shirtSize: '',
        phoneNo: ''
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [openRule, setOpenRule] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (!formData.logo) return;

        const objectUrl = URL.createObjectURL(formData.logo);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [formData.logo]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (file) {
            // Validasi format file (hanya gambar)
            if (!file.type.startsWith("image/")) {
                alert("Format file tidak valid! Silakan unggah gambar.");
                return;
            }

            // Langsung simpan file tanpa cropping atau resize
            setFormData((prev) => ({ ...prev, logo: file }));
        } else {
            setFormData((prev) => ({ ...prev, logo: null }));
        }
    };


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit handler triggered");

        try {
            await submitForm();
        } catch (error) {
            console.error("Error in form submission:", error);
        }
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        const prices = tournament?.price.find((priceOption: any) => priceOption.key === formData.optionPrice).amount;
        const usingLogoPrice = tournament?.usingLogoPrice || 0;
        const totalPrice = formData.usingLogo === "true" ? prices + usingLogoPrice : prices;
        const data = new FormData();
        data.append("playerType", formData.playerType);
        data.append('equipmentOwned', JSON.stringify(formData.equipmentOwned || [""]))
        data.append('shirtSize', formData.shirtSize)
        data.append("equipmentSource", formData.equipmentSource);
        data.append("usingLogo", formData.usingLogo);
        data.append("price", totalPrice.toString());
        data.append('userId', user?.id || "");
        data.append('phoneNo', formData.phoneNo)
        data.append("storeAddress", formData.storeAddress);
        if (formData.playerType === "INDIVIDUAL") {
            data.append("storeName", "");
        } else {
            data.append("storeName", formData.storeName);
        }

        if (formData.logo) {
            if (formData.usingLogo === "false") {
                data.append("logo", "");
            } else {
                data.append("logo", formData.logo);
            }
        } else {
            console.log("No logo to append");
            data.append("logo", "");
        }

        data.append("optionPrice", formData.optionPrice.toString());

        const response = await createParticipant(accessToken || "", id as string, data);
        if (response.error) {
            if (response.alreadyRegistered === true) {
                toast.error(response.error + ' kami akan mengarahkan anda ke halaman pembayaran');
                navigate('/apps/tournament/confirm/' + id);
                setIsSubmitting(false);
                return;
            } else {
                toast.error(response.error);
                setIsSubmitting(false);
                return;
            }
        }

        if (response.success) {
            toast.success("Pendaftaran berhasil! Silakan lanjutkan ke pembayaran.");


            queryClient.invalidateQueries({ queryKey: ['notificationsTournament'] });
            queryClient.invalidateQueries({ queryKey: ['pendingTransaction'] })
            navigate('/apps/tournament/confirm/' + id);
        }
        setIsSubmitting(false);
    };

    // Handle button click explicitly
    const handleButtonClick = () => {
        console.log("Button clicked");
        if (formRef.current) {
            console.log("Submitting form via ref");
            // @ts-ignore
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else {
            console.log("Form ref is null, attempting direct submission");
            submitForm();
        }
    };

    // Check if form is valid for submission
    const isFormValid = () => {
        // Basic validation - must have player type
        const valid =
            formData.playerType !== "" &&
            formData.optionPrice !== 0 &&
            formData.equipmentSource !== "" &&
            formData.phoneNo !== "" &&
            acceptTerms &&
            isSubmitting === false &&
            formData.storeAddress !== "" &&
            formData.shirtSize !== "" &&
            (formData.playerType === "INDIVIDUAL" || (formData.usingLogo !== "true" || (formData.usingLogo === "true" && formData.logo !== null))) &&
            (formData.playerType === "INDIVIDUAL" || (formData.storeName.trim() !== ""));

        return valid;
    };

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    if (!tournament) {
        return <div className="flex justify-center items-center h-screen">No tournament found</div>;
    }

    if (tournament.disabled) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Tournament is not open for registration</p>
            </div>
        );
    }

    const getName = (playerType: string) => {
        if (playerType === "INDIVIDUAL") {
            return "Peserta";
        } else if (playerType === "INSTITUTION") {
            return "Institusi";
        } else if (playerType === "ASSOCIATION") {
            return "Asosiasi";
        } else if (playerType === "STORE") {
            return "Toko";
        } else if (playerType === "BRAND") {
            return "Brand";
        } else if (playerType === "TEAM") {
            return "Tim";
        } else if (playerType === "ORGANIZATION") {
            return "Organisasi";
        } else if (playerType === "COMPANY") {
            return "Perusahaan";
        } else if (playerType === "ENTITY") {
            return "Entitas";
        } else if (playerType === "GROUP") {
            return "Grup";
        } else if (playerType === "CLUB") {
            return "Klub";
        } else if (playerType === "CORPORATION") {
            return "Korporasi";
        } else if (playerType === "PARTNERSHIP") {
            return "Kemitraan";
        } else if (playerType === "FIRM") {
            return "Firma";
        } else if (playerType === "AGENCY") {
            return "Agen";
        } else if (playerType === "GOVERNMENT") {
            return "Pemerintah";
        }
        return "Peserta";
    };


    return (
        <main className="md:min-h-[100vh] container mx-auto p-8">
            <div className="mb-20">
                <div className="w-full p-6 rounded-lg shadow-lg">
                    <Alert className="mb-4">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Anda mendaftarkan untuk acara {tournament.name}</AlertTitle>
                        <AlertDescription>
                            Acara dimulai pada {new Date(tournament.startDate).toLocaleDateString()} dan berakhir pada {new Date(tournament.endDate).toLocaleDateString()}.
                            <div>Lokasi di {tournament.location}</div>
                        </AlertDescription>
                    </Alert>
                    <h2 className="text-lg font-semibold mb-4">Form Pendaftaran</h2>
                    <div className="mb-4 bg-gray-100 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground mb-4">
                            Silakan isi form di bawah ini untuk mendaftar sebagai peserta. Pastikan semua informasi yang diberikan adalah benar dan akurat.
                            <br />
                            Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi panitia acara.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Catatan:</span> Pastikan Anda telah membaca dan memahami syarat dan ketentuan acara sebelum mendaftar.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <Label htmlFor="playerType">Tipe Peserta</Label>
                            <Select value={formData.playerType} onValueChange={(value) => setFormData((prev) => ({ ...prev, playerType: value }))}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Pilih tipe peserta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="INDIVIDUAL">Individu</SelectItem>
                                        <SelectItem value="INSTITUTION">Institusi</SelectItem>
                                        <SelectItem value="ASSOCIATION">Asosiasi</SelectItem>
                                        <SelectItem value="STORE">Toko</SelectItem>
                                        <SelectItem value="BRAND">Brand</SelectItem>
                                        <SelectItem value="TEAM">Tim</SelectItem>
                                        <SelectItem value="ORGANIZATION">Organisasi</SelectItem>
                                        <SelectItem value="COMPANY">Perusahaan</SelectItem>
                                        <SelectItem value="ENTITY">Entitas</SelectItem>
                                        <SelectItem value="GROUP">Grup</SelectItem>
                                        <SelectItem value="CLUB">Klub</SelectItem>
                                        <SelectItem value="CORPORATION">Korporasi</SelectItem>
                                        <SelectItem value="PARTNERSHIP">Kemitraan</SelectItem>
                                        <SelectItem value="FIRM">Firma</SelectItem>
                                        <SelectItem value="AGENCY">Agen</SelectItem>
                                        <SelectItem value="GOVERNMENT">Pemerintah</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.playerType !== "" && formData.playerType !== "INDIVIDUAL" && (
                            <>
                                <div className="mb-4">
                                    <Label htmlFor="storeName">Nama {getName(formData.playerType)}</Label>
                                    <Input
                                        className="mt-2"
                                        id="storeName"
                                        type="text"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, storeName: e.target.value }))}
                                    />
                                </div>
                            </>
                        )
                        }
                        {
                            formData.playerType !=='' && formData.playerType !== 'INDIVIDUAL' && (
                                <div className="mb-4">
                                    <Label htmlFor="logo">Logo {getName(formData.playerType)}</Label>
                                    <Input
                                        className="mt-2 block w-full border border-gray-300 rounded p-2"
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    {preview && (
                                        <div className="mt-4 flex justify-center">
                                            <img src={preview} alt="Preview Logo" className="w-40 h-40 object-cover rounded-md border" />
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        <div className="mb-4">
                            <Label htmlFor="storeAddress">Alamat {getName(formData.playerType)}</Label>
                            <Input
                                className="mt-2"
                                id="storeAddress"
                                type="text"
                                value={formData.storeAddress}
                                onChange={(e) => setFormData((prev) => ({ ...prev, storeAddress: e.target.value }))}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="storeAddress">Nomor Hp</Label>
                            <div className="flex items-center">
                                <Input
                                    className="mt-2 flex-1"
                                    id="phoneNo"
                                    type="tel"
                                    value={formData.phoneNo}
                                    placeholder="Masukkan nomor telepon"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, phoneNo: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="equipmentSource">Apakah Anda membawa peralatan sendiri</Label>
                            <Select value={formData.equipmentSource} onValueChange={(value) => setFormData((prev) => ({ ...prev, equipmentSource: value }))}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Pilih opsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="true">Saya membawa sendiri alat-alat</SelectItem>
                                        <SelectItem value="false">Tolong sediakan alat-alat</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {
                            formData.equipmentSource === "true"
                            &&
                            (
                                <Card className="bg-secondary">
                                    <CardContent>
                                        {formData.equipmentOwned.map((owned, index) => (
                                            <div className="mb-8" key={index}>
                                                <div>
                                                    <div className="grid w-full items-center gap-2 mt-4">
                                                        <Label htmlFor={`rule-${index}`}>Perlengkapan {index + 1}</Label>
                                                        <div className="flex gap-4">
                                                            <Input value={owned} onChange={(e) => {
                                                                const newRules = [...formData.equipmentOwned];
                                                                newRules[index] = e.target.value;
                                                                setFormData((prev) => ({ ...prev, equipmentOwned: newRules }));
                                                            }} placeholder={`Paragraf ${index + 1}`} />
                                                            <Button variant="destructive" onClick={() => {
                                                                const newRules = formData.equipmentOwned.filter((_, i) => i !== index);
                                                                setFormData((prev) => ({ ...prev, equipmentOwned: newRules }));
                                                            }}><Trash2 /></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            className="mb-10"
                                            variant={'outline'}
                                            type="button"
                                            onClick={() => setFormData((prev) => ({ ...prev, equipmentOwned: [...formData.equipmentOwned, ""] }))}
                                        >
                                            <Plus /> Tambah Perlengkapan
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        }


                        <div className="mb-4">
                            <Label htmlFor="price" className="mb-4">Pilih Paket</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                {tournament.price.map((priceOption: any) => {
                                    const isSelected = formData.optionPrice === priceOption.key;

                                    return (
                                        <Card
                                            key={priceOption.key}
                                            className={`cursor-pointer border ${isSelected ? "border-primary bg-primary/10" : "border-gray-300"}`}
                                            onClick={() => setFormData((prev) => ({ ...prev, optionPrice: priceOption.key }))}
                                        >
                                            <CardContent className="p-4">
                                                <div className="font-bold text-lg">{priceOption.value}</div>
                                                <p className="text-sm text-muted-foreground">{priceOption.description}</p>
                                                <p>{rupiahFormat(priceOption.amount)}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* {formData.playerType !== "" && formData.playerType !== "INDIVIDUAL" && (
                            <div className="mt-8 mb-8">
                                <Label htmlFor="usingLogo">{"Tampilkan logo tim saya (biaya tambahan)"}</Label>
                                <Select
                                    value={formData.usingLogo}
                                    onValueChange={(value) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            usingLogo: value,
                                            logo: value === "false" ? null : prev.logo
                                        }));
                                    }}
                                >
                                    <SelectTrigger className="w-full mt-2">
                                        <SelectValue placeholder="Pilih opsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">Ya, tampilkan logo saya</SelectItem>
                                            <SelectItem value="false">Tidak, terima kasih</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="text-xs font-medium mt-4">Biaya tambahan <span className="font-extrabold">{rupiahFormat(tournament.usingLogoPrice)}</span></div>
                            </div>
                        )} */}
                        
                    </form>

                    <div className="mb-4">
                        <Label htmlFor="shirtSize">Apa ukuran baju Anda ?</Label>
                        <Select value={formData.shirtSize} onValueChange={(value) => setFormData((prev) => ({ ...prev, shirtSize: value }))}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Pilih opsi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="S">S</SelectItem>
                                    <SelectItem value="M">M</SelectItem>
                                    <SelectItem value="L">L</SelectItem>
                                    <SelectItem value="XL">XL</SelectItem>
                                    <SelectItem value="XXL">XXL</SelectItem>
                                    <SelectItem value="XXXL">XXXL</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant={'destructive'} className="mt-4" onClick={() => setOpenRule(true)}>
                        Lihat syarat dan ketentuan acara
                    </Button>

                    <div className="flex items-center space-x-2 mt-8">
                        <Checkbox id="terms" className="border border-white" checked={acceptTerms} onCheckedChange={() => setAcceptTerms(!acceptTerms)} />
                        <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Saya sudah membaca dan menyetujui syarat dan ketentuan acara ini.
                        </Label>
                    </div>

                    <div className="my-8 text-xs">
                        <div>Anda mendaftar sebagai <span className="font-bold">{user?.name}</span> dengan email <span className="font-bold">{user?.email}</span></div>
                    </div>

                    <Card className="mt-4 p-4">
                        <div className="text-medium font-medium">Total Harga <span className="font-extrabold">

                            {rupiahFormat(
                                formData.optionPrice
                                    ? (tournament?.price.find((priceOption: any) => priceOption.key === formData.optionPrice)?.amount || 0) +
                                    (formData.usingLogo === "true" ? (tournament?.usingLogoPrice || 0) : 0)
                                    : 0
                            )}
                        </span> </div>
                    </Card>
                    <Button
                        className="w-full mt-10"
                        type="button"
                        onClick={handleButtonClick}
                        disabled={!isFormValid()}
                    >
                        {isSubmitting ? "Sedang mendaftarkan..." : "Daftar Sekarang"}
                    </Button>
                </div>
            </div>
            <AlertDialog open={openRule} onOpenChange={setOpenRule}>
                <AlertDialogContent className="max-h-[60vh] overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Aturan acara {tournament.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Silakan baca syarat dan ketentuan acara di bawah ini sebelum mendaftar.
                                    <br />
                                    Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi panitia acara.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Catatan:</span> Pastikan Anda telah membaca dan memahami syarat dan ketentuan acara sebelum mendaftar.
                                </p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Syarat dan Ketentuan</h2>
                        <ul className="list-disc list-inside">
                            {tournament.rules.map((rule: string, index: number) => (
                                <li key={index} className="mb-2">{rule}</li>
                            ))}
                        </ul>
                    </div>
                    {/* </ScrollArea> */}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
};