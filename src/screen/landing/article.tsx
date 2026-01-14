import { getAllArticle } from '@/services/article';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { Link } from 'react-router';

const limit = 6;

const ArticlesLanding: React.FC = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['articles', page],
        queryFn: () => getAllArticle({ page, limit })
    });

    const articles = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="py-10 space-y-12 animate-in slide-in-from-left-4 duration-500">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <h1 className="text-4xl font-heading uppercase font-lat1">
                    Bangtek Daily
                </h1>
                <p className="text-muted-foreground font-accent font-lat2">
                    Insight, tips, dan pengalaman teknisi servis HP, laptop,
                    serta perangkat elektronik.
                </p>
            </div>

            {/* Artikel List */}
            <div className="grid grid-cols-1 gap-14 max-w-4xl mx-auto">
                {isLoading && (
                    <p className="text-center text-muted-foreground">
                        Memuat artikel...
                    </p>
                )}

                {!isLoading && articles.length === 0 && (
                    <p className="text-center text-muted-foreground">
                        Artikel belum tersedia.
                    </p>
                )}

                {articles.map((article: {
                    id: string;
                    title: string;
                    excerpt: string;
                    image: string;
                    createdAt: string;
                    createdBy: {
                        id: string;
                        name: string;
                        avatar: string;
                    };
                }, idx: number) => {
                    const author = article.createdBy;
                    const publishedDate = DateTime
                        .fromISO(article.createdAt)
                        .setLocale('id')
                        .toFormat('dd LLLL yyyy');

                    return (
                        <div
                            key={article.id}
                            className={`flex flex-col ${idx % 2 === 0
                                    ? 'md:flex-row'
                                    : 'md:flex-row-reverse'
                                } gap-8 items-center`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-muted">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 space-y-4">
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={author?.avatar}
                                        alt={author?.name}
                                        className="w-8 h-8 rounded-full border"
                                    />
                                    <div className="text-xs font-accent text-muted-foreground uppercase tracking-wider">
                                        <span className="text-foreground font-medium">
                                            {author?.name}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span>{publishedDate}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-heading leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-muted-foreground font-accent text-sm leading-relaxed">
                                    {article.excerpt}
                                </p>

                                <Link
                                    to={`/article/${article.id}`}
                                    className="border-b border-primary text-primary font-heading text-sm py-1 hover:text-foreground transition-colors uppercase">
                                    Baca Selengkapnya
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
                <div className="flex items-center justify-center gap-6 pt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="text-sm uppercase font-heading disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm font-accent text-muted-foreground">
                        Page {meta.page} of {meta.totalPage}
                    </span>

                    <button
                        disabled={page === meta.totalPage}
                        onClick={() => setPage((p) => p + 1)}
                        className="text-sm uppercase font-heading disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArticlesLanding;
