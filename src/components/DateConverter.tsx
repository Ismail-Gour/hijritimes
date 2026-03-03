/**
 * DateConverter - Bidirectional date conversion
 * 
 * Uses internal calculation for conversion (same algorithm as context)
 * but displays "Expected" badge since results are astronomical
 */

import { useState } from "react";
import { useHijri } from "@/contexts/HijriContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, AlertCircle } from "lucide-react";

// Internal calculation functions (same as context engine)
const ISLAMIC_EPOCH = 1948439.5;

function gregorianToJulian(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function julianToHijri(jd: number): { year: number; month: number; day: number } {
  jd = Math.floor(jd) + 0.5;
  const L = Math.floor(jd - 1948439.5 + 10632);
  const N = Math.floor((L - 1) / 10631);
  const L2 = L - 10631 * N + 354;
  const J = Math.floor((10985 - L2) / 5316) * Math.floor((50 * L2) / 17719) +
            Math.floor(L2 / 5670) * Math.floor((43 * L2) / 15238);
  const L3 = L2 - Math.floor((30 - J) / 15) * Math.floor((17719 * J) / 50) -
             Math.floor(J / 16) * Math.floor((15238 * J) / 43) + 29;
  const month = Math.floor((24 * L3) / 709);
  const day = L3 - Math.floor((709 * month) / 24);
  const year = 30 * N + J - 30;
  return { year, month, day };
}

function julianToGregorian(jd: number): { year: number; month: number; day: number } {
  const Z = Math.floor(jd + 0.5);
  const F = jd + 0.5 - Z;
  let A: number;
  if (Z < 2299161) {
    A = Z;
  } else {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E) + F;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  return { year, month, day: Math.floor(day) };
}

function hijriToJulianAccurate(year: number, month: number, day: number): number {
  return day +
         Math.ceil(29.5001 * (month - 1) + 0.99) +
         (year - 1) * 354 +
         Math.floor((3 + 11 * year) / 30) +
         ISLAMIC_EPOCH - 1;
}

export function DateConverter() {
  const { hijri, ISLAMIC_MONTHS, GREGORIAN_MONTHS } = useHijri();
  
  // Gregorian to Hijri state
  const [gregYear, setGregYear] = useState(new Date().getFullYear().toString());
  const [gregMonth, setGregMonth] = useState((new Date().getMonth() + 1).toString());
  const [gregDay, setGregDay] = useState(new Date().getDate().toString());
  const [hijriResult, setHijriResult] = useState<{
    day: number;
    month: number;
    monthName: string;
    year: number;
  } | null>(null);

  // Hijri to Gregorian state
  const [hijriYear, setHijriYear] = useState(hijri.year.toString());
  const [hijriMonth, setHijriMonth] = useState(hijri.month.toString());
  const [hijriDay, setHijriDay] = useState("1");
  const [gregResult, setGregResult] = useState<Date | null>(null);

  const convertToHijri = () => {
    const jd = gregorianToJulian(
      parseInt(gregYear),
      parseInt(gregMonth),
      parseInt(gregDay)
    );
    const result = julianToHijri(jd);
    setHijriResult({
      day: result.day,
      month: result.month,
      monthName: ISLAMIC_MONTHS[result.month - 1],
      year: result.year,
    });
  };

  const convertToGregorian = () => {
    const jd = hijriToJulianAccurate(
      parseInt(hijriYear),
      parseInt(hijriMonth),
      parseInt(hijriDay)
    );
    const greg = julianToGregorian(jd);
    setGregResult(new Date(greg.year, greg.month - 1, greg.day));
  };

  return (
    <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-2xl font-display text-center mb-6 text-foreground">
        Date Converter
      </h2>

      <div className="glass-card rounded-xl p-6">
        {/* Expected notice */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gold-dark bg-gold/10 rounded-lg py-2">
          <AlertCircle className="w-3 h-3" />
          <span>Conversion based on astronomical calculation. Actual dates may vary ±1 day.</span>
        </div>

        <Tabs defaultValue="greg-to-hijri" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="greg-to-hijri" className="text-sm">
              Gregorian → Hijri
            </TabsTrigger>
            <TabsTrigger value="hijri-to-greg" className="text-sm">
              Hijri → Gregorian
            </TabsTrigger>
          </TabsList>

          <TabsContent value="greg-to-hijri" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="greg-day" className="text-sm text-muted-foreground">
                  Day
                </Label>
                <Input
                  id="greg-day"
                  type="number"
                  min="1"
                  max="31"
                  value={gregDay}
                  onChange={(e) => setGregDay(e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="greg-month" className="text-sm text-muted-foreground">
                  Month
                </Label>
                <select
                  id="greg-month"
                  value={gregMonth}
                  onChange={(e) => setGregMonth(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {GREGORIAN_MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="greg-year" className="text-sm text-muted-foreground">
                  Year
                </Label>
                <Input
                  id="greg-year"
                  type="number"
                  min="1"
                  max="3000"
                  value={gregYear}
                  onChange={(e) => setGregYear(e.target.value)}
                  className="text-center"
                />
              </div>
            </div>

            <Button
              onClick={convertToHijri}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert to Hijri
            </Button>

            {hijriResult && (
              <div className="bg-primary/5 rounded-lg p-4 text-center space-y-2 border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  Islamic Date
                  <span className="text-[10px] bg-gold/20 text-gold-dark px-1.5 py-0.5 rounded">Expected</span>
                </p>
                <p className="text-2xl font-display text-primary">
                  {hijriResult.day} {hijriResult.monthName} {hijriResult.year} AH
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hijri-to-greg" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hijri-day" className="text-sm text-muted-foreground">
                  Day
                </Label>
                <Input
                  id="hijri-day"
                  type="number"
                  min="1"
                  max="30"
                  value={hijriDay}
                  onChange={(e) => setHijriDay(e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hijri-month" className="text-sm text-muted-foreground">
                  Month
                </Label>
                <select
                  id="hijri-month"
                  value={hijriMonth}
                  onChange={(e) => setHijriMonth(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {ISLAMIC_MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hijri-year" className="text-sm text-muted-foreground">
                  Year (AH)
                </Label>
                <Input
                  id="hijri-year"
                  type="number"
                  min="1"
                  max="2000"
                  value={hijriYear}
                  onChange={(e) => setHijriYear(e.target.value)}
                  className="text-center"
                />
              </div>
            </div>

            <Button
              onClick={convertToGregorian}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert to Gregorian
            </Button>

            {gregResult && (
              <div className="bg-primary/5 rounded-lg p-4 text-center space-y-2 border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  Gregorian Date
                  <span className="text-[10px] bg-gold/20 text-gold-dark px-1.5 py-0.5 rounded">Expected</span>
                </p>
                <p className="text-2xl font-display text-primary">
                  {gregResult.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
