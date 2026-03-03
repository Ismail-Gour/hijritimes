/**
 * GregorianIslamicOverlap - Visual explanation of how Islamic days fit within Gregorian dates
 * 
 * READS FROM: HijriContext (single source of truth)
 * NO independent calculations allowed
 * 
 * Purpose: Educate users that one Gregorian date (midnight → midnight) 
 * can contain parts of TWO different Islamic days (Maghrib-based)
 */

import { useState } from "react";
import { useHijri } from "@/contexts/HijriContext";
import { 
  ChevronDown, 
  ChevronUp, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Info,
  Clock,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function GregorianIslamicOverlap() {
  const { hijri, gregorian, maghrib, time } = useHijri();
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  // Calculate the Islamic date BEFORE Maghrib today (previous Islamic day)
  const islamicDayBefore = maghrib.hasStarted 
    ? { day: hijri.day - 1 > 0 ? hijri.day - 1 : getLastDayOfPrevMonth(), month: hijri.day - 1 > 0 ? hijri.month : getPrevMonth(), monthName: hijri.day - 1 > 0 ? hijri.monthName : getPrevMonthName() }
    : { day: hijri.day, month: hijri.month, monthName: hijri.monthName };
  
  // Calculate the Islamic date AFTER Maghrib today (current/new Islamic day)
  const islamicDayAfter = maghrib.hasStarted 
    ? { day: hijri.day, month: hijri.month, monthName: hijri.monthName }
    : { day: hijri.day + 1, month: hijri.month, monthName: hijri.monthName };

  // Helper functions for month wrapping
  function getPrevMonth() {
    return hijri.month === 1 ? 12 : hijri.month - 1;
  }

  function getPrevMonthName() {
    const months = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul Qa'dah", "Dhul Hijjah"];
    return months[getPrevMonth() - 1];
  }

  function getLastDayOfPrevMonth() {
    // Approximate - Islamic months alternate 30/29 days
    const prevMonth = getPrevMonth();
    return prevMonth % 2 === 1 ? 30 : 29;
  }

  // Calculate current position on timeline (0-100%)
  const currentHour = time.current.getHours();
  const currentMinute = time.current.getMinutes();
  const totalMinutes = currentHour * 60 + currentMinute;
  const dayProgress = (totalMinutes / (24 * 60)) * 100;

  // Maghrib position on timeline (approximate 5:45 PM = 17:45)
  const maghribHour = maghrib.time.getHours();
  const maghribMinute = maghrib.time.getMinutes();
  const maghribMinutes = maghribHour * 60 + maghribMinute;
  const maghribPosition = (maghribMinutes / (24 * 60)) * 100;

  return (
    <section className="animate-slide-up" style={{ animationDelay: "0.35s" }}>
      <h2 className="text-2xl font-display text-center mb-6 text-foreground">
        How Islamic Days Fit Inside a Gregorian Date
      </h2>

      <div className="glass-card rounded-xl p-6 space-y-6">
        {/* Core Concept Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="space-y-2">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>The Gregorian calendar</strong> counts days from midnight to midnight.{" "}
                <strong>The Islamic calendar</strong> counts days from sunset to sunset.
              </p>
              <p className="text-sm text-muted-foreground">
                Because of this, <strong className="text-primary">one Gregorian date can include two Islamic days</strong>. 
                This is normal, correct, and religiously accurate.
              </p>
            </div>
          </div>
        </div>

        {/* Daily Overlap Visual Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              Today's Overlap Timeline
            </h3>
            <span className="text-xs text-muted-foreground">
              {gregorian.dayOfWeek}, {gregorian.day} {gregorian.monthName} {gregorian.year}
            </span>
          </div>

          {/* Timeline Visual */}
          <div className="relative bg-muted/30 rounded-xl p-4 overflow-hidden">
            {/* Time labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>12:00 AM</span>
              <span>Maghrib ~{maghrib.formatted}</span>
              <span>11:59 PM</span>
            </div>

            {/* Main Timeline Bar */}
            <div className="relative h-16 rounded-lg overflow-hidden flex">
              {/* Before Maghrib Section */}
              <div 
                className="bg-gradient-to-r from-indigo-500/30 to-indigo-600/40 flex items-center justify-center relative"
                style={{ width: `${maghribPosition}%` }}
              >
                <div className="text-center px-2">
                  <p className="text-xs font-medium text-indigo-200">
                    {islamicDayBefore.day} {islamicDayBefore.monthName}
                  </p>
                  <p className="text-[10px] text-indigo-300/80">Islamic day continues</p>
                </div>
              </div>

              {/* Maghrib Divider */}
              <div className="absolute top-0 bottom-0 w-1 bg-gold shadow-lg shadow-gold/50 z-10 flex items-start justify-center"
                   style={{ left: `${maghribPosition}%`, transform: 'translateX(-50%)' }}>
                <div className="absolute -top-6 bg-gold text-gold-foreground text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                  MAGHRIB
                </div>
              </div>

              {/* After Maghrib Section */}
              <div 
                className="bg-gradient-to-r from-emerald-600/40 to-emerald-500/30 flex items-center justify-center"
                style={{ width: `${100 - maghribPosition}%` }}
              >
                <div className="text-center px-2">
                  <p className="text-xs font-medium text-emerald-200">
                    {islamicDayAfter.day} {islamicDayAfter.monthName}
                  </p>
                  <p className="text-[10px] text-emerald-300/80">New Islamic day begins</p>
                </div>
              </div>
            </div>

            {/* Current Time Indicator */}
            <div 
              className="absolute top-[52px] w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg transition-all duration-1000"
              style={{ left: `calc(${dayProgress}% - 6px)` }}
            >
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                  NOW
                </span>
              </div>
            </div>

            {/* Timeline Icons */}
            <div className="flex justify-between mt-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Moon className="w-4 h-4" />
                <span className="text-xs">Midnight</span>
              </div>
              <div className="flex items-center gap-1">
                <Sunset className="w-4 h-4 text-gold" />
                <span className="text-xs text-gold">Sunset</span>
              </div>
              <div className="flex items-center gap-1">
                <Moon className="w-4 h-4" />
                <span className="text-xs">Midnight</span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            maghrib.hasStarted 
              ? "bg-emerald-500/10 border border-emerald-500/20" 
              : "bg-indigo-500/10 border border-indigo-500/20"
          }`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {maghrib.hasStarted ? (
                <>
                  You are now in <span className="text-emerald-400">{hijri.day} {hijri.monthName}</span> (new Islamic day started at Maghrib)
                </>
              ) : (
                <>
                  Currently in <span className="text-indigo-400">{hijri.day} {hijri.monthName}</span> • New Islamic day begins at Maghrib (~{maghrib.formatted})
                </>
              )}
            </span>
          </div>
        </div>

        {/* Detailed Day Breakdown Toggle */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <span className="text-sm font-medium text-foreground">Detailed Day Breakdown</span>
            </div>
            <Switch 
              checked={showDetailedBreakdown} 
              onCheckedChange={setShowDetailedBreakdown}
            />
          </div>

          {showDetailedBreakdown && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before Maghrib */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-indigo-400" />
                  <h4 className="font-medium text-foreground">Before Maghrib</h4>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Time:</span> 12:00 AM – ~{maghrib.formatted}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Islamic Date:</span>{" "}
                    <span className="text-indigo-400">{islamicDayBefore.day} {islamicDayBefore.monthName}</span>
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Status:</span> End of Islamic day
                  </p>
                </div>
              </div>

              {/* After Maghrib */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Sunset className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-medium text-foreground">After Maghrib</h4>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Time:</span> ~{maghrib.formatted} – 11:59 PM
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Islamic Date:</span>{" "}
                    <span className="text-emerald-400">{islamicDayAfter.day} {islamicDayAfter.monthName}</span>
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Status:</span> New Islamic day begins
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    💡 Note: "Islamic night begins" — events like Laylat-ul-Qadr start here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Advanced Explanation */}
        <Collapsible open={advancedExpanded} onOpenChange={setAdvancedExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-sm text-muted-foreground hover:text-foreground">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Why does Islam use sunset for the day change?
              </span>
              {advancedExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="bg-muted/50 rounded-lg p-4 space-y-4 text-sm">
              {/* Historical Context */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  📜 Historical & Religious Context
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  In Islamic tradition, the day begins at <strong className="text-foreground">Maghrib (sunset)</strong> because 
                  the Islamic calendar is <strong className="text-foreground">lunar-based</strong>. The new crescent moon 
                  is first visible in the evening sky after sunset, which naturally marks the beginning of a new month.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This practice dates back to the time of Prophet Muhammad ﷺ and follows the Quranic verse: 
                  <em className="text-primary"> "They ask you about the new moons. Say: They are signs to mark 
                  fixed periods of time for mankind and for pilgrimage."</em> (Quran 2:189)
                </p>
              </div>

              {/* Why Midnight Apps Are Wrong */}
              <div className="space-y-2 border-t border-border pt-4">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  Why Midnight-Based Apps Are Incorrect
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Many calendar apps incorrectly change the Islamic date at <strong className="text-foreground">midnight</strong> 
                  (following Gregorian convention). This causes serious issues:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li><strong className="text-foreground">Wrong fasting days:</strong> Suhoor/Iftar timing confusion</li>
                  <li><strong className="text-foreground">Wrong Eid nights:</strong> The night of Eid (after Ramadan) starts at Maghrib, not midnight</li>
                  <li><strong className="text-foreground">Event confusion:</strong> Laylat-ul-Qadr begins in the evening, not at midnight</li>
                  <li><strong className="text-foreground">Planning errors:</strong> Religious events appear on wrong Gregorian dates</li>
                </ul>
              </div>

              {/* Practical Impact */}
              <div className="space-y-2 border-t border-border pt-4">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  🌙 Practical Impact
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Example:</strong> If Eid is on the 1st of Shawwal, the celebrations 
                  actually begin on the <em>evening before</em> the Gregorian date shows "1 Shawwal". When you break 
                  your fast at Maghrib on the last day of Ramadan, <strong className="text-foreground">Eid has already begun</strong> — 
                  even though midnight-based apps still show "30 Ramadan" until midnight.
                </p>
              </div>

              {/* Visual Diagram */}
              <div className="border-t border-border pt-4">
                <h4 className="font-medium text-foreground mb-3">📊 Visual Comparison</h4>
                <div className="bg-background/50 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre">
{`Gregorian Date:  │←── 1 January ──→│←── 2 January ──→│
                 │                  │                  │
Time:            12AM              12AM              12AM
                 │                  │                  │
                 │     Maghrib      │     Maghrib      │
                 │        ↓         │        ↓         │
                 │        │         │        │         │
Islamic Date:    │←8 Rajab→│←─ 9 Rajab ─→│←10 Rajab→│
                 │ (ends)  │  (starts)   │ (ends)   │`}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Notice: The Islamic date changes at Maghrib (sunset), not at Gregorian midnight.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Why This App Is Different */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Why This App Is More Accurate</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This calendar follows authentic Islamic day logic by changing the date at <strong className="text-foreground">Maghrib 
                (sunset)</strong>, not midnight. All times are calculated for <strong className="text-foreground">Hyderabad, India</strong> 
                following Indian moon sighting traditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
