import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import LoadingSolder from "@/components/loading-solder";
import { Trash2, Plus } from "lucide-react";
import { createGallery, deleteGallery, getGallery } from "@/services/gallery";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function GalleryPage() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(6);


    const { data, isLoading } = useQuery({
        queryKey: ["gallery", page, limit],
        queryFn: () => getGallery({ page, limit }),
    });

    const createMutation = useMutation({
        mutationFn: createGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            setOpen(false);
            setFile(null);
            setCaption("");
        },
    });

    function getPageRange(current: number, total: number, window = 1) {
        const start = Math.max(1, current - window)
        const end = Math.min(total, current + window)

        return { start, end }
    }


    const { start, end } = getPageRange(page, data?.meta?.totalPage)

    const deleteMutation = useMutation({
        mutationFn: deleteGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const fd = new FormData();
        fd.append("file", file);
        fd.append("caption", caption);

        createMutation.mutate(fd);
    };

    if (isLoading) return <LoadingSolder />;

    return (
        <div className="container mx-auto px-4 py-10 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Galeri</h1>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Galeri</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Gambar</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) =>
                                        setFile(e.target.files?.[0] ?? null)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Caption</Label>
                                <Input
                                    value={caption}
                                    onChange={(e) =>
                                        setCaption(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                >
                                    {createMutation.isPending
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.data?.map((item: { id: string; image: string; caption: string }) => (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                            <img
                                src={item.image}
                                alt={item.caption}
                                className="w-full h-48 object-cover"
                            />
                        </CardHeader>

                        <CardContent className="p-4 space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.caption || "Tanpa caption"}
                            </p>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                    deleteMutation.mutate(item.id)
                                }
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    {/* PREV */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setPage(Math.max(page - 1, 1))
                            }
                        />
                    </PaginationItem>

                    {/* PAGE 1 */}
                    {start > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    isActive={page === 1}
                                    onClick={() => setPage(1)}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {start > 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                        </>
                    )}

                    {/* MIDDLE WINDOW */}
                    {Array.from({ length: end - start + 1 }).map((_, i) => {
                        const page = start + i
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === page}
                                    onClick={() => setPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    {/* LAST PAGE */}
                    {end < data?.meta?.totalPage && (
                        <>
                            {end < data?.meta?.totalPage - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    isActive={page === data?.meta?.totalPage}
                                    onClick={() => setPage(data?.meta?.totalPage)}
                                >
                                    {data?.meta?.totalPage}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setPage(
                                    Math.min(page + 1, data?.totalPage)
                                )
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}