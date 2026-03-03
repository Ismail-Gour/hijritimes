// Prayer Times Educational Data
// Based on Sunni Islam (Qur'an + Sahih Hadith)

export interface PrayerInfo {
  id: string;
  name: string;
  nameAr: string;
  definition: string;
  startCondition: string;
  endCondition: string;
  importance: string[];
  hadithReference?: string;
  quranicReference?: string;
  commonConfusions: string[];
  sunPosition: string;
  notes?: string[];
}

export const PRAYERS: PrayerInfo[] = [
  {
    id: "fajr",
    name: "Fajr",
    nameAr: "الفجر",
    definition: "The dawn prayer, performed when true dawn (Fajr Ṣādiq) appears - when horizontal light spreads across the horizon.",
    startCondition: "True dawn begins - when a horizontal line of whiteness appears across the eastern horizon",
    endCondition: "Sunrise - when the upper edge of the sun appears above the horizon",
    sunPosition: "Sun is 18° below the horizon (astronomical dawn) to 15° below (nautical dawn), depending on calculation method",
    importance: [
      "Allah mentions Fajr specifically in the Qur'an as a witnessed prayer",
      "The Prophet ﷺ said: 'The two rak'ahs of Fajr are better than the world and everything in it' (Muslim)",
      "Angels of night and day gather at this time"
    ],
    quranicReference: "Establish prayer at the decline of the sun until the darkness of the night and [also] the Qur'an [i.e., recitation] of dawn. Indeed, the recitation of dawn is ever witnessed. (17:78)",
    hadithReference: "The Prophet ﷺ said: 'Whoever prays Fajr is under the protection of Allah' (Muslim)",
    commonConfusions: [
      "Confusing true dawn (Fajr Ṣādiq) with false dawn (Fajr Kādhib) - false dawn appears as a vertical light and then disappears",
      "Thinking Fajr time extends past sunrise - it does not",
      "Not understanding that Fajr begins well before sunrise, not at sunrise"
    ]
  },
  {
    id: "dhuhr",
    name: "Dhuhr",
    nameAr: "الظهر",
    definition: "The midday prayer, performed after the sun passes its highest point (zenith) and begins to decline.",
    startCondition: "After zawāl (when the sun passes the meridian and shadows begin to lengthen from their shortest point)",
    endCondition: "When the shadow of an object equals its length (plus the noon shadow) - this is the Shafi'i, Maliki, and Hanbali view. Hanafi view: when shadow equals twice the object's length.",
    sunPosition: "Sun has passed the zenith (highest point) and is declining westward",
    importance: [
      "The first prayer established in the day",
      "A time when the gates of heaven are opened",
      "The Prophet ﷺ was consistent in praying Dhuhr"
    ],
    quranicReference: "Establish prayer at the decline of the sun... (17:78)",
    hadithReference: "The Prophet ﷺ said: 'This is a time when the gates of heaven are opened, and I like my good deeds to ascend at that time' (Tirmidhi)",
    commonConfusions: [
      "Thinking Dhuhr can be prayed at exactly noon - it begins AFTER the sun passes zenith",
      "Not knowing there's a brief forbidden period at exact zenith",
      "Confusing the end time between different schools of thought"
    ],
    notes: [
      "There is a brief period at exact zenith (when the sun is at its highest) when prayer is forbidden"
    ]
  },
  {
    id: "asr",
    name: "Asr",
    nameAr: "العصر",
    definition: "The afternoon prayer, performed when shadows have lengthened to a specific ratio of the object's height.",
    startCondition: "When the shadow of an object equals its length (plus noon shadow) - majority view. Hanafi: when shadow equals twice the length.",
    endCondition: "Sunset - when the sun disappears below the horizon. However, delaying until the sun turns yellow is disliked (makruh).",
    sunPosition: "Sun is in the western sky, shadows are notably longer than at midday",
    importance: [
      "Allah specifically mentions Asr as 'the middle prayer' according to many scholars",
      "Missing Asr is severely warned against in hadith",
      "A time of accountability"
    ],
    quranicReference: "Guard strictly the prayers, especially the middle prayer (Salat al-Wusta). (2:238)",
    hadithReference: "The Prophet ﷺ said: 'Whoever misses the Asr prayer, it is as if he lost his family and property' (Bukhari & Muslim)",
    commonConfusions: [
      "Not knowing there's a disliked (makruh) time before sunset when the sun turns yellow",
      "Thinking Asr time is very short - it actually extends until sunset",
      "Confusing the start time between different schools"
    ],
    notes: [
      "Delaying Asr until the sun turns yellow is disliked but the prayer remains valid until sunset"
    ]
  },
  {
    id: "maghrib",
    name: "Maghrib",
    nameAr: "المغرب",
    definition: "The sunset prayer, performed immediately after the sun has completely set below the horizon.",
    startCondition: "When the complete disk of the sun disappears below the western horizon",
    endCondition: "When the red twilight (shafaq ahmar) disappears - this is the majority view. Some scholars say when the white twilight disappears.",
    sunPosition: "Sun has fully set below the horizon, twilight is visible",
    importance: [
      "Marks the beginning of the Islamic day",
      "The shortest prayer window - should not be delayed",
      "Time when fasting is broken during Ramadan"
    ],
    quranicReference: "Establish prayer at the decline of the sun until the darkness of the night... (17:78)",
    hadithReference: "The Prophet ﷺ used to hasten to pray Maghrib as soon as the sun set (Bukhari)",
    commonConfusions: [
      "Thinking Maghrib time lasts until midnight - it does not",
      "Not realizing Maghrib has the shortest window of any prayer",
      "Confusing sunset with the disappearance of twilight"
    ],
    notes: [
      "The Islamic day begins at Maghrib, not midnight",
      "Maghrib should be prayed promptly - the Prophet ﷺ did not delay it"
    ]
  },
  {
    id: "isha",
    name: "Isha",
    nameAr: "العشاء",
    definition: "The night prayer, performed after twilight has completely disappeared and darkness has set in.",
    startCondition: "When the red twilight disappears from the sky (majority view) - complete darkness",
    endCondition: "Until the middle of the night (preferred), or until Fajr (permissible but disliked to delay past midnight)",
    sunPosition: "Sun is well below the horizon (typically 15-18° below), no twilight remains",
    importance: [
      "Completing the night prayers (Maghrib + Isha) is highly rewarded",
      "Praying Isha in congregation equals half the night in prayer",
      "The time for night worship (tahajjud) follows Isha"
    ],
    quranicReference: "Establish prayer at the decline of the sun until the darkness of the night (ghasaq al-layl)... (17:78)",
    hadithReference: "The Prophet ﷺ said: 'Whoever prays Isha in congregation, it is as if he prayed half the night' (Muslim)",
    commonConfusions: [
      "Thinking Isha can be prayed any time until Fajr without dislike",
      "Not knowing the preferred time ends at midnight",
      "Confusing the start time - it's when twilight disappears, not a fixed time after Maghrib"
    ]
  }
];

export interface ForbiddenTime {
  name: string;
  description: string;
  start: string;
  end: string;
  hadithReference: string;
  exceptions: string[];
}

export const FORBIDDEN_TIMES: ForbiddenTime[] = [
  {
    name: "After Fajr until Sunrise",
    description: "From the completion of Fajr prayer until the sun has fully risen above the horizon",
    start: "After Fajr prayer",
    end: "When the sun has risen to the height of a spear (approximately 15-20 minutes after sunrise)",
    hadithReference: "The Prophet ﷺ forbade prayer after Fajr until the sun rises (Bukhari & Muslim)",
    exceptions: [
      "Prayers with a specific cause (sabab) like funeral prayer or greeting the mosque (tahiyyat al-masjid) - scholarly difference exists",
      "Making up missed obligatory prayers - permitted according to majority"
    ]
  },
  {
    name: "When Sun is at Zenith",
    description: "A brief period when the sun is at its highest point, directly overhead",
    start: "When the sun reaches its highest point (meridian)",
    end: "When the sun begins to decline (zawāl)",
    hadithReference: "The Prophet ﷺ said: 'There are three times when Allah's Messenger forbade us to pray...' including 'when the sun is at its highest' (Muslim)",
    exceptions: [
      "Friday - the prohibition at zenith does not apply according to the majority view"
    ]
  },
  {
    name: "After Asr until Sunset",
    description: "From the completion of Asr prayer until the sun has fully set",
    start: "After Asr prayer",
    end: "After the sun has fully set (Maghrib begins)",
    hadithReference: "The Prophet ﷺ forbade prayer after Asr until the sun sets (Bukhari & Muslim)",
    exceptions: [
      "Making up missed prayers - permitted",
      "Funeral prayer - some scholars permit it",
      "The two rak'ahs after Dhuhr if missed - some scholars permit making them up after Asr"
    ]
  }
];

export const MISCONCEPTIONS = [
  {
    misconception: "Prayer times are fixed by clocks",
    correction: "Prayer times are determined by the sun's position. Clocks are modern tools that approximate these natural signs. The actual times vary by location and season."
  },
  {
    misconception: "As long as I pray sometime today, it's fine",
    correction: "Each prayer has a specific window. Praying outside this window without valid excuse means the prayer is not performed correctly. Allah prescribed specific times for wisdom."
  },
  {
    misconception: "Maghrib lasts until midnight",
    correction: "Maghrib time ends when the red twilight disappears, which is typically 1-1.5 hours after sunset. It has the shortest window of all prayers."
  },
  {
    misconception: "I can pray any voluntary prayer at any time",
    correction: "There are three forbidden times when only specific prayers with causes are permitted. Voluntary prayers without cause are not allowed during these times."
  },
  {
    misconception: "Prayer times are the same everywhere",
    correction: "Prayer times vary significantly by location (latitude) and season. A prayer time in one city can be hours different from another city."
  },
  {
    misconception: "Sunrise and sunset times from weather apps are accurate for prayer",
    correction: "Weather apps often use different definitions. Islamic sunrise/sunset refers to the visual appearance/disappearance of the sun's disk, which may differ from astronomical definitions."
  }
];

// Hyderabad coordinates for prayer time calculations
export const HYDERABAD_COORDS = {
  latitude: 17.385,
  longitude: 78.4867,
  timezone: 5.5, // IST = UTC+5:30
  elevation: 505 // meters
};

// Simple prayer time calculation based on sun position
// This is a simplified version - for production, consider using a dedicated library
export function calculatePrayerTimes(date: Date): Record<string, Date> {
  const { latitude, longitude, timezone } = HYDERABAD_COORDS;
  
  // Julian date calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const jd = Math.floor(365.25 * (year + 4716)) + 
             Math.floor(30.6001 * (month + 1)) + 
             day - 1524.5;
  
  const D = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
  const e = 23.439 - 0.00000036 * D;
  const RA = Math.atan2(Math.cos(e * Math.PI / 180) * Math.sin(L * Math.PI / 180), Math.cos(L * Math.PI / 180)) * 180 / Math.PI;
  const decl = Math.asin(Math.sin(e * Math.PI / 180) * Math.sin(L * Math.PI / 180)) * 180 / Math.PI;
  
  // Equation of time
  const EqT = (q - RA) / 15;
  
  // Dhuhr time (solar noon)
  const dhuhrTime = 12 + timezone - longitude / 15 - EqT;
  
  // Helper function to calculate time for a given angle
  const timeForAngle = (angle: number): number => {
    const cosH = (Math.sin(angle * Math.PI / 180) - Math.sin(latitude * Math.PI / 180) * Math.sin(decl * Math.PI / 180)) /
                 (Math.cos(latitude * Math.PI / 180) * Math.cos(decl * Math.PI / 180));
    if (cosH > 1 || cosH < -1) return NaN;
    return Math.acos(cosH) * 180 / Math.PI / 15;
  };
  
  // Calculate prayer times
  const sunriseAngle = -0.833; // Accounting for refraction
  const fajrAngle = -18; // True dawn
  const ishaAngle = -17; // Twilight disappearance
  
  const sunrise = dhuhrTime - timeForAngle(sunriseAngle);
  const sunset = dhuhrTime + timeForAngle(sunriseAngle);
  const fajr = dhuhrTime - timeForAngle(fajrAngle);
  const isha = dhuhrTime + timeForAngle(ishaAngle);
  
  // Asr calculation (Shafi'i method - shadow = object length)
  const asrFactor = 1; // Use 2 for Hanafi
  const asrAngle = Math.atan(1 / (asrFactor + Math.tan(Math.abs(latitude - decl) * Math.PI / 180))) * 180 / Math.PI;
  const asrOffset = timeForAngle(90 - asrAngle);
  const asr = dhuhrTime + asrOffset;
  
  // Convert decimal hours to Date objects
  const toDate = (hours: number): Date => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const result = new Date(date);
    result.setHours(h, m, 0, 0);
    return result;
  };
  
  return {
    fajr: toDate(fajr),
    sunrise: toDate(sunrise),
    dhuhr: toDate(dhuhrTime + 0.05), // Add few minutes after zawāl
    asr: toDate(asr),
    maghrib: toDate(sunset),
    isha: toDate(isha)
  };
}

export function getCurrentPrayerStatus(times: Record<string, Date>): {
  current: string | null;
  next: string;
  isForbidden: boolean;
  forbiddenReason: string | null;
  timeToNext: number; // minutes
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const toMinutes = (d: Date) => d.getHours() * 60 + d.getMinutes();
  
  const fajrMin = toMinutes(times.fajr);
  const sunriseMin = toMinutes(times.sunrise);
  const dhuhrMin = toMinutes(times.dhuhr);
  const asrMin = toMinutes(times.asr);
  const maghribMin = toMinutes(times.maghrib);
  const ishaMin = toMinutes(times.isha);
  
  // Check forbidden times
  let isForbidden = false;
  let forbiddenReason: string | null = null;
  
  // After Fajr until 15-20 min after sunrise
  if (currentMinutes > fajrMin && currentMinutes < sunriseMin + 15) {
    if (currentMinutes >= sunriseMin && currentMinutes < sunriseMin + 15) {
      isForbidden = true;
      forbiddenReason = "Sun is rising - forbidden time until sun has fully risen";
    }
  }
  
  // At zenith (few minutes before Dhuhr)
  if (currentMinutes >= dhuhrMin - 5 && currentMinutes < dhuhrMin) {
    isForbidden = true;
    forbiddenReason = "Sun is at zenith - brief forbidden period";
  }
  
  // After Asr until sunset (makruh when sun turns yellow)
  if (currentMinutes >= maghribMin - 30 && currentMinutes < maghribMin) {
    isForbidden = true;
    forbiddenReason = "Sun is setting - forbidden time for voluntary prayers";
  }
  
  // Determine current and next prayer
  let current: string | null = null;
  let next: string;
  let timeToNext: number;
  
  if (currentMinutes < fajrMin) {
    current = null;
    next = "fajr";
    timeToNext = fajrMin - currentMinutes;
  } else if (currentMinutes < sunriseMin) {
    current = "fajr";
    next = "dhuhr";
    timeToNext = dhuhrMin - currentMinutes;
  } else if (currentMinutes < dhuhrMin) {
    current = null; // After sunrise, before Dhuhr
    next = "dhuhr";
    timeToNext = dhuhrMin - currentMinutes;
  } else if (currentMinutes < asrMin) {
    current = "dhuhr";
    next = "asr";
    timeToNext = asrMin - currentMinutes;
  } else if (currentMinutes < maghribMin) {
    current = "asr";
    next = "maghrib";
    timeToNext = maghribMin - currentMinutes;
  } else if (currentMinutes < ishaMin) {
    current = "maghrib";
    next = "isha";
    timeToNext = ishaMin - currentMinutes;
  } else {
    current = "isha";
    next = "fajr";
    timeToNext = (24 * 60 - currentMinutes) + fajrMin; // Time until tomorrow's Fajr
  }
  
  return { current, next, isForbidden, forbiddenReason, timeToNext };
}
