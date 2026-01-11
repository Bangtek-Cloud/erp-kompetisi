import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { createParticipant, getTournamentById } from "@/services/tournament";
import { useNavigate, useParams } from "react-router";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Terminal, Trash2, ChevronRight, ChevronLeft, Check } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { rupiahFormat, cn } from "@/lib/utils";
import { toast } from "sonner";
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder";

const STEPS = ["Informasi", "Peralatan", "Paket", "Konfirmasi"];

export default function RegisterForTournament() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { tournamentId: id } = useParams();
    const { user, accessToken } = useAuthStore();

    // UI State
    const [currentStep, setCurrentStep] = useState(0);
    const [preview, setPreview] = useState<string | null>(null);
    const [openRule, setOpenRule] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const { isPending, data: tournament } = useQuery({
        queryKey: ['tournament', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await getTournamentById(id as string, accessToken || "");
            if (response.error) throw new Error(response.error);
            return response.data;
        },
        placeholderData: keepPreviousData,
        enabled: !!id,
    });

    useEffect(() => {
        if (!formData.logo) return;
        const objectUrl = URL.createObjectURL(formData.logo);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [formData.logo]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && !file.type.startsWith("image/")) {
            toast.error("Format file harus gambar!");
            return;
        }
        setFormData((prev) => ({ ...prev, logo: file }));
    };

    const nextStep = () => {
        if (validateCurrentStep()) setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const validateCurrentStep = () => {
        if (currentStep === 0) {
            if (!formData.playerType || !formData.storeAddress || !formData.phoneNo) {
                toast.warning("Mohon lengkapi data diri");
                return false;
            }
            if (formData.playerType !== "INDIVIDUAL" && !formData.storeName) {
                toast.warning("Nama instansi/toko wajib diisi");
                return false;
            }
        }
        if (currentStep === 1) {
            if (!formData.shirtSize) {
                toast.warning("Pilih ukuran baju");
                return false;
            }
        }
        if (currentStep === 2) {
            if (formData.optionPrice === 0) {
                toast.warning("Pilih salah satu paket");
                return false;
            }
        }
        return true;
    };

    const submitForm = async () => {
        if (!acceptTerms) return toast.error("Anda harus menyetujui syarat & ketentuan");

        setIsSubmitting(true);
        const selectedPackage = tournament?.price.find((p: any) => p.key === formData.optionPrice);
        const totalPrice = (selectedPackage?.amount || 0) + (formData.usingLogo === "true" ? (tournament?.usingLogoPrice || 0) : 0);

        const data = new FormData();
        data.append("playerType", formData.playerType);
        data.append('equipmentOwned', JSON.stringify(formData.equipmentOwned));
        data.append('shirtSize', formData.shirtSize);
        data.append("equipmentSource", formData.equipmentSource);
        data.append("usingLogo", formData.usingLogo);
        data.append("price", totalPrice.toString());
        data.append('userId', user?.id || "");
        data.append('phoneNo', formData.phoneNo);
        data.append("storeAddress", formData.storeAddress);
        data.append("storeName", formData.playerType === "INDIVIDUAL" ? "" : formData.storeName);
        data.append("optionPrice", formData.optionPrice.toString());
        if (formData.logo && formData.usingLogo === "true") data.append("logo", formData.logo);

        const response = await createParticipant(accessToken || "", id as string, data);
        if (response.error) {
            toast.error(response.error);
            if (response.alreadyRegistered) navigate('/apps/tournament/confirm/' + id);
        } else {
            toast.success("Pendaftaran berhasil!");
            queryClient.invalidateQueries({ queryKey: ['pendingTransaction'] });
            navigate('/apps/tournament/confirm/' + id);
        }
        setIsSubmitting(false);
    };

    if (isPending) return <LoadingSolder />;
    if (!tournament) return <div>Data tidak ditemukan</div>;

    const getNameLabel = () => formData.playerType === "INDIVIDUAL" ? "Peserta" : "Instansi/Toko";

    return (
        <main className="container mx-auto p-4 md:p-8 max-w-4xl">
            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-8">
                {STEPS.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className="flex flex-col items-center flex-1">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                                currentStep >= idx ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted text-muted-foreground"
                            )}>
                                {currentStep > idx ? <Check className="w-6 h-6" /> : idx + 1}
                            </div>
                            <span className={cn("text-xs mt-2 font-medium", currentStep >= idx ? "text-primary" : "text-muted-foreground")}>
                                {step}
                            </span>
                        </div>
                        {idx !== STEPS.length - 1 && (
                            <div className={cn("h-[2px] w-full flex-1 mx-2 mb-6", currentStep > idx ? "bg-primary" : "bg-muted")} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <Card className="shadow-lg border-none">
                <CardContent className="p-6">
                    {/* Step 1: Informasi */}
                    {currentStep === 0 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold">Informasi Dasar</h3>
                            <div>
                                <Label>Tipe Peserta</Label>
                                <Select value={formData.playerType} onValueChange={(v) => setFormData(p => ({ ...p, playerType: v }))}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INDIVIDUAL">Individu</SelectItem>
                                        <SelectItem value="TEAM">Tim / Klub</SelectItem>
                                        <SelectItem value="STORE">Toko / Brand</SelectItem>
                                        <SelectItem value="INSTITUTION">Institusi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {formData.playerType && formData.playerType !== "INDIVIDUAL" && (
                                <div>
                                    <Label>Nama {getNameLabel()}</Label>
                                    <Input
                                        className="mt-1"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData(p => ({ ...p, storeName: e.target.value }))}
                                    />
                                </div>
                            )}
                            <div>
                                <Label>Alamat Lengkap</Label>
                                <Input
                                    className="mt-1"
                                    value={formData.storeAddress}
                                    onChange={(e) => setFormData(p => ({ ...p, storeAddress: e.target.value }))}
                                />
                            </div>
                            <div>
                                <Label>Nomor WhatsApp</Label>
                                <Input
                                    type="tel"
                                    className="mt-1"
                                    placeholder="0812..."
                                    value={formData.phoneNo}
                                    onChange={(e) => setFormData(p => ({ ...p, phoneNo: e.target.value }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Peralatan */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold">Peralatan & Atribut</h3>
                            <div>
                                <Label>Ukuran Baju</Label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                                        <Button
                                            key={size}
                                            variant={formData.shirtSize === size ? "default" : "outline"}
                                            onClick={() => setFormData(p => ({ ...p, shirtSize: size }))}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <Label>Peralatan</Label>
                                <Select value={formData.equipmentSource} onValueChange={(v) => setFormData(p => ({ ...p, equipmentSource: v }))}>
                                    <SelectTrigger className="mt-2 bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Bawa alat sendiri</SelectItem>
                                        <SelectItem value="false">Disediakan panitia</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formData.equipmentSource === "true" && (
                                    <div className="mt-4 space-y-2">
                                        {formData.equipmentOwned.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input
                                                    placeholder="Contoh: Raket, Sepatu"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const newArr = [...formData.equipmentOwned];
                                                        newArr[idx] = e.target.value;
                                                        setFormData(p => ({ ...p, equipmentOwned: newArr }));
                                                    }}
                                                />
                                                <Button variant="ghost" size="icon" onClick={() => setFormData(p => ({ ...p, equipmentOwned: p.equipmentOwned.filter((_, i) => i !== idx) }))}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" className="w-full" onClick={() => setFormData(p => ({ ...p, equipmentOwned: [...p.equipmentOwned, ""] }))}>
                                            <Plus className="w-4 h-4 mr-2" /> Tambah Alat
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {formData.playerType !== "INDIVIDUAL" && (
                                <div>
                                    <Label>Logo {getNameLabel()}</Label>
                                    <Input type="file" className="mt-1" onChange={handleFileChange} />
                                    {preview && <img src={preview} className="mt-2 w-24 h-24 object-contain border rounded" alt="Preview" />}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Paket */}
                    {currentStep === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold">Pilih Paket Pendaftaran</h3>
                            <div className="grid gap-4">
                                {tournament.price.map((pkg: any) => (
                                    <div
                                        key={pkg.key}
                                        onClick={() => setFormData(p => ({ ...p, optionPrice: pkg.key }))}
                                        className={cn(
                                            "p-4 border-2 rounded-xl cursor-pointer transition-all",
                                            formData.optionPrice === pkg.key ? "border-primary bg-primary/5 shadow-md" : "border-muted hover:border-primary/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-lg">{pkg.value}</p>
                                                <p className="text-sm text-muted-foreground">{pkg.description}</p>
                                            </div>
                                            <p className="font-bold text-primary">{rupiahFormat(pkg.amount)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Konfirmasi */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold">Konfirmasi Akhir</h3>
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Ringkasan Pendaftaran</AlertTitle>
                                <AlertDescription>
                                    <div className="mt-2 space-y-1">
                                        <p>Nama: <strong>{user?.name}</strong></p>
                                        <p>Paket: <strong>{tournament.price.find((p: any) => p.key === formData.optionPrice)?.value}</strong></p>
                                        <p>Total Bayar: <strong className="text-primary text-lg">
                                            {rupiahFormat((tournament.price.find((p: any) => p.key === formData.optionPrice)?.amount || 0))}
                                        </strong></p>
                                    </div>
                                </AlertDescription>
                            </Alert>

                            <div className="flex items-start space-x-3 p-4 border rounded-lg">
                                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(v) => setAcceptTerms(!!v)} />
                                <div className="grid gap-1.5 leading-none">
                                    <label htmlFor="terms" className="text-sm font-medium">
                                        Saya menyetujui syarat dan ketentuan.
                                    </label>
                                    <button onClick={() => setOpenRule(true)} className="text-xs text-primary underline text-left">
                                        Baca aturan turnamen
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0 || isSubmitting}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
                        </Button>

                        {currentStep < STEPS.length - 1 ? (
                            <Button onClick={nextStep}>
                                Lanjut <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                className="px-8"
                                disabled={!acceptTerms || isSubmitting}
                                onClick={submitForm}
                            >
                                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Modal Rules */}
            <AlertDialog open={openRule} onOpenChange={setOpenRule}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Syarat & Ketentuan</AlertDialogTitle>
                        <AlertDialogDescription className="max-h-60 overflow-y-auto">
                            <ul className="list-disc pl-4 space-y-2">
                                {tournament.rules.map((r: string, i: number) => <li key={i}>{r}</li>)}
                            </ul>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => { setAcceptTerms(true); setOpenRule(false); }}>
                            Saya Mengerti
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}