/**
 * SightingConfidence - Moon sighting status and confidence indicator
 * 
 * Shows: Expected → Reported → Confirmed status with timestamps and sources
 * READS FROM: HijriContext (single source of truth)
 */

import { useHijri } from "@/contexts/HijriContext";
import { 
  Moon, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  Building2,
  Calendar,
  ChevronRight,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sighting status types
type SightingStatus = "expected" | "reported" | "confirmed";

interface SightingInfo {
  status: SightingStatus;
  confidence: number; // 0-100
  source?: string;
  timestamp?: Date;
  authority?: string;
  notes?: string;
}

// Future: This will come from API/admin panel
function getSightingInfo(hijriMonth: number, hijriYear: number): SightingInfo {
  // Currently using astronomical calculation as fallback
  return {
    status: "expected",
    confidence: 75,
    source: "Umm al-Qura Astronomical Calculation",
    authority: "Fallback - Awaiting Indian Central Committee",
    notes: "Based on astronomical prediction. Official Indian moon sighting may differ by ±1 day.",
  };
}

const STATUS_CONFIG = {
  expected: {
    label: "Expected",
    labelAr: "متوقع",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: <Clock className="w-4 h-4" />,
    description: "Based on astronomical calculation. Awaiting official confirmation.",
  },
  reported: {
    label: "Reported",
    labelAr: "مُبلَّغ",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: <Eye className="w-4 h-4" />,
    description: "Moon sighting reported. Pending verification by authority.",
  },
  confirmed: {
    label: "Confirmed",
    labelAr: "مؤكد",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: <CheckCircle2 className="w-4 h-4" />,
    description: "Officially confirmed by Indian Central Committee.",
  },
};

export function SightingConfidence() {
  const { hijri, moon, isExpected, dataSource } = useHijri();
  const [showDetails, setShowDetails] = useState(false);
  
  const sightingInfo = getSightingInfo(hijri.month, hijri.year);
  const config = STATUS_CONFIG[sightingInfo.status];

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg text-foreground">Moon Sighting Status</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">
                Islamic months begin with the sighting of the new moon. This indicator shows 
                whether the current month's start has been officially confirmed.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Current Month Card */}
      <div className={cn(
        "rounded-xl p-4 border-2 mb-6",
        config.bgColor,
        config.borderColor
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-background/50", config.color)}>
              {config.icon}
            </div>
            <div>
              <p className="font-medium text-foreground">{hijri.monthName} {hijri.year} AH</p>
              <p className="text-xs text-muted-foreground font-arabic">{hijri.monthNameAr}</p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            config.bgColor,
            config.color
          )}>
            {config.label}
          </div>
        </div>
        
        <p className="mt-3 text-sm text-muted-foreground">
          {config.description}
        </p>
      </div>

      {/* Confidence Meter */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Sighting Confidence</span>
          <span className={cn("text-sm font-bold", config.color)}>{sightingInfo.confidence}%</span>
        </div>
        
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          {/* Progress Steps */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-background/20" />
            <div className="flex-1 border-r border-background/20" />
            <div className="flex-1" />
          </div>
          
          {/* Progress Fill */}
          <div 
            className={cn(
              "h-full transition-all duration-500",
              sightingInfo.status === "confirmed" 
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                : sightingInfo.status === "reported"
                  ? "bg-gradient-to-r from-blue-500 to-blue-400"
                  : "bg-gradient-to-r from-amber-500 to-amber-400"
            )}
            style={{ width: `${sightingInfo.confidence}%` }}
          />
        </div>
        
        {/* Status Labels */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className={sightingInfo.status === "expected" ? config.color : ""}>Expected</span>
          <span className={sightingInfo.status === "reported" ? config.color : ""}>Reported</span>
          <span className={sightingInfo.status === "confirmed" ? config.color : ""}>Confirmed</span>
        </div>
      </div>

      {/* Source Information */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Data Source</span>
        </div>
        <ChevronRight className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          showDetails && "rotate-90"
        )} />
      </button>

      {showDetails && (
        <div className="mt-3 p-4 bg-muted/50 rounded-xl space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Calculation Method</p>
              <p className="text-xs text-muted-foreground">{sightingInfo.source}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Authority</p>
              <p className="text-xs text-muted-foreground">{sightingInfo.authority}</p>
            </div>
          </div>
          
          {sightingInfo.notes && (
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Important Note</p>
                <p className="text-xs text-muted-foreground">{sightingInfo.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Moon Phase Preview */}
      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Current Moon Phase</p>
            <p className="text-xs text-muted-foreground">{moon.phaseName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{Math.round(moon.illumination)}%</p>
            <p className="text-xs text-muted-foreground">illuminated</p>
          </div>
        </div>
        
        {moon.daysToNewMoon > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Next new moon (potential month start) in <strong className="text-foreground">{moon.daysToNewMoon} days</strong>
          </p>
        )}
      </div>
    </div>
  );
}
