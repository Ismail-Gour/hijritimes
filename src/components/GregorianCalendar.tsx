/**
 * GregorianCalendar - Displays corresponding Gregorian dates for reference
 * Shows the Gregorian month that overlaps with the currently viewed Islamic month
 */

import { useState, useMemo } from "react";
import { useHijri } from "@/contexts/HijriContext";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GregorianCalendar() {
  const { hijri, getCalendarMonthDays, ISLAMIC_MONTHS } = useHijri();

  // Track the Islamic month being viewed (synced with HijriCalendar's default)
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>({
    year: hijri.year,
    month: hijri.month,
  });

  // Get the Gregorian month that corresponds to the start of this Islamic month
  const gregorianInfo = useMemo(() => {
    const days = getCalendarMonthDays(viewMonth.year, viewMonth.month);
    if (days.length === 0) return null;

    const firstDate = days[0].gregorianDate;
    const lastDate = days[days.length - 1].gregorianDate;

    // Build a full Gregorian month calendar for the month of the first Hijri day
    const gregYear = firstDate.getFullYear();
    const gregMonth = firstDate.getMonth();
    const daysInMonth = new Date(gregYear, gregMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(gregYear, gregMonth, 1).getDay();

    // Which Gregorian dates fall within this Islamic month?
    const hijriDatesSet = new Set(
      days.map(d => d.gregorianDate.toDateString())
    );

    const today = new Date();
    const todayStr = today.toDateString();

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(gregYear, gregMonth, i + 1);
      return {
        day: i + 1,
        date,
        isToday: date.toDateString() === todayStr,
        isInIslamicMonth: hijriDatesSet.has(date.toDateString()),
      };
    });

    return {
      year: gregYear,
      month: gregMonth,
      monthName: firstDate.toLocaleDateString("en-US", { month: "long" }),
      firstDayOfWeek,
      calendarDays,
      islamicMonthName: ISLAMIC_MONTHS[viewMonth.month - 1],
    };
  }, [viewMonth, getCalendarMonthDays, ISLAMIC_MONTHS]);

  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = viewMonth.month + (direction === "next" ? 1 : -1);
    let newYear = viewMonth.year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    else if (newMonth < 1) { newMonth = 12; newYear--; }
    setViewMonth({ year: newYear, month: newMonth });
  };

  const goToToday = () => {
    setViewMonth({ year: hijri.year, month: hijri.month });
  };

  const isViewingCurrentMonth = viewMonth.year === hijri.year && viewMonth.month === hijri.month;
  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  if (!gregorianInfo) return null;

  return (
    <section className="animate-slide-up" style={{ animationDelay: "0.45s" }}>
      <h2 className="text-xl sm:text-2xl font-display text-center mb-4 sm:mb-6 text-foreground">
        Gregorian Calendar
      </h2>

      <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-6">
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center mb-3 sm:mb-4">
          Displays corresponding Gregorian dates separately for reference purposes.
        </p>

        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")} className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10">
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-display text-foreground">
              {gregorianInfo.monthName} {gregorianInfo.year}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Islamic: {gregorianInfo.islamicMonthName} {viewMonth.year} AH
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")} className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10">
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </div>

        {/* Today button */}
        {!isViewingCurrentMonth && (
          <div className="flex justify-center mb-3 sm:mb-4">
            <Button variant="outline" size="sm" onClick={goToToday} className="text-[10px] sm:text-xs h-7 sm:h-8">
              Go to Today
            </Button>
          </div>
        )}

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-[9px] sm:text-xs font-medium text-muted-foreground py-1 sm:py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {Array.from({ length: gregorianInfo.firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {gregorianInfo.calendarDays.map(({ day, isToday, isInIslamicMonth }) => (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded-md sm:rounded-lg
                transition-all duration-200 text-xs sm:text-sm font-medium
                ${isToday
                  ? "bg-primary text-primary-foreground ring-1 sm:ring-2 ring-gold ring-offset-1 sm:ring-offset-2 ring-offset-background"
                  : isInIslamicMonth
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground"
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary/10" />
            <span>Overlaps with {gregorianInfo.islamicMonthName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Today</span>
          </div>
        </div>
      </div>
    </section>
  );
}
