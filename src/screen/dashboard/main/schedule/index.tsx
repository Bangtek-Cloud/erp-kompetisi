import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Filter, MapPin, Plus, Search, Stamp } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { deleteEvent, getAllEvents } from "@/services/event";
// import { toast } from "sonner";
import { IEvent } from "@/types/event";
import { DateTime } from "luxon";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SchedulePage() {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.auth.user);
    const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
    const IsSU = user?.role === "SU";
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const [openList, setOpenList] = useState(false)
    const [dataOpen, setDataOpen] = useState<IEvent>({
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
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        id: ''
    })

    const { mutate: deleteEvents, isPending } = useMutation({
        mutationFn: async (id: string) => {
            const response = await deleteEvent(id, accessToken || "")
            if (response.success) {
                toast.success('Berhasil hapus')
                queryClient.invalidateQueries({ queryKey: ['events'] })
            } else {
                toast.error('Terjadi kesalahan dalam menghapus data, mungkin data masih terikat dengan turnamen')
            }
        }
    })
    const { data, isFetching, error } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await getAllEvents(accessToken || "");
            if (response?.error) {
                return new Error(response.error);
            }
            if (response?.success) {
                return response.data;
            }
            return [];
        }
    })

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500">Error</h1>
                    <p className="text-red-500">{(error as Error).message}</p>
                </div>
            </div>
        )
    }

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Event Schedule</h1>
                    <div className="flex gap-2">
                        {
                            isAdmin && (
                                <Link to={'/apps/schedule/create'}>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" /> Add Event
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </div>

                <div className="flex items-center mb-6 gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search events..." className="w-full pl-8" />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                {
                    isPending ? 'Loading...' : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Event akan datang</CardTitle>
                                <CardDescription>
                                    Temukan berbagai event menarik yang akan datang di bawah ini! Jangan lewatkan kesempatan untuk berpartisipasi dalam acara-acara seru yang telah kami siapkan untuk Anda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {data.filter((a: IEvent) => a.isActive === true).map((event: IEvent, index: number) => (
                                        <Card key={index} className="border shadow-sm">
                                            <CardHeader>
                                                <div className="flex flex-col">
                                                    <div className="flex mx-auto">
                                                        {
                                                            event?.eventLogoUrl && (
                                                                <img src={import.meta.env.VITE_BASE_S3 + event?.eventLogoUrl} className="w-32 h-32" />
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <CardTitle>
                                                            {event.name}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {event.description}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex-1 flex flex-col h-full">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Calendar className="h-4 w-4 text-primary" />
                                                        <div className="font-medium">
                                                            {DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMMM yyyy')}
                                                        </div>
                                                        <div className="font-medium">
                                                            - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMMM yyyy')}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm flex mb-4"><Stamp className="h-4 w-4 mr-4" /> Acara {event.isActive ? 'Berjalan' : 'Selesai'}</p>
                                                    <p className="text-sm flex"><MapPin className="h-4 w-4 mr-4" /> {event.location}</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0 flex gap-2">
                                                <Button size="sm" className="flex-1" onClick={() => {
                                                    setOpenList(true)
                                                    setDataOpen(event)
                                                }}>
                                                    Syarat & Ketentuan
                                                </Button>
                                            </CardFooter>
                                            <div className="flex mt-10 justify-center gap-2">
                                                <Link to={'/apps/schedule/update/' + event.id}>
                                                    <Button variant={'outline'}>
                                                        Edit
                                                    </Button>
                                                </Link>
                                                {
                                                    IsSU && (
                                                        <Button variant={'outline'} onClick={() => setDeleteModal({
                                                            id: event.id,
                                                            open: true
                                                        })}>
                                                            Delete
                                                        </Button>

                                                    )
                                                }
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                {
                                    isAdmin && (
                                        <div>
                                            <div className="mt-10 text-2xl text-center">Disable {'Hanya admin yang bisa lihat'}</div>
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {data.filter((a: IEvent) => a.isActive === false).map((event: IEvent, index: number) => (
                                                    <Card key={index} className="border shadow-sm opacity-10">
                                                        <CardHeader>
                                                            <div className="flex flex-col">
                                                                <div className="flex mx-auto">
                                                                    {
                                                                        event?.eventLogoUrl && (
                                                                            <img src={import.meta.env.VITE_BASE_S3 + event?.eventLogoUrl} className="w-32 h-32" />
                                                                        )
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <CardTitle>
                                                                        {event.name}
                                                                    </CardTitle>
                                                                    <CardDescription>
                                                                        {event.description}
                                                                    </CardDescription>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="flex-1 flex flex-col h-full">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Calendar className="h-4 w-4 text-primary" />
                                                                    <div className="font-medium">
                                                                        {DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMMM yyyy')}
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMMM yyyy')}
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground">{event.isActive ? 'Aktif' : 'Selesai'}</div>
                                                                </div>
                                                                <p className="text-sm flex"><MapPin /> {event.location}</p>
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter className="p-4 pt-0 flex gap-2">
                                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                                                                setOpenList(true)
                                                                setDataOpen(event)
                                                            }}>
                                                                Syarat & Ketentuan
                                                            </Button>
                                                        </CardFooter>
                                                        <div className="flex mt-10 justify-center gap-2">
                                                            <Link to={'/apps/schedule/update/' + event.id}>
                                                                <Button variant={'outline'}>
                                                                    Edit
                                                                </Button>
                                                            </Link>
                                                            {
                                                                IsSU && (
                                                                    <Button variant={'outline'} onClick={() => setDeleteModal({
                                                                        id: event.id,
                                                                        open: true
                                                                    })}>
                                                                        Delete
                                                                    </Button>

                                                                )
                                                            }
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                            </CardContent>
                        </Card>
                    )
                }
            </main>
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
                                <h3 className="text-lg font-bold">Syarat dan ketentuan</h3>
                                {dataOpen.rules?.map((data, index) => (
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

            <AlertDialog open={deleteModal.open} onOpenChange={(e) => setDeleteModal({ open: e, id: deleteModal.id })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteEvents(deleteModal.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

