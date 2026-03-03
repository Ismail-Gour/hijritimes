/**
 * DataSourceBadge - Shows the current data source and authority
 * 
 * Transparent communication about where dates come from
 * READS FROM: HijriContext
 */

import { useHijri } from "@/contexts/HijriContext";
import { 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DataSourceBadge() {
  const { isExpected, dataSource } = useHijri();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-help transition-colors",
              isExpected 
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" 
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            )}
          >
            {isExpected ? (
              <AlertCircle className="w-3 h-3" />
            ) : (
              <CheckCircle2 className="w-3 h-3" />
            )}
            <span>{isExpected ? "Expected" : "Confirmed"}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Data Source</span>
            </div>
            <p className="text-sm text-muted-foreground">{dataSource}</p>
            {isExpected && (
              <p className="text-xs text-amber-500">
                ⚠️ Official Indian moon sighting may differ by ±1 day
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Full Data Source Card for detailed display
 */
export function DataSourceCard() {
  const { isExpected, dataSource, maghrib } = useHijri();

  return (
    <div className={cn(
      "rounded-xl p-4 border",
      isExpected 
        ? "bg-amber-500/5 border-amber-500/20" 
        : "bg-emerald-500/5 border-emerald-500/20"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          isExpected ? "bg-amber-500/10" : "bg-emerald-500/10"
        )}>
          {isExpected ? (
            <AlertCircle className={cn("w-4 h-4", "text-amber-500")} />
          ) : (
            <CheckCircle2 className={cn("w-4 h-4", "text-emerald-500")} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-foreground">
              {isExpected ? "Expected Date" : "Confirmed Date"}
            </p>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              isExpected 
                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" 
                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            )}>
              {isExpected ? "Astronomical" : "Official"}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">
            {dataSource}
          </p>
          
          {isExpected && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Awaiting Indian Central Committee confirmation
            </p>
          )}
        </div>
      </div>
      
      {/* Authority Info */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground">Authority</p>
            <p className="font-medium text-foreground">Indian Moon Sighting</p>
          </div>
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium text-foreground">Hyderabad, India (IST)</p>
          </div>
          <div>
            <p className="text-muted-foreground">Day Change</p>
            <p className="font-medium text-foreground">Maghrib (~{maghrib.formatted})</p>
          </div>
          <div>
            <p className="text-muted-foreground">Method</p>
            <p className="font-medium text-foreground">Local Sighting</p>
          </div>
        </div>
      </div>
    </div>
  );
}
