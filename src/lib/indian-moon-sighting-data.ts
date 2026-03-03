 /**
  * INDIAN MOON SIGHTING DATA - Official Confirmed Dates
  * 
  * ═══════════════════════════════════════════════════════════════════════════
  * This file contains CONFIRMED Islamic month start dates based on
  * official Indian moon sighting announcements (Central Committee / Hyderabad)
  * ═══════════════════════════════════════════════════════════════════════════
  * 
  * Authority Order:
  * 1. Indian Central Committee for Moon Sighting (Hyderabad)
  * 2. Regional mosque committees
  * 3. Fallback: Astronomical calculation (marked as "Expected")
  * 
  * HOW TO UPDATE:
  * - When official moon sighting is announced, add the month start date here
  * - The system will automatically use this confirmed data instead of calculation
  * - Always include the source and timestamp of confirmation
  */
 
 export interface ConfirmedMonthStart {
   hijriYear: number;
   hijriMonth: number;
   gregorianStartDate: string; // ISO format: "YYYY-MM-DD" - First day of the Hijri month
   source: string;
   confirmedAt: string; // ISO timestamp
   notes?: string;
 }
 
 /**
  * CONFIRMED MONTH START DATES (Indian Moon Sighting)
  * 
  * The Gregorian date represents when the Hijri month BEGINS (after Maghrib on the previous day)
  * Example: If 1 Sha'ban starts after Maghrib on Jan 30, the entry is "2025-01-31"
  */
export const CONFIRMED_MONTH_STARTS: ConfirmedMonthStart[] = [
  // ══════════════════════════════════════════════════════════════
  // 1447 AH - Current Year (2025-2026)
  // ══════════════════════════════════════════════════════════════
  
  {
    hijriYear: 1447,
    hijriMonth: 1, // Muharram
    gregorianStartDate: "2025-06-27",
    source: "Indian Central Committee",
    confirmedAt: "2025-06-26T18:30:00+05:30",
    notes: "Islamic New Year 1447"
  },
  {
    hijriYear: 1447,
    hijriMonth: 2, // Safar
    gregorianStartDate: "2025-07-27",
    source: "Indian Central Committee",
    confirmedAt: "2025-07-26T18:30:00+05:30"
  },
  {
    hijriYear: 1447,
    hijriMonth: 3, // Rabi al-Awwal
    gregorianStartDate: "2025-08-25",
    source: "Indian Central Committee",
    confirmedAt: "2025-08-24T18:30:00+05:30"
  },
  {
    hijriYear: 1447,
    hijriMonth: 4, // Rabi al-Thani
    gregorianStartDate: "2025-09-24",
    source: "Indian Central Committee",
    confirmedAt: "2025-09-23T18:30:00+05:30"
  },
  {
    hijriYear: 1447,
    hijriMonth: 5, // Jumada al-Awwal
    gregorianStartDate: "2025-10-23",
    source: "Indian Central Committee",
    confirmedAt: "2025-10-22T18:00:00+05:30"
  },
  {
    hijriYear: 1447,
    hijriMonth: 6, // Jumada al-Thani
    gregorianStartDate: "2025-11-22",
    source: "Indian Central Committee",
    confirmedAt: "2025-11-21T17:45:00+05:30"
  },
  {
    hijriYear: 1447,
    hijriMonth: 7, // Rajab
    gregorianStartDate: "2025-12-21",
    source: "Indian Central Committee",
    confirmedAt: "2025-12-20T17:45:00+05:30",
    notes: "Rajab 1447"
  },
  {
    hijriYear: 1447,
    hijriMonth: 8, // Sha'ban
    gregorianStartDate: "2026-01-21",
    source: "Indian Central Committee",
    confirmedAt: "2026-01-20T18:00:00+05:30",
    notes: "Sha'ban 1447 - month before Ramadan. 1st Sha'ban = Jan 21, 2026"
  },
  {
    hijriYear: 1447,
    hijriMonth: 9, // Ramadan
    gregorianStartDate: "2026-02-19",
    source: "Expected (Astronomical Calculation)",
    confirmedAt: "2026-02-17T18:00:00+05:30",
    notes: "Expected Ramadan 1447 start - subject to official moon sighting"
  },

  // ══════════════════════════════════════════════════════════════
  // 1446 AH - Previous Year (2024-2025)
  // ══════════════════════════════════════════════════════════════
  
  {
    hijriYear: 1446,
    hijriMonth: 1, // Muharram
    gregorianStartDate: "2024-07-07",
    source: "Indian Central Committee",
    confirmedAt: "2024-07-06T18:30:00+05:30",
    notes: "Islamic New Year 1446"
  },
  {
    hijriYear: 1446,
    hijriMonth: 2, // Safar
    gregorianStartDate: "2024-08-06",
    source: "Indian Central Committee",
    confirmedAt: "2024-08-05T18:30:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 3, // Rabi al-Awwal
    gregorianStartDate: "2024-09-05",
    source: "Indian Central Committee",
    confirmedAt: "2024-09-04T18:30:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 4, // Rabi al-Thani
    gregorianStartDate: "2024-10-05",
    source: "Indian Central Committee",
    confirmedAt: "2024-10-04T18:30:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 5, // Jumada al-Awwal
    gregorianStartDate: "2024-11-03",
    source: "Indian Central Committee",
    confirmedAt: "2024-11-02T18:00:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 6, // Jumada al-Thani
    gregorianStartDate: "2024-12-03",
    source: "Indian Central Committee",
    confirmedAt: "2024-12-02T17:45:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 7, // Rajab
    gregorianStartDate: "2025-01-01",
    source: "Indian Central Committee",
    confirmedAt: "2024-12-31T17:45:00+05:30",
    notes: "Rajab 1446 began on January 1, 2025"
  },
  {
    hijriYear: 1446,
    hijriMonth: 8, // Sha'ban
    gregorianStartDate: "2025-01-31",
    source: "Indian Central Committee",
    confirmedAt: "2025-01-30T18:00:00+05:30",
    notes: "Sha'ban 1446 - month before Ramadan"
  },
  {
    hijriYear: 1446,
    hijriMonth: 9, // Ramadan
    gregorianStartDate: "2025-03-01",
    source: "Indian Central Committee",
    confirmedAt: "2025-02-28T18:00:00+05:30",
    notes: "Ramadan 1446"
  },
  {
    hijriYear: 1446,
    hijriMonth: 10, // Shawwal
    gregorianStartDate: "2025-03-30",
    source: "Indian Central Committee",
    confirmedAt: "2025-03-29T18:00:00+05:30",
    notes: "Eid al-Fitr 1446"
  },
  {
    hijriYear: 1446,
    hijriMonth: 11, // Dhul Qa'dah
    gregorianStartDate: "2025-04-29",
    source: "Indian Central Committee",
    confirmedAt: "2025-04-28T18:00:00+05:30"
  },
  {
    hijriYear: 1446,
    hijriMonth: 12, // Dhul Hijjah
    gregorianStartDate: "2025-05-28",
    source: "Indian Central Committee",
    confirmedAt: "2025-05-27T18:00:00+05:30",
    notes: "Eid al-Adha on 10th = June 6, 2025"
  },
];
 
 /**
  * Get the confirmed start date for a specific Hijri month
  * Returns null if no confirmed data exists (fallback to calculation needed)
  */
 export function getConfirmedMonthStart(hijriYear: number, hijriMonth: number): ConfirmedMonthStart | null {
   return CONFIRMED_MONTH_STARTS.find(
     m => m.hijriYear === hijriYear && m.hijriMonth === hijriMonth
   ) || null;
 }
 
 /**
  * Get the latest confirmed month for a given year
  */
 export function getLatestConfirmedMonth(hijriYear: number): ConfirmedMonthStart | null {
   const yearMonths = CONFIRMED_MONTH_STARTS.filter(m => m.hijriYear === hijriYear);
   if (yearMonths.length === 0) return null;
   return yearMonths.reduce((latest, current) => 
     current.hijriMonth > latest.hijriMonth ? current : latest
   );
 }
 
 /**
  * Calculate Hijri date using confirmed Indian moon sighting data
  * 
  * This function uses CONFIRMED month start dates when available,
  * providing accurate dates based on actual Indian moon sighting.
  * 
  * @param gregorianDate - The Gregorian date to convert
  * @param afterMaghrib - Whether current time is after Maghrib
  * @returns The Hijri date and whether it's confirmed or expected
  */
 export function calculateHijriFromConfirmedData(
   gregorianDate: Date,
   afterMaghrib: boolean
 ): { year: number; month: number; day: number; isConfirmed: boolean; source: string } {
   
   // Adjust date based on Maghrib - if after Maghrib, we're in the next Islamic day
   const effectiveDate = new Date(gregorianDate);
   if (afterMaghrib) {
     effectiveDate.setDate(effectiveDate.getDate() + 1);
   }
   effectiveDate.setHours(0, 0, 0, 0);
   
   // Try to find which confirmed month this date falls in
   const sortedMonths = [...CONFIRMED_MONTH_STARTS].sort((a, b) => {
     const dateA = new Date(a.gregorianStartDate);
     const dateB = new Date(b.gregorianStartDate);
     return dateB.getTime() - dateA.getTime(); // Most recent first
   });
   
   for (const monthStart of sortedMonths) {
     const startDate = new Date(monthStart.gregorianStartDate);
     startDate.setHours(0, 0, 0, 0);
     
     if (effectiveDate >= startDate) {
       // Calculate days since month started
       const daysDiff = Math.floor((effectiveDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
       const dayInMonth = daysDiff + 1; // Day 1 is the first day
       
       // Check if still in this month (max 30 days)
       if (dayInMonth <= 30) {
         // Check if we have next month's confirmed date to know exact month length
         let nextMonthNum = monthStart.hijriMonth + 1;
         let nextYear = monthStart.hijriYear;
         if (nextMonthNum > 12) {
           nextMonthNum = 1;
           nextYear++;
         }
         
         const nextMonthConfirmed = getConfirmedMonthStart(nextYear, nextMonthNum);
         
         if (nextMonthConfirmed) {
           const nextStartDate = new Date(nextMonthConfirmed.gregorianStartDate);
           nextStartDate.setHours(0, 0, 0, 0);
           
           // If we're past the next month's start, we're in the next month
           if (effectiveDate >= nextStartDate) {
             const daysIntoNextMonth = Math.floor((effectiveDate.getTime() - nextStartDate.getTime()) / (1000 * 60 * 60 * 24));
             return {
               year: nextYear,
               month: nextMonthNum,
               day: daysIntoNextMonth + 1,
               isConfirmed: true,
               source: nextMonthConfirmed.source
             };
           }
         }
         
         return {
           year: monthStart.hijriYear,
           month: monthStart.hijriMonth,
           day: dayInMonth,
           isConfirmed: true,
           source: monthStart.source
         };
       }
     }
   }
   
   // No confirmed data found - return null to trigger fallback
   return {
     year: 0,
     month: 0,
     day: 0,
     isConfirmed: false,
     source: "Astronomical Calculation (Expected)"
   };
 }
 
 /**
  * Check if a specific date has confirmed data available
  */
 export function hasConfirmedDataForDate(gregorianDate: Date): boolean {
   const result = calculateHijriFromConfirmedData(gregorianDate, false);
   return result.isConfirmed;
 }
 
/**
 * Get expected Ramadan start date for planning
 * (Until officially confirmed)
 */
export const EXPECTED_RAMADAN_1447 = {
  expectedStart: "2026-02-19", // Expected first fast (may vary by 1-2 days)
  announcementExpected: "2026-02-17", // Moon sighting attempt date
  notes: "Subject to official moon sighting on 29 Sha'ban (Feb 17 evening)"
};

/**
 * Get expected Eid dates for planning
 * (Until officially confirmed)
 */
export const EXPECTED_EID_DATES_1447 = {
  eidAlFitr: {
    expectedDate: "2026-03-20", // 1 Shawwal expected
    notes: "Subject to Ramadan moon sighting and month length"
  },
  eidAlAdha: {
    expectedDate: "2026-05-27", // 10 Dhul Hijjah expected
    notes: "Subject to Dhul Hijjah moon sighting"
  }
};