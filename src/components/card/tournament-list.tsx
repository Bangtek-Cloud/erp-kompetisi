import { TournamentProps } from "@/types/tournament";
import { Calendar, Gift, Users } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuthStore from "@/store/feature/authStand";

interface TournamentListProps {
    tournament: TournamentProps;
    openPrize: (prize: { title: string; value: string }[]) => void;
    openTerms: (term: string[]) => void;
    isAdmin?: boolean;
    isDisable?: boolean;
}

export default function TournamentList({
    tournament,
    openPrize,
    openTerms,
    isAdmin,
    isDisable
}: TournamentListProps) {
    const { user } = useAuthStore()
    const navigate = useNavigate()
    if (!tournament) return null;

    return (
        <div
            key={tournament.id}
            className={`bg-card rounded-[2.5rem] overflow-hidden flex flex-col ${!tournament.isActive ? 'disabled-card' : ''} group`}
        >
            <div className="relative h-56 w-full">
                <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover group-hover:blur-lg transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-primary text-white backdrop-blur rounded-lg text-[10px] font-black uppercase text-slate-900 dark:text-white">
                        {tournament.status}
                    </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                        <h3 className="text font-extrabold tracking-tight text-xs">{tournament.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-indigo-400">
                            <Calendar size={12} />
                            {DateTime.fromISO(tournament.start).setLocale('id').toFormat('d MMM yyyy')} - {DateTime.fromISO(tournament.end).setLocale('id').toFormat('d MMM yyyy')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-bold nova-square-regular">
                    {tournament.eventName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3
                 h-10 leading-relaxed">
                    {tournament.desciption}
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-lat2 mb-6">
                    Event : {tournament.eventName}
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            <Users size={14} />
                            Capacity
                        </div>
                        <span className="font-black text-slate-900 dark:text-white mono">
                            {tournament.participan} / {!tournament.maxParticipan ? "∞" : tournament.maxParticipan}
                        </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(79,70,229,0.5)]"
                            style={{ width: `${(tournament.participan / (!tournament.maxParticipan ? 1000 : tournament.maxParticipan)) * 100}%` }}
                        />
                    </div>
                </div>




                {
                    tournament.status === "COMPLETED" ? (
                        <Button disabled size={'sm'} variant={'default'} className="mb-4 text-xs">
                            Selesai
                        </Button>
                    ) : (!tournament.maxParticipan ? 9999 : tournament.maxParticipan) === tournament.participan ? (
                        <Button size="sm" disabled>
                            Penuh
                        </Button>
                    ) : isDisable ? (
                        <Button size="sm" disabled>
                            Daftar
                        </Button>
                    ) : user?.usingAvatar ? (
                        <Button size="sm" asChild className="mb-4 text-xs">
                            <Link to={`/apps/tournament/register/${tournament.id}`}>
                                <Button size="sm">
                                    Daftar
                                </Button>
                            </Link>
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => {
                            toast.error('Masukan terlebih dahulu foto profil Anda, untuk dijadikan ID Card, Anda akan diarahkan ke pengaturan profil dalam 4 detik');
                            setTimeout(() => {
                                navigate('/apps/settings');
                            }, 4000);
                        }} className="mb-4 text-xs">
                            Daftar
                        </Button>
                    )
                }

                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Button size={'sm'} variant={'outline'} className="text-xs flex" onClick={() => openTerms(tournament.rules || [])}>
                        Syarat & Ketentuan
                    </Button>
                    <Button size={'sm'} onClick={() => openPrize(tournament.prize)}>
                        <Gift size={14} />
                        Hadiah
                    </Button>
                </div>
            </div>

            {isAdmin && (

                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex gap-4">
                        <Link to={`/apps/tournament/update/${tournament.id}`}
                            className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase">Edit</Link>                    </div>
                    <Button variant={'ghost'} asChild>
                        <Link to={`/apps/tournament/user/${tournament.id}`}>
                            Lihat Partisipan
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
