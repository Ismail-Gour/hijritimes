/**
 * DateDisplay - Main date display component
 * 
 * READS FROM: HijriContext (single source of truth)
 * NO independent calculations allowed
 */

import { useHijri, IslamicDayExplanation } from "@/contexts/HijriContext";
import { MoonPhase } from "./MoonPhase";
import { Calendar, Star } from "lucide-react";

export function DateDisplay() {
  const { hijri, gregorian, time, maghrib } = useHijri();

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
        {/* Hijri Date - Primary */}
        <div className="text-center md:text-left space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 flex-wrap">
            <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gold" />
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Islamic Date
            </p>
            {maghrib.hasStarted && (
              <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary">
              {hijri.day}
            </p>
            <p className="text-lg sm:text-xl font-display text-primary">
              {hijri.monthName}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground">
              {hijri.year} AH
            </p>
            <p className="text-base sm:text-lg font-display text-gold" dir="rtl">
              {hijri.monthNameAr}
            </p>
          </div>
        </div>

        {/* Moon Phase - Center */}
        <div className="flex flex-col items-center justify-center py-2 sm:py-4 order-first md:order-none">
          <MoonPhase />
          <div className="mt-3 sm:mt-4 text-center">
            <p className="countdown-digit text-xl sm:text-2xl md:text-3xl text-foreground">
              {time.formatted}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {gregorian.dayOfWeek}
            </p>
            <p className="text-[10px] sm:text-xs font-display text-gold mt-1" dir="rtl">
              {gregorian.dayOfWeekAr}
            </p>
          </div>
        </div>

        {/* Gregorian Date - Secondary */}
        <div className="text-center md:text-right space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center md:justify-end gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-muted-foreground" />
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Gregorian Date
            </p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground/80">
              {gregorian.day}
            </p>
            <p className="text-base sm:text-lg text-foreground/70">
              {gregorian.monthName}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              {gregorian.year} CE
            </p>
          </div>
        </div>
      </div>
      
      {/* Explanation Panel */}
      <div className="mt-6 pt-4 border-t border-border">
        <IslamicDayExplanation />
      </div>
    </div>
  );
}
