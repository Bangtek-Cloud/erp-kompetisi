
import React from 'react';
import { MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';
import { DateTime } from 'luxon';
import { NewIEvent } from '@/types/event';

interface EventCardProps {
  event: NewIEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

  return (
    <div className="group bg-card border-2 border-border rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
      <div className="relative h-56 sm:h-64 md:h-52 lg:h-64 overflow-hidden">
        <img
          src={event.eventLogoUrl}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 bf">
          <div className="nova-square-regular flex items-center gap-2 text-primary font-accent text-[9px] uppercase tracking-widest mb-1 drop-shadow-lg bg-primary text-primary-foreground max-w-1/2">
            <Layers size={12} className="fill-primary" /> {event.tournament} TOURNAMENTS
          </div>
          <h3 className="nova-square-regular text md:text-xl font-heading text-white tracking-tight leading-tight ">{event.name}</h3>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground font-accent line-clamp-3 leading-relaxed mb-6 font-lat2">
          {event.description}
        </p>

        <div className="mt-auto space-y-4 pt-6 border-t border-border nova-square-regular">
          <div className="flex items-center gap-3 text-[11px] font-accent text-foreground uppercase tracking-wider">
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
              <Calendar size={14} />
            </div>
            <span>{DateTime.fromISO(event.startDate).setLocale('id').toFormat('d MMM yyyy')} - {DateTime.fromISO(event.endDate).setLocale('id').toFormat('d MMM yyyy')}</span>

          </div>
          <div className="flex items-center gap-3 text-[11px] font-accent text-foreground uppercase tracking-wider">
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
              <MapPin size={14} />
            </div>
            <span className="truncate">{event.location}</span>
          </div>

          <button className="font-lat1 w-full py-3.5 rounded-2xl bg-muted border border-border font-heading text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-[0.98]">
            JOIN COMPETITION <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
