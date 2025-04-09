import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useMemo, useState } from "react"
import { deleteTournament, getAllTournaments } from "@/services/tournament"
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TournamentProps } from "@/types/tournament"
import TournamentList from "@/components/card/tournament-list"
import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateTime } from "luxon"
import { IEvent } from "@/types/event"


function groupTournamentsByEvent(
  data: TournamentProps[],
  disable: boolean
) {
  const grouped: Record<string, { event: TournamentProps['event']; tournaments: TournamentProps[] }> = {};

  data.forEach((tournament: TournamentProps) => {
    if (tournament.disabled !== disable) return;

    const eventId = tournament.event?.id;
    if (!eventId) return;

    if (!grouped[eventId]) {
      grouped[eventId] = {
        event: tournament.event,
        tournaments: []
      };
    }

    grouped[eventId].tournaments.push(tournament);
  });

  return Object.values(grouped);
}



export default function TournamentsPage() {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const { data, isFetching, error } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const response = await getAllTournaments(accessToken || "");
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
  })

  const enableData = useMemo(() => {
    if (!data) return []
    return groupTournamentsByEvent(data, false)
  }, [data])

  const disableData = useMemo(() => {
    if (!data) return []
    return groupTournamentsByEvent(data, true)
  }, [data])


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
  const [openTerms, setOpenTerms] = useState(false)
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
    eventId: '',
    disabled: false
  })
  const [ruleOpen, setRuleOpen] = useState(false)
  const [ruleData, setRuleData] = useState<IEvent>({
    id: "",
    name: "",
    description: "",
    rules: [],
    startDate: "",
    endDate: "",
    logo: "",
    location: null,
    isActive: false,
    createdAt: "",
    updatedAt: ""
  })

  const handleRemoveTournament = (id: string) => {
    deleteMutation(id)
  }

  const openDetail = (tournament: TournamentProps) => {
    setOpenList(true)
    setDataOpen(tournament)
  }

  const openTerm = (tournament: TournamentProps) => {
    setOpenTerms(true)
    setDataOpen(tournament)
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
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
    <main className="flex-1 container mx-auto p-8">
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
          <Input type="search" placeholder="Cari turnamen..." className="w-full pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div>
        {enableData?.map((item) => {
          return (
            <Card className="my-4">
              <CardHeader>
                <div className="flex">
                  <img src={'/image/'+ item?.event?.eventLogoUrl} className="w-32 h-32 mr-4" />
                  <div>

                    <CardTitle>{item.event?.name}</CardTitle>
                    <CardDescription>{item.event?.description}</CardDescription>
                    <div>
                      {DateTime.fromISO(item.event?.startDate || "").setLocale('id').toFormat('d MMMM yyyy') + ' - ' + DateTime.fromISO(item.event?.endDate || "").setLocale('id').toFormat('d MMMM yyyy')}
                    </div>
                    <div className="mt-10">
                      <Button onClick={() => {
                        setRuleOpen(true)
                        setRuleData(item?.event || {
                          id: "",
                          name: "",
                          description: "",
                          rules: [],
                          startDate: "",
                          endDate: "",
                          logo: "",
                          location: null,
                          isActive: false,
                          createdAt: "",
                          updatedAt: ""
                        })
                      }}>
                        Lihat Aturan acara
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {
                  item.tournaments.map((tournament) => (
                    <TournamentList tournament={tournament} openTerms={openTerm} openDetail={openDetail} isAdmin={isAdmin} isSU={IsSU} handleRemoveTournament={handleRemoveTournament} key={tournament.id} />
                  ))
                }
              </CardContent>
            </Card>
          )
        })}
      </div>
      {
        isAdmin && (
          <div>
            {disableData?.map((item) => {
              return (
                <Card className="my-4 opacity-50">
                  <CardHeader>
                    <CardTitle>{item.event?.name}</CardTitle>
                    <CardDescription>{item.event?.description}</CardDescription>
                    <div>
                      {DateTime.fromISO(item.event?.startDate || "").setLocale('id').toFormat('d MMMM yyyy') + ' - ' + DateTime.fromISO(item.event?.endDate || "").setLocale('id').toFormat('d MMMM yyyy')}
                    </div>
                    <div>
                      <Button onClick={() => {
                        setRuleOpen(true)
                        setRuleData(item?.event || {
                          id: "",
                          name: "",
                          description: "",
                          rules: [],
                          startDate: "",
                          endDate: "",
                          logo: "",
                          location: null,
                          isActive: false,
                          createdAt: "",
                          updatedAt: ""
                        })
                      }}>
                        Lihat Aturan acara
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {
                      item.tournaments.map((tournament) => (
                        <TournamentList tournament={tournament} openTerms={openTerm} openDetail={openDetail} isAdmin={isAdmin} isSU={IsSU} handleRemoveTournament={handleRemoveTournament} key={tournament.id} />
                      ))
                    }
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )
      }
      <AlertDialog open={openTerms} onOpenChange={setOpenTerms}>
        <AlertDialogContent>
          <ScrollArea className="h-[300px]">

            <AlertDialogHeader>
              <AlertDialogTitle>Syarat & Ketentuan {dataOpen.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut syarat & ketetuan turnamen yang akan diikuti.
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
              <AlertDialogTitle>Detil hadiah event {dataOpen.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut rincian hadiah event yang akan diikuti.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4 overflow-auto h-[200px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Hadiah</h3>
                {dataOpen.prize?.map((data, index) => (
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

      <AlertDialog open={ruleOpen} onOpenChange={setRuleOpen}>
        <AlertDialogContent>
          <ScrollArea className="h-[300px]">

            <AlertDialogHeader>
              <AlertDialogTitle>Aturan Event {ruleData.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut rincian hadiah event yang akan diikuti.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4 overflow-auto h-[200px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Syarat dan ketentuan</h3>
                {ruleData.rules.map((data, index) => (
                  <div className="flex gap-4" key={index}>
                    <div key={index}>{data}</div>
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

