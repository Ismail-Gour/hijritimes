/**
 * HijriCalendar - Monthly calendar view with Islamic day overlap breakdown
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * READS FROM: HijriContext (single source of truth)
 * ❌ NO INDEPENDENT CALCULATIONS ALLOWED
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Uses context for:
 * - Current Hijri date
 * - Calendar grid generation (hijriToGregorianDate, getCalendarMonthDays)
 * - Previous date calculation (getPreviousIslamicDate)
 * - Month navigation uses the same calculation engine
 * 
 * Clicking on any date shows the Islamic day overlap breakdown
 * (how one Gregorian date contains parts of two Islamic days)
 */

import { useState, useMemo } from "react";
import { useHijri, type CalendarDay } from "@/contexts/HijriContext";
import { ChevronLeft, ChevronRight, AlertCircle, Sunrise, Sunset } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Selected date info for dialog
interface SelectedDateInfo {
  hijriDay: number;
  hijriMonth: number;
  hijriMonthName: string;
  hijriYear: number;
  gregorianDate: Date;
  isToday: boolean;
}

export function HijriCalendar() {
  const { 
    hijri, 
    isExpected,
    maghrib,
    getHijriMonthDays,
    getCalendarMonthDays,
    getPreviousIslamicDate,
    ISLAMIC_MONTHS, 
    ISLAMIC_MONTHS_AR, 
    DAYS_OF_WEEK,
    ISLAMIC_EVENTS 
  } = useHijri();
  
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>({
    year: hijri.year,
    month: hijri.month,
  });
  
  const [selectedDate, setSelectedDate] = useState<SelectedDateInfo | null>(null);

  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = viewMonth.month + (direction === "next" ? 1 : -1);
    let newYear = viewMonth.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setViewMonth({ year: newYear, month: newMonth });
  };

  const goToToday = () => {
    setViewMonth({ year: hijri.year, month: hijri.month });
  };

  // Generate calendar days using CONTEXT FUNCTION (no independent calculation)
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const days = getCalendarMonthDays(viewMonth.year, viewMonth.month);
    
    // Update isToday to reflect current Hijri date from context
    return days.map(day => ({
      ...day,
      isToday: viewMonth.year === hijri.year && 
               viewMonth.month === hijri.month && 
               day.hijriDay === hijri.day
    }));
  }, [viewMonth, hijri, getCalendarMonthDays]);

  // Get events for viewed month
  const monthEvents = useMemo(() => {
    return ISLAMIC_EVENTS.filter((event) => event.month === viewMonth.month);
  }, [viewMonth.month, ISLAMIC_EVENTS]);

  // Get the day of week for the first day of the month
  const firstDayOfWeek = useMemo(() => {
    if (calendarDays.length === 0) return 0;
    return calendarDays[0].gregorianDate.getDay();
  }, [calendarDays]);

  const isViewingCurrentMonth = viewMonth.year === hijri.year && viewMonth.month === hijri.month;

  // Handle date click to show overlap breakdown
  const handleDateClick = (hijriDay: number, gregorianDate: Date, isToday: boolean) => {
    setSelectedDate({
      hijriDay,
      hijriMonth: viewMonth.month,
      hijriMonthName: ISLAMIC_MONTHS[viewMonth.month - 1],
      hijriYear: viewMonth.year,
      gregorianDate,
      isToday,
    });
  };

  return (
    <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <h2 className="text-xl sm:text-2xl font-display text-center mb-4 sm:mb-6 text-foreground">
        Islamic Calendar
      </h2>

      <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-6">
        {/* Expected badge */}
        {isExpected && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-[10px] sm:text-xs text-gold-dark bg-gold/10 rounded-lg py-1.5 sm:py-2 px-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>Expected date; may vary by ±1 day depending on moon sighting.</span>
          </div>
        )}

        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-display text-foreground">
              {ISLAMIC_MONTHS[viewMonth.month - 1]}
            </h3>
            <p className="text-xs sm:text-sm font-display text-gold" dir="rtl">
              {ISLAMIC_MONTHS_AR[viewMonth.month - 1]}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {viewMonth.year} AH
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </div>

        {/* Today button */}
        {!isViewingCurrentMonth && (
          <div className="flex justify-center mb-3 sm:mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-[10px] sm:text-xs h-7 sm:h-8"
            >
              Go to Today
            </Button>
          </div>
        )}

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-[9px] sm:text-xs font-medium text-muted-foreground py-1 sm:py-2"
            >
              {day.slice(0, 2)}
            </div>
          ))}
        </div>

        {/* Calendar grid - Hijri dates with corresponding Gregorian dates */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-[60px] sm:min-h-[72px]" />
          ))}

          {calendarDays.map(({ hijriDay, gregorianDate, isToday }) => {
            const hasEvent = monthEvents.some((event) => event.day === hijriDay);
            const isFriday = gregorianDate.getDay() === 5;
            // hijriToGregorianDate returns the daytime Gregorian date for this Hijri day
            // The Islamic day starts at Maghrib of the PREVIOUS Gregorian evening
            const eveningStartDate = new Date(gregorianDate);
            eveningStartDate.setDate(eveningStartDate.getDate() - 1);
            const daytimeDate = gregorianDate;

            return (
              <button
                key={hijriDay}
                onClick={() => handleDateClick(hijriDay, gregorianDate, isToday)}
                className={`
                  min-h-[60px] sm:min-h-[72px] flex flex-col items-center justify-center rounded-md sm:rounded-lg
                  transition-all duration-200 cursor-pointer relative p-0.5 sm:p-1
                  hover:ring-1 sm:hover:ring-2 hover:ring-primary/50
                  ${isToday 
                    ? "bg-primary text-primary-foreground ring-1 sm:ring-2 ring-gold ring-offset-1 sm:ring-offset-2 ring-offset-background" 
                    : isFriday 
                      ? "bg-gold/10 hover:bg-gold/20" 
                      : "hover:bg-muted"
                  }
                `}
              >
                {/* Hijri Day */}
                <span
                  className={`text-sm sm:text-base font-bold leading-tight ${
                    isToday ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {hijriDay}
                </span>
                {/* Gregorian dates: 🌙 evening start, ☀️ daytime continuation */}
                <div className={`text-[8px] sm:text-[10px] leading-tight mt-0.5 ${
                  isToday ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  <span title="Evening (Maghrib start)">🌙 {eveningStartDate.getDate()}</span>
                  <span className="mx-0.5">·</span>
                  <span title="Daytime continuation">☀️ {daytimeDate.getDate()}</span>
                </div>
                {hasEvent && (
                  <div
                    className={`absolute bottom-0.5 sm:bottom-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gold`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint text */}
        <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
          💡 Click on any date to see how Islamic days overlap with Gregorian dates
        </p>

        {/* Events for this month */}
        {monthEvents.length > 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
            <p className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">
              Events this month
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              {monthEvents.map((event) => (
                <div
                  key={event.name}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
                >
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-medium text-gold-dark">
                      {event.day}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground truncate">{event.name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date Overlap Dialog */}
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              📅 Islamic Day Overlap Breakdown
            </DialogTitle>
          </DialogHeader>
          
          {selectedDate && (
            <div className="space-y-4">
              {/* Gregorian Date */}
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Gregorian Date</p>
                <p className="text-lg font-medium text-foreground">
                  {selectedDate.gregorianDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Two-Part Breakdown */}
              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground">
                  This Gregorian date contains parts of <strong className="text-foreground">two Islamic days</strong>:
                </p>

                {/* Before Maghrib - uses context function */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunrise className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-foreground">Before Maghrib (12:00 AM – ~{maghrib.formatted})</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Islamic Date: </span>
                      <span className="text-indigo-400 font-medium">
                        {getPreviousIslamicDate(selectedDate.hijriDay, selectedDate.hijriMonth, selectedDate.hijriYear).day}{" "}
                        {getPreviousIslamicDate(selectedDate.hijriDay, selectedDate.hijriMonth, selectedDate.hijriYear).monthName}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">Status: End of this Islamic day</p>
                  </div>
                </div>

                {/* After Maghrib */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunset className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-foreground">After Maghrib (~{maghrib.formatted} – 11:59 PM)</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Islamic Date: </span>
                      <span className="text-emerald-400 font-medium">
                        {selectedDate.hijriDay} {selectedDate.hijriMonthName}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">Status: New Islamic day begins</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="text-xs text-center text-muted-foreground p-2 bg-muted/30 rounded">
                💡 Islamic dates change at Maghrib (sunset), not at midnight.
                {selectedDate.isToday && " This is today's date."}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
