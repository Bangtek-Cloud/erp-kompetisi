"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllArticle, deleteArticle } from "@/services/article";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge"; // Pastikan sudah install badge shadcn
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Trash2, Pencil, FileText, Calendar } from "lucide-react";

interface ArticleProps {
    id: string;
    title: string;
    excerpt: string;
    published: boolean;
    image: string;
    updatedAt: string;
}

export function ArticleListPage() {
    const [data, setData] = useState<ArticleProps[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        const res = await getAllArticle({ page: 1, limit: 10 });
        if (res?.success) setData(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteArticle(id);
        fetchData();
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Daftar Artikel</h1>
                    <p className="text-muted-foreground">Kelola konten dan publikasi artikel Anda di sini.</p>
                </div>
                <Button onClick={() => navigate("/apps/editor/article/create")} className="gap-2 shadow-sm">
                    <Plus className="w-4 h-4" /> Tambah Artikel
                </Button>
            </div>

            <Separator />

            {/* List Section */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                    </div>
                ) : data.length > 0 ? (
                    data.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow group border-muted/60">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4">
                                    {/* Thumbnail */}
                                    <div className="w-full md:w-40 h-24 shrink-0 rounded-md overflow-hidden bg-muted border">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <FileText className="w-8 h-8 opacity-20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center gap-2">
                                            {item.published ? (
                                                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border-emerald-200">Published</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-500">Draft</Badge>
                                            )}
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "Baru saja"}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-semibold truncate group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {item.excerpt || "Tidak ada ringkasan artikel."}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-none">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 md:flex-none"
                                            onClick={() => navigate(`/apps/editor/article/${item.id}`)}
                                        >
                                            <Pencil className="w-4 h-4 mr-2" /> Edit
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="ghost" className="flex-1 md:flex-none text-destructive hover:bg-destructive/10 hover:text-destructive">
                                                    <Trash2 className="w-4 h-4 mr-2" /> Hapus
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini permanen. Artikel <span className="font-semibold text-foreground">"{item.title}"</span> akan dihapus selamanya.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                    >
                                                        Hapus Sekarang
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 border-2 border-dashed rounded-xl">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground opacity-20" />
                        <h3 className="mt-4 text-lg font-medium">Belum ada artikel</h3>
                        <p className="text-muted-foreground">Mulai buat konten pertama Anda hari ini.</p>
                        <Button variant="outline" className="mt-6" onClick={() => navigate("/apps/editor/article/create")}>
                            Buat Artikel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}