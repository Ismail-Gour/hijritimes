// Comprehensive Hijri Months Data
// Educational content for all 12 Islamic months
// Sources: Quran, Sahih Hadith collections (Bukhari, Muslim), Classical Islamic references

export interface HijriMonthData {
  number: number;
  nameArabic: string;
  nameTranslit: string;
  meaning: string;
  arabicRoot: string;
  historicalContext: string;
  isSacred: boolean;
  position: {
    description: string;
    relationship: string;
  };
  significance: {
    religious: string[];
    historical: string[];
    quranicReferences?: string[];
  };
  majorEvents: {
    name: string;
    nameArabic: string;
    description: string;
    authenticity: "established" | "commonly-mentioned" | "disputed";
    day?: number;
  }[];
  traditionalFocus: string[];
  misconceptions: {
    myth: string;
    clarification: string;
  }[];
  nature: "Sacred" | "Worship" | "Historical" | "General";
}

export const HIJRI_MONTHS_DATA: HijriMonthData[] = [
  // 1. Muharram
  {
    number: 1,
    nameArabic: "ٱلْمُحَرَّم",
    nameTranslit: "Muharram",
    meaning: "Forbidden / Sacred",
    arabicRoot: "ح-ر-م (ḥ-r-m) - to forbid, make sacred",
    historicalContext: "Named because fighting was forbidden during this month in pre-Islamic Arabia. The sanctity was retained and emphasized in Islam.",
    isSacred: true,
    position: {
      description: "1st month of the Islamic calendar",
      relationship: "Marks the beginning of the new Hijri year. Follows Dhul Hijjah."
    },
    significance: {
      religious: [
        "One of the four sacred months mentioned in the Quran",
        "Fasting in this month is highly recommended after Ramadan",
        "The Prophet ﷺ said: 'The best fasting after Ramadan is in the month of Allah, Muharram' (Muslim)"
      ],
      historical: [
        "The Islamic calendar begins from the Hijra (migration) to Madinah",
        "Historical events include Prophet Musa (Moses) being saved from Pharaoh"
      ],
      quranicReferences: [
        "Surah At-Tawbah 9:36 - Reference to the four sacred months"
      ]
    },
    majorEvents: [
      {
        name: "Islamic New Year",
        nameArabic: "رأس السنة الهجرية",
        description: "Marks the beginning of the new Hijri year, commemorating the Prophet's migration",
        authenticity: "established",
        day: 1
      },
      {
        name: "Day of Ashura",
        nameArabic: "يوم عاشوراء",
        description: "The 10th of Muharram. Fasting on this day was practiced by the Prophet ﷺ who said it expiates sins of the previous year",
        authenticity: "established",
        day: 10
      },
      {
        name: "Tasu'a",
        nameArabic: "تاسوعاء",
        description: "The 9th of Muharram. The Prophet ﷺ intended to fast this day along with Ashura to differ from other traditions",
        authenticity: "established",
        day: 9
      }
    ],
    traditionalFocus: [
      "Increased voluntary fasting, especially around Ashura",
      "Reflection on the new year and gratitude for blessings",
      "Remembrance of historical events and lessons",
      "Avoidance of wrongdoing, as sins are more serious in sacred months"
    ],
    misconceptions: [
      {
        myth: "The entire month is a month of mourning",
        clarification: "There is no authentic evidence that Muharram is designated as a month of mourning. The Prophet ﷺ encouraged fasting in this month as an act of gratitude and worship."
      },
      {
        myth: "Marriage is forbidden in Muharram",
        clarification: "There is no prohibition on marriage in Muharram. This is a cultural practice without basis in Islamic sources."
      },
      {
        myth: "Starting new ventures is unlucky in Muharram",
        clarification: "Islam does not attribute bad luck to any month. This belief contradicts Islamic teachings about reliance on Allah."
      }
    ],
    nature: "Sacred"
  },

  // 2. Safar
  {
    number: 2,
    nameArabic: "صَفَر",
    nameTranslit: "Safar",
    meaning: "Empty / Void",
    arabicRoot: "ص-ف-ر (ṣ-f-r) - to be empty, yellow",
    historicalContext: "Named possibly because pre-Islamic Arabs left their homes empty during this month for travel, or because houses were emptied during raids. Some scholars link it to the yellowing of leaves.",
    isSacred: false,
    position: {
      description: "2nd month of the Islamic calendar",
      relationship: "Follows Muharram and precedes Rabi' al-Awwal"
    },
    significance: {
      religious: [
        "An ordinary month in terms of religious status",
        "The Prophet ﷺ explicitly rejected superstitions about this month"
      ],
      historical: [
        "Various historical events occurred during this month",
        "The Prophet ﷺ fell ill in this month during his final year"
      ]
    },
    majorEvents: [
      {
        name: "Battle of Abwa (possible)",
        nameArabic: "غزوة الأبواء",
        description: "The first military expedition led by the Prophet ﷺ",
        authenticity: "commonly-mentioned"
      }
    ],
    traditionalFocus: [
      "Continuation of regular worship and good deeds",
      "Rejection of superstitious beliefs about the month",
      "Focus on reliance on Allah (tawakkul)"
    ],
    misconceptions: [
      {
        myth: "Safar is an unlucky or evil month",
        clarification: "The Prophet ﷺ said: 'There is no [contagion, bad omen in] Safar' (Bukhari). Islam rejects the concept of unlucky times."
      },
      {
        myth: "Marriage should be avoided in Safar",
        clarification: "There is no Islamic prohibition on marriage in Safar. This is a cultural superstition."
      },
      {
        myth: "Calamities are more likely in Safar",
        clarification: "No month is designated for calamities in Islam. Good and bad occur by Allah's decree throughout the year."
      }
    ],
    nature: "General"
  },

  // 3. Rabi' al-Awwal
  {
    number: 3,
    nameArabic: "رَبِيع ٱلْأَوَّل",
    nameTranslit: "Rabi' al-Awwal",
    meaning: "First Spring",
    arabicRoot: "ر-ب-ع (r-b-ʿ) - spring, to settle",
    historicalContext: "Named because it originally fell during spring when the month names were established. The name remained fixed even as the lunar calendar moved through seasons.",
    isSacred: false,
    position: {
      description: "3rd month of the Islamic calendar",
      relationship: "Follows Safar and precedes Rabi' al-Thani"
    },
    significance: {
      religious: [
        "The month in which the Prophet Muhammad ﷺ was born",
        "The month in which the Prophet ﷺ passed away",
        "The month of the Hijra (migration) to Madinah"
      ],
      historical: [
        "Birth of the Prophet ﷺ (date disputed: 8th, 9th, or 12th)",
        "The Prophet's arrival in Madinah during the Hijra",
        "Death of the Prophet ﷺ on the 12th"
      ]
    },
    majorEvents: [
      {
        name: "Mawlid an-Nabi (Prophet's Birthday)",
        nameArabic: "المولد النبوي",
        description: "The birth of Prophet Muhammad ﷺ. The exact date is disputed among scholars (8th, 9th, or 12th). Celebrations vary widely across Muslim communities.",
        authenticity: "established",
        day: 12
      },
      {
        name: "Arrival in Madinah",
        nameArabic: "الهجرة إلى المدينة",
        description: "The Prophet's migration from Makkah to Madinah, marking the start of the Islamic calendar",
        authenticity: "established"
      }
    ],
    traditionalFocus: [
      "Learning about the life and character of the Prophet ﷺ (Seerah)",
      "Increasing prayers and blessings upon the Prophet ﷺ",
      "Reflecting on the Prophet's teachings and example",
      "Studying and implementing the Sunnah"
    ],
    misconceptions: [
      {
        myth: "The 12th of Rabi' al-Awwal is the confirmed date of the Prophet's birth",
        clarification: "Scholars differ on the exact date. Some report the 8th, 9th, or 12th. The 12th is widely commemorated but not definitively established."
      },
      {
        myth: "Celebrating Mawlid is either obligatory or forbidden",
        clarification: "Scholars have diverse views on Mawlid celebrations. Neither extreme (obligatory or forbidden) represents the full scholarly picture."
      }
    ],
    nature: "Historical"
  },

  // 4. Rabi' al-Thani
  {
    number: 4,
    nameArabic: "رَبِيع ٱلْآخِر",
    nameTranslit: "Rabi' al-Thani",
    meaning: "Second Spring / Latter Spring",
    arabicRoot: "ر-ب-ع (r-b-ʿ) - spring",
    historicalContext: "Also called Rabi' al-Akhir. Named as the continuation of the spring season when month names were established.",
    isSacred: false,
    position: {
      description: "4th month of the Islamic calendar",
      relationship: "Follows Rabi' al-Awwal and precedes Jumada al-Awwal"
    },
    significance: {
      religious: [
        "An ordinary month without specific obligatory acts",
        "Continuation of regular worship is encouraged"
      ],
      historical: [
        "Various historical events and deaths of notable scholars"
      ]
    },
    majorEvents: [
      {
        name: "Death of Sheikh Abdul Qadir Gilani",
        nameArabic: "وفاة الشيخ عبد القادر الجيلاني",
        description: "The great scholar and founder of the Qadiriyya Sufi order passed away on the 11th",
        authenticity: "commonly-mentioned",
        day: 11
      }
    ],
    traditionalFocus: [
      "Maintaining regular acts of worship",
      "Seeking knowledge and self-improvement",
      "Community service and charity"
    ],
    misconceptions: [
      {
        myth: "This month has special rituals or prohibitions",
        clarification: "There are no specific obligatory or prohibited acts unique to this month. Regular worship continues as normal."
      }
    ],
    nature: "General"
  },

  // 5. Jumada al-Awwal
  {
    number: 5,
    nameArabic: "جُمَادَىٰ ٱلْأُولَىٰ",
    nameTranslit: "Jumada al-Awwal",
    meaning: "First Month of Parched Land / First Dry",
    arabicRoot: "ج-م-د (j-m-d) - to freeze, become solid",
    historicalContext: "Named because it originally fell during the dry, cold winter when water would freeze. Some scholars relate it to the drying up of water sources.",
    isSacred: false,
    position: {
      description: "5th month of the Islamic calendar",
      relationship: "Follows Rabi' al-Thani and precedes Jumada al-Thani"
    },
    significance: {
      religious: [
        "An ordinary month in terms of specific religious obligations"
      ],
      historical: [
        "Birth of Zainab bint Muhammad ﷺ (according to some accounts)",
        "Various battles and historical events"
      ]
    },
    majorEvents: [
      {
        name: "Battle of Mu'tah",
        nameArabic: "غزوة مؤتة",
        description: "A significant battle between Muslim forces and the Byzantine Empire in 629 CE",
        authenticity: "established"
      }
    ],
    traditionalFocus: [
      "Continuing regular worship and good deeds",
      "Maintaining consistency in spiritual practice"
    ],
    misconceptions: [
      {
        myth: "The month is associated with bad fortune due to its name",
        clarification: "The name refers to historical seasonal conditions, not fortune. Islam does not associate months with luck."
      }
    ],
    nature: "General"
  },

  // 6. Jumada al-Thani
  {
    number: 6,
    nameArabic: "جُمَادَىٰ ٱلْآخِرَة",
    nameTranslit: "Jumada al-Thani",
    meaning: "Second Month of Parched Land / Latter Dry",
    arabicRoot: "ج-م-د (j-m-d) - to freeze, become solid",
    historicalContext: "Also called Jumada al-Akhirah. Continuation of the dry/winter period when originally named.",
    isSacred: false,
    position: {
      description: "6th month of the Islamic calendar",
      relationship: "Follows Jumada al-Awwal and precedes Rajab (a sacred month)"
    },
    significance: {
      religious: [
        "Preparation time before the sacred month of Rajab",
        "An ordinary month without specific obligations"
      ],
      historical: [
        "Birth of Fatimah al-Zahra (according to some accounts on the 20th)"
      ]
    },
    majorEvents: [
      {
        name: "Birth of Fatimah bint Muhammad",
        nameArabic: "مولد فاطمة الزهراء",
        description: "The daughter of the Prophet ﷺ was born, though the exact date and month are disputed",
        authenticity: "disputed",
        day: 20
      }
    ],
    traditionalFocus: [
      "Preparing spiritually for the upcoming sacred month of Rajab",
      "Increasing good deeds as sacred months approach",
      "Regular worship and community engagement"
    ],
    misconceptions: [
      {
        myth: "Fatimah's birthdate is definitively established",
        clarification: "There are varying reports about Fatimah's birth date and even the year. Historians differ on this matter."
      }
    ],
    nature: "General"
  },

  // 7. Rajab
  {
    number: 7,
    nameArabic: "رَجَب",
    nameTranslit: "Rajab",
    meaning: "To Respect / Revere",
    arabicRoot: "ر-ج-ب (r-j-b) - to respect, fear, honor",
    historicalContext: "Named because of the respect and reverence given to this month. Fighting was prohibited, and it was honored even in pre-Islamic Arabia.",
    isSacred: true,
    position: {
      description: "7th month of the Islamic calendar",
      relationship: "A sacred month that stands alone (not consecutive with the other three). Follows Jumada al-Thani and precedes Sha'ban."
    },
    significance: {
      religious: [
        "One of the four sacred months",
        "The month of the Isra and Mi'raj (Night Journey)",
        "Fighting is prohibited in this month"
      ],
      historical: [
        "The miraculous Night Journey of the Prophet ﷺ",
        "Various significant events in early Islamic history"
      ],
      quranicReferences: [
        "Surah At-Tawbah 9:36 - Reference to the four sacred months",
        "Surah Al-Isra 17:1 - Reference to the Night Journey (though the exact date is not specified)"
      ]
    },
    majorEvents: [
      {
        name: "Isra and Mi'raj",
        nameArabic: "الإسراء والمعراج",
        description: "The Night Journey from Makkah to Jerusalem and the Ascension to the heavens. The exact date (commonly 27th) is not definitively established.",
        authenticity: "established",
        day: 27
      }
    ],
    traditionalFocus: [
      "Increased worship and avoidance of wrongdoing",
      "Reflection on the significance of sacred time",
      "Preparation for Sha'ban and Ramadan",
      "Seeking forgiveness and spiritual purification"
    ],
    misconceptions: [
      {
        myth: "The 27th of Rajab is the confirmed date of Isra and Mi'raj",
        clarification: "While commonly commemorated on the 27th, the exact date of Isra and Mi'raj is not established by strong evidence. Some scholars place it in other months entirely."
      },
      {
        myth: "Special prayers or fasting unique to Rajab are prescribed",
        clarification: "There are no authentically established special prayers or fasts specific to Rajab. General voluntary worship is encouraged as in any sacred month."
      },
      {
        myth: "Rajab is the month of Allah, Sha'ban of the Prophet, and Ramadan of the Ummah",
        clarification: "This categorization is not established by authentic hadith. It is a later formulation."
      }
    ],
    nature: "Sacred"
  },

  // 8. Sha'ban
  {
    number: 8,
    nameArabic: "شَعْبَان",
    nameTranslit: "Sha'ban",
    meaning: "Scattered / Dispersed",
    arabicRoot: "ش-ع-ب (sh-ʿ-b) - to scatter, branch out",
    historicalContext: "Named because Arabs would disperse in search of water, or because it branches between Rajab and Ramadan. Some say tribes would scatter for raids after the sacred month of Rajab.",
    isSacred: false,
    position: {
      description: "8th month of the Islamic calendar",
      relationship: "Follows the sacred month of Rajab and immediately precedes Ramadan"
    },
    significance: {
      religious: [
        "The Prophet ﷺ used to fast extensively in this month",
        "Deeds are raised to Allah in this month according to hadith",
        "Final preparation month before Ramadan"
      ],
      historical: [
        "The change of Qiblah from Jerusalem to Makkah (in the 2nd year of Hijra)"
      ]
    },
    majorEvents: [
      {
        name: "Shab-e-Barat / Mid-Sha'ban",
        nameArabic: "ليلة النصف من شعبان",
        description: "The 15th night of Sha'ban. Some hadiths mention this night, though scholars differ on their strength and the practices associated with it.",
        authenticity: "commonly-mentioned",
        day: 15
      },
      {
        name: "Change of Qiblah",
        nameArabic: "تحويل القبلة",
        description: "The direction of prayer was changed from Jerusalem to the Ka'bah in Makkah",
        authenticity: "established"
      }
    ],
    traditionalFocus: [
      "Increasing voluntary fasting following the Prophet's example",
      "Preparing spiritually and physically for Ramadan",
      "Completing any missed fasts from the previous Ramadan",
      "Organizing schedules and routines for the upcoming month"
    ],
    misconceptions: [
      {
        myth: "The 15th of Sha'ban requires specific rituals or gatherings",
        clarification: "While some hadiths mention this night, scholars differ on the strength of these narrations and the specific practices. General worship is not prohibited but specific innovations should be avoided."
      },
      {
        myth: "Fasting the entire second half of Sha'ban is prohibited",
        clarification: "The prohibition relates to fasting the last day or two before Ramadan without reason, not the entire second half. Those with a habit of fasting may continue."
      }
    ],
    nature: "Worship"
  },

  // 9. Ramadan
  {
    number: 9,
    nameArabic: "رَمَضَان",
    nameTranslit: "Ramadan",
    meaning: "Scorching Heat / Burning",
    arabicRoot: "ر-م-ض (r-m-ḍ) - to be hot, to burn",
    historicalContext: "Named because it originally fell during a period of intense heat when the month names were established. Also interpreted spiritually as the month that burns away sins.",
    isSacred: false,
    position: {
      description: "9th month of the Islamic calendar",
      relationship: "Follows Sha'ban and precedes Shawwal. The holiest month in Islam."
    },
    significance: {
      religious: [
        "Fasting is obligatory for all able Muslims",
        "The Quran was revealed in this month",
        "Contains Laylat al-Qadr (Night of Power)",
        "Gates of Paradise are opened, gates of Hell are closed",
        "Devils are chained according to hadith"
      ],
      historical: [
        "The first revelation of the Quran",
        "The Battle of Badr (17th of Ramadan, 2 AH)",
        "The Conquest of Makkah (20th of Ramadan, 8 AH)"
      ],
      quranicReferences: [
        "Surah Al-Baqarah 2:183 - Fasting is prescribed",
        "Surah Al-Baqarah 2:185 - The Quran was revealed in Ramadan",
        "Surah Al-Qadr 97:1-5 - The Night of Power"
      ]
    },
    majorEvents: [
      {
        name: "Beginning of Fasting",
        nameArabic: "بداية الصيام",
        description: "Fasting from dawn to sunset becomes obligatory for all able Muslims",
        authenticity: "established",
        day: 1
      },
      {
        name: "Battle of Badr",
        nameArabic: "غزوة بدر",
        description: "The first major military victory for Muslims against the Quraysh",
        authenticity: "established",
        day: 17
      },
      {
        name: "Laylat al-Qadr",
        nameArabic: "ليلة القدر",
        description: "The Night of Power, better than a thousand months. Falls in the last ten nights, most likely on odd nights (21, 23, 25, 27, 29)",
        authenticity: "established"
      },
      {
        name: "I'tikaf Period",
        nameArabic: "الاعتكاف",
        description: "The practice of spiritual retreat in the mosque during the last ten days",
        authenticity: "established",
        day: 21
      }
    ],
    traditionalFocus: [
      "Fasting from dawn to sunset",
      "Increased Quran recitation and reflection",
      "Tarawih prayers at night",
      "Charity and generosity (especially Zakat)",
      "Seeking Laylat al-Qadr in the last ten nights",
      "I'tikaf (spiritual retreat) if possible"
    ],
    misconceptions: [
      {
        myth: "Laylat al-Qadr is definitely on the 27th",
        clarification: "The exact night is not specified. The Prophet ﷺ said to seek it in the odd nights of the last ten days. It may vary year to year."
      },
      {
        myth: "If someone eats forgetfully, their fast is broken",
        clarification: "Eating or drinking out of forgetfulness does not break the fast according to authentic hadith. The person should continue fasting."
      },
      {
        myth: "Swallowing saliva or using miswak breaks the fast",
        clarification: "Neither breaks the fast. The Prophet ﷺ used miswak while fasting. Natural saliva does not invalidate the fast."
      }
    ],
    nature: "Worship"
  },

  // 10. Shawwal
  {
    number: 10,
    nameArabic: "شَوَّال",
    nameTranslit: "Shawwal",
    meaning: "Raised / Lifted",
    arabicRoot: "ش-و-ل (sh-w-l) - to raise, lift",
    historicalContext: "Named because camels would raise their tails during mating season which coincided with this month when it was named. Also interpreted as 'lightness' after the weight of Ramadan.",
    isSacred: false,
    position: {
      description: "10th month of the Islamic calendar",
      relationship: "Follows Ramadan and precedes Dhul Qi'dah. The month of Eid al-Fitr."
    },
    significance: {
      religious: [
        "Eid al-Fitr is celebrated on the 1st day",
        "Fasting six days of Shawwal is highly recommended",
        "The Prophet ﷺ said fasting Ramadan and six days of Shawwal equals fasting the whole year"
      ],
      historical: [
        "The Prophet ﷺ married Aisha (RA) in Shawwal"
      ]
    },
    majorEvents: [
      {
        name: "Eid al-Fitr",
        nameArabic: "عيد الفطر",
        description: "The Festival of Breaking Fast. A day of celebration, prayer, charity (Zakat al-Fitr), and gathering with family",
        authenticity: "established",
        day: 1
      },
      {
        name: "Six Days of Fasting",
        nameArabic: "صيام ست من شوال",
        description: "Voluntary fasting of six days in Shawwal, which can be done consecutively or separately",
        authenticity: "established"
      }
    ],
    traditionalFocus: [
      "Celebrating Eid al-Fitr with joy and gratitude",
      "Giving Zakat al-Fitr before Eid prayer",
      "Fasting six days of Shawwal",
      "Visiting family and strengthening ties",
      "Expressing gratitude for completing Ramadan"
    ],
    misconceptions: [
      {
        myth: "Marriage in Shawwal is discouraged",
        clarification: "The Prophet ﷺ married Aisha (RA) in Shawwal. She specifically mentioned this to counter the pre-Islamic superstition against Shawwal marriages."
      },
      {
        myth: "The six days must be fasted consecutively",
        clarification: "The six days can be fasted consecutively or spread throughout the month. Both approaches are valid."
      },
      {
        myth: "Missed Ramadan fasts must be completed before the six days",
        clarification: "Scholars differ on this. Some allow fasting the six days first, others recommend completing missed fasts first. Both views have scholarly support."
      }
    ],
    nature: "Worship"
  },

  // 11. Dhul Qi'dah
  {
    number: 11,
    nameArabic: "ذُو ٱلْقَعْدَة",
    nameTranslit: "Dhul Qi'dah",
    meaning: "The Month of Sitting / Resting",
    arabicRoot: "ق-ع-د (q-ʿ-d) - to sit, rest",
    historicalContext: "Named because Arabs would refrain from traveling for war during this sacred month, thus 'sitting' at home. It was a time of rest and preparation.",
    isSacred: true,
    position: {
      description: "11th month of the Islamic calendar",
      relationship: "One of the four sacred months. Follows Shawwal and precedes Dhul Hijjah. Part of the consecutive sacred months."
    },
    significance: {
      religious: [
        "One of the four sacred months",
        "Month of preparation for Hajj",
        "Fighting is prohibited"
      ],
      historical: [
        "The Treaty of Hudaybiyyah was signed in this month",
        "Various historical events and preparations for Hajj"
      ],
      quranicReferences: [
        "Surah At-Tawbah 9:36 - Reference to the four sacred months"
      ]
    },
    majorEvents: [
      {
        name: "Treaty of Hudaybiyyah",
        nameArabic: "صلح الحديبية",
        description: "A pivotal peace treaty between the Muslims and the Quraysh of Makkah in 6 AH",
        authenticity: "established"
      }
    ],
    traditionalFocus: [
      "Preparation for Hajj pilgrimage",
      "Increased worship during sacred time",
      "Avoiding wrongdoing and conflict",
      "Making arrangements if planning to perform Hajj"
    ],
    misconceptions: [
      {
        myth: "Only those going for Hajj need to pay attention to this month",
        clarification: "As a sacred month, all Muslims are encouraged to increase good deeds and avoid wrongdoing, regardless of Hajj plans."
      }
    ],
    nature: "Sacred"
  },

  // 12. Dhul Hijjah
  {
    number: 12,
    nameArabic: "ذُو ٱلْحِجَّة",
    nameTranslit: "Dhul Hijjah",
    meaning: "The Month of Pilgrimage",
    arabicRoot: "ح-ج-ج (ḥ-j-j) - to make pilgrimage",
    historicalContext: "Named after the Hajj pilgrimage which takes place in this month. It is the culmination of the Islamic year and contains the greatest days of the year.",
    isSacred: true,
    position: {
      description: "12th and final month of the Islamic calendar",
      relationship: "One of the four sacred months. Contains Hajj and Eid al-Adha. The last of three consecutive sacred months."
    },
    significance: {
      religious: [
        "One of the four sacred months",
        "Contains the best ten days of the year",
        "The month of Hajj pilgrimage",
        "Contains the Day of Arafah and Eid al-Adha"
      ],
      historical: [
        "The Farewell Pilgrimage of the Prophet ﷺ",
        "Revelation of the verse completing the religion (Al-Ma'idah 5:3)"
      ],
      quranicReferences: [
        "Surah Al-Hajj 22:27-29 - Call to Hajj",
        "Surah Al-Fajr 89:1-2 - Reference to the ten nights (interpreted as first 10 of Dhul Hijjah)",
        "Surah Al-Ma'idah 5:3 - Completion of the religion"
      ]
    },
    majorEvents: [
      {
        name: "First Ten Days",
        nameArabic: "العشر الأوائل",
        description: "The best days of the year. Good deeds are especially beloved to Allah during these days.",
        authenticity: "established",
        day: 1
      },
      {
        name: "Day of Tarwiyah",
        nameArabic: "يوم التروية",
        description: "The 8th day when pilgrims proceed to Mina",
        authenticity: "established",
        day: 8
      },
      {
        name: "Day of Arafah",
        nameArabic: "يوم عرفة",
        description: "The 9th day, the most important day of Hajj. Fasting on this day for non-pilgrims expiates sins of two years.",
        authenticity: "established",
        day: 9
      },
      {
        name: "Eid al-Adha",
        nameArabic: "عيد الأضحى",
        description: "The Festival of Sacrifice on the 10th. Commemorates Prophet Ibrahim's willingness to sacrifice his son.",
        authenticity: "established",
        day: 10
      },
      {
        name: "Days of Tashreeq",
        nameArabic: "أيام التشريق",
        description: "Days 11, 12, 13 - days of eating, drinking, and remembrance of Allah. Fasting is prohibited.",
        authenticity: "established",
        day: 11
      }
    ],
    traditionalFocus: [
      "Performing Hajj if able and obligated",
      "Fasting the first nine days, especially the Day of Arafah",
      "Increasing dhikr, takbir, tahlil, and tahmid",
      "Offering Qurbani (sacrifice) on Eid al-Adha",
      "Celebrating Eid al-Adha with family and community",
      "Distributing meat to the poor and needy"
    ],
    misconceptions: [
      {
        myth: "Fasting on the Day of Arafah is only for non-pilgrims",
        clarification: "This is actually correct. Pilgrims at Arafah should not fast to preserve their strength. The virtue of fasting applies to those not performing Hajj."
      },
      {
        myth: "Qurbani (sacrifice) is obligatory for everyone",
        clarification: "Scholars differ on whether it is obligatory (wajib) or strongly recommended (sunnah mu'akkadah). It applies to those who can afford it."
      },
      {
        myth: "One cannot cut hair or nails in the first 10 days if doing Qurbani",
        clarification: "The Prophet ﷺ recommended this for those intending to sacrifice, but scholars differ on whether it is obligatory or recommended."
      }
    ],
    nature: "Sacred"
  }
];

export const SACRED_MONTHS_EXPLANATION = {
  title: "The Four Sacred Months",
  titleArabic: "الأشهر الحرم",
  months: ["Muharram (1st)", "Rajab (7th)", "Dhul Qi'dah (11th)", "Dhul Hijjah (12th)"],
  quranicBasis: "Allah says: 'Indeed, the number of months with Allah is twelve months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred.' (At-Tawbah 9:36)",
  meaning: [
    "Fighting and warfare are prohibited during these months",
    "Sins committed in these months are more serious",
    "Good deeds performed in these months carry greater reward",
    "These months were recognized even in pre-Islamic Arabia"
  ],
  whatChanges: [
    "Greater accountability for wrongdoing",
    "Increased reward for good deeds",
    "Emphasis on peace and avoiding conflict"
  ],
  whatDoesNotChange: [
    "Regular prayers and obligations remain the same",
    "No special mandatory rituals are prescribed",
    "Self-defense remains permissible"
  ]
};

export const SOURCES_METHODOLOGY = {
  primarySources: [
    "The Noble Quran",
    "Sahih al-Bukhari",
    "Sahih Muslim",
    "Other authenticated hadith collections (Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah)"
  ],
  scholarlyReferences: [
    "Classical works of Islamic jurisprudence (Fiqh)",
    "Recognized Tafsir (Quranic exegesis) works",
    "Established Islamic history references",
    "Contemporary scholarly explanations from recognized institutions"
  ],
  methodology: [
    "This page prioritizes authentically established information over commonly-held beliefs",
    "Disputed matters are clearly labeled as such",
    "Cultural practices are distinguished from religious obligations",
    "Weak narrations are avoided unless clearly identified",
    "Multiple scholarly views are acknowledged where significant differences exist"
  ],
  disclaimer: "This educational content is provided for informational purposes. For specific religious rulings (fatwas), please consult qualified scholars."
};
