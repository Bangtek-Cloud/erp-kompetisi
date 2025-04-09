import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
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
import { createEvent, getEventById, updateEvent } from "@/services/event";

interface EventUpdateOrCreateProps {
    actionType: "create" | "update";
}

export default function EventUpdateOrCreate({ actionType }: EventUpdateOrCreateProps) {
    const { eventId } = useParams<{ eventId?: string }>();
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        startDate: new Date(),
        endDate: new Date(),
        isActive: true,
        rules: [''],
        logo: null as File | null,
    });

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

            // Resize gambar dengan canvas agar tetap 1:1
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const size = Math.min(img.width, img.height);
                canvas.width = 200; // Resize ke 200x200
                canvas.height = 200;

                if (ctx) {
                    ctx.drawImage(
                        img,
                        (img.width - size) / 2,
                        (img.height - size) / 2,
                        size,
                        size,
                        0,
                        0,
                        200,
                        200
                    );

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const newFile = new File([blob], file.name, {
                                type: "image/png",
                            });
                            setFormData((prev) => ({ ...prev, logo: newFile }));
                        }
                    }, "image/png");
                }
            };
        } else {
            setFormData((prev) => ({ ...prev, logo: null }));
        }
    };

    useEffect(() => {
        if (actionType === "update" && eventId) {
            const fetchTournamentData = async () => {
                const tournament = await getEventById(eventId, accessToken || "");
                if (!tournament) return;

                const datas = tournament.data;
                setFormData((prev) => ({
                    ...prev,
                    name: datas.name,
                    description: datas.description,
                    location: datas.location,
                    startDate: new Date(datas.startDate),
                    endDate: new Date(datas.endDate),
                    rules: JSON.parse(datas.rules) || [],
                    isActive: datas.isActive ?? true
                }));
                setPreview('/image/' + datas.eventLogoUrl)
                setLoading(false)
            };
            fetchTournamentData();
        } else {
            setLoading(false)
        }
    }, [eventId, actionType, accessToken]);

    const isValid = () => {
        const valid = formData.name !== "" &&
            formData.description !== "" &&
            formData.location !== "" &&
            formData.rules.length > 0 &&
            formData.logo !== null &&
            isSubmitting !== false

        return valid
    }

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
        setIsSubmitting(true)
        const data = new FormData();
        data.append('name', formData.name)
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('startDate', formData.startDate.toISOString());
        data.append('endDate', formData.endDate.toISOString());
        data.append('isActive', formData.isActive ? "true" : "false");
        data.append('rules', JSON.stringify(formData.rules));
        data.append('logo', formData.logo || "");

        if (actionType === "create") {
            const response = await createEvent(data, accessToken || "")
            if (response.error) {
                toast.error(response.error)
                setIsSubmitting(false)
                return
            }
            setIsSubmitting(false)
            queryClient.invalidateQueries({ queryKey: ['events'] })
            navigate('/apps/schedule')
        } else if (actionType === "update" && eventId) {
            const response = await updateEvent(eventId, data, accessToken || "")
            if (response.success === false) {
                toast.error(response.error)
                setIsSubmitting(false)
                return
            }
            setIsSubmitting(false)
            toast.success(response.message)
            queryClient.invalidateQueries({ queryKey: ['events'] })
            navigate('/apps/schedule')
        }
    }

    if (!accessToken) {
        return <div className="text-center">Loading...</div>;
    }

    if (actionType === "update" && !eventId) {
        return <div className="text-center">ID Acara tidak ditemukan</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!accessToken) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <ScrollArea className="h-full mt-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <Button variant="outline" onClick={() => navigate("/apps/schedule")}>
                            <MoveLeft className="mr-2" />
                            Kembali ke Daftar Acara
                        </Button>
                    </div>
                </div>
                <Card>
                    <form ref={formRef} onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                {actionType === "create" ? "Buat Acara Baru" : "Update Acara"}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                Form untuk membuat atau memperbarui Acara
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8 gap-4">
                                <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="name">Nama Acara</Label>
                                    <Input name="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nama Acara" />
                                </div>
                                <div className="grid w-full items-center gap-2 mt-4">
                                    <Label htmlFor="name">Deskripsi Acara</Label>
                                    <textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} placeholder="Deskripsi" className="w-full p-2 border rounded-md" />
                                </div>
                                <div className="font-bold text-lg mt-4">
                                    Detail Acara
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-2 mt-4 space-y-4">
                                    <div>
                                        <Label>Mulai Acara</Label>
                                        <Input type="datetime-local" value={moment(formData.startDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setFormData((prev) => ({ ...prev, startDate: new Date(e.target.value) }))} />
                                    </div>
                                    <div>
                                        <Label>Selesai Acara</Label>
                                        <Input type="datetime-local" value={moment(formData.endDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setFormData((prev) => ({ ...prev, endDate: new Date(e.target.value) }))} />
                                    </div>
                                </div>

                                <div className="grid w-full items-center gap-2 mt-4">
                                    <Label>Lokasi Acara</Label>
                                    <Input value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} placeholder="Lokasi" />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="logo">Logo (harus rasio 1:1)</Label>
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

                                <Separator className="my-4" />

                                <div className="bg-muted-foreground text-secondary p-4 rounded-md mt-4">
                                    <div className="mb-4 font-bold">Syarat & Ketentuan Acara</div>
                                    {formData.rules.map((rule, index) => (
                                        <div className="mb-8">
                                            <div key={index}>
                                                <div className="grid w-full items-center gap-2 mt-4">
                                                    <Label htmlFor={`rule-${index}`}>Paragraf {index + 1}</Label>
                                                    <div className="flex gap-4">
                                                        <Input value={rule} onChange={(e) => {
                                                            const newRules = [...formData.rules];
                                                            newRules[index] = e.target.value;
                                                            setFormData((prev) => ({ ...prev, rules: newRules }));
                                                        }} placeholder={`Paragraf ${index + 1}`} />
                                                        <Button variant="destructive" onClick={() => {
                                                            const newRules = formData.rules.filter((_, i) => i !== index);
                                                            setFormData((prev) => ({ ...prev, rules: newRules }));
                                                        }}><Trash2 /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button className="dark:text-secondary text-black" variant={'outline'} onClick={() => setFormData((prev) => ({ ...prev, rules: [...formData.rules, ""] }))}><Plus /> Tambah Aturan</Button>

                                    <div className="grid w-full items-center gap-2 mt-4">
                                        <Label>Event aktif ?</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="eventDisable" onCheckedChange={() => setFormData((prev) => ({ ...prev, isActive: formData.isActive ? false : true }))} checked={!formData.isActive ? false : true} />
                                            <Label htmlFor="eventDisable">Event ini {!formData.isActive ? 'Dimatikan' : 'Aktif'}</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleButtonClick} disabled={isValid()} className="w-full mt-8" type="submit">{isSubmitting ? 'Loading...' : actionType === "create" ? "Buat Acara" : "Perbarui Acara"}</Button>
                        </CardFooter>
                    </form>
                </Card>
            </ScrollArea>
        </div >
    );
}
