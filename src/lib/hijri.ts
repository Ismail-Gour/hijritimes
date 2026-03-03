// Hijri Calendar Utilities
// Based on the Umm al-Qura calendar algorithm

const ISLAMIC_EPOCH = 1948439.5; // Julian date of the Islamic epoch (July 16, 622 CE)

// Islamic month names
export const ISLAMIC_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
] as const;

export const ISLAMIC_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
] as const;

export const GREGORIAN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const;

export const DAYS_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
] as const;

export const DAYS_OF_WEEK_AR = [
  "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
] as const;

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  monthNameAr: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayOfWeek: string;
  dayOfWeekAr: string;
}

// Convert Gregorian date to Julian Day Number
function gregorianToJulian(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  
  return Math.floor(365.25 * (year + 4716)) + 
         Math.floor(30.6001 * (month + 1)) + 
         day + B - 1524.5;
}

// Convert Julian Day Number to Gregorian date
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

// Convert Julian Day Number to Hijri date
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

// Convert Hijri date to Julian Day Number
function hijriToJulian(year: number, month: number, day: number): number {
  const N = day + Math.ceil(29.5001 * (month - 1) + 0.99) +
            Math.floor((year - 1) / 30) * 10631 +
            Math.floor(((year - 1) % 30 * 11 + 3) / 30) +
            Math.floor((year - 1) % 30 / 1) * 354 + 
            1948439 - 385;
  
  return N;
}

// More accurate Hijri to Julian conversion
function hijriToJulianAccurate(year: number, month: number, day: number): number {
  return day +
         Math.ceil(29.5001 * (month - 1) + 0.99) +
         (year - 1) * 354 +
         Math.floor((3 + 11 * year) / 30) +
         ISLAMIC_EPOCH - 1;
}

// Get the number of days in a Hijri month
export function getHijriMonthDays(year: number, month: number): number {
  // Odd months have 30 days, even months have 29 days
  // The 12th month has 30 days in leap years
  if (month % 2 === 1) return 30;
  if (month === 12 && isHijriLeapYear(year)) return 30;
  return 29;
}

// Check if a Hijri year is a leap year
export function isHijriLeapYear(year: number): boolean {
  return (11 * year + 14) % 30 < 11;
}

// Convert Gregorian to Hijri
export function gregorianToHijri(date: Date): HijriDate {
  const jd = gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const hijri = julianToHijri(jd);
  
  return {
    year: hijri.year,
    month: hijri.month,
    day: hijri.day,
    monthName: ISLAMIC_MONTHS[hijri.month - 1],
    monthNameAr: ISLAMIC_MONTHS_AR[hijri.month - 1],
  };
}

// Convert Hijri to Gregorian
export function hijriToGregorian(year: number, month: number, day: number): Date {
  const jd = hijriToJulianAccurate(year, month, day);
  const gregorian = julianToGregorian(jd);
  return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
}

// Get current date info
export function getCurrentDateInfo(): { hijri: HijriDate; gregorian: GregorianDate } {
  const now = new Date();
  const hijri = gregorianToHijri(now);
  
  return {
    hijri,
    gregorian: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      monthName: GREGORIAN_MONTHS[now.getMonth()],
      dayOfWeek: DAYS_OF_WEEK[now.getDay()],
      dayOfWeekAr: DAYS_OF_WEEK_AR[now.getDay()],
    },
  };
}

// Get moon phase (0 = new moon, 0.5 = full moon)
export function getMoonPhase(date: Date = new Date()): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;
  
  if (month < 3) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }
  
  jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5;
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53058867;
  const phase = newMoons - Math.floor(newMoons);
  
  return phase;
}

// Get moon phase name
export function getMoonPhaseName(phase: number): string {
  if (phase < 0.03 || phase >= 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

// Get next new moon date (approximate)
export function getNextNewMoon(fromDate: Date = new Date()): Date {
  const phase = getMoonPhase(fromDate);
  const daysUntilNew = (1 - phase) * 29.53058867;
  const nextNew = new Date(fromDate);
  nextNew.setDate(nextNew.getDate() + Math.ceil(daysUntilNew));
  return nextNew;
}

// Islamic events/holidays
export interface IslamicEvent {
  name: string;
  nameAr: string;
  month: number;
  day: number;
  description: string;
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { name: "Islamic New Year", nameAr: "رأس السنة الهجرية", month: 1, day: 1, description: "First day of Muharram" },
  { name: "Ashura", nameAr: "عاشوراء", month: 1, day: 10, description: "Day of Ashura" },
  { name: "Mawlid an-Nabi", nameAr: "المولد النبوي", month: 3, day: 12, description: "Birthday of Prophet Muhammad ﷺ" },
  { name: "Isra and Mi'raj", nameAr: "الإسراء والمعراج", month: 7, day: 27, description: "Night Journey and Ascension" },
  { name: "Mid-Sha'ban", nameAr: "ليلة النصف من شعبان", month: 8, day: 15, description: "Night of Forgiveness" },
  { name: "Ramadan Begins", nameAr: "بداية رمضان", month: 9, day: 1, description: "First day of fasting" },
  { name: "Laylat al-Qadr", nameAr: "ليلة القدر", month: 9, day: 27, description: "Night of Power (approximate)" },
  { name: "Eid al-Fitr", nameAr: "عيد الفطر", month: 10, day: 1, description: "Festival of Breaking Fast" },
  { name: "Day of Arafah", nameAr: "يوم عرفة", month: 12, day: 9, description: "Day before Eid al-Adha" },
  { name: "Eid al-Adha", nameAr: "عيد الأضحى", month: 12, day: 10, description: "Festival of Sacrifice" },
];

// Get upcoming Islamic events
export function getUpcomingEvents(count: number = 3): { event: IslamicEvent; date: Date; daysUntil: number }[] {
  const today = new Date();
  const hijriToday = gregorianToHijri(today);
  
  const events: { event: IslamicEvent; date: Date; daysUntil: number }[] = [];
  
  // Check events in current and next year
  for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
    const checkYear = hijriToday.year + yearOffset;
    
    for (const event of ISLAMIC_EVENTS) {
      const eventDate = hijriToGregorian(checkYear, event.month, event.day);
      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil > 0) {
        events.push({ event, date: eventDate, daysUntil });
      }
    }
  }
  
  // Sort by days until and return top count
  return events.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, count);
}

// Get calendar days for a month
export function getHijriCalendarMonth(year: number, month: number): {
  hijriDay: number;
  gregorianDate: Date;
  isToday: boolean;
}[] {
  const days: { hijriDay: number; gregorianDate: Date; isToday: boolean }[] = [];
  const daysInMonth = getHijriMonthDays(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let day = 1; day <= daysInMonth; day++) {
    const gregorianDate = hijriToGregorian(year, month, day);
    gregorianDate.setHours(0, 0, 0, 0);
    
    days.push({
      hijriDay: day,
      gregorianDate,
      isToday: gregorianDate.getTime() === today.getTime(),
    });
  }
  
  return days;
}
