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
import { Calendar, Edit2, Filter, MapPin, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function SchedulePage() {
    const queryClient = useQueryClient();
    const { user, accessToken } = useAuthStore();
    const [activeTab, setActiveTab] = useState<'Active' | 'Disable'>('Active');
    const [searchTerm, setSearchTerm] = useState('');
    const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
    const [showMore, setShowMore] = useState("");
    const IsSU = user?.role === "SU";
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

    const { mutate: deleteEvents } = useMutation({
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
        },
    })


    const filteredEvents = useMemo(() => {
        if (!data) return [];

        return data.filter((event: IEvent) => {

            /** filter tab */
            let matchTab = true;

            if (activeTab === "Active") {
                matchTab = event.isActive;
            }

            if (activeTab === "Disable") {
                matchTab = !event.isActive;
            }

            /** filter search */
            const keyword = searchTerm.toLowerCase();

            const matchSearch =
                event.name.toLowerCase().includes(keyword) ||
                event.description?.toLowerCase().includes(keyword) ||
                event.location?.toLowerCase().includes(keyword);

            return matchTab && matchSearch;
        });
    }, [data, activeTab, searchTerm]);

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
            <LoadingSolder />
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-4">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight dark:text-white mb-6">Event Management</h1>
                    <div className="flex bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-2xl w-fit">

                        {['Active', 'Disable'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as 'Active' | 'Disable')}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-white dark:bg-indigo-500 text-indigo-600 dark:text-white shadow-sm'

                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
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

            {/* Filters Bar */}
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
                <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Filter size={20} />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
               {filteredEvents.map((event: IEvent) => (
                    <div
                        className={`rounded-4xl p-4 flex flex-col relative group
                            bg-white dark:bg-slate-800
                            border border-border
                            shadow-sm dark:shadow-none
                            ${!event.isActive ? 'opacity-60' : ''}`}>

                        {/* Image & Badges */}
                        <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                            {event.eventLogoUrl && (
                                <img src={import.meta.env.VITE_BASE_S3 + event?.eventLogoUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-lg text-[10px] font-bold text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
                                <span className={`w-1.5 h-1.5 rounded-full ${event.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                {event.isActive ? 'Active' : 'Disabled'}
                            </div>

                            {/* Hover Actions Overlay */}
                            <div className="actions-overlay absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {
                                    isAdmin && (
                                        <Link to={'/apps/schedule/update/' + event.id} className="p-2.5 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl hover:scale-110 transition-all shadow-xl">
                                            <Edit2 size={16} />
                                        </Link>
                                    )
                                }
                                {
                                    IsSU && (
                                        <button onClick={() => setDeleteModal({
                                            id: event.id,
                                            open: true
                                        })} className="p-2.5 bg-white dark:bg-slate-800 text-red-500 rounded-xl hover:scale-110 transition-all shadow-xl">
                                            <Trash2 size={16} />
                                        </button>
                                    )
                                }
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-3 px-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                                <Calendar size={12} />
                                <span>{DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMM yyyy')} - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMM yyyy')}</span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                                {event.name}
                            </h3>

                            <div className="flex items-center  gap-1.5 bg-primary/10 dark:bg-indigo-500/10 px-2 py-1 rounded-xl w-fit">
                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                    {event.location}
                                </p>
                            </div>

                            {
                                showMore === event.id ? (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed h-auto">
                                        {event.description}
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed h-8">
                                        {event.description}
                                    </p>
                                )
                            }
                            <button onClick={() => setShowMore(showMore === event.id ? "" : event.id)} className="text-xs text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mt-1">
                                {showMore === event.id ? "Show Less" : "Show More"}
                            </button>

                            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-2xl py-2 font-bold transition-all" onClick={() => {
                                setOpenList(true)
                                setDataOpen(event)
                            }}>
                                Syarat & Ketentuan
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* TODO */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400">Total events found: 48</p>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, '...', 12].map((page, i) => (
                        <button
                            key={i}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${page === 1
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
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