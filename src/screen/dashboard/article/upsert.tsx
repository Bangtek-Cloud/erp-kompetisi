"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createArticle, getArticleById, updateArticle } from "@/services/article";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Loader2, ChevronLeft, Save, Image as ImageIcon, X } from "lucide-react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/style.css";

export function ArticleFormPage({ mode }: { mode: "create" | "edit" }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(mode === "edit");

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State untuk preview
    const [published, setPublished] = useState(false);

    const editor = useCreateBlockNote();

    // Load data saat edit
    useEffect(() => {
        if (mode === "edit" && id) {
            setFetching(true);
            getArticleById(id).then((res) => {
                if (res?.success) {
                    const data = res.data;
                    setTitle(data.title);
                    setExcerpt(data.excerpt);
                    setPublished(data.published);
                    if (data.image) {
                        setPreviewUrl(data.image);
                    }

                    // --- PERBAIKAN KONTEN ---
                    if (data.content) {
                        try {
                            const blocks = typeof data.content === 'string'
                                ? JSON.parse(data.content)
                                : data.content;
                            editor.replaceBlocks(editor.topLevelBlocks, blocks);
                        } catch (e) {
                            console.error("Gagal parsing content:", e);
                        }
                    }
                }
                setFetching(false);
            });
        }
    }, [id, mode, editor]);

    // Handler saat user memilih file baru (untuk preview instan)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Membuat URL temporary agar gambar yang baru dipilih langsung muncul
            const localUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(localUrl);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("excerpt", excerpt);
        formData.append("content", JSON.stringify(editor.document));
        formData.append("published", String(published));
        if (file) formData.append("file", file);

        try {
            if (mode === "create") {
                await createArticle(formData);
            } else if (id) {
                await updateArticle(id, formData);
            }
            navigate("/apps/editor/article");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-lg font-semibold">
                        {mode === "create" ? "Buat Artikel" : "Edit Artikel"}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => navigate(-1)}>Batal</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Simpan
                    </Button>
                </div>
            </header>

            <main className="container grid flex-1 gap-8 p-6 mx-auto lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Input
                        className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                        placeholder="Judul Artikel..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Separator />
                    <div className="rounded-lg border bg-card p-4 min-h-125">
                        <BlockNoteView editor={editor} theme="light" />
                    </div>
                </div>

                <aside className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-sm">Gambar Sampul</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {previewUrl ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden border">
                                    <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                                    <Button
                                        variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8"
                                        onClick={() => { setFile(null); setPreviewUrl(null); }}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="relative group">
                                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-muted/50">
                                        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                                        <span className="text-xs text-muted-foreground">Klik untuk upload</span>
                                    </div>
                                    <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="text-sm">Ringkasan</CardTitle></CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Excerpt..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                className="h-24"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <Label>Status Publish</Label>
                                <Switch checked={published} onCheckedChange={setPublished} />
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </main>
        </div>
    );
}