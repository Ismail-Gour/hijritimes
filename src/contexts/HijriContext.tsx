/**
 * HIJRI TRUTH ENGINE - Single Source of Truth
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CORE PRINCIPLE: There is ONE Islamic date at any given moment.
 * This engine is the ONLY source. NO component may calculate independently.
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Authority Order (Indian Moon Sighting):
 * 1. Official Indian Central Committee confirmation (Hyderabad)
 * 2. Regional committee reports
 * 3. Fallback: Astronomical calculation (clearly marked as "Expected")
 * 
 * Islamic Day Logic (CRITICAL):
 * - Islamic day starts at MAGHRIB (sunset), NOT midnight
 * - Before Maghrib = previous Islamic date (end of Islamic day)
 * - After Maghrib = next Islamic date (start of new Islamic day)
 * - This means ONE Gregorian date contains parts of TWO Islamic days
 * 
 * Location: Hyderabad, India (IST = UTC+5:30)
 * Method: Local moon sighting tradition
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  ISLAMIC_MONTHS,
  ISLAMIC_MONTHS_AR,
  GREGORIAN_MONTHS,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_AR,
  getMoonPhase,
  getMoonPhaseName,
  getNextNewMoon,
  getHijriMonthDays,
  isHijriLeapYear,
  ISLAMIC_EVENTS,
  type IslamicEvent,
} from "@/lib/hijri";
import {
  HYDERABAD_TIMEZONE,
  ISLAMIC_MONTH_INFO,
  getDailyDescription,
  type DailyDescription,
} from "@/lib/hijri-data";
import { getMaghribTime } from "@/lib/solar";
import {
  calculateHijriFromConfirmedData,
  CONFIRMED_MONTH_STARTS,
} from "@/lib/indian-moon-sighting-data";
import { getUserSettings, type HijriUserSettings } from "@/components/UserSettings";

// ============================================
// TYPES
// ============================================

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameAr: string;
}

export interface GregorianDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayOfWeek: string;
  dayOfWeekAr: string;
  dayOfWeekIndex: number;
}

export interface TimeInfo {
  current: Date;
  formatted: string;
  formatted24h: string;
}

export interface MaghribInfo {
  time: Date;
  formatted: string;
  hasStarted: boolean;
  timeUntil: { hours: number; minutes: number; seconds: number };
  timeSince: { hours: number; minutes: number; seconds: number };
}

export interface MoonInfo {
  phase: number;
  phaseName: string;
  illumination: number;
  isWaxing: boolean;
  nextNewMoon: Date | null;
  daysToNewMoon: number;
}

export interface GregorianDayProgress {
  elapsed: { hours: number; minutes: number; seconds: number; totalSeconds: number };
  remaining: { hours: number; minutes: number; seconds: number; totalSeconds: number };
  progressPercent: number;
}

export interface IslamicDayProgress {
  elapsed: { hours: number; minutes: number; seconds: number; totalSeconds: number };
  remaining: { hours: number; minutes: number; seconds: number; totalSeconds: number };
  progressPercent: number;
}

export interface UpcomingEvent {
  event: IslamicEvent;
  gregorianDate: Date;
  daysUntil: number;
}

export interface HijriContextValue {
  // Core dates
  hijri: HijriDate;
  gregorian: GregorianDate;
  
  // Time tracking
  time: TimeInfo;
  maghrib: MaghribInfo;
  
  // Moon phase
  moon: MoonInfo;
  
  // Day progress
  gregorianProgress: GregorianDayProgress;
  islamicProgress: IslamicDayProgress;
  
  // Data source info
  isExpected: boolean; // true = astronomical fallback, false = confirmed sighting
  dataSource: string;
  authority: string;
  
  // Time validation
  deviceTimeValid: boolean;
  
  // User settings applied
  userSettings: HijriUserSettings;
  
  // Confirmation status
  confirmationStatus: 'confirmed' | 'expected';
  lastConfirmedDate: string;
  
  // Today's significance
  todaySignificance: DailyDescription | null;
  monthInfo: typeof ISLAMIC_MONTH_INFO[0] | null;
  
  // Upcoming events (Maghrib-aware)
  upcomingEvents: UpcomingEvent[];
  
  // ═══════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS - These are the ONLY approved ways to perform
  // date calculations. NO component may calculate independently.
  // ═══════════════════════════════════════════════════════════════
  
  // Month/year utilities
  getHijriMonthDays: (year: number, month: number) => number;
  isHijriLeapYear: (year: number) => boolean;
  
  // Calendar grid generation (MUST use these instead of local calculations)
  hijriToGregorianDate: (year: number, month: number, day: number) => Date;
  getCalendarMonthDays: (year: number, month: number) => CalendarDay[];
  
  // Get Islamic date for any Gregorian date (respects Maghrib logic)
  getIslamicDateForGregorian: (date: Date, afterMaghrib: boolean) => HijriDate;
  
  // Get previous Islamic date (for overlap display)
  getPreviousIslamicDate: (day: number, month: number, year: number) => { day: number; month: number; monthName: string };
  
  // Constants for UI
  ISLAMIC_MONTHS: typeof ISLAMIC_MONTHS;
  ISLAMIC_MONTHS_AR: typeof ISLAMIC_MONTHS_AR;
  GREGORIAN_MONTHS: typeof GREGORIAN_MONTHS;
  DAYS_OF_WEEK: typeof DAYS_OF_WEEK;
  ISLAMIC_EVENTS: typeof ISLAMIC_EVENTS;
}

// Calendar day structure for grid generation
export interface CalendarDay {
  hijriDay: number;
  gregorianDate: Date;
  isToday: boolean;
}

// ============================================
// CONTEXT
// ============================================

const HijriContext = createContext<HijriContextValue | null>(null);

// ============================================
// HELPER FUNCTIONS (internal only)
// ============================================

/**
 * Get current time in Hyderabad timezone (IST = UTC+5:30)
 * 
 * IMPORTANT: Uses proper date component extraction to avoid timezone parsing bugs.
 * The old method `new Date(date.toLocaleString())` was causing off-by-one errors.
 */
function getHyderabadTime(): Date {
  const now = new Date();
  
  // Extract components in Hyderabad timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: HYDERABAD_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || '0';
  
  const year = parseInt(getPart('year'), 10);
  const month = parseInt(getPart('month'), 10) - 1; // JS months are 0-indexed
  const day = parseInt(getPart('day'), 10);
  const hour = parseInt(getPart('hour'), 10);
  const minute = parseInt(getPart('minute'), 10);
  const second = parseInt(getPart('second'), 10);
  
  // Create a date object representing Hyderabad local time
  // This date object's internal timestamp will be adjusted, but the
  // year/month/day/hour/minute/second values will represent Hyderabad time
  return new Date(year, month, day, hour, minute, second);
}

function formatTime12h(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatTime24h(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatMaghribTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getTimeDiff(from: Date, to: Date): { hours: number; minutes: number; seconds: number; totalSeconds: number } {
  const diff = to.getTime() - from.getTime();
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds, totalSeconds };
}

// Julian Day Number calculations (internal)
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

const ISLAMIC_EPOCH = 1948439.5;

function hijriToJulianAccurate(year: number, month: number, day: number): number {
  return day +
         Math.ceil(29.5001 * (month - 1) + 0.99) +
         (year - 1) * 354 +
         Math.floor((3 + 11 * year) / 30) +
         ISLAMIC_EPOCH - 1;
}

function hijriToGregorianDate(year: number, month: number, day: number): Date {
  const jd = hijriToJulianAccurate(year, month, day);
  const greg = julianToGregorian(jd);
  return new Date(greg.year, greg.month - 1, greg.day);
}

/**
 * CORE FUNCTION: Calculate current Hijri date for Hyderabad
 * 
 * Takes into account:
 * 1. Current Hyderabad time
 * 2. Maghrib (sunset) time - Islamic day changes at Maghrib
 * 3. Before Maghrib = current Gregorian day's Hijri
 * 4. After Maghrib = next Gregorian day's Hijri (Islamic day has advanced)
 */
function calculateCurrentHijriForHyderabad(now: Date): { hijri: HijriDate; isAfterMaghrib: boolean } {
  const maghribToday = getMaghribTime(now);
  const isAfterMaghrib = now >= maghribToday;
  
  // The Gregorian date to convert
  // If after Maghrib, the Islamic date has advanced to what would be "tomorrow" in Gregorian terms
  let gregDateToConvert = new Date(now);
  if (isAfterMaghrib) {
    gregDateToConvert.setDate(gregDateToConvert.getDate() + 1);
  }
  
  const jd = gregorianToJulian(
    gregDateToConvert.getFullYear(),
    gregDateToConvert.getMonth() + 1,
    gregDateToConvert.getDate()
  );
  const hijriRaw = julianToHijri(jd);
  
  return {
    hijri: {
      year: hijriRaw.year,
      month: hijriRaw.month,
      day: hijriRaw.day,
      monthName: ISLAMIC_MONTHS[hijriRaw.month - 1],
      monthNameAr: ISLAMIC_MONTHS_AR[hijriRaw.month - 1],
    },
    isAfterMaghrib,
  };
}

function calculateGregorianInfo(now: Date): GregorianDate {
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    monthName: GREGORIAN_MONTHS[now.getMonth()],
    dayOfWeek: DAYS_OF_WEEK[now.getDay()],
    dayOfWeekAr: DAYS_OF_WEEK_AR[now.getDay()],
    dayOfWeekIndex: now.getDay(),
  };
}

/**
 * Calculate upcoming Islamic events with MAGHRIB-AWARE timing
 * 
 * CRITICAL: Islamic events are NIGHT-FIRST.
 * - An event on "1 Shawwal" begins at Maghrib of the previous Gregorian day
 * - Event countdowns must lead to the Maghrib when the event begins
 * - NOT to the midnight of the Gregorian date
 * 
 * Example: Eid al-Fitr (1 Shawwal)
 * - If 1 Shawwal corresponds to Jan 20 Gregorian (after Maghrib)
 * - The event BEGINS at Maghrib on Jan 19 (when Islamic day changes to 1 Shawwal)
 * - Countdown should target Jan 19 Maghrib, not Jan 20 midnight
 */
function calculateUpcomingEvents(currentHijri: HijriDate, count: number = 3): UpcomingEvent[] {
  const now = getHyderabadTime();
  const events: UpcomingEvent[] = [];
  
  // Check events in current and next year
  for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
    const checkYear = currentHijri.year + yearOffset;
    
    for (const event of ISLAMIC_EVENTS) {
      // Get the Gregorian date when this Hijri date starts AFTER Maghrib
      const eventGregorianDate = hijriToGregorianDate(checkYear, event.month, event.day);
      
      // CRITICAL: The Islamic day BEGINS at Maghrib of the PREVIOUS Gregorian day
      // So if 1 Shawwal corresponds to Jan 20, the event starts at Maghrib on Jan 19
      const eventStartDate = new Date(eventGregorianDate);
      eventStartDate.setDate(eventStartDate.getDate() - 1);
      
      // Get Maghrib time for that day (when the Islamic event actually begins)
      const eventMaghribStart = getMaghribTime(eventStartDate);
      
      // Calculate time difference from now
      const timeDiff = eventMaghribStart.getTime() - now.getTime();
      const daysUntil = timeDiff / (1000 * 60 * 60 * 24);
      
      if (daysUntil > 0) {
        events.push({ 
          event, 
          gregorianDate: eventMaghribStart, // Target: Maghrib when event begins
          daysUntil: Math.ceil(daysUntil)
        });
      }
    }
  }
  
  return events.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, count);
}

// ============================================
// PROVIDER
// ============================================

interface HijriProviderProps {
  children: ReactNode;
}

export function HijriProvider({ children }: HijriProviderProps) {
  const [state, setState] = useState<Omit<HijriContextValue, 
    'getHijriMonthDays' | 'isHijriLeapYear' | 'ISLAMIC_MONTHS' | 'ISLAMIC_MONTHS_AR' | 
    'GREGORIAN_MONTHS' | 'DAYS_OF_WEEK' | 'ISLAMIC_EVENTS' | 
    'hijriToGregorianDate' | 'getCalendarMonthDays' | 'getIslamicDateForGregorian' | 'getPreviousIslamicDate'
  > | null>(null);
  
  // ═══════════════════════════════════════════════════════════════
  // CENTRALIZED UTILITY FUNCTIONS - Components MUST use these
  // ═══════════════════════════════════════════════════════════════
  
  // Convert Hijri date to Gregorian Date object
  const hijriToGregorianDateFn = useCallback((year: number, month: number, day: number): Date => {
    return hijriToGregorianDate(year, month, day);
  }, []);
  
  // Generate calendar grid for any Hijri month (used by HijriCalendar)
  const getCalendarMonthDays = useCallback((year: number, month: number): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const daysInMonth = getHijriMonthDays(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const gregorianDate = hijriToGregorianDate(year, month, day);
      gregorianDate.setHours(0, 0, 0, 0);
      
      days.push({
        hijriDay: day,
        gregorianDate,
        isToday: gregorianDate.getTime() === today.getTime(),
      });
    }
    
    return days;
  }, []);
  
  // Get Islamic date for a specific Gregorian date (respects Maghrib logic)
  const getIslamicDateForGregorian = useCallback((date: Date, afterMaghrib: boolean): HijriDate => {
    let gregDateToConvert = new Date(date);
    if (afterMaghrib) {
      gregDateToConvert.setDate(gregDateToConvert.getDate() + 1);
    }
    
    const jd = gregorianToJulian(
      gregDateToConvert.getFullYear(),
      gregDateToConvert.getMonth() + 1,
      gregDateToConvert.getDate()
    );
    const hijriRaw = julianToHijri(jd);
    
    return {
      year: hijriRaw.year,
      month: hijriRaw.month,
      day: hijriRaw.day,
      monthName: ISLAMIC_MONTHS[hijriRaw.month - 1],
      monthNameAr: ISLAMIC_MONTHS_AR[hijriRaw.month - 1],
    };
  }, []);
  
  // Get the previous Islamic date (for overlap display in calendar)
  const getPreviousIslamicDate = useCallback((day: number, month: number, year: number): { day: number; month: number; monthName: string } => {
    if (day > 1) {
      return { day: day - 1, month, monthName: ISLAMIC_MONTHS[month - 1] };
    }
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonthDays = getHijriMonthDays(prevYear, prevMonth);
    return { day: prevMonthDays, month: prevMonth, monthName: ISLAMIC_MONTHS[prevMonth - 1] };
  }, []);

  const updateState = useCallback(() => {
    const now = getHyderabadTime();
    const userSettings = getUserSettings();
    
    // Apply user's Maghrib offset to calculations
    const applyMaghribOffset = (maghribTime: Date): Date => {
      const adjusted = new Date(maghribTime);
      adjusted.setMinutes(adjusted.getMinutes() + userSettings.maghribOffset);
      return adjusted;
    };
    
    // Core Hijri calculation (SINGLE SOURCE)
    // Use adjusted Maghrib for determining which Islamic day we're in
    const maghribToday = applyMaghribOffset(getMaghribTime(now));
    const isAfterMaghrib = now >= maghribToday;
    
    // PRIORITY #1: Try to get confirmed Indian moon sighting data
    const confirmedResult = calculateHijriFromConfirmedData(now, isAfterMaghrib);
    
    let hijri: HijriDate;
    let isConfirmed: boolean;
    let dataSourceText: string;
    
    if (confirmedResult.isConfirmed && confirmedResult.year > 0) {
      // Use confirmed Indian moon sighting data
      hijri = {
        year: confirmedResult.year,
        month: confirmedResult.month,
        day: Math.min(confirmedResult.day, 30), // Islamic months never exceed 30 days
        monthName: ISLAMIC_MONTHS[confirmedResult.month - 1],
        monthNameAr: ISLAMIC_MONTHS_AR[confirmedResult.month - 1],
      };
      isConfirmed = true;
      dataSourceText = confirmedResult.source;
    } else {
      // FALLBACK: Use astronomical calculation
      let gregDateToConvert = new Date(now);
      if (isAfterMaghrib) {
        gregDateToConvert.setDate(gregDateToConvert.getDate() + 1);
      }
      
      const jd = gregorianToJulian(
        gregDateToConvert.getFullYear(),
        gregDateToConvert.getMonth() + 1,
        gregDateToConvert.getDate()
      );
      const hijriRaw = julianToHijri(jd);
      
      // CRITICAL: Clamp day to max 30 (Islamic months are 29 or 30 days only)
      const clampedDay = Math.min(hijriRaw.day, 30);
      
      hijri = {
        year: hijriRaw.year,
        month: hijriRaw.month,
        day: clampedDay,
        monthName: ISLAMIC_MONTHS[hijriRaw.month - 1],
        monthNameAr: ISLAMIC_MONTHS_AR[hijriRaw.month - 1],
      };
      isConfirmed = false;
      dataSourceText = "Astronomical Calculation (Umm al-Qura)";
    }
    
    // Get last confirmed month info for display
    const lastConfirmed = CONFIRMED_MONTH_STARTS.length > 0 
      ? CONFIRMED_MONTH_STARTS[CONFIRMED_MONTH_STARTS.length - 1]
      : null;
    const lastConfirmedDate = lastConfirmed 
      ? `${ISLAMIC_MONTHS[lastConfirmed.hijriMonth - 1]} ${lastConfirmed.hijriYear}`
      : "None";
    
    const gregorian = calculateGregorianInfo(now);
    
    // Time info
    const time: TimeInfo = {
      current: now,
      formatted: formatTime12h(now),
      formatted24h: formatTime24h(now),
    };
    
    // Maghrib info with user offset applied
    let nextMaghrib: Date;
    let lastMaghrib: Date;
    
    if (isAfterMaghrib) {
      // After Maghrib: next is tomorrow, last is today
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      nextMaghrib = applyMaghribOffset(getMaghribTime(tomorrow));
      lastMaghrib = maghribToday;
    } else {
      // Before Maghrib: next is today, last is yesterday
      nextMaghrib = maghribToday;
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      lastMaghrib = applyMaghribOffset(getMaghribTime(yesterday));
    }
    
    const maghrib: MaghribInfo = {
      time: maghribToday,
      formatted: formatMaghribTime(maghribToday),
      hasStarted: isAfterMaghrib,
      timeUntil: getTimeDiff(now, nextMaghrib),
      timeSince: getTimeDiff(lastMaghrib, now),
    };
    
    // Moon info
    const moonPhase = getMoonPhase(now);
    const illumination = Math.abs(moonPhase < 0.5 ? moonPhase * 2 : (1 - moonPhase) * 2) * 100;
    const nextNew = getNextNewMoon(now);
    const moon: MoonInfo = {
      phase: moonPhase,
      phaseName: getMoonPhaseName(moonPhase),
      illumination,
      isWaxing: moonPhase < 0.5,
      nextNewMoon: nextNew,
      daysToNewMoon: nextNew ? Math.ceil((nextNew.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0,
    };
    
    // Gregorian day progress (midnight to midnight)
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);
    const nextMidnight = new Date(now);
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    
    const gregElapsed = getTimeDiff(todayMidnight, now);
    const gregRemaining = getTimeDiff(now, nextMidnight);
    const gregorianProgress: GregorianDayProgress = {
      elapsed: gregElapsed,
      remaining: gregRemaining,
      progressPercent: (gregElapsed.totalSeconds / 86400) * 100,
    };
    
    // Islamic day progress (Maghrib to Maghrib)
    const islamicElapsed = getTimeDiff(lastMaghrib, now);
    const islamicRemaining = getTimeDiff(now, nextMaghrib);
    const islamicProgress: IslamicDayProgress = {
      elapsed: islamicElapsed,
      remaining: islamicRemaining,
      progressPercent: Math.min((islamicElapsed.totalSeconds / 86400) * 100, 100),
    };
    
    // Today's significance (based on unified Hijri date)
    const todaySignificance = getDailyDescription(hijri.month, hijri.day, gregorian.dayOfWeekIndex);
    const monthInfo = ISLAMIC_MONTH_INFO[hijri.month - 1];
    
    // Upcoming events
    const upcomingEvents = calculateUpcomingEvents(hijri, 3);
    
    // Device time validation (basic check - compare with expected timezone)
    // A more robust implementation would compare with a server timestamp
    const deviceTimeValid = now.getTimezoneOffset() === -330; // IST = UTC+5:30 = -330 minutes
    
    setState({
      hijri,
      gregorian,
      time,
      maghrib,
      moon,
      gregorianProgress,
      islamicProgress,
      isExpected: !isConfirmed,
      dataSource: dataSourceText,
      authority: "Indian Central Committee",
      deviceTimeValid,
      userSettings,
      confirmationStatus: isConfirmed ? 'confirmed' : 'expected',
      lastConfirmedDate,
      todaySignificance,
      monthInfo,
      upcomingEvents,
    });
  }, []);

  useEffect(() => {
    updateState();
    const interval = setInterval(updateState, 1000);
    return () => clearInterval(interval);
  }, [updateState]);

  if (!state) {
    return null; // Loading state
  }

  const contextValue: HijriContextValue = {
    ...state,
    getHijriMonthDays,
    isHijriLeapYear,
    hijriToGregorianDate: hijriToGregorianDateFn,
    getCalendarMonthDays,
    getIslamicDateForGregorian,
    getPreviousIslamicDate,
    ISLAMIC_MONTHS,
    ISLAMIC_MONTHS_AR,
    GREGORIAN_MONTHS,
    DAYS_OF_WEEK,
    ISLAMIC_EVENTS,
  };

  return (
    <HijriContext.Provider value={contextValue}>
      {children}
    </HijriContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useHijri(): HijriContextValue {
  const context = useContext(HijriContext);
  if (!context) {
    throw new Error(
      "useHijri must be used within a HijriProvider. " +
      "All components displaying Islamic dates MUST use this hook - " +
      "NO independent calculations allowed."
    );
  }
  return context;
}

// ============================================
// EXPLANATION COMPONENT
// ============================================

export function IslamicDayExplanation() {
  const { maghrib, isExpected, dataSource, confirmationStatus } = useHijri();
  
  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
      <div className="flex items-start gap-2">
        <span className="text-lg">🌙</span>
        <div>
          <p className="font-medium text-foreground">Islamic Day Timing</p>
          <p className="text-muted-foreground text-xs mt-1">
            Islamic date changes at <strong>Maghrib (sunset)</strong> today. 
            Sunset time is calculated automatically using astronomical data for India.
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-lg">📍</span>
        <div>
          <p className="font-medium text-foreground">Location: India (IST)</p>
          <p className="text-muted-foreground text-xs mt-1">
            Today's Maghrib (sunset): <strong>{maghrib.formatted}</strong> — auto-calculated
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <span className="text-lg">📅</span>
        <div>
          <p className="font-medium text-foreground">Date Source</p>
          <p className="text-muted-foreground text-xs mt-1">
            Based on Indian moon sighting tradition. May vary by ±1 day.
          </p>
        </div>
      </div>
    </div>
  );
}
