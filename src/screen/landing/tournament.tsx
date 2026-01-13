import TournamentCard from '@/components/tournamentCard';
import { getAllTournaments2 } from '@/services/tournament';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const LIMIT = 8;

const TournamentLanding: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    // reset page saat search berubah
    useEffect(() => {
        setPage(1);
    }, [search]);

    const { data, isLoading } = useQuery({
        queryKey: ['tournaments', page, search],
        queryFn: () =>
            getAllTournaments2({
                page,
                limit: LIMIT,
                search,
            })
    });

    const tournaments = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="py-10 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-4xl font-heading uppercase font-lat1">Active Tournaments</h1>
                    <p className="text-muted-foreground font-accent font-lat2">
                        Find your next battleground and register today.
                    </p>
                </div>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search tournaments..."
                    className="bg-card border border-border px-4 py-2 rounded-lg font-accent text-sm outline-none focus:border-primary w-64"
                />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isLoading
                    ? Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="h-40 rounded-xl bg-muted animate-pulse"
                            />
                        ))
                    : tournaments.map((t: any) => (
                        <TournamentCard key={t.id} tournament={t} />
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

export default TournamentLanding;
