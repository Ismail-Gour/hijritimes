/**
 * CountdownTimer - Upcoming Islamic events with expected dates
 * 
 * READS FROM: HijriContext (single source of truth)
 * Shows expected Gregorian dates for upcoming events (no real-time countdown)
 */

import { useHijri } from "@/contexts/HijriContext";
import { Calendar, Sparkles, AlertCircle, Sunset } from "lucide-react";

interface EventCardProps {
  targetDate: Date;
  eventName: string;
  eventNameAr: string;
  description: string;
  daysUntil: number;
  index: number;
  isExpected: boolean;
}

function EventCard({ targetDate, eventName, eventNameAr, description, daysUntil, index, isExpected }: EventCardProps) {
  const isHighPriority = index === 0;

  return (
    <div 
      className={`glass-card rounded-xl p-5 text-center space-y-4 transition-all duration-300 hover:shadow-lg ${
        isHighPriority ? 'ring-2 ring-gold/30 bg-gold/5' : ''
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {isHighPriority && <Sparkles className="w-4 h-4 text-gold" />}
          <h3 className="font-display text-lg text-foreground">{eventName}</h3>
          {isExpected && (
            <span className="text-[10px] bg-gold/20 text-gold-dark px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <AlertCircle className="w-2.5 h-2.5" />
              Expected
            </span>
          )}
        </div>
        <p className="text-sm font-display text-gold" dir="rtl">{eventNameAr}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      
      {/* Expected Date Display */}
      <div className="bg-primary/10 rounded-lg px-4 py-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Expected Date</p>
        <p className="text-lg font-display font-bold text-primary">
          {targetDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ~{daysUntil} day{daysUntil !== 1 ? 's' : ''} away
        </p>
      </div>

      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Sunset className="w-3 h-3 text-gold" />
        <span>Begins at Maghrib (sunset)</span>
      </div>
      
      <p className="text-[10px] text-amber-500 dark:text-amber-400 italic">
        Expected date; may vary by ±1 day depending on moon sighting.
      </p>
    </div>
  );
}

export function CountdownTimer() {
  const { upcomingEvents, isExpected } = useHijri();

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-display text-center text-foreground">
            Upcoming Events
          </h2>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          🌙 Islamic events begin at Maghrib (sunset) on the evening before the listed date
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map(({ event, gregorianDate, daysUntil }, index) => (
          <EventCard
            key={`${event.name}-${index}`}
            targetDate={gregorianDate}
            eventName={event.name}
            eventNameAr={event.nameAr}
            description={event.description}
            daysUntil={daysUntil}
            index={index}
            isExpected={isExpected}
          />
        ))}
      </div>
    </section>
  );
}
