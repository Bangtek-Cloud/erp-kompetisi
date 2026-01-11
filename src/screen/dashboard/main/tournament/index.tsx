import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllTournaments } from "@/services/tournament"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { TournamentProps } from "@/types/tournament"
import TournamentList from "@/components/card/tournament-list"
import { Link } from "react-router"
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder"


export default function TournamentsPage() {
  const { user } = useAuthStore();


  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";

  const [openList, setOpenList] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  const [dataOpen, setDataOpen] = useState<string[]>([])
  const [prize, setPrize] = useState<{ title: string; value: string }[]>([])
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('')


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isFetching, error } = useQuery({
    queryKey: ['tournaments', page, limit, debouncedSearch],
    queryFn: async () => {
      const response = await getAllTournaments(
        {
          page,
          limit,
          search: debouncedSearch,
        }
      );
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
  })
  const openTerm = (term: string[]) => {
    setOpenTerms(true)
    setDataOpen(term)
  }

  const openPrize = (prize: { title: string; value: string }[]) => {
    setOpenList(true)
    setPrize(prize)
  }

  if (isFetching) {
    return (
      <LoadingSolder />
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-400/10">
        <p className="text-lg text-red-500">{error.message}</p>
      </div>
    )
  }

  return (
    <main className="flex-1 container mx-auto p-8 nova-square-regular">
      {
        isAdmin && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Turnamen</h1>
            <Link to="/apps/tournament/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Buat Turnamen
              </Button>
            </Link>
          </div>
        )
      }

      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Cari turnamen..." className="w-full pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data && data.data.map((tournament: TournamentProps) => (
          <TournamentList
            tournament={tournament}
            openTerms={openTerm}
            openPrize={openPrize}
            isAdmin={isAdmin}
            key={tournament.id}
          />
        ))
        }
      </div>

      <div className="flex items-center gap-2 mt-4 justify-center">
        {Array.from({ length: data?.meta?.totalPages || 1 }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-9 h-9 rounded-xl text-xs font-bold ${page === pageNum
                ? "bg-indigo-600 text-white"
                : "text-accent-foreground hover:bg-slate-200"
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <AlertDialog open={openTerms} onOpenChange={setOpenTerms}>
        <AlertDialogContent>
          <ScrollArea className="h-[300px]">

            <AlertDialogHeader>
              <AlertDialogTitle>Syarat & Ketentuan</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut syarat & ketetuan turnamen yang akan diikuti.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4 overflow-auto h-[200px]">
              <div className="flex flex-col gap-2">

                <h3 className="text-lg font-bold">Aturan</h3>
                <div className="flex flex-col">
                  {dataOpen?.map((rule, index) => (
                    <div key={index}>{rule}</div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openList} onOpenChange={setOpenList}>
        <AlertDialogContent>
          <ScrollArea className="h-[300px]">

            <AlertDialogHeader>
              <AlertDialogTitle>Detil hadiah</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut rincian hadiah event yang akan diikuti.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4 overflow-auto h-[200px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Hadiah</h3>
                {prize?.map((data, index) => (
                  <div className="flex gap-4" key={index}>
                    <div key={index}>{data.title}</div>
                    <div key={index}>{data.value}</div>
                  </div>
                ))}

              </div>

            </div>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main >
  )
}

