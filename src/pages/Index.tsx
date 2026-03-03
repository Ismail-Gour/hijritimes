import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { DateDisplay } from "@/components/DateDisplay";
import { DayCountdown } from "@/components/DayCountdown";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DailyDescriptionCard } from "@/components/DailyDescription";
import { DateConverter } from "@/components/DateConverter";
import { HijriCalendar } from "@/components/HijriCalendar";

import { IslamicDayTimeline } from "@/components/IslamicDayTimeline";

import { EducationalPanel } from "@/components/EducationalPanel";
import { AIChatbot } from "@/components/AIChatbot";
import { GregorianIslamicOverlap } from "@/components/GregorianIslamicOverlap";
import { DisclaimerModal } from "@/components/DisclaimerModal";


const Index = () => {
  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <SEOHead
        title="Islamic Hijri Calendar — Today's Date, Maghrib Time & Events"
        description="Track today's Islamic Hijri date for India with automatic Maghrib-based day transitions, upcoming event dates, and a Hijri-Gregorian date converter tool."
        canonicalPath="/"
        keywords="Hijri date today, Islamic calendar, Maghrib time India, moon sighting India, Hijri Gregorian converter"
      />
      {/* Responsive container with fluid width */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <Header />
        
        <main className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Today's Date Section */}
          <DateDisplay />
          
          {/* Islamic Day Timeline - Visual Sunset→Night→Dawn→Day */}
          <IslamicDayTimeline />
          
          {/* Day Countdown - Gregorian & Islamic */}
          <DayCountdown />
          
          {/* Daily Significance */}
          <DailyDescriptionCard />
          
          {/* Upcoming Events Countdown (Maghrib-aware) */}
          <CountdownTimer />
          
          {/* Gregorian vs Islamic Day Overlap Explanation */}
          <GregorianIslamicOverlap />
          
          {/* Educational Explanations */}
          <EducationalPanel />
          
          {/* Responsive Grid: 1 col mobile, 2 col tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <HijriCalendar />
            <DateConverter />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 py-4 sm:py-6 text-center border-t border-border">
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Islamic Calendar for India © {new Date().getFullYear()}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Based on Indian moon sighting tradition • Dates marked "Expected" await official confirmation
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Please confirm with local religious authorities for official dates
            </p>
          </div>
        </footer>
      </div>
      
      {/* AI Chatbot */}
      <AIChatbot />
      
      {/* First-time Disclaimer Modal */}
      <DisclaimerModal />
    </div>
  );
};

export default Index;
