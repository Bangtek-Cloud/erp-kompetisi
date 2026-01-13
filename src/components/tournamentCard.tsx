import React from 'react';
import { MapPin, Calendar, Hash } from 'lucide-react';
import { DateTime } from 'luxon';

interface TournamentCardProps {
    tournament: any;
}

const statusColor: Record<string, string> = {
    UPCOMING: 'text-blue-500',
    COMPLETED: 'text-muted-foreground',
    ONGOING: 'text-green-500',
};

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    const startDate = tournament.start
        ? DateTime.fromISO(tournament.start).toFormat('dd LLL yyyy')
        : '-';

    return (
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
                            className={`font-bold uppercase tracking-widest text-[10px] ${
                                statusColor[tournament.status] ?? 'text-muted-foreground'
                            }`}
                        >
                            {tournament.status}
                        </span>

                        <button className="text-primary hover:underline text-[10px] tracking-widest">
                            DETAILS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentCard;
