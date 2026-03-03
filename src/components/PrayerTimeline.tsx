import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineSegment {
  id: string;
  name: string;
  widthPercent: number;
  color: string;
  isForbidden?: boolean;
  isMakruh?: boolean;
}

export function PrayerTimeline() {
  // Conceptual timeline segments (approximate proportions for educational purposes)
  const segments: TimelineSegment[] = [
    { id: 'night-1', name: 'Night (Isha continues)', widthPercent: 20, color: 'bg-indigo-900/50' },
    { id: 'fajr', name: 'Fajr', widthPercent: 5, color: 'bg-orange-500/60' },
    { id: 'sunrise-forbidden', name: 'Forbidden (Sunrise)', widthPercent: 2, color: 'bg-red-500/60', isForbidden: true },
    { id: 'pre-dhuhr', name: 'Before Dhuhr', widthPercent: 20, color: 'bg-yellow-200/30' },
    { id: 'zenith-forbidden', name: 'Forbidden (Zenith)', widthPercent: 1, color: 'bg-red-500/60', isForbidden: true },
    { id: 'dhuhr', name: 'Dhuhr', widthPercent: 15, color: 'bg-yellow-500/60' },
    { id: 'asr', name: 'Asr', widthPercent: 12, color: 'bg-orange-400/60' },
    { id: 'sunset-makruh', name: 'Makruh (Sun yellowing)', widthPercent: 3, color: 'bg-amber-600/60', isMakruh: true },
    { id: 'maghrib', name: 'Maghrib', widthPercent: 7, color: 'bg-red-600/60' },
    { id: 'isha', name: 'Isha', widthPercent: 15, color: 'bg-indigo-600/60' },
  ];
  
  return (
    <div className="space-y-4">
      {/* Educational Note */}
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-muted/50 border-border">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500" />
        <div>
          <p className="font-medium text-sm">Conceptual Timeline</p>
          <p className="text-sm text-muted-foreground">
            This shows the relative flow of prayer times throughout a day. Actual durations vary by location and season.
          </p>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Time labels */}
        <div className="flex justify-between text-xs text-muted-foreground mb-2 px-1">
          <span>Midnight</span>
          <span>Noon</span>
          <span>Midnight</span>
        </div>
        
        <div className="flex h-12 rounded-lg overflow-hidden border border-border">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className={cn(
                "relative flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all",
                segment.color,
                segment.isForbidden && "bg-stripes-red",
                segment.isMakruh && "bg-stripes-amber"
              )}
              style={{ width: `${segment.widthPercent}%` }}
              title={segment.name}
            >
              <span className="hidden sm:inline text-foreground/90 truncate px-1">
                {segment.name}
              </span>
              {segment.isForbidden && (
                <AlertTriangle className="w-3 h-3 sm:hidden text-destructive" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-orange-500/60" />
          <span className="text-muted-foreground">Fajr</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-yellow-500/60" />
          <span className="text-muted-foreground">Dhuhr</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-orange-400/60" />
          <span className="text-muted-foreground">Asr</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-600/60" />
          <span className="text-muted-foreground">Maghrib</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-indigo-600/60" />
          <span className="text-muted-foreground">Isha</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-500/60 bg-stripes-red" />
          <span className="text-muted-foreground">Forbidden</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-600/60" />
          <span className="text-muted-foreground">Makruh</span>
        </div>
      </div>
      
      {/* Daily Flow Explanation */}
      <div className="bg-muted/30 rounded-lg p-4 text-sm">
        <h4 className="font-medium mb-2">Daily Prayer Flow</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
          <p>• <strong>Fajr:</strong> True dawn until sunrise</p>
          <p>• <strong>Dhuhr:</strong> After zenith until shadow = object</p>
          <p>• <strong>Asr:</strong> After Dhuhr until sunset</p>
          <p>• <strong>Maghrib:</strong> Sunset until twilight fades</p>
          <p>• <strong>Isha:</strong> After twilight until midnight/dawn</p>
        </div>
      </div>
    </div>
  );
}
