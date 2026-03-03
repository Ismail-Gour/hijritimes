import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

export function SunPositionVisual() {
  // Fixed conceptual position showing midday for educational purposes
  const sunPosition = 50; // Noon position
  const isDay = true;
  
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-muted/30 p-4 sm:p-6">
      {/* Sky gradient background - conceptual daytime */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 transition-all duration-1000 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 dark:from-sky-900 dark:via-sky-800 dark:to-amber-900/30" />
      </div>
      
      {/* Sun arc path */}
      <div className="relative z-10 h-48 sm:h-64">
        {/* Arc path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path
            d="M 0,55 Q 50,0 100,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="2,2"
            className="text-muted-foreground/30"
          />
        </svg>
        
        {/* Sun icon at zenith position (conceptual) */}
        <div 
          className="absolute transition-all duration-1000 ease-linear"
          style={{
            left: `${sunPosition}%`,
            top: `${55 - Math.sin((sunPosition / 100) * Math.PI) * 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            <Sun className="w-10 h-10 sm:w-14 sm:h-14 text-amber-500 drop-shadow-lg" />
            <div className="absolute inset-0 w-10 h-10 sm:w-14 sm:h-14 bg-amber-400/40 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
        
        {/* Horizon line */}
        <div className="absolute bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent" />
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-emerald-800/30 to-transparent dark:from-slate-800/50 rounded-b-lg" />
        
        {/* Prayer time markers - conceptual labels only */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-2 sm:px-4 text-[10px] sm:text-xs">
          <div className="flex flex-col items-center">
            <Sunrise className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mb-1" />
            <span className="text-foreground/80 font-medium">Fajr</span>
            <span className="text-muted-foreground">True Dawn</span>
          </div>
          <div className="flex flex-col items-center">
            <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 mb-1" />
            <span className="text-foreground/80 font-medium">Sunrise</span>
            <span className="text-muted-foreground">Sun appears</span>
          </div>
          <div className="flex flex-col items-center">
            <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mb-1" />
            <span className="text-foreground/80 font-medium">Dhuhr</span>
            <span className="text-muted-foreground">After Zenith</span>
          </div>
          <div className="flex flex-col items-center">
            <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mb-1" />
            <span className="text-foreground/80 font-medium">Asr</span>
            <span className="text-muted-foreground">Shadow grows</span>
          </div>
          <div className="flex flex-col items-center">
            <Sunset className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mb-1" />
            <span className="text-foreground/80 font-medium">Maghrib</span>
            <span className="text-muted-foreground">Sun sets</span>
          </div>
          <div className="flex flex-col items-center">
            <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400 mb-1" />
            <span className="text-foreground/80 font-medium">Isha</span>
            <span className="text-muted-foreground">Twilight ends</span>
          </div>
        </div>
      </div>
      
      {/* Conceptual explanation */}
      <div className="relative z-10 mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          The sun's arc across the sky determines prayer windows
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          ☀️ Each prayer is tied to a specific position of the sun, not a clock time
        </p>
      </div>
    </div>
  );
}
