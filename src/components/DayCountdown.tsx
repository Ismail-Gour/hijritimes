/**
 * DayCountdown - Gregorian & Islamic day progress
 * 
 * READS FROM: HijriContext (single source of truth)
 * NO independent calculations allowed
 */

import { useHijri } from "@/contexts/HijriContext";
import { Clock, Moon, Sun, Calendar } from "lucide-react";

function formatTimeDisplay(time: { hours: number; minutes: number; seconds: number }): string {
  return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
}

export function DayCountdown() {
  const { 
    time, 
    maghrib, 
    gregorianProgress, 
    islamicProgress 
  } = useHijri();

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      {/* Current Time Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Indian Standard Time (IST)
          </span>
        </div>
        <p className="text-3xl sm:text-4xl font-display font-bold text-foreground countdown-digit">
          {time.formatted}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Gregorian Day Section */}
        <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-3 sm:p-5 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="w-4 sm:w-5 h-4 sm:h-5 text-gold" />
            <h3 className="font-display text-base sm:text-lg text-foreground">Gregorian Day</h3>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Day started at</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">12:00 AM</span>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Time Elapsed</span>
                <span className="countdown-digit text-xs sm:text-sm text-primary">
                  {formatTimeDisplay(gregorianProgress.elapsed)}
                </span>
              </div>
              <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-1000"
                  style={{ width: `${gregorianProgress.progressPercent}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-xs sm:text-sm font-medium text-foreground">Time to Next Day</span>
              <span className="countdown-digit text-lg sm:text-xl text-primary">
                {formatTimeDisplay(gregorianProgress.remaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Islamic Day Section */}
        <div className="bg-primary/5 rounded-lg sm:rounded-xl p-3 sm:p-5 space-y-3 sm:space-y-4 border border-primary/20">
          <div className="flex items-center gap-2">
            <Moon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
            <h3 className="font-display text-base sm:text-lg text-foreground">Islamic Day</h3>
            {maghrib.hasStarted && (
              <span className="ml-auto text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Day starts at Maghrib</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">
                ~{maghrib.formatted}
              </span>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Time Elapsed</span>
                <span className="countdown-digit text-xs sm:text-sm text-primary">
                  {formatTimeDisplay(islamicProgress.elapsed)}
                </span>
              </div>
              <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-emerald-light transition-all duration-1000"
                  style={{ width: `${islamicProgress.progressPercent}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-xs sm:text-sm font-medium text-foreground">Time to Next Islamic Day</span>
              <span className="countdown-digit text-lg sm:text-xl text-primary">
                {formatTimeDisplay(islamicProgress.remaining)}
              </span>
            </div>
          </div>
          
          {!maghrib.hasStarted && (
            <div className="bg-gold/10 rounded-lg p-2 sm:p-3 mt-2">
              <p className="text-[10px] sm:text-xs text-gold-dark flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                <span>Islamic date will change at Maghrib (~{maghrib.formatted})</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
