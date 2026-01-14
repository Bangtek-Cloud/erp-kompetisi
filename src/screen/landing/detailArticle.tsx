import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { getAllArticle, getArticleById } from '@/services/article';
import { useQuery } from '@tanstack/react-query';
import { renderBlocks } from '@/components/renderBlog';
import { DateTime } from 'luxon';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: response, isLoading } = useQuery({
        queryKey: ['article', id],
        queryFn: () => getArticleById(id || ""),
        enabled: !!id
    });

    const { data: listResponse } = useQuery({
        queryKey: ['article-list-sidebar'],
        queryFn: () => getAllArticle({ page: 1, limit: 2 })
    });

    const article = response?.data;
    const recommendedArticles = listResponse?.data;


    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Memuat Artikel...</div>;

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <h2 className="text-2xl font-heading text-white">Artikel Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/articles')}
                    className="bg-primary text-white px-6 py-2 rounded-xl font-accent uppercase text-xs tracking-widest"
                >
                    Kembali ke Berita
                </button>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto py-10 md:py-16 px-4 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 text-white">
            {/* Header: Tombol Kembali & Aksi */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <Link
                    to="/articles"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-accent text-xs uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> Kembali
                </Link>
                <div className="flex items-center gap-4">
                    <button className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 transition-all">
                        <Share2 size={18} />
                    </button>
                    <button className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 transition-all">
                        <Bookmark size={18} />
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-accent text-primary uppercase tracking-[0.2em] font-bold">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock size={14} /> {DateTime.fromISO(article.createdAt).setLocale('id').toFormat('dd LLL yyyy')}
                    </div>
                </div>
                <h1 className="text-3xl md:text-6xl font-heading leading-tight tracking-tighter font-lat1">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <img 
                        src={article.createdBy?.avatar} 
                        alt={article.createdBy?.name} 
                        className="w-12 h-12 rounded-full border border-primary/50"
                    />
                    <div>
                        <p className="font-heading text-sm uppercase tracking-wider">{article.createdBy?.name || "Anonim"}</p>
                        <p className="text-xs text-muted-foreground font-accent">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })} • Penulis Utama
                        </p>
                    </div>
                </div>
            </div>

            {/* Gambar Utama */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 aspect-video">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Konten Artikel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    {article.excerpt && (
                        <p className="text-xl md:text-2xl font-accent text-white/90 leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                            "{article.excerpt}"
                        </p>
                    )}

                    <div className="prose prose-invert max-w-none text-muted-foreground font-accent text-lg leading-relaxed">
                        {renderBlocks(article.content && JSON.parse(article.content))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
                        <h4 className="font-heading text-lg uppercase tracking-tight text-white">Rekomendasi</h4>
                        <div className="space-y-6">
                            {recommendedArticles?.map((related: { id: string, title: string, image: string, createdAt: string }) => (
                                <Link key={related.id} to={`/articles/${related.id}`} className="group block space-y-2">
                                    <div className="aspect-video rounded-xl overflow-hidden mb-3">
                                        <img src={related.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                                    </div>
                                    <h5 className="font-heading text-sm group-hover:text-primary transition-colors leading-tight text-white/90">{related.title}</h5>
                                    <p className="text-[10px] font-accent text-muted-foreground uppercase">
                                        {new Date(related.createdAt).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleDetail;