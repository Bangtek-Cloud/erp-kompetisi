// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Calendar, Filter, MapPin, Plus, Search, Stamp } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import {
//     useMutation,
//     useQuery,
//     useQueryClient
// } from "@tanstack/react-query";
// import { deleteEvent, getAllEvents } from "@/services/event";
// import { IEvent } from "@/types/event";
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
import { Calendar, CheckCircle2, Edit2, Filter, Grid, List, MapPin, Plus, Search, Trash2, Users, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import moment from "moment";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Link } from "react-router";
// import { toast } from "sonner";
// import useAuthStore from "@/store/feature/authStand";
// import LoadingSolder from "@/components/loading-solder";



const MOCK_EVENTS = [
    { id: '1', name: 'Adventure Gear Show', description: 'Explore the latest in outdoor gear and tactical equipment for your next adventure. Featuring global vendors.', category: 'Outdoor & Adventure', startDate: 'June 5, 2029', endDate: 'June 7, 2029', location: 'Rocky Ridge Hall, Denver, CO', entryFee: 40, participants: 42, maxParticipants: 64, status: 'Active', isEnabled: true, imageUrl: 'https://images.unsplash.com/photo-1533632359083-0185df1be85d?auto=format&fit=crop&q=80&w=400', prizePool: 5000 },
    { id: '2', name: 'Symphony Under the Stars', description: 'A magical night of classical music played by the city symphony under the open night sky.', category: 'Music', startDate: 'Apr 20, 2029', endDate: 'Apr 20, 2029', location: 'Sunset Park, Los Angeles, CA', entryFee: 50, participants: 75, maxParticipants: 100, status: 'Active', isEnabled: true, imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?auto=format&fit=crop&q=80&w=400', prizePool: 2500 },
    { id: '3', name: 'Runway Revolution 2029', description: 'The premier fashion event of the year showcasing futuristic designs and high fashion.', category: 'Fashion', startDate: 'May 1, 2029', endDate: 'May 3, 2029', location: 'Vogue Hall, New York, NY', entryFee: 100, participants: 50, maxParticipants: 100, status: 'Active', isEnabled: false, imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400', prizePool: 10000 },
    { id: '4', name: 'Global Wellness Summit', description: 'Join industry leaders to discuss the future of health, mental wellness, and holistic living.', category: 'Health & Wellness', startDate: 'May 5, 2029', endDate: 'May 7, 2029', location: 'Wellness Arena, Miami, FL', entryFee: 75, participants: 40, maxParticipants: 100, status: 'Active', isEnabled: true, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400', prizePool: 1500 },
    { id: '5', name: 'Artistry Unveiled Expo', description: 'A contemporary art exhibition featuring local and international visual artists.', category: 'Art & Design', startDate: 'May 15, 2029', endDate: 'May 20, 2029', location: 'Modern Art Gallery, Chicago, IL', entryFee: 20, participants: 85, maxParticipants: 100, status: 'Active', isEnabled: true, imageUrl: 'https://images.unsplash.com/photo-1492691523567-6170c360df39?auto=format&fit=crop&q=80&w=400', prizePool: 2000 },
    { id: '6', name: 'Culinary Delights Festival', description: 'Taste the best dishes from world-renowned chefs in this weekend-long food celebration.', category: 'Food & Culinary', startDate: 'May 25, 2029', endDate: 'May 26, 2029', location: 'Gourmet Plaza, San Francisco, CA', entryFee: 45, participants: 60, maxParticipants: 100, status: 'Active', isEnabled: true, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', prizePool: 1200 },
];

// export default function SchedulePage() {
//     const queryClient = useQueryClient();
//     const { user, accessToken } = useAuthStore();
//     const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
//     const IsSU = user?.role === "SU";
//     const [openList, setOpenList] = useState(false)
//     const [dataOpen, setDataOpen] = useState<IEvent>({
//         id: "",
//         name: "",
//         description: "",
//         rules: [],
//         startDate: "",
//         endDate: "",
//         logo: "",
//         location: null,
//         isActive: false,
//         createdAt: "",
//         updatedAt: ""
//     })
//     const [deleteModal, setDeleteModal] = useState({
//         open: false,
//         id: ''
//     })

//     const { mutate: deleteEvents, isPending } = useMutation({
//         mutationFn: async (id: string) => {
//             const response = await deleteEvent(id, accessToken || "")
//             if (response.success) {
//                 toast.success('Berhasil hapus')
//                 queryClient.invalidateQueries({ queryKey: ['events'] })
//             } else {
//                 toast.error('Terjadi kesalahan dalam menghapus data, mungkin data masih terikat dengan turnamen')
//             }
//         }
//     })
//     const { data, isFetching, error } = useQuery({
//         queryKey: ["events"],
//         queryFn: async () => {
//             const response = await getAllEvents(accessToken || "");
//             if (response?.error) {
//                 return new Error(response.error);
//             }
//             if (response?.success) {
//                 return response.data;
//             }
//             return [];
//         }
//     })

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold text-red-500">Error</h1>
//                     <p className="text-red-500">{(error as Error).message}</p>
//                 </div>
//             </div>
//         )
//     }

//     if (isFetching) {
//         return (
//             <LoadingSolder />
//         )
//     }


//     return (
//         <div className="flex flex-col min-h-screen">
//             <main className="flex-1 container mx-auto p-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold">Event Schedule</h1>
//                     <div className="flex gap-2">
//                         {
//                             isAdmin && (
//                                 <Link to={'/apps/schedule/create'}>
//                                     <Button>
//                                         <Plus className="mr-2 h-4 w-4" /> Add Event
//                                     </Button>
//                                 </Link>
//                             )
//                         }
//                     </div>
//                 </div>

//                 <div className="flex items-center mb-6 gap-4">
//                     <div className="relative flex-1">
//                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                         <Input type="search" placeholder="Search events..." className="w-full pl-8" />
//                     </div>
//                     <Button variant="outline">
//                         <Filter className="mr-2 h-4 w-4" /> Filter
//                     </Button>
//                 </div>
//                 {
//                     isPending ? 'Loading...' : (
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Event akan datang</CardTitle>
//                                 <CardDescription>
//                                     Temukan berbagai event menarik yang akan datang di bawah ini! Jangan lewatkan kesempatan untuk berpartisipasi dalam acara-acara seru yang telah kami siapkan untuk Anda.
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                                     {data.filter((a: IEvent) => a.isActive === true).map((event: IEvent, index: number) => (
//                                         <Card key={index} className="border shadow-sm">
//                                             <CardHeader>
//                                                 <div className="flex flex-col">
//                                                     <div className="flex mx-auto">
//                                                         {
//                                                             event?.eventLogoUrl && (
//                                                                 <img src={import.meta.env.VITE_BASE_S3 +  event?.eventLogoUrl} className="w-32 h-32" />
//                                                             )
//                                                         }
//                                                     </div>
//                                                     <div>
//                                                         <CardTitle>
//                                                             {event.name}
//                                                         </CardTitle>
//                                                         <CardDescription>
//                                                             {event.description}
//                                                         </CardDescription>
//                                                     </div>
//                                                 </div>
//                                             </CardHeader>
//                                             <CardContent>
//                                                 <div className="flex-1 flex flex-col h-full">
//                                                     <div className="flex items-center gap-2 mb-2">
//                                                         <Calendar className="h-4 w-4 text-primary" />
//                                                         <div className="font-medium">
//                                                             {DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMMM yyyy')}
//                                                         </div>
//                                                         <div className="font-medium">
//                                                             - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMMM yyyy')}
//                                                         </div>
//                                                     </div>
//                                                     <p className="text-sm flex mb-4"><Stamp className="h-4 w-4 mr-4" /> Acara {event.isActive ? 'Berjalan' : 'Selesai'}</p>
//                                                     <p className="text-sm flex"><MapPin className="h-4 w-4 mr-4" /> {event.location}</p>
//                                                 </div>
//                                             </CardContent>
//                                             <CardFooter className="p-4 pt-0 flex gap-2">
//                                                 <Button size="sm" className="flex-1" onClick={() => {
//                                                     setOpenList(true)
//                                                     setDataOpen(event)
//                                                 }}>
//                                                     Syarat & Ketentuan
//                                                 </Button>
//                                             </CardFooter>
//                                             <div className="flex mt-10 justify-center gap-2">
//                                                 {isAdmin &&( <Link to={'/apps/schedule/update/' + event.id}>
//                                                     <Button variant={'outline'}>
//                                                         Edit
//                                                     </Button>
//                                                 </Link>)}
//                                                 {
//                                                     IsSU && (
//                                                         <Button variant={'outline'} onClick={() => setDeleteModal({
//                                                             id: event.id,
//                                                             open: true
//                                                         })}>
//                                                             Delete
//                                                         </Button>

//                                                     )
//                                                 }
//                                             </div>
//                                         </Card>
//                                     ))}
//                                 </div>
//                                 {
//                                     isAdmin && (
//                                         <div>
//                                             <div className="mt-10 text-2xl text-center">Disable {'Hanya admin yang bisa lihat'}</div>
//                                             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                                                 {data.filter((a: IEvent) => a.isActive === false).map((event: IEvent, index: number) => (
//                                                     <Card key={index} className="border shadow-sm opacity-10">
//                                                         <CardHeader>
//                                                             <div className="flex flex-col">
//                                                                 <div className="flex mx-auto">
//                                                                     {
//                                                                         event?.eventLogoUrl && (
//                                                                             <img src={import.meta.env.VITE_BASE_S3 +  event?.eventLogoUrl} className="w-32 h-32" />
//                                                                         )
//                                                                     }
//                                                                 </div>
//                                                                 <div>
//                                                                     <CardTitle>
//                                                                         {event.name}
//                                                                     </CardTitle>
//                                                                     <CardDescription>
//                                                                         {event.description}
//                                                                     </CardDescription>
//                                                                 </div>
//                                                             </div>
//                                                         </CardHeader>
//                                                         <CardContent>
//                                                             <div className="flex-1 flex flex-col h-full">
//                                                                 <div className="flex items-center gap-2 mb-2">
//                                                                     <Calendar className="h-4 w-4 text-primary" />
//                                                                     <div className="font-medium">
//                                                                         {DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMMM yyyy')}
//                                                                     </div>
//                                                                     <div className="font-medium">
//                                                                         - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMMM yyyy')}
//                                                                     </div>
//                                                                     <div className="text-sm text-muted-foreground">{event.isActive ? 'Aktif' : 'Selesai'}</div>
//                                                                 </div>
//                                                                 <p className="text-sm flex"><MapPin /> {event.location}</p>
//                                                             </div>
//                                                         </CardContent>
//                                                         <CardFooter className="p-4 pt-0 flex gap-2">
//                                                             <Button variant="outline" size="sm" className="flex-1" onClick={() => {
//                                                                 setOpenList(true)
//                                                                 setDataOpen(event)
//                                                             }}>
//                                                                 Syarat & Ketentuan
//                                                             </Button>
//                                                         </CardFooter>
//                                                         <div className="flex mt-10 justify-center gap-2">
//                                                             <Link to={'/apps/schedule/update/' + event.id}>
//                                                                 <Button variant={'outline'}>
//                                                                     Edit
//                                                                 </Button>
//                                                             </Link>
//                                                             {
//                                                                 IsSU && (
//                                                                     <Button variant={'outline'} onClick={() => setDeleteModal({
//                                                                         id: event.id,
//                                                                         open: true
//                                                                     })}>
//                                                                         Delete
//                                                                     </Button>

//                                                                 )
//                                                             }
//                                                         </div>
//                                                     </Card>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )
//                                 }
//                             </CardContent>
//                         </Card>
//                     )
//                 }
//             </main>

//         </div>
//     )
// }



export default function SchedulePage() {
    const queryClient = useQueryClient();
    const { user, accessToken } = useAuthStore();
    const [activeTab, setActiveTab] = useState<'Active' | 'Draft' | 'Past'>('Active');
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

                        {['Active', 'Draft', 'Past'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
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
                <div className="flex-1 min-w-[300px] relative">
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
                <div className="hidden sm:flex items-center bg-slate-200/50 dark:bg-slate-900 p-1 rounded-2xl">
                    <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Grid size={18} className="text-indigo-600 dark:text-indigo-400" /></button>
                    <button className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><List size={18} /></button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {data.map((event: IEvent) => (
                    <div
                        className={`rounded-[2rem] p-4 flex flex-col relative group
                            bg-white dark:bg-slate-800
                            border border-border
                            shadow-sm dark:shadow-none
                            ${!event.isActive ? 'opacity-60' : ''}`}>

                        {/* Image & Badges */}
                        <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                            {event.eventLogoUrl && (
                                <img src={import.meta.env.VITE_BASE_S3 + event?.eventLogoUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

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
                                <span>{DateTime.fromISO(event.startDate).setLocale('id').toFormat('DD MMM YYYY')} - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('DD MMM YYYY')}</span>
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

                            {/* <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={12} className="text-slate-400" />
                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                            {event.participants}/{event.maxParticipants}
                                        </span>
                                    </div>
                                    <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">${event.entryFee}</span>
                                </div>
                                
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000 group-hover:opacity-80"
                                        style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                    ></div>
                                </div>
                            </div> */}
                            <button size="sm" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-2xl py-2 font-bold transition-all" onClick={() => {
                                setOpenList(true)
                                setDataOpen(event)
                            }}>
                                Syarat & Ketentuan
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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
    );
}