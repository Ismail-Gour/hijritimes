import { Link } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Clock, BookOpen, AlertTriangle, Sunrise, Sunset } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SunPositionVisual } from "@/components/SunPositionVisual";
import { PrayerTimeline } from "@/components/PrayerTimeline";
import { PRAYERS, FORBIDDEN_TIMES, MISCONCEPTIONS } from "@/lib/prayer-times-data";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function PrayerTimes() {
  
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Prayer Times — Sun-Based Salah Timing Explained"
        description="Learn how the five daily Islamic prayers — Fajr, Dhuhr, Asr, Maghrib, and Isha — are timed by the sun's position, with forbidden times and scholarly sources."
        canonicalPath="/prayer-times"
        keywords="Islamic prayer times, Salah timing, Fajr Dhuhr Asr Maghrib Isha, sun position prayer, forbidden prayer times"
      />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Calendar</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sun className="w-8 h-8 text-amber-500" />
              <h1 className="text-3xl md:text-4xl font-display font-bold">Prayer Times Explained Based on Sun Position</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the sacred times of Ṣalāh — when prayers begin, end, and why timing matters in Islam
            </p>
          </div>
        </header>

        <main className="space-y-8">
          {/* Introduction */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Why Time Matters in Prayer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                In Islam, prayer (Ṣalāh) is not just about the act itself, but also about <strong>when</strong> it is performed. 
                Allah has prescribed specific times for each prayer, and praying within these times is a fundamental requirement.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
                <p className="italic text-foreground">
                  "Indeed, prayer has been decreed upon the believers at specified times."
                </p>
                <cite className="text-sm text-muted-foreground">— Qur'an 4:103</cite>
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Specific Windows</h4>
                    <p className="text-sm text-muted-foreground">Each prayer has a defined start and end time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sun-Based System</h4>
                    <p className="text-sm text-muted-foreground">Times are determined by the sun's position, not clocks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Principle */}
          <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Sun className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold">Core Principle</h3>
                <p className="text-lg text-muted-foreground">
                  "Prayer times are defined by the <strong className="text-foreground">SUN</strong>, not the <strong className="text-foreground">CLOCK</strong>"
                </p>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  All five daily prayers are linked to the sun's position in the sky. Clocks are modern tools that approximate these natural signs. 
                  If there were no clocks, Muslims could still pray correctly by observing the sun.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sun Position Visual */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sunrise className="w-5 h-5 text-orange-500" />
              Sun's Journey & Prayer Times
            </h2>
            <SunPositionVisual />
            <p className="text-sm text-muted-foreground text-center mt-3">
              The sun's apparent movement across the sky determines when each prayer window opens and closes
            </p>
          </section>

          {/* Prayer Timeline */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Daily Prayer Timeline (Conceptual)
            </h2>
            <PrayerTimeline />
          </section>

          {/* The Five Prayers - Detailed */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-500" />
              The Five Daily Prayers — Detailed Breakdown
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {PRAYERS.map((prayer, index) => (
                <AccordionItem 
                  key={prayer.id} 
                  value={prayer.id}
                  className="border rounded-xl overflow-hidden bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{prayer.name}</h3>
                        <p className="text-xs text-muted-foreground">{prayer.nameAr}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4 pt-2">
                      {/* Definition */}
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">What Defines {prayer.name}</h4>
                        <p className="text-sm">{prayer.definition}</p>
                      </div>
                      
                      {/* Start & End */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <h4 className="font-medium text-sm flex items-center gap-1 text-green-600 dark:text-green-400 mb-1">
                            <Sunrise className="w-3.5 h-3.5" /> Start Time
                          </h4>
                          <p className="text-sm">{prayer.startCondition}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <h4 className="font-medium text-sm flex items-center gap-1 text-red-600 dark:text-red-400 mb-1">
                            <Sunset className="w-3.5 h-3.5" /> End Time
                          </h4>
                          <p className="text-sm">{prayer.endCondition}</p>
                        </div>
                      </div>
                      
                      {/* Sun Position */}
                      <div className="bg-amber-500/10 rounded-lg p-3">
                        <h4 className="font-medium text-sm flex items-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
                          <Sun className="w-3.5 h-3.5" /> Sun Position
                        </h4>
                        <p className="text-sm">{prayer.sunPosition}</p>
                      </div>
                      
                      {/* Importance */}
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Importance & Virtue</h4>
                        <ul className="space-y-1.5">
                          {prayer.importance.map((point, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Qur'anic Reference */}
                      {prayer.quranicReference && (
                        <blockquote className="border-l-2 border-primary/50 pl-3 py-1 text-sm italic text-muted-foreground">
                          {prayer.quranicReference}
                        </blockquote>
                      )}
                      
                      {/* Common Confusions */}
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                        <h4 className="font-medium text-sm flex items-center gap-1 text-destructive mb-2">
                          <AlertTriangle className="w-3.5 h-3.5" /> Common Confusions
                        </h4>
                        <ul className="space-y-1.5">
                          {prayer.commonConfusions.map((confusion, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-destructive">✗</span>
                              {confusion}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Notes */}
                      {prayer.notes && prayer.notes.length > 0 && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <h4 className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-1">Note</h4>
                          {prayer.notes.map((note, i) => (
                            <p key={i} className="text-sm">{note}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Forbidden Times */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Times When Prayer is Not Allowed
            </h2>
            <Card className="border-destructive/30">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  There are three specific times during the day when voluntary prayers are forbidden. 
                  These times are established by authentic hadith:
                </p>
                <div className="space-y-4">
                  {FORBIDDEN_TIMES.map((time, index) => (
                    <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-xs font-bold text-destructive">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold">{time.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{time.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Start:</span> {time.start}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">End:</span> {time.end}
                        </div>
                      </div>
                      <blockquote className="text-xs italic text-muted-foreground border-l-2 border-destructive/30 pl-2 mb-3">
                        {time.hadithReference}
                      </blockquote>
                      {time.exceptions.length > 0 && (
                        <div>
                          <h5 className="text-xs font-medium text-muted-foreground mb-1">Exceptions:</h5>
                          <ul className="text-xs space-y-0.5">
                            {time.exceptions.map((exc, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-green-500">✓</span> {exc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Why Times Change */}
          <section>
            <h2 className="text-xl font-bold mb-4">Why Prayer Times Change Daily</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  Prayer times shift throughout the year due to Earth's axial tilt and its orbit around the sun:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">🌍 Earth's Tilt (23.5°)</h4>
                    <p className="text-sm text-muted-foreground">
                      The Earth's axis is tilted, causing the sun's path across the sky to change throughout the year. 
                      This is why summer days are longer and winter days shorter.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">📍 Latitude Matters</h4>
                    <p className="text-sm text-muted-foreground">
                      The further you are from the equator, the more dramatic the changes. 
                      Near the poles, some prayers may have extremely short or long windows.
                    </p>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Connection to Islamic Calendar</h4>
                  <p className="text-sm text-muted-foreground">
                    This sun-based prayer system complements the moon-based Islamic calendar. 
                    While months are determined by the moon, daily prayers are determined by the sun — 
                    a beautiful harmony of celestial observation in Islamic worship.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Misconceptions */}
          <section>
            <h2 className="text-xl font-bold mb-4">Common Misconceptions</h2>
            <div className="grid gap-3">
              {MISCONCEPTIONS.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-destructive/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-destructive text-lg">✗</span>
                      <div>
                        <p className="font-medium text-destructive line-through decoration-destructive/50">
                          "{item.misconception}"
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1">
                          <span className="text-green-500">✓</span>
                          {item.correction}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-4">Sources & Methodology</h2>
            <Card className="bg-muted/20">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Primary Sources</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Qur'an (general references)</li>
                      <li>• Sahih al-Bukhari</li>
                      <li>• Sahih Muslim</li>
                      <li>• Sunan collections</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Scholarly Method</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Sunni consensus principles</li>
                      <li>• School differences labeled</li>
                      <li>• Astronomical calculations for timing</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Disclaimer:</strong> This page explains prayer times for educational purposes, not as legal verdicts (fatwa). 
                    Please consult qualified scholars for specific rulings in your situation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center border-t border-border">
          <p className="text-sm text-muted-foreground">
            Prayer times calculated for Hyderabad, India (17.385°N, 78.487°E)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Times are approximate. Please verify with local authorities for precise timing.
          </p>
        </footer>
      </div>
    </div>
  );
}
