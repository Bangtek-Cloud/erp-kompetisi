"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
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
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  createClip,
  deleteClip,
  getAllClip,
} from "@/services/clip";

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
  if (!id) return url;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export default function GalleryCrudPage() {
  const [data, setData] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [playUrl, setPlayUrl] = useState<string | null>(null);

  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllClip({ page: 1, limit: 10 });
    if (res?.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!url || !caption) return;
    setLoading(true);
    const res = await createClip({ url, caption });
    if (res?.success) {
      setUrl("");
      setCaption("");
      setOpen(false);
      fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await deleteClip(id);
    if (res?.success) {
      fetchData();
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Tambah
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Gallery</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Caption</Label>
                <Input
                  placeholder="Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && data.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-0 relative group cursor-pointer"
                onClick={() => {
                  const id = getYoutubeId(item.url);
                  if (id) setPlayUrl(id);
                }}>
                <img
                  src={getYoutubeThumbnail(item.url)}
                  alt={item.caption}
                  className="h-48 w-full object-cover"
                />

                {getYoutubeId(item.url) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-red-600 ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="text-sm text-muted-foreground">
                  {item.caption}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus data?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aksi ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
          <Dialog open={!!playUrl} onOpenChange={() => setPlayUrl(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {playUrl && (
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${playUrl}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
