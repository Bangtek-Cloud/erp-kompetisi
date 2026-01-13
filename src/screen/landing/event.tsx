import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getAllEvents } from '@/services/event';
import { useQuery } from '@tanstack/react-query';
import { NewIEvent } from '@/types/event';
import { Skeleton } from '@/components/ui/skeleton';
import EventCard from '@/components/event-card';
import { Button } from '@/components/ui/button';

const LIMIT = 8;

const EventLanding: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // reset page saat search berubah
    useEffect(() => {
        setPage(1);
    }, [search]);

    const { data, isLoading } = useQuery({
        queryKey: ['events-landing', search, page],
        queryFn: () =>
            getAllEvents({
                page,
                limit: LIMIT,
                search,
                isActive: 'active',
            }),
    });

    const events = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="space-y-12 md:space-y-16 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-7xl font-heading tracking-tight uppercase leading-none font-lat1">
                    Event
                </h1>
                <p className="text-muted-foreground font-accent text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-lat2">
                    Uji kemampuan solder, analisa kerusakan, dan perbaikan level board.
                </p>
            </div>

            {/* Search */}
            <div className="sticky top-16 md:top-24 z-40 bg-background/95 backdrop-blur-md -mx-4 px-4 py-6 border-y border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative w-full md:w-80 group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Cari event servis HP & laptop..."
                        className="w-full bg-card border-2 border-border rounded-2xl pl-12 pr-4 py-3 font-accent text-sm outline-none focus:border-primary/50"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {isLoading
                    ? Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} className="h-100 w-full rounded-3xl" />
                        ))
                    : events.map((event: NewIEvent) => (
                        <EventCard key={event.id} event={event} />
                    ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
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
        </div>
    );
};

export default EventLanding;
