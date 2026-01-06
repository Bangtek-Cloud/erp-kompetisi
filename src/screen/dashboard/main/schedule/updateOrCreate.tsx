import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createEvent, getEventById, updateEvent } from "@/services/event";
import { getAllBank } from "@/services/bank";
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder";
import { IBankTable } from "@/types/input/bank";

interface EventUpdateOrCreateProps {
    actionType: "create" | "update";
}

// Skema validasi menggunakan zod
const EventSchema = z.object({
    name: z.string().min(1, "Nama acara harus diisi"),
    description: z.string().min(1, "Deskripsi acara harus diisi"),
    location: z.string().min(1, "Lokasi acara harus diisi"),
    startDate: z.string().refine((val) => moment(val).isValid(), {
        message: "Tanggal mulai tidak valid",
    }),
    endDate: z.string().refine((val) => moment(val).isValid(), {
        message: "Tanggal selesai tidak valid",
    }),
    isActive: z.boolean(),
    rules: z.array(z.string().min(1, "Aturan tidak boleh kosong")),
    logo: z.any().nullable(),
    bankId: z.string().min(1, "Pilih bank untuk acara"),
});

type EventFormData = z.infer<typeof EventSchema>;

export default function EventUpdateOrCreate({ actionType }: EventUpdateOrCreateProps) {
    const { eventId } = useParams<{ eventId?: string }>();
    const { accessToken } = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [preview, setPreview] = useState<string | null>(null);

    // Ambil daftar bank
    const { data: banks, isLoading: isBanksLoading } = useQuery({
        queryKey: ["banks"],
        queryFn: async () => {
            const response = await getAllBank(accessToken || "");
            if (response.success) return response.data;
            throw new Error(response.error || "Gagal mengambil data bank");
        },
        enabled: !!accessToken,
    });

    // Form menggunakan react-hook-form
    const form = useForm<EventFormData>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            name: "",
            description: "",
            location: "",
            startDate: moment().format("YYYY-MM-DDTHH:mm"),
            endDate: moment().format("YYYY-MM-DDTHH:mm"),
            isActive: true,
            rules: [""],
            logo: null,
            bankId: "",
        },
    });

    // Ambil data event untuk mode update
    const { data: event, isLoading: isEventLoading } = useQuery({
        queryKey: ["event", eventId],
        queryFn: async () => {
            if (!eventId) throw new Error("ID Acara tidak ditemukan");
            const response = await getEventById(eventId, accessToken || "");
            if (response.success) return response.data;
            throw new Error(response.error || "Gagal mengambil data acara");
        },
        enabled: actionType === "update" && !!eventId && !!accessToken && !!banks,
    });

    // Isi form dengan data event saat mode update
    useEffect(() => {
        if (actionType === "update" && event) {
            form.reset({
                name: event.name,
                description: event.description,
                location: event.location,
                startDate: moment(event.startDate).format("YYYY-MM-DDTHH:mm"),
                endDate: moment(event.endDate).format("YYYY-MM-DDTHH:mm"),
                isActive: event.isActive ?? true,
                rules: JSON.parse(event.rules) || [""],
                logo: null,
                bankId: event.bankId || "",
            });
            setPreview(import.meta.env.VITE_BASE_S3 + event.eventLogoUrl);
        }
    }, [event, form, actionType]);

    // Handle perubahan file logo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Format file tidak valid! Silakan unggah gambar.");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Ukuran file terlalu besar! Maksimal 10MB.");
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onloadedmetadata = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const size = Math.min(img.width, img.height);
                canvas.width = 200;
                canvas.height = 200;

                if (ctx) {
                    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 200, 200);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const newFile = new File([blob], file.name, { type: "image/png" });
                            form.setValue("logo", newFile);
                            setPreview(URL.createObjectURL(newFile));
                        }
                    }, "image/png");
                }
            };
        } else {
            form.setValue("logo", null);
            setPreview(null);
        }
    };

    // Mutasi untuk create atau update event
    const { mutate: submitEvent, isPending: isSubmitting } = useMutation({
        mutationFn: async (data: EventFormData) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("location", data.location);
            formData.append("startDate", data.startDate);
            formData.append("endDate", data.endDate);
            formData.append("isActive", data.isActive.toString());
            formData.append("rules", JSON.stringify(data.rules));
            formData.append("bankId", data.bankId);
            if (data.logo) {
                formData.append("logo", data.logo);
            }

            if (actionType === "create") {
                const response = await createEvent(formData, accessToken || "");
                if (!response.success) throw new Error(response.error || "Gagal membuat acara");
                return response;
            } else {
                if (!eventId) throw new Error("ID Acara tidak ditemukan");
                const response = await updateEvent(eventId, formData, accessToken || "");
                if (!response.success) throw new Error(response.error || "Gagal memperbarui acara");
                return response;
            }
        },
        onSuccess: (response) => {
            toast.success(response.message || actionType === "create" ? "Acara berhasil dibuat" : "Acara berhasil diperbarui");
            queryClient.invalidateQueries({ queryKey: ["events"] });
            navigate("/apps/schedule");
        },
        onError: (error) => {
            toast.error(error.message || "Terjadi kesalahan");
        },
    });

    // Handle submit form
    const onSubmit = (data: EventFormData) => {
        submitEvent(data);
    };

    // Tambah aturan baru
    const addRule = () => {
        form.setValue("rules", [...form.getValues("rules"), ""]);
    };

    // Hapus aturan
    const removeRule = (index: number) => {
        const newRules = form.getValues("rules").filter((_, i) => i !== index);
        form.setValue("rules", newRules);
    };

    if (!accessToken) {
        return (
            <div className="text-center">
                Loading...
            </div>
        );
    }

    if (actionType === "update" && !eventId) {
        return (
            <div className="text-center">
                ID Acara tidak ditemukan
            </div>
        );
    }

    if (isEventLoading || isBanksLoading) {
        return <LoadingSolder />;
    }

    return (
        <div className="container mx-auto p-6">
            <ScrollArea className="h-full mt-4">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="outline" onClick={() => navigate("/apps/schedule")}>
                        <MoveLeft className="mr-2" />
                        Kembali ke Daftar Acara
                    </Button>
                </div>
                <Card>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    {actionType === "create" ? "Buat Acara Baru" : "Update Acara"}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    Form untuk membuat atau memperbarui Acara
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Acara</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Acara" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi Acara</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    placeholder="Deskripsi"
                                                    className="w-full p-2 border rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="font-bold text-lg">Detail Acara</div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mulai Acara</FormLabel>
                                                <FormControl>
                                                    <Input type="datetime-local" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Selesai Acara</FormLabel>
                                                <FormControl>
                                                    <Input type="datetime-local" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lokasi Acara</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Lokasi" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bankId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bank untuk Acara</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={"Pilih Bank " + field.value} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {banks?.map((bank: IBankTable) => (
                                                        <SelectItem key={bank.id} value={bank.id}>
                                                            {bank.BankType} - {bank.BankName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            <FormDescription>Saat ini :
                                                {(() => {
                                                    const bank = banks?.find((b: IBankTable | undefined) =>
                                                        !!b && b.id === event?.bankId
                                                    );

                                                    return bank
                                                        ? `${bank.BankType} - ${bank.BankName}`
                                                        : "Tidak ada bank terpilih";
                                                })()}


                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FormLabel>Logo (harus rasio 1:1)</FormLabel>
                                    <Input
                                        className="mt-2 block w-full border border-gray-300 rounded p-2"
                                        id="logo"
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    <span className="text-xs font-light">Ukuran gambar maksimal 10MB</span>
                                    {preview && (
                                        <div className="mt-4 flex justify-center">
                                            <img src={preview} alt="Preview Logo" className="w-40 h-40 object-cover rounded-md border" />
                                        </div>
                                    )}
                                </div>
                                <Separator className="my-4" />
                                <div className="bg-muted-foreground text-secondary p-4 rounded-md">
                                    <div className="mb-4 font-bold">Syarat & Ketentuan Acara</div>
                                    {form.watch("rules").map((_, index) => (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={`rules.${index}`}
                                            render={({ field }) => (
                                                <FormItem className="mb-8">
                                                    <FormLabel>Paragraf {index + 1}</FormLabel>
                                                    <div className="flex gap-4">
                                                        <FormControl>
                                                            <Input placeholder={`Paragraf ${index + 1}`} {...field} />
                                                        </FormControl>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => removeRule(index)}
                                                        >
                                                            <Trash2 />
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <Button type="button" variant="outline" onClick={addRule}>
                                        <Plus /> Tambah Aturan
                                    </Button>
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                                <FormLabel>Event aktif?</FormLabel>
                                                <div className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <Label>Event ini {field.value ? "Aktif" : "Dimatikan"}</Label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    disabled={isSubmitting}
                                    className="w-full mt-8"
                                    type="submit"
                                >
                                    {isSubmitting
                                        ? "Loading..."
                                        : actionType === "create"
                                            ? "Buat Acara"
                                            : "Perbarui Acara"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </ScrollArea>
        </div>
    );
}