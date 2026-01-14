import React, { useState } from 'react';
import { MapPin, Calendar, Hash, Gift, ScrollText } from 'lucide-react';
import { DateTime } from 'luxon';
import { Button } from './ui/button';
import { Link } from 'react-router';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"; // Pastikan path import benar
import { ScrollArea } from '@/components/ui/scroll-area';

interface TournamentCardProps {
    tournament: {
        id: string;
        name: string;
        desciption: string;
        image: string;
        start: string;
        location: string;
        status: string;
        eventName: string;
        rules: string[];
        prize: {
            title: string;
            value: string;
        }[]
    };
}

const statusColor: Record<string, string> = {
    UPCOMING: 'text-blue-500',
    COMPLETED: 'text-muted-foreground',
    ONGOING: 'text-green-500',
};

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    // State untuk kontrol Pop-up
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<'rules' | 'prizes'>('rules');

    const startDate = tournament.start
        ? DateTime.fromISO(tournament.start).setLocale('id').toFormat('dd LLL yyyy')
        : '-';

    const openModal = (type: 'rules' | 'prizes') => {
        setModalType(type);
        setIsOpen(true);
    };

    return (
        <>
            <div className="bg-card/50 border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 hover:border-primary/40 transition-colors font-lat2">
                <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden border border-border">
                    <img
                        src={tournament.image}
                        alt={tournament.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Hash size={12} className="text-primary" />
                            <span className="text-[10px] font-accent text-primary uppercase font-lat-2">
                                {tournament.eventName}
                            </span>
                        </div>

                        <h4 className="text-lg font-heading leading-tight mb-2 nova-square-regular">
                            {tournament.name}
                        </h4>

                        <p className="text-xs text-muted-foreground line-clamp-2 font-lat2">
                            {tournament.desciption}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-accent border-t border-border pt-2">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span>{startDate}</span>
                        </div>

                        <div className="flex items-center gap-1.5 justify-end">
                            <MapPin size={14} className="text-muted-foreground" />
                            <span className="truncate max-w-30">
                                {tournament.location}
                            </span>
                        </div>

                        <div className="col-span-2 flex items-center justify-between mt-1">
                            <span
                                className={`font-bold uppercase tracking-widest text-[10px] ${statusColor[tournament.status] ?? 'text-muted-foreground'}`}
                            >
                                {tournament.status}
                            </span>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => openModal('rules')}
                                    className="text-primary hover:underline text-[10px] tracking-widest uppercase font-bold"
                                >
                                    S & K
                                </button>
                                <button 
                                    onClick={() => openModal('prizes')}
                                    className="text-primary hover:underline text-[10px] tracking-widest uppercase font-bold"
                                >
                                    Hadiah
                                </button>
                            </div>
                        </div>
                    </div>
                    <Button className='w-full mt-2' asChild variant="default">
                        <Link to="/apps">Daftar</Link>
                    </Button>
                </div>
            </div>

            {/* Modal Pop-up */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 uppercase tracking-wider font-heading">
                            {modalType === 'rules' ? (
                                <><ScrollText className="text-primary" size={20} /> Syarat & Ketentuan</>
                            ) : (
                                <><Gift className="text-primary" size={20} /> Detail Hadiah</>
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="mt-4 max-h-[60vh] pr-4">
                        <div className="space-y-4 font-lat2 text-sm">
                            {modalType === 'rules' ? (
                                <ul className="list-disc pl-5 space-y-2">
                                    {tournament.rules?.map((rule, idx) => (
                                        <li key={idx} className="text-muted-foreground">{rule}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="space-y-3">
                                    {tournament.prize?.map((p, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border">
                                            <span className="font-bold text-primary uppercase text-xs">{p.title}</span>
                                            <span className="font-mono font-bold">{p.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TournamentCard;