import { useState } from 'react';
import { ArrowRight, Trophy, Clock, X, Play } from 'lucide-react';
import { Link } from 'react-router';
import EventCard from '@/components/event-card';
import { useQuery } from '@tanstack/react-query';
import { getAllWebsiteSections } from '@/services/website';
import { getAllEvents } from '@/services/event';
import { getAllClip } from '@/services/clip';
import { getAllArticle } from '@/services/article';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NewIEvent } from '@/types/event';

export default function LandingHome() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Queries
  const { data: hero, isLoading: heroLoading } = useQuery({
    queryKey: ['hero'],
    queryFn: getAllWebsiteSections
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events-3'],
    queryFn: () => getAllEvents({ page: 1, limit: 3, search: '', isActive: "active" })
  });

  const { data: clipVideo, isLoading: clipLoading } = useQuery({
    queryKey: ['clipVideo'],
    queryFn: () => getAllClip({ page: 1, limit: 3 })
  });

  const { data: articleData, isLoading: articleLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getAllArticle({ page: 1, limit: 2 })
  });

  // Helper untuk YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  function getYoutubeId(url: string) {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }

      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2];
      }
    } catch {
      return null;
    }

    return null;
  }


  function getYoutubeThumbnail(url: string) {
    const id = getYoutubeId(url);
    if (!id) return "";
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  return (
    <div className="space-y-16 md:space-y-32 animate-in fade-in duration-700 pb-20">

      {/* --- HERO SECTION --- */}
      <section>
        {heroLoading ? (
          <Skeleton className="w-full h-[80vh] md:h-[60vh] lg:h-[75vh] rounded-[2.5rem] md:rounded-[3.5rem]" />
        ) : hero?.data && (
          <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden h-[80vh] md:h-[60vh] lg:h-[75vh] flex items-center shadow-2xl">
            <div className="absolute inset-0">
              <img
                src={hero?.data?.image}
                className="w-full h-full object-cover"
                alt="Hero Background"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 px-8 sm:px-12 md:px-20 space-y-8 max-w-4xl">
              <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-2 rounded-2xl text-[10px] md:text-xs font-accent border border-white/20 shadow-xl shadow-primary/30">
                <Trophy size={14} className="animate-bounce" />
                <span className="tracking-[0.2em] uppercase font-bold text-white">{hero?.data?.subTitle}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-heading leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
                {hero?.data?.title}
              </h1>
              <p className="text-base sm:text-xl text-white/80 font-accent max-w-xl leading-relaxed">
                {hero?.data?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link to={hero?.data?.buttonLink || "/"} className="bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-heading flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/30 active:scale-95 group">
                  {hero?.data?.buttonText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- EVENTS SECTION --- */}
      <section className="space-y-12 px-4 md:px-0 nova-square-regular">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-accent text-xs nova-square-regular">
              <span className="w-10 h-0.5 bg-primary"></span>
              Event Terbaru
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading tracking-tighter uppercase font-lat1">
              FEATURED
            </h2>
          </div>

          {/* Tambahkan w-full md:w-auto dan text-center jika ingin tombolnya penuh di mobile */}
          <Link
            to="/events"
            className="w-full md:w-auto text-center bg-muted hover:bg-secondary border border-border px-8 py-3 rounded-2xl text-foreground font-accent text-xs tracking-widest transition-all"
          >
            VIEW ALL CATEGORIES
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 ">
          {eventsLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-100 w-full rounded-3xl" />
            ))
          ) : (
            events?.data?.map((event: NewIEvent) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </section>

      {/* --- CLIPS SECTION --- */}
      <section className="py-6 md:py-10 space-y-12 nova-square-regular">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase font-lat1">CLIPS & HIGHLIGHTS</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2 italic nova-square-regular">The most epic moments in tournament history.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clipLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-3xl" />
            ))
          ) : (
            clipVideo?.data?.map((video: { id: string, url: string, caption: string }) => {
              const videoId = getYouTubeId(video.url);
              const thumb = getYoutubeThumbnail(video.url);
              return (
                <div key={video.id} className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-md hover:shadow-2xl">
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(videoId)}>
                    <img
                      src={thumb}
                      alt={video.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/90 p-4 rounded-full text-white scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all">
                        <Play fill="currentColor" size={32} />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10">
                        <Clock size={12} className="text-primary" /> CLIP
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors min-h-12">
                      {video.caption}
                    </h3>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* --- ARTICLES SECTION --- */}
      <section className="space-y-12 nova-square-regular">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading uppercase tracking-tighter font-lat1">LATEST UPDATES</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {articleLoading ? (
            Array(2).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-75 w-full rounded-[2.5rem]" />
            ))
          ) : (
            articleData?.data?.map((item: { id: string, title: string, excerpt: string, image: string, createdAt: string, createdBy: { name: string, avatar: string } }) => (
              <div key={item.id} className="group flex flex-col md:flex-row bg-card border-2 border-border rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all shadow-sm">
                <div className="md:w-[40%] aspect-video md:aspect-auto shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between grow">
                  <div className="space-y-4">
                    <span className="text-[10px] font-accent text-primary uppercase tracking-[0.3em] font-bold">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading leading-tight group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    <div className="text-sm text-muted-foreground font-accent line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item?.createdBy?.avatar} />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-accent text-muted-foreground uppercase font-bold tracking-wider">{item?.createdBy?.name || 'Admin'}</span>
                    </div>
                    <Link to={`/articles/${item.id}`} className="text-primary font-heading text-[10px] tracking-widest uppercase hover:underline underline-offset-8 decoration-2">
                      FULL ARTICLE
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* --- VIDEO MODAL --- */}
      {selectedVideo && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
        </div>
      )}
    </div>
  );
}