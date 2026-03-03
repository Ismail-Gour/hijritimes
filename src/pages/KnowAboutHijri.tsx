/**
 * KnowAboutHijri - Comprehensive Educational Page
 * 
 * Teaches fundamental Islamic calendar concepts with visual explanations.
 * All content designed to build understanding and trust.
 */

import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { 
  Moon, 
  Sun, 
  Calendar, 
  Eye, 
  Globe, 
  Heart,
  CheckCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sunrise,
  Sunset,
  Users,
  BookOpen,
  HelpCircle
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Section 1: Lunar vs Solar Calendar
function LunarVsSolarSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Moon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Why Islamic Months Move Every Year
          </h2>
          <p className="text-sm text-muted-foreground">The Islamic Calendar Is Lunar, Not Solar</p>
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-foreground">Islamic year has <span className="font-bold text-primary">354 or 355 days</span> (based on moon cycles)</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-foreground">Gregorian year has <span className="font-medium">365 or 366 days</span> (based on sun cycles)</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
          <p className="text-foreground">This means Islamic dates shift <span className="font-bold text-gold-dark">~11 days earlier</span> each Gregorian year</p>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">Year Length Comparison</p>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground font-medium">Gregorian Year</span>
              <span className="text-muted-foreground">365 days</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground font-medium">Islamic Year</span>
              <span className="text-muted-foreground">354 days</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" style={{ width: '97%' }} />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          The ~11 day difference causes Islamic months to rotate through all seasons over ~33 years
        </p>
      </div>

      {/* Ramadan Season Shift Visual */}
      <div className="bg-gradient-to-r from-primary/5 to-gold/5 rounded-xl p-4 border border-primary/10">
        <p className="text-sm font-medium text-foreground mb-3">🌙 Ramadan Through the Seasons</p>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <span className="text-blue-600 dark:text-blue-400">❄️ Winter</span>
            <p className="text-muted-foreground mt-1">Short fasts</p>
          </div>
          <div className="p-2 rounded-lg bg-green-500/10">
            <span className="text-green-600 dark:text-green-400">🌸 Spring</span>
            <p className="text-muted-foreground mt-1">Moderate</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10">
            <span className="text-amber-600 dark:text-amber-400">☀️ Summer</span>
            <p className="text-muted-foreground mt-1">Long fasts</p>
          </div>
          <div className="p-2 rounded-lg bg-orange-500/10">
            <span className="text-orange-600 dark:text-orange-400">🍂 Autumn</span>
            <p className="text-muted-foreground mt-1">Moderate</p>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-3">
          Every Muslim experiences Ramadan in all seasons during their lifetime
        </p>
      </div>

      {/* Common Questions */}
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="q1" className="border-border/50">
          <AccordionTrigger className="text-sm hover:no-underline">
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Why does Ramadan come earlier every year?
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            Because the Islamic year is about 11 days shorter than the Gregorian year. So each Gregorian year, 
            Ramadan starts approximately 11 days earlier. Over 33 years, Ramadan completes a full cycle through 
            all 12 Gregorian months.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2" className="border-border/50">
          <AccordionTrigger className="text-sm hover:no-underline">
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Why was Ramadan in summer before and now in winter?
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            The lunar calendar is not tied to seasons like the solar calendar. As Islamic months shift through 
            Gregorian months, they also shift through seasons. This is by divine design — ensuring fasting is 
            experienced in varying conditions of heat, cold, long days, and short days.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

// Section 2: Moon Sighting as Religious Testimony
function MoonSightingTestimonySection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gold/10">
          <Eye className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Why Moon Sighting Is Human, Not Automatic
          </h2>
          <p className="text-sm text-muted-foreground">Moon Sighting Is a Religious Testimony</p>
        </div>
      </div>

      {/* Core Concept */}
      <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary mb-6">
        <p className="text-foreground font-medium">
          Astronomy answers: <span className="text-muted-foreground">"Can the moon be seen?"</span>
        </p>
        <p className="text-foreground font-medium mt-2">
          Sharia asks: <span className="text-primary">"Was the moon actually seen by trustworthy witnesses?"</span>
        </p>
      </div>

      {/* Key Points */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gold/10">
            <Eye className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="font-medium text-foreground">Visibility ≠ Sighting</p>
            <p className="text-sm text-muted-foreground">The moon being astronomically visible doesn't mean someone actually saw it</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Human Testimony Matters</p>
            <p className="text-sm text-muted-foreground">Witnesses must be trustworthy and their sighting verified by authorities</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-foreground">Community Confirmation Required</p>
            <p className="text-sm text-muted-foreground">Individual sightings must be confirmed by religious authorities</p>
          </div>
        </div>
      </div>

      {/* Reframe Box */}
      <div className="bg-gradient-to-r from-gold/10 to-primary/10 rounded-xl p-4 border border-gold/20">
        <p className="text-sm text-foreground">
          <span className="font-bold">This uncertainty is intentional, not a flaw.</span>
          <br /><br />
          The process of moon sighting itself is an act of worship — it keeps communities engaged, 
          looking at the sky, and connected to natural signs. Automated calculations would remove 
          this spiritual dimension.
        </p>
      </div>
    </section>
  );
}

// Section 3: Month Length Decided at End
function MonthLengthSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            How an Islamic Month Actually Ends
          </h2>
          <p className="text-sm text-muted-foreground">Month Length Is Decided at the End, Not the Start</p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary mb-6">
        <p className="text-foreground">
          Most people assume month length is predefined. <span className="font-bold text-primary">It is not.</span>
          <br />
          Every Islamic month ends only after moon sighting — never before.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <p className="text-xs font-medium text-muted-foreground mb-4">Month End Decision Process</p>
        <div className="flex items-center justify-between text-xs">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-1">
              <span className="font-bold text-foreground">28</span>
            </div>
            <span className="text-muted-foreground">Day 28</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1">
              <span className="font-bold text-primary">29</span>
            </div>
            <span className="text-muted-foreground">Day 29</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="text-center">
            <div className="w-12 h-10 rounded-lg bg-gold/20 flex items-center justify-center mb-1">
              <Eye className="w-4 h-4 text-gold" />
            </div>
            <span className="text-gold-dark font-medium">Sighting</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-green-600 font-medium">Decision</span>
          </div>
        </div>
      </div>

      {/* Two Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
          <p className="font-medium text-green-700 dark:text-green-400 mb-2">If Moon Sighted on 29th Evening:</p>
          <p className="text-sm text-muted-foreground">
            → Month ends at 29 days<br />
            → New month begins immediately
          </p>
        </div>
        <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
          <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">If Moon Not Sighted:</p>
          <p className="text-sm text-muted-foreground">
            → Current month completes 30 days<br />
            → New month begins after day 30
          </p>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4 italic">
        This is why Eid announcements often come at the last moment — it's by design
      </p>
    </section>
  );
}

// Section 4: Nights Before Days
function NightsBeforeDaysSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-indigo-500/10">
          <Sunset className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Why Islamic Nights Come Before the Day
          </h2>
          <p className="text-sm text-muted-foreground">A Fundamental Concept Many Miss</p>
        </div>
      </div>

      {/* Core Concept */}
      <div className="bg-indigo-500/5 rounded-xl p-4 border-l-4 border-indigo-500 mb-6">
        <p className="text-foreground font-medium">
          In Islam, the night belongs to the <span className="text-indigo-600 dark:text-indigo-400">next day</span>, 
          not the previous one.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          This is the opposite of Gregorian thinking where night ends a day.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">Islamic Day Structure</p>
        <div className="h-12 rounded-lg overflow-hidden flex">
          <div className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <span className="text-xs text-white font-medium">Maghrib</span>
          </div>
          <div className="flex-[2] bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-center">
            <span className="text-xs text-white font-medium">Night</span>
          </div>
          <div className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center">
            <span className="text-xs text-white font-medium">Fajr</span>
          </div>
          <div className="flex-[2] bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center">
            <span className="text-xs text-foreground font-medium">Day</span>
          </div>
          <div className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
            <span className="text-xs text-white font-medium">Maghrib</span>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
          <span>Day Starts</span>
          <span>Night Period</span>
          <span>Dawn</span>
          <span>Daytime</span>
          <span>Day Ends</span>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Practical Examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gold/5 rounded-lg p-3 border border-gold/20">
            <p className="font-medium text-gold-dark text-sm">🌙 Eid Night</p>
            <p className="text-xs text-muted-foreground mt-1">
              Begins after Maghrib on the last day of Ramadan — before Eid morning
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
            <p className="font-medium text-primary text-sm">✨ Laylat al-Qadr</p>
            <p className="text-xs text-muted-foreground mt-1">
              The blessed night — occurs during the night hours, not the following day
            </p>
          </div>
          <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/20">
            <p className="font-medium text-green-700 dark:text-green-400 text-sm">🍽️ Fasting Intention</p>
            <p className="text-xs text-muted-foreground mt-1">
              Made during the night before Fajr — because night is part of the fasting day
            </p>
          </div>
          <div className="bg-indigo-500/5 rounded-lg p-3 border border-indigo-500/20">
            <p className="font-medium text-indigo-600 dark:text-indigo-400 text-sm">📿 Friday (Jumu'ah)</p>
            <p className="text-xs text-muted-foreground mt-1">
              Islamically begins Thursday evening at Maghrib, not Friday midnight
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 5: No Single Global Calendar
function NoGlobalCalendarSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <Globe className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Why Islamic Dates Differ Across Countries
          </h2>
          <p className="text-sm text-muted-foreground">There Is No Single Global Islamic Calendar</p>
        </div>
      </div>

      {/* Key Point */}
      <div className="bg-blue-500/5 rounded-xl p-4 border-l-4 border-blue-500 mb-6">
        <p className="text-foreground">
          Differences in Islamic dates are <span className="font-bold text-blue-600 dark:text-blue-400">jurisprudential</span>, 
          not mistakes. Different scholarly opinions on moon sighting are all valid within Islamic law.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium text-foreground">Country</th>
              <th className="text-left py-2 font-medium text-foreground">Method</th>
              <th className="text-left py-2 font-medium text-foreground">Basis</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50">
              <td className="py-2">🇮🇳 India</td>
              <td className="py-2">Local moon sighting</td>
              <td className="py-2">Central Committee + regional scholars</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2">🇸🇦 Saudi Arabia</td>
              <td className="py-2">Local sighting</td>
              <td className="py-2">Supreme Court announcement</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2">🇲🇦 Morocco</td>
              <td className="py-2">Local sighting</td>
              <td className="py-2">Ministry of Islamic Affairs</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2">🇹🇷 Turkey</td>
              <td className="py-2">Astronomical calculation</td>
              <td className="py-2">Diyanet (Religious Affairs)</td>
            </tr>
            <tr>
              <td className="py-2">🇵🇰 Pakistan</td>
              <td className="py-2">Local sighting</td>
              <td className="py-2">Ruet-e-Hilal Committee</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Three Approaches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="font-medium text-primary text-sm mb-1">Local Sighting</p>
          <p className="text-xs text-muted-foreground">Each region follows its own sighting</p>
        </div>
        <div className="bg-gold/5 rounded-lg p-3">
          <p className="font-medium text-gold-dark text-sm mb-1">Global Sighting</p>
          <p className="text-xs text-muted-foreground">Follow earliest sighting worldwide</p>
        </div>
        <div className="bg-blue-500/5 rounded-lg p-3">
          <p className="font-medium text-blue-600 dark:text-blue-400 text-sm mb-1">Calculation-Based</p>
          <p className="text-xs text-muted-foreground">Use astronomical predictions</p>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4 italic">
        This diversity reflects the richness of Islamic jurisprudence — not confusion or error
      </p>
    </section>
  );
}

// Section 6: Designed for Worship
function DesignedForWorshipSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-rose-500/10">
          <Heart className="w-6 h-6 text-rose-500" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Islamic Calendar Is Designed for Worship
          </h2>
          <p className="text-sm text-muted-foreground">Not for Convenience — And That's Beautiful</p>
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-rose-500/5 rounded-xl p-4 border-l-4 border-rose-500 mb-6">
        <p className="text-foreground">
          The "uncertainty" in Islamic dates isn't a bug to be fixed — it's a feature that teaches:
        </p>
      </div>

      {/* Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-xl bg-muted/50">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-primary" />
          </div>
          <p className="font-medium text-foreground">Attention</p>
          <p className="text-xs text-muted-foreground mt-1">
            We must pay attention to natural signs, not just calendars
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-muted/50">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <p className="font-medium text-foreground">Community</p>
          <p className="text-xs text-muted-foreground mt-1">
            We rely on each other for confirmation, not just apps
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-muted/50">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <p className="font-medium text-foreground">Humility</p>
          <p className="text-xs text-muted-foreground mt-1">
            We accept that we don't control everything in advance
          </p>
        </div>
      </div>

      {/* Reframe */}
      <div className="bg-gradient-to-r from-rose-500/10 to-primary/10 rounded-xl p-4">
        <p className="text-sm text-foreground">
          <span className="font-bold">This reframes:</span>
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• "Late" announcements → <span className="text-foreground">Proper verification</span></li>
          <li>• "Evening" changes → <span className="text-foreground">Correct Maghrib timing</span></li>
          <li>• "Human" confirmation → <span className="text-foreground">Community worship</span></li>
        </ul>
        <p className="text-sm text-foreground mt-3">
          Fixed automation was never the goal. <span className="font-bold">Connection to Allah's signs was.</span>
        </p>
      </div>
    </section>
  );
}

// Section 7: Expected vs Confirmed
function ExpectedVsConfirmedSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-green-500/10">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            "Expected" vs "Confirmed" Dates
          </h2>
          <p className="text-sm text-muted-foreground">Why This Distinction Matters for Trust</p>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <p className="font-bold text-amber-700 dark:text-amber-400">Expected</p>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Based on astronomical possibility</li>
            <li>• Moon could theoretically be visible</li>
            <li>• Not yet verified by witnesses</li>
            <li>• May change upon actual sighting</li>
          </ul>
        </div>
        <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-bold text-green-700 dark:text-green-400">Confirmed</p>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Based on actual moon sighting</li>
            <li>• Verified by trustworthy witnesses</li>
            <li>• Announced by religious authority</li>
            <li>• Final and religiously binding</li>
          </ul>
        </div>
      </div>

      {/* Why Apps Hide This */}
      <div className="bg-muted/50 rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-2">Why Many Apps Feel "Wrong"</p>
        <p className="text-sm text-muted-foreground">
          Most calendar apps show all dates with the same certainty — as if every future date is already decided. 
          This creates a false sense of precision that doesn't match Islamic reality.
        </p>
        <p className="text-sm text-foreground mt-3">
          <span className="font-medium">We show the difference</span> because honesty builds trust. 
          You deserve to know when something is certain versus when it's still pending confirmation.
        </p>
      </div>
    </section>
  );
}

// Main Page Component
const KnowAboutHijri = () => {
  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <SEOHead
        title="Know About the Hijri Calendar — How Islamic Dates Work"
        description="Explore the Islamic Hijri calendar system — how moon sighting determines new months, why days begin at Maghrib, and how it differs from the Gregorian calendar."
        canonicalPath="/know-about-hijri"
        keywords="what is Hijri calendar, Islamic calendar explained, moon sighting, lunar calendar Islam, Hijri vs Gregorian"
      />
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
        {/* Header */}
        <header className="py-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Calendar
            </Link>
            <ThemeToggle />
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <BookOpen className="w-10 h-10 text-primary" />
                <div className="absolute inset-0 w-10 h-10 bg-gold/20 rounded-full blur-xl animate-pulse-slow" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                How the Islamic Hijri Calendar Works
              </h1>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              Fundamental concepts of the Islamic calendar explained simply — 
              so you understand <span className="text-primary font-medium">why</span>, not just <span className="text-primary font-medium">what</span>
            </p>
          </div>
        </header>

        {/* Content Sections */}
        <main className="space-y-6 md:space-y-8">
          <LunarVsSolarSection />
          <MoonSightingTestimonySection />
          <MonthLengthSection />
          <NightsBeforeDaysSection />
          <NoGlobalCalendarSection />
          <DesignedForWorshipSection />
          <ExpectedVsConfirmedSection />
          
          {/* Call to Action */}
          <section className="glass-card rounded-2xl p-6 md:p-8 text-center">
            <h2 className="text-xl font-display font-bold text-foreground mb-3">
              Ready to Use the Calendar?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Now that you understand how Islamic time works, explore the live calendar with confidence.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Go to Calendar
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">
            This educational content follows authentic Islamic scholarship. 
            For specific rulings, please consult your local scholars.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default KnowAboutHijri;
