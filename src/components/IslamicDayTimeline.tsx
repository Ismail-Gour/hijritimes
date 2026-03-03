/**
 * IslamicDayTimeline - Visual timeline showing Islamic day phases
 * 
 * Displays: Sunset → Night → Dawn → Day with real-time position indicator
 * READS FROM: HijriContext (single source of truth)
 */

import { useHijri } from "@/contexts/HijriContext";
import { Sunset, Moon, Sunrise, Sun, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelinePhase {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  startHour: number; // 0-24 relative to Maghrib
  endHour: number;
  color: string;
  bgColor: string;
}

const PHASES: TimelinePhase[] = [
  {
    id: "sunset",
    name: "Sunset (Maghrib)",
    nameAr: "المغرب",
    icon: <Sunset className="w-4 h-4" />,
    startHour: 0,
    endHour: 1.5,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-gradient-to-r from-orange-500/20 to-amber-500/20",
  },
  {
    id: "night",
    name: "Night (Layl)",
    nameAr: "الليل",
    icon: <Moon className="w-4 h-4" />,
    startHour: 1.5,
    endHour: 12,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20",
  },
  {
    id: "dawn",
    name: "Dawn (Fajr)",
    nameAr: "الفجر",
    icon: <Sunrise className="w-4 h-4" />,
    startHour: 12,
    endHour: 13.5,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-gradient-to-r from-rose-500/20 to-pink-500/20",
  },
  {
    id: "day",
    name: "Day (Nahar)",
    nameAr: "النهار",
    icon: <Sun className="w-4 h-4" />,
    startHour: 13.5,
    endHour: 24,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
  },
];

export function IslamicDayTimeline() {
  const { maghrib, islamicProgress, hijri } = useHijri();
  
  // Calculate current position in the 24-hour Islamic day (Maghrib to Maghrib)
  const hoursSinceMaghrib = islamicProgress.elapsed.totalSeconds / 3600;
  const progressPercent = Math.min((hoursSinceMaghrib / 24) * 100, 100);
  
  // Determine current phase
  const currentPhase = PHASES.find(
    (phase) => hoursSinceMaghrib >= phase.startHour && hoursSinceMaghrib < phase.endHour
  ) || PHASES[0];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <h3 className="font-display text-base sm:text-lg text-foreground">Islamic Day Timeline</h3>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {hijri.day} {hijri.monthName} {hijri.year} AH
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground font-arabic">{hijri.monthNameAr}</p>
        </div>
      </div>

      {/* Current Phase Highlight */}
      <div className={cn("rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6", currentPhase.bgColor)}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={cn("p-1.5 sm:p-2 rounded-lg bg-background/50", currentPhase.color)}>
            {currentPhase.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("font-medium text-sm sm:text-base truncate", currentPhase.color)}>{currentPhase.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-arabic">{currentPhase.nameAr}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs sm:text-sm font-medium text-foreground">
              {Math.floor(hoursSinceMaghrib)}h {Math.floor((hoursSinceMaghrib % 1) * 60)}m
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">since Maghrib</p>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="space-y-2 sm:space-y-3">
        {/* Progress Bar */}
        <div className="relative h-10 sm:h-12 bg-muted/50 rounded-lg sm:rounded-xl overflow-hidden">
          {/* Phase Backgrounds */}
          {PHASES.map((phase) => {
            const left = (phase.startHour / 24) * 100;
            const width = ((phase.endHour - phase.startHour) / 24) * 100;
            return (
              <div
                key={phase.id}
                className={cn(
                  "absolute top-0 h-full transition-opacity",
                  phase.bgColor,
                  currentPhase.id === phase.id ? "opacity-100" : "opacity-40"
                )}
                style={{ left: `${left}%`, width: `${width}%` }}
              />
            );
          })}
          
          {/* Progress Indicator */}
          <div 
            className="absolute top-0 h-full w-0.5 sm:w-1 bg-primary shadow-lg transition-all duration-1000 z-10"
            style={{ left: `${progressPercent}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-primary border-2 border-background animate-pulse" />
          </div>
          
          {/* Phase Icons - hidden on very small screens */}
          {PHASES.map((phase) => {
            const position = ((phase.startHour + phase.endHour) / 2 / 24) * 100;
            return (
              <div
                key={phase.id}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 hidden xs:flex items-center justify-center",
                  currentPhase.id === phase.id ? phase.color : "text-muted-foreground"
                )}
                style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
              >
                {phase.icon}
              </div>
            );
          })}
        </div>

        {/* Time Labels - responsive */}
        <div className="flex justify-between text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground">
          <span>Maghrib</span>
          <span className="hidden xs:inline">Midnight</span>
          <span>Fajr</span>
          <span className="hidden xs:inline">Noon</span>
          <span className="hidden sm:inline">Next Maghrib</span>
          <span className="sm:hidden">Next</span>
        </div>
      </div>

      {/* Phase Legend - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {PHASES.map((phase) => (
          <div
            key={phase.id}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg transition-all",
              currentPhase.id === phase.id 
                ? cn(phase.bgColor, "ring-1 ring-primary/20") 
                : "opacity-60"
            )}
          >
            <span className={cn(phase.color, "[&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4")}>{phase.icon}</span>
            <span className="text-[10px] sm:text-xs font-medium text-foreground">{phase.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Educational Note */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl border border-primary/10">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Understanding Islamic Time:</span> Unlike the Gregorian day 
          which starts at midnight, the Islamic day begins at <strong>Maghrib (sunset)</strong>. This is why 
          Islamic events like Laylat al-Qadr and Eid nights begin in the evening, not at midnight.
        </p>
      </div>
    </div>
  );
}
