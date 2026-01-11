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
import LoadingSolder from "@/components/loading-solder";
import { deleteEvent, getAllEvents } from "@/services/event";
import useAuthStore from "@/store/feature/authStand";
import { IEvent } from "@/types/event";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Filter, MapPin, MoreHorizontal, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

export default function SchedulePage() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
    const isSU = user?.role === "SU";
    const [openList, setOpenList] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState('');
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

    const [page, setPage] = useState(1);
    const [limit] = useState(6);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); 
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { mutate: deleteEvents } = useMutation({
        mutationFn: async (id: string) => {
            const response = await deleteEvent(id)
            if (response.success) {
                toast.success('Berhasil hapus')
                queryClient.invalidateQueries({ queryKey: ['events'] })
            } else {
                toast.error('Terjadi kesalahan dalam menghapus data, mungkin data masih terikat dengan turnamen')
            }
        }
    })
   const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["events", page, debouncedSearch],
        queryFn: async () => {
            const response = await getAllEvents({
                page,
                limit,
                search: debouncedSearch,
            });
            return response;
        }
    });

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

    if (isLoading) {
        return <LoadingSolder />
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight dark:text-white mb-6">Event</h1>
                </div>
                {
                    isAdmin && (
                        <Link to={'/apps/schedule/create'} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                            <Plus size={20} />
                            Create Event
                        </Link>
                    )
                }
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-75 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, location, or tag..."
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-accent-foreground hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Filter size={20} />
                </button>
            </div>
            {isFetching && <span className="text-xs">Memperbarui data...</span>}
            <div className="space-y-4">
                {data.data.map((event: IEvent) => (
                    <div key={event.id} className={`glass p-6 rounded-3xl group hover:border-primary ${event.isActive ? "bg-card" : "bg-card-10 opacity-20"} transition-all duration-500 relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-primary transition-colors"></div>

                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                            <div className="flex items-center gap-5 flex-1 min-w-0">
                                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-accent-foreground group-hover:text-cyan-400 transition-all shrink-0">
                                    {event.eventLogoUrl && <img src={event.eventLogoUrl} alt={event.name} className="w-full h-full object-cover rounded-2xl" />}
                                </div>
                                <div>
                                    <h3 className="nova-square-regular text-lg uppercase tracking-tight mb-1 text-primary hover:text-primary/80 transition-colors">{event.name}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-accent-foreground uppercase tracking-widest mono">
                                        <span className="flex items-center gap-1.5"><MapPin size={12} />{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-accent-foreground uppercase tracking-widest mono">
                                        <span className="flex items-center gap-1.5"><Calendar size={12} />{DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMM yyyy')} - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMM yyyy')}</span>
                                    </div>
                                    <div className="nova-square-regular text-xs mt-2">{event.description}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:flex lg:items-center gap-8 w-full lg:w-auto">
                                <div className="flex flex-col lg:items-end gap-2">
                                    <button onClick={() => {
                                        setOpenList(true)
                                        setDataOpen(event)
                                    }} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border text-center bg-primary hover:bg-primary/30 text-white`}>
                                        Syarat & Ketentuan
                                    </button>
                                </div>
                            </div>
                            {
                                isAdmin && (
                                    <button className="p-3 text-slate-600 hover:text-white transition-colors">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline"><MoreHorizontal /> Action</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="start">
                                                <DropdownMenuLabel>Ubah Event ini</DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem asChild>
                                                        <Link to={'/apps/schedule/update/' + event.id}>
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {
                                                        isSU && (
                                                            <DropdownMenuItem asChild>
                                                                <button onClick={() => setDeleteModal({
                                                                    id: event.id,
                                                                    open: true
                                                                })}>
                                                                    Delete
                                                                </button>
                                                            </DropdownMenuItem>
                                                        )
                                                    }
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2">
                {Array.from({ length: data?.meta.totalPages || 1 }).map((_, i) => {
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



            <AlertDialog open={openList} onOpenChange={setOpenList}>
                <AlertDialogContent>
                    <ScrollArea className="h-75">

                        <AlertDialogHeader>
                            <AlertDialogTitle>Detil hadiah event {dataOpen.name}</AlertDialogTitle>
                            <AlertDialogDescription>
                                Berikut rincian hadiah event yang akan diikuti.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex flex-col gap-4 mt-4 overflow-auto h-50">
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
    );
}