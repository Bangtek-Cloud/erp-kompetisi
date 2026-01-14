import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MoveLeft, Plus, SaveIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
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
import { Separator } from "@/components/ui/separator";
import { createEvent, getEventById, updateEvent } from "@/services/event";
import { getAllBank } from "@/services/bank";
import LoadingSolder from "@/components/loading-solder";
import { IBankTable } from "@/types/input/bank";

interface Props {
    actionType: "create" | "update";
}

/* ===================== SCHEMA ===================== */
const EventSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    startDate: z.string(),
    endDate: z.string(),
    isActive: z.boolean(),
    rules: z.array(z.string().min(1)),
    logo: z.any().nullable(),
    bankId: z.string().min(1),
});

type FormData = z.infer<typeof EventSchema>;

export default function EventUpdateOrCreate({ actionType }: Props) {
    const { eventId } = useParams<{ eventId?: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm<FormData>({
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

    /* ===================== DATA ===================== */
    const { data: banks, isLoading: isBankLoading } = useQuery({
        queryKey: ["banks"],
        queryFn: async () => (await getAllBank()).data,
    });

    const { data: event, isLoading: isEventLoading } = useQuery({
        queryKey: ["event", eventId],
        queryFn: async () => (await getEventById(eventId!)).data,
        enabled: actionType === "update" && !!eventId && !!banks,
    });

    useEffect(() => {
        if (event) {
            form.reset({
                name: event.name,
                description: event.description,
                location: event.location,
                startDate: moment(event.startDate).format("YYYY-MM-DDTHH:mm"),
                endDate: moment(event.endDate).format("YYYY-MM-DDTHH:mm"),
                isActive: event.isActive,
                rules: JSON.parse(event.rules),
                logo: null,
                bankId: event.bankId,
            });
            setPreview(event.eventLogoUrl);
        }
    }, [event, form]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    /* ===================== FILE ===================== */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("File harus berupa gambar");
            return;
        }

        const MAX_SIZE = 2 * 1024 * 1024; // 2MB
        if (file.size > MAX_SIZE) {
            toast.error("Ukuran gambar maksimal 2MB");
            return;
        }

        form.setValue("logo", file);
        setPreview(URL.createObjectURL(file));
    };


    /* ===================== SUBMIT ===================== */
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            const fd = new FormData();
            Object.entries(data).forEach(([k, v]) => {
                if (k === "rules") fd.append("rules", JSON.stringify(v));
                else if (k === "logo" && v) fd.append("logo", v);
                else fd.append(k, String(v));
            });

            return actionType === "create"
                ? createEvent(fd)
                : updateEvent(eventId!, fd);
        },
        onSuccess: () => {
            toast.success("Acara berhasil disimpan");
            queryClient.invalidateQueries({ queryKey: ["events"] });
            navigate("/apps/schedule");
        },
    });

    if (isBankLoading || isEventLoading) return <LoadingSolder />;

    /* ===================== UI ===================== */
    return (
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-6 nova-square-regular">
            <button className="flex text-primary text-xs" onClick={() => navigate("/apps/schedule")}>
                <MoveLeft size={18} className="mr-2" /> Kembali
            </button>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>
                        {actionType === "create" ? "Buat Acara" : "Edit Acara"}
                    </CardTitle>
                    <CardDescription>Ikuti langkah berikut</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* STEP INDICATOR */}
                    <div className="flex gap-4 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex-1">
                                <div
                                    className={`text-center text-sm ${step === s ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    Step {s}
                                </div>
                                <div
                                    className={`h-1 mt-2 rounded ${step >= s ? "bg-primary" : "bg-border"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    <Form {...form}>
                        <form
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && step !== 3) {
                                    e.preventDefault();
                                }
                            }}
                            onSubmit={form.handleSubmit((d) => {
                                if (step !== 3) return;
                                mutate(d);
                            })}
                        >


                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <FormField name="name" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Acara</FormLabel>
                                            <FormControl><Input className="border border-border" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="description" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi</FormLabel>
                                            <FormControl>
                                                <textarea className="w-full rounded-md border p-2 bg-background" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />

                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                    {preview && <img src={preview} className="w-32 h-32 rounded-lg border" />}
                                    <Separator className="my-6" />
                                    <div className="flex justify-end">
                                        <Button type="button" onClick={() => setStep(2)}>
                                            Lanjut <ArrowRight />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField name="startDate" control={form.control} render={({ field }) => (
                                            <FormItem><FormLabel>Mulai</FormLabel><Input type="datetime-local" {...field} /></FormItem>
                                        )} />
                                        <FormField name="endDate" control={form.control} render={({ field }) => (
                                            <FormItem><FormLabel>Selesai</FormLabel><Input type="datetime-local" {...field} /></FormItem>
                                        )} />
                                    </div>

                                    <FormField name="location" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Lokasi</FormLabel><Input {...field} /></FormItem>
                                    )} />

                                    <FormField name="bankId" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bank</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger><SelectValue placeholder="Pilih Bank" /></SelectTrigger>
                                                <SelectContent>
                                                    {banks?.map((b: IBankTable) => (
                                                        <SelectItem key={b.id} value={b.id}>
                                                            {b.BankType} - {b.BankName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )} />

                                    <Separator className="my-6" />
                                    <div className="flex justify-between">
                                        <Button type="button" variant={'outline'} onClick={() => setStep(1)}>
                                            <ArrowLeft /> Kembali
                                        </Button>
                                        <Button type="button" onClick={() => setStep(3)}>
                                            Lanjut  <ArrowRight />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    {form.watch("rules").map((_, i) => (
                                        <FormField key={i} name={`rules.${i}`} control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Aturan {i + 1}</FormLabel>
                                                <div className="flex gap-2">
                                                    <Input {...field} />
                                                    <Button type="button" variant="destructive" onClick={() =>
                                                        form.setValue("rules", form.getValues("rules").filter((_, x) => x !== i))
                                                    }>
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            </FormItem>
                                        )} />
                                    ))}
                                    <Button type="button" variant="outline" onClick={() =>
                                        form.setValue("rules", [...form.getValues("rules"), ""])
                                    }>
                                        <Plus /> Tambah Aturan
                                    </Button>

                                    <FormField name="isActive" control={form.control} render={({ field }) => (
                                        <FormItem className="flex items-center gap-4">
                                            <FormLabel>Event Aktif</FormLabel>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormItem>
                                    )} />

                                    <Separator className="my-6" />
                                    <div className="flex justify-between">
                                        <Button type="button" variant={'outline'} onClick={() => setStep(2)}>
                                            <ArrowLeft /> Kembali
                                        </Button>
                                        <Button type="submit" disabled={isPending}>
                                            <SaveIcon /> {isPending ? "Menyimpan..." : "Simpan"}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
