/**
 * DailyDescription - Today's Islamic significance
 * 
 * READS FROM: HijriContext (single source of truth)
 * NO independent calculations allowed
 */

import { useHijri } from "@/contexts/HijriContext";
import { Book, Star, Calendar, Sparkles } from "lucide-react";

export function DailyDescriptionCard() {
  const { hijri, todaySignificance, monthInfo } = useHijri();

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "high":
        return "bg-gold/20 text-gold-dark border-gold/30";
      case "medium":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "religious":
        return <Star className="w-4 h-4" />;
      case "historical":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-display text-foreground">Today's Significance</h2>
        <span className="ml-auto text-xs text-muted-foreground">
          {hijri.day} {hijri.monthName} {hijri.year} AH
        </span>
      </div>

      {todaySignificance ? (
        <div className="space-y-4">
          {/* Main Event */}
          <div className={`rounded-xl p-5 border ${getSignificanceColor(todaySignificance.significance)}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg text-foreground">{todaySignificance.title}</h3>
                <p className="text-sm font-display text-gold" dir="rtl">{todaySignificance.titleAr}</p>
              </div>
              <div className="flex items-center gap-2">
                {getTypeIcon(todaySignificance.type)}
                <span className="text-xs capitalize px-2 py-1 rounded-full bg-background/50">
                  {todaySignificance.type}
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {todaySignificance.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-secondary/50 rounded-xl p-5">
          <p className="text-sm text-muted-foreground">
            No special event today. Continue your regular worship and good deeds.
          </p>
        </div>
      )}

      {/* Month Information */}
      {monthInfo && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            About {monthInfo.name}
          </h4>
          
          <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
            <p className="text-sm text-foreground/80">{monthInfo.description}</p>
            
            {monthInfo.virtues.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Virtues:</p>
                <ul className="space-y-1">
                  {monthInfo.virtues.map((virtue, index) => (
                    <li key={index} className="text-xs text-foreground/70 flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      {virtue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {monthInfo.practices.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Recommended Practices:</p>
                <ul className="space-y-1">
                  {monthInfo.practices.map((practice, index) => (
                    <li key={index} className="text-xs text-foreground/70 flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
