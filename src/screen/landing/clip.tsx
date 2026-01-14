import React, { useState } from "react";
import { Play, Clock, Share2, Heart, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { getAllClip } from "@/services/clip";

interface Clip {
  id: string;
  url: string;
  caption: string;
  createdAt: string;
}

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

const VideosLanding: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 9;

  const [open, setOpen] = useState(false);
  const [playUrl, setPlayUrl] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["clips", page, limit],
    queryFn: () => getAllClip({ page, limit }),
  });

  const clips: Clip[] = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="py-6 md:py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter font-lat1">
            Clips & Highlights
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2 font-lat2">
            Momen terbaik yang pernah terjadi
          </p>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map((clip) => {
            const thumb = getYoutubeThumbnail(clip.url);

            return (
              <div
                key={clip.id}
                className="group relative bg-card border rounded-2xl overflow-hidden hover:border-primary transition"
              >
                <div
                  className="relative aspect-video cursor-pointer"
                  onClick={() => {
                    setPlayUrl(clip.url);
                    setOpen(true);
                  }}
                >
                  <img
                    src={thumb}
                    alt={clip.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-primary p-4 rounded-full text-white">
                      <Play size={28} fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-md text-xs text-white flex items-center gap-1">
                    <Clock size={12} />
                    {DateTime.fromISO(clip.createdAt).toRelative()}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="line-clamp-2 text-sm">{clip.caption}</p>

                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-md hover:text-primary">
                      <Heart size={16} />
                    </button>
                    <button className="p-2 rounded-md hover:text-primary">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {meta.page} / {meta.totalPage}
          </span>

          <button
            disabled={page === meta.totalPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal Preview */}
      {open && playUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
            <button
              className="absolute top-3 right-3 z-10 text-white"
              onClick={() => {
                setOpen(false);
                setPlayUrl(null);
              }}
            >
              <X size={24} />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(
                playUrl
              )}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosLanding;
