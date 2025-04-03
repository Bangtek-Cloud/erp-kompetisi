import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Calendar, Users, MapPin } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useState } from "react"
import { deleteTournament, getAllTournaments } from "@/services/tournament"
import moment from "moment"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import TournamentDrawer from "@/components/form/createUpdateTournaments"
import { Link } from "react-router"

interface TournamentProps {
  id: string
  name: string
  description: string
  prize: {
    title: string
    value: string
  }[]
  startDate: string
  endDate: string
  status: string
  maxParticipants?: number
  location?: string
  rules?: string[]
  createdAt: string
  updatedAt: string
  disabled: boolean
}

export default function TournamentsPage() {
  moment.locale('id');
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { isPending, error, data: listTournaments } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const response = await getAllTournaments(accessToken || "");
      if (!response) {
        throw new Error("Terjadi kesalahan");
      }
      return response.data;
    },
  })

  const { mutate: deleteMutation } = useMutation({

    mutationFn: async (id: string) => {
      const response = await deleteTournament(id, accessToken || "");
      if (!response) {
        throw new Error("Gagal menghapus turnamen");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
  })

  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
  const IsSU = user?.role === "SU";


  const [openList, setOpenList] = useState(false)
  const [editNew, setEditNew] = useState(false)
  const [tournamentId, setTournamentId] = useState<string | null>(null)
  const [dataOpen, setDataOpen] = useState<TournamentProps>({
    id: '',
    name: '',
    description: '',
    prize: [
      {
        title: '',
        value: ''
      }
    ],
    startDate: '',
    endDate: '',
    status: '',
    maxParticipants: 0,
    location: '',
    rules: [''],
    createdAt: '',
    updatedAt: '',
    disabled: false
  })
  const [action, setAction] = useState<'create' | 'update'>('create')

  const handleRemoveTournament = (id: string) => {
    deleteMutation(id)
  }

  const handleNewTournament = () => {
    setAction("create")
    setEditNew(true)
  }

  const handleEditTournament = (id: string) => {
    setTournamentId(id)
    setAction("update")
    setEditNew(true)
  }

  const openDetail = (tournament: TournamentProps) => {
    setOpenList(true)
    setDataOpen(tournament)
  }


  const translate = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "Akan Datang";
      case "ONGOING":
        return "Sedang Berlangsung";
      case "FINISHED":
        return "Selesai";
      default:
        return status;
    }
  }
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  const noDisableList = listTournaments.filter((tournament: TournamentProps) => tournament.disabled === false);

  const DisableList = listTournaments.filter((tournament: TournamentProps) => tournament.disabled === true);

  return (
    <main className="flex-1 container mx-auto p-8">
      {
        isAdmin && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Turnamen</h1>
            <Button onClick={handleNewTournament}>
              <Plus className="mr-2 h-4 w-4" /> Buat Turnamen
            </Button>
          </div>
        )
      }

      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Cari turnamen..." className="w-full pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {noDisableList.map((tournament: TournamentProps) => (
          <>
            <Card key={tournament.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{tournament.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      tournament.status === "ONGOING"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : tournament.status === "UPCOMING"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {translate(tournament.status)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {moment(tournament.startDate).format("DD MMM YYYY")} - {moment(tournament.endDate).format("DD MMM YYYY")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3.5 w-3.5" /> {tournament.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" /> - Partisipan
                  </div>
                  <p className="text-sm mt-2">{tournament.description}</p>

                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold">{tournament.maxParticipants === 0 ? '∞' : tournament.maxParticipants}</p>
                        <p className="text-xs text-muted-foreground">Maksimal Partisipan</p>
                      </div>
                      <div>
                        <p className="text-md font-bold">{moment(tournament.endDate).format('DD MMM YYYY hh:mm')}</p>
                        <p className="text-xs text-muted-foreground">Selesai</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{translate(tournament.status)}</p>
                        <p className="text-xs text-muted-foreground">Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => openDetail(tournament)}>
                  Lihat Detail
                </Button>
                <Link to={`/apps/tournament/${tournament.id}`}>
                  <Button size="sm">Daftar</Button>
                </Link>
              </CardFooter>
              {isAdmin && (
                <div className="border-t border-t mt-4 pt-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Admin Area
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <Button variant="link" size="sm" onClick={() => handleEditTournament(tournament.id)}>
                      Edit
                    </Button>
                    {
                      IsSU && (
                        <Button variant="link" size="sm" onClick={() => handleRemoveTournament(tournament.id)}>
                          Hapus
                        </Button>
                      )
                    }
                  </div>
                </div>
              )}
            </Card>

          </>
        ))}
      </div>
      {
        isAdmin && (
          <div>
            <div className="mt-10 text-xl mb-4 font-bold">{"Dimatikan sementara (Hanya admin yang bisa lihat)"}</div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DisableList.map((tournament: TournamentProps) => (
                <>
                  <Card key={tournament.id} className="opacity-50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{tournament.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            tournament.status === "ONGOING"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : tournament.status === "UPCOMING"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {translate(tournament.status)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {moment(tournament.startDate).format("DD MMM YYYY")} - {moment(tournament.endDate).format("DD MMM YYYY")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3.5 w-3.5" /> {tournament.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-3.5 w-3.5" /> - Partisipan
                        </div>
                        <p className="text-sm mt-2">{tournament.description}</p>

                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-lg font-bold">{tournament.maxParticipants === 0 ? '∞' : tournament.maxParticipants}</p>
                              <p className="text-xs text-muted-foreground">Maksimal Partisipan</p>
                            </div>
                            <div>
                              <p className="text-md font-bold">{moment(tournament.endDate).format('DD MMM YYYY hh:mm')}</p>
                              <p className="text-xs text-muted-foreground">Selesai</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold">{translate(tournament.status)}</p>
                              <p className="text-xs text-muted-foreground">Status</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => openDetail(tournament)}>
                        Lihat Detail
                      </Button>
                      <Link to={`/apps/tournament/${tournament.id}`}>
                  <Button size="sm">Daftar</Button>
                </Link>
                    </CardFooter>
                    {isAdmin && (
                      <div className="border-t border-t mt-4 pt-4">
                        <div className="text-center text-sm text-muted-foreground">
                          Admin Area
                        </div>
                        <div className="flex justify-center gap-2 mt-2">
                          <Button variant="link" size="sm" onClick={() => handleEditTournament(tournament.id)}>
                            Edit
                          </Button>
                          {
                            IsSU && (
                              <Button variant="link" size="sm" onClick={() => handleRemoveTournament(tournament.id)}>
                                Hapus
                              </Button>
                            )
                          }
                        </div>
                      </div>
                    )}
                  </Card>

                </>
              ))}
            </div>

          </div>
        )
      }
      <TournamentDrawer isOpen={editNew} tournamentId={tournamentId || ""} setOpen={setEditNew} actionType={action} />
      <AlertDialog open={openList} onOpenChange={setOpenList}>
        <AlertDialogContent>
          <ScrollArea className="h-[300px]">

            <AlertDialogHeader>
              <AlertDialogTitle>Detil turnamen {dataOpen.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut rincian turnamen yang akan diikuti.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4 overflow-auto h-[200px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Aturan</h3>
                <div className="flex flex-col">
                  {dataOpen.rules?.map((rule, index) => (
                    <div key={index}>{rule}</div>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold">Hadiah</h3>
              {dataOpen.prize?.map((data, index) => (
                <div className="flex gap-4" key={index}>
                  <div key={index}>{data.title}</div>
                  <div key={index}>{data.value}</div>
                </div>
              ))}

            </div>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Gabung</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </main>
  )
}

