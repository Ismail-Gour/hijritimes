// Islamic Daily Descriptions and Significance Data
// Religious significance, historical events, and cultural notes for Islamic dates

export interface DailyDescription {
  month: number;
  day: number;
  title: string;
  titleAr: string;
  description: string;
  significance: "high" | "medium" | "low";
  type: "religious" | "historical" | "cultural";
}

// Important Islamic dates with their descriptions
export const ISLAMIC_DAILY_DESCRIPTIONS: DailyDescription[] = [
  // Muharram (Month 1)
  {
    month: 1,
    day: 1,
    title: "Islamic New Year",
    titleAr: "رأس السنة الهجرية",
    description: "The first day of the Islamic calendar. Marks the beginning of Prophet Muhammad's ﷺ migration (Hijra) from Makkah to Madinah in 622 CE.",
    significance: "high",
    type: "religious",
  },
  {
    month: 1,
    day: 9,
    title: "Tasu'a",
    titleAr: "تاسوعاء",
    description: "The 9th of Muharram. Recommended to fast this day along with Ashura. The Prophet ﷺ intended to fast on this day.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 1,
    day: 10,
    title: "Day of Ashura",
    titleAr: "يوم عاشوراء",
    description: "A significant day commemorating when Allah saved Prophet Musa (Moses) and the Israelites from Pharaoh. Fasting on this day is highly recommended.",
    significance: "high",
    type: "religious",
  },

  // Safar (Month 2)
  {
    month: 2,
    day: 1,
    title: "Beginning of Safar",
    titleAr: "بداية صفر",
    description: "The second month of the Islamic calendar. Historically associated with journeys and migrations.",
    significance: "low",
    type: "cultural",
  },

  // Rabi' al-Awwal (Month 3)
  {
    month: 3,
    day: 12,
    title: "Mawlid an-Nabi",
    titleAr: "المولد النبوي الشريف",
    description: "The birthday of Prophet Muhammad ﷺ. Celebrated with gatherings, recitation of poetry praising the Prophet, and acts of charity.",
    significance: "high",
    type: "religious",
  },

  // Rabi' al-Thani (Month 4)
  {
    month: 4,
    day: 11,
    title: "Death of Sheikh Abdul Qadir Gilani",
    titleAr: "وفاة الشيخ عبد القادر الجيلاني",
    description: "Anniversary of the death of the great Sufi saint and founder of the Qadiriyya order.",
    significance: "medium",
    type: "historical",
  },

  // Jumada al-Awwal (Month 5)
  {
    month: 5,
    day: 5,
    title: "Battle of Mu'tah Anniversary",
    titleAr: "غزوة مؤتة",
    description: "Commemorating the Battle of Mu'tah (629 CE), where Muslim forces faced the Byzantine Empire.",
    significance: "low",
    type: "historical",
  },

  // Jumada al-Thani (Month 6)
  {
    month: 6,
    day: 20,
    title: "Birth of Fatimah al-Zahra",
    titleAr: "مولد فاطمة الزهراء",
    description: "Birthday of Fatimah, the daughter of Prophet Muhammad ﷺ and wife of Ali ibn Abi Talib.",
    significance: "medium",
    type: "religious",
  },

  // Rajab (Month 7)
  {
    month: 7,
    day: 1,
    title: "Beginning of Rajab",
    titleAr: "بداية رجب",
    description: "One of the four sacred months in Islam. Extra worship and good deeds are encouraged.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 7,
    day: 27,
    title: "Isra and Mi'raj",
    titleAr: "الإسراء والمعراج",
    description: "The Night Journey and Ascension of Prophet Muhammad ﷺ from Makkah to Jerusalem and then to the heavens, where the five daily prayers were prescribed.",
    significance: "high",
    type: "religious",
  },

  // Sha'ban (Month 8)
  {
    month: 8,
    day: 1,
    title: "Beginning of Sha'ban",
    titleAr: "بداية شعبان",
    description: "The month before Ramadan. The Prophet ﷺ used to fast most of this month in preparation for Ramadan.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 8,
    day: 15,
    title: "Shab-e-Barat (Mid-Sha'ban)",
    titleAr: "ليلة النصف من شعبان",
    description: "The Night of Forgiveness. Many Muslims spend this night in prayer and supplication, seeking Allah's forgiveness and blessings.",
    significance: "high",
    type: "religious",
  },

  // Ramadan (Month 9)
  {
    month: 9,
    day: 1,
    title: "First Day of Ramadan",
    titleAr: "أول أيام رمضان",
    description: "The beginning of the blessed month of fasting. Muslims fast from dawn to sunset, increase worship, charity, and recitation of the Quran.",
    significance: "high",
    type: "religious",
  },
  {
    month: 9,
    day: 17,
    title: "Battle of Badr Anniversary",
    titleAr: "غزوة بدر",
    description: "The anniversary of the Battle of Badr (624 CE), the first major military victory for Muslims against the Quraysh of Makkah.",
    significance: "medium",
    type: "historical",
  },
  {
    month: 9,
    day: 21,
    title: "Beginning of Last 10 Nights",
    titleAr: "بداية العشر الأواخر",
    description: "The most blessed nights of Ramadan begin. Laylat al-Qadr falls within these nights.",
    significance: "high",
    type: "religious",
  },
  {
    month: 9,
    day: 27,
    title: "Laylat al-Qadr (Most Likely)",
    titleAr: "ليلة القدر",
    description: "The Night of Power, better than a thousand months. The Quran was first revealed on this night. Worship on this night brings immense rewards.",
    significance: "high",
    type: "religious",
  },

  // Shawwal (Month 10)
  {
    month: 10,
    day: 1,
    title: "Eid al-Fitr",
    titleAr: "عيد الفطر المبارك",
    description: "The Festival of Breaking Fast. A joyous celebration marking the end of Ramadan. Includes Eid prayer, charity (Zakat al-Fitr), and festivities.",
    significance: "high",
    type: "religious",
  },
  {
    month: 10,
    day: 2,
    title: "Second Day of Eid al-Fitr",
    titleAr: "ثاني أيام عيد الفطر",
    description: "Continuation of Eid celebrations with family gatherings and festivities.",
    significance: "medium",
    type: "cultural",
  },
  {
    month: 10,
    day: 3,
    title: "Third Day of Eid al-Fitr",
    titleAr: "ثالث أيام عيد الفطر",
    description: "Final day of Eid al-Fitr celebrations in many communities.",
    significance: "medium",
    type: "cultural",
  },

  // Dhul Qi'dah (Month 11)
  {
    month: 11,
    day: 1,
    title: "Beginning of Dhul Qi'dah",
    titleAr: "بداية ذو القعدة",
    description: "One of the four sacred months. The month before the Hajj pilgrimage.",
    significance: "medium",
    type: "religious",
  },

  // Dhul Hijjah (Month 12)
  {
    month: 12,
    day: 1,
    title: "Beginning of Dhul Hijjah",
    titleAr: "بداية ذو الحجة",
    description: "The month of Hajj pilgrimage. The first 10 days are the most blessed days of the year.",
    significance: "high",
    type: "religious",
  },
  {
    month: 12,
    day: 8,
    title: "Day of Tarwiyah",
    titleAr: "يوم التروية",
    description: "The day before Arafah. Hajj pilgrims proceed to Mina to prepare for the Day of Arafah.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 12,
    day: 9,
    title: "Day of Arafah",
    titleAr: "يوم عرفة",
    description: "The most important day of Hajj. Standing at Arafah is the pillar of Hajj. Fasting on this day for non-pilgrims expiates sins of two years.",
    significance: "high",
    type: "religious",
  },
  {
    month: 12,
    day: 10,
    title: "Eid al-Adha",
    titleAr: "عيد الأضحى المبارك",
    description: "The Festival of Sacrifice. Commemorates Prophet Ibrahim's willingness to sacrifice his son. Includes Eid prayer and animal sacrifice (Qurbani).",
    significance: "high",
    type: "religious",
  },
  {
    month: 12,
    day: 11,
    title: "Days of Tashreeq Begin",
    titleAr: "أيام التشريق",
    description: "The Days of Eating and Drinking. It is forbidden to fast on these days. Takbeer is recited after prayers.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 12,
    day: 12,
    title: "Second Day of Tashreeq",
    titleAr: "ثاني أيام التشريق",
    description: "Continuation of the Days of Tashreeq with ongoing celebrations and takbeer.",
    significance: "medium",
    type: "religious",
  },
  {
    month: 12,
    day: 13,
    title: "Third Day of Tashreeq",
    titleAr: "ثالث أيام التشريق",
    description: "The final day of Tashreeq. Hajj pilgrims complete their rituals and depart from Mina.",
    significance: "medium",
    type: "religious",
  },
];

// Friday significance
export const FRIDAY_SIGNIFICANCE = {
  title: "Jumu'ah (Friday)",
  titleAr: "يوم الجمعة",
  description: "The best day of the week in Islam. It includes the congregational Jumu'ah prayer. The Prophet ﷺ said: 'The best day on which the sun rises is Friday.'",
  significance: "high" as const,
  type: "religious" as const,
};

// Get description for a specific Islamic date
export function getDailyDescription(month: number, day: number, dayOfWeek: number): DailyDescription | null {
  // Check for specific date events first
  const specificEvent = ISLAMIC_DAILY_DESCRIPTIONS.find(
    (desc) => desc.month === month && desc.day === day
  );
  
  if (specificEvent) return specificEvent;
  
  // If it's Friday, return Friday significance
  if (dayOfWeek === 5) {
    return {
      month,
      day,
      ...FRIDAY_SIGNIFICANCE,
    };
  }
  
  return null;
}

// Hyderabad, India specific timezone offset (IST = UTC+5:30)
export const HYDERABAD_TIMEZONE = "Asia/Kolkata";
export const IST_OFFSET_HOURS = 5.5;

// Maghrib/Islamic day start time approximation for Hyderabad
// Islamic day starts at Maghrib (sunset). In Hyderabad, sunset varies:
// Winter: ~5:45 PM, Summer: ~6:45 PM
// We'll use an average approximation that can be adjusted
export function getApproximateMaghribTime(date: Date): Date {
  const month = date.getMonth(); // 0-11
  
  // Approximate sunset times for Hyderabad by month (in hours, 24h format)
  const sunsetTimes = [
    17.75, // January - 5:45 PM
    18.25, // February - 6:15 PM
    18.25, // March - 6:15 PM
    18.5,  // April - 6:30 PM
    18.75, // May - 6:45 PM
    19.0,  // June - 7:00 PM
    19.0,  // July - 7:00 PM
    18.75, // August - 6:45 PM
    18.5,  // September - 6:30 PM
    18.0,  // October - 6:00 PM
    17.75, // November - 5:45 PM
    17.5,  // December - 5:30 PM
  ];
  
  const sunsetHour = sunsetTimes[month];
  const hours = Math.floor(sunsetHour);
  const minutes = (sunsetHour - hours) * 60;
  
  const maghribTime = new Date(date);
  maghribTime.setHours(hours, minutes, 0, 0);
  
  return maghribTime;
}

// Check if Islamic day has started based on current time
// NOTE: Prefer using getMaghribTime from '@/lib/solar' directly in components
export function hasIslamicDayStarted(date: Date): boolean {
  const maghribTime = getApproximateMaghribTime(date);
  return date >= maghribTime;
}

// Get the current Hyderabad time
export function getHyderabadTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: HYDERABAD_TIMEZONE }));
}

// Month-specific information
export interface MonthInfo {
  name: string;
  nameAr: string;
  description: string;
  virtues: string[];
  practices: string[];
}

export const ISLAMIC_MONTH_INFO: MonthInfo[] = [
  {
    name: "Muharram",
    nameAr: "محرم",
    description: "The first month of the Islamic calendar and one of the four sacred months.",
    virtues: ["Sacred month where fighting is prohibited", "Fasting is highly recommended, especially on Ashura"],
    practices: ["Fast on the 9th and 10th (Tasu'a and Ashura)", "Increase worship and good deeds"],
  },
  {
    name: "Safar",
    nameAr: "صفر",
    description: "The second month of the Islamic calendar.",
    virtues: ["Month of journeys and travel in pre-Islamic Arabia"],
    practices: ["Continue regular worship", "Dispel superstitions about this month"],
  },
  {
    name: "Rabi' al-Awwal",
    nameAr: "ربيع الأول",
    description: "The third month, in which the Prophet Muhammad ﷺ was born.",
    virtues: ["Month of the Prophet's birth", "A time to learn about and follow the Prophet's Sunnah"],
    practices: ["Study the Seerah (life of the Prophet)", "Send blessings upon the Prophet"],
  },
  {
    name: "Rabi' al-Thani",
    nameAr: "ربيع الثاني",
    description: "The fourth month of the Islamic calendar.",
    virtues: ["Continuation of spring season in Arabia"],
    practices: ["Maintain regular acts of worship"],
  },
  {
    name: "Jumada al-Awwal",
    nameAr: "جمادى الأولى",
    description: "The fifth month of the Islamic calendar.",
    virtues: ["Month named for the freezing of water in winter"],
    practices: ["Continue regular worship and good deeds"],
  },
  {
    name: "Jumada al-Thani",
    nameAr: "جمادى الآخرة",
    description: "The sixth month of the Islamic calendar.",
    virtues: ["Preparation time before the sacred months"],
    practices: ["Prepare spiritually for Rajab and beyond"],
  },
  {
    name: "Rajab",
    nameAr: "رجب",
    description: "One of the four sacred months. Contains the night of Isra and Mi'raj.",
    virtues: ["Sacred month", "Month of the miraculous Night Journey"],
    practices: ["Increase worship", "Commemorate Isra and Mi'raj on the 27th"],
  },
  {
    name: "Sha'ban",
    nameAr: "شعبان",
    description: "The month before Ramadan. The Prophet ﷺ fasted most of this month.",
    virtues: ["Month when deeds are raised to Allah", "Preparation for Ramadan"],
    practices: ["Fast during this month", "Prepare for Ramadan spiritually and physically"],
  },
  {
    name: "Ramadan",
    nameAr: "رمضان",
    description: "The holiest month. Fasting is obligatory, and the Quran was revealed in this month.",
    virtues: ["Month of fasting", "Night of Power (Laylat al-Qadr)", "Gates of Paradise open, gates of Hell close"],
    practices: ["Fast from dawn to sunset", "Pray Tarawih", "Read and reflect on the Quran", "Give charity"],
  },
  {
    name: "Shawwal",
    nameAr: "شوال",
    description: "The month of Eid al-Fitr. Fasting six days is highly recommended.",
    virtues: ["Month of Eid al-Fitr celebration", "Fasting six days equals fasting the whole year"],
    practices: ["Celebrate Eid al-Fitr", "Fast six days of Shawwal"],
  },
  {
    name: "Dhul Qi'dah",
    nameAr: "ذو القعدة",
    description: "One of the four sacred months. The month before Hajj.",
    virtues: ["Sacred month", "Month of rest before Hajj"],
    practices: ["Prepare for Hajj if planning to go", "Increase worship in sacred time"],
  },
  {
    name: "Dhul Hijjah",
    nameAr: "ذو الحجة",
    description: "The month of Hajj pilgrimage and Eid al-Adha.",
    virtues: ["Sacred month", "First 10 days are the best days of the year", "Contains Day of Arafah"],
    practices: ["Perform Hajj if able", "Fast on Day of Arafah (9th)", "Offer Qurbani on Eid"],
  },
];
