import { getGallery } from '@/services/gallery';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DateTime } from 'luxon';

const LIMIT = 6;

const Gallery: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<{id: string, image: string, caption: string, createdAt: string} | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['gallery', page],
        queryFn: () => getGallery({ page, limit: LIMIT })
    });

    const galleries = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="py-10 space-y-8 animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-heading uppercase tracking-tighter">
                    Event Gallery
                </h1>
                <p className="text-muted-foreground font-accent">
                    The best moments captured on lens.
                </p>
            </div>

            {/* Masonry */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {isLoading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="h-48 rounded-xl bg-muted animate-pulse break-inside-avoid"
                            />
                        ))
                    : galleries.map((item: { id: string, image: string, caption: string, createdAt: string }) => (
                        <div
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className="relative cursor-zoom-in group overflow-hidden rounded-xl border border-border break-inside-avoid shadow-sm hover:shadow-primary/20 transition-all"
                        >
                            <img
                                src={item.image}
                                alt={item.caption}
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                <h3 className="text-white font-heading text-sm">
                                    {item.caption}
                                </h3>
                                {item.createdAt && (
                                    <p className="text-[10px] text-muted-foreground line-clamp-2">
                                        {DateTime.fromISO(item.createdAt).toLocaleString(
                                            DateTime.DATE_MED
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </Button>

                    {Array.from({ length: meta.totalPages }).map((_, i) => {
                        const p = i + 1;
                        return (
                            <Button
                                key={p}
                                variant={p === page ? 'default' : 'outline'}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </Button>
                        );
                    })}

                    <Button
                        variant="outline"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Modal Preview */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-5xl w-full animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute -top-10 right-0 text-white/80 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <img
                            src={selected.image}
                            alt={selected.caption}
                            className="w-full max-h-[80vh] object-contain rounded-xl border border-border"
                        />

                        {(selected.caption || selected.createdAt) && (
                            <div className="mt-3 text-center">
                                <h3 className="text-white font-heading">
                                    {selected.caption}
                                </h3>
                                {selected.createdAt && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {DateTime.fromISO(selected.createdAt).toLocaleString(
                                            DateTime.DATE_MED
                                        )}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
