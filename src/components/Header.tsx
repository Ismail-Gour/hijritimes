import { Link } from "react-router-dom";
import { Moon, BookOpen, Calendar, Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocationBadge } from "./LocationBadge";
import { UserSettings } from "./UserSettings";
import { DataSourceBadge } from "./DataSourceBadge";

export function Header() {
  return (
    <header className="py-3 sm:py-4 md:py-6 animate-fade-in">
      {/* Top row with badges and navigation - responsive wrap */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <LocationBadge />
          <DataSourceBadge />
        </div>
        
        {/* Navigation links - scrollable on small screens */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-start sm:justify-end">
          <Link 
            to="/prayer-times"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden xs:inline sm:hidden md:inline">Prayer Times</span>
            <span className="xs:hidden sm:inline md:hidden">Salah</span>
          </Link>
          <Link 
            to="/hijri-months"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden xs:inline sm:hidden md:inline">Hijri Months</span>
            <span className="xs:hidden sm:inline md:hidden">Months</span>
          </Link>
          <Link 
            to="/know-about-hijri"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
          >
            <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden xs:inline sm:hidden md:inline">Know About Hijri</span>
            <span className="xs:hidden sm:inline md:hidden">Learn</span>
          </Link>
          <UserSettings />
          <ThemeToggle />
        </div>
      </div>
      
      {/* Title section */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="relative">
            <Moon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            <div className="absolute inset-0 w-8 sm:w-10 h-8 sm:h-10 bg-gold/20 rounded-full blur-xl animate-pulse-slow" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            Understanding Islamic Time & the Hijri Calendar
          </h1>
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-sm md:text-base px-2">
          Real-time Hijri & Gregorian date tracking for India with Islamic day transitions, 
          event dates, and daily significance
        </p>
      </div>
    </header>
  );
}
