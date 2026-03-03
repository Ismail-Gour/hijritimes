/**
 * Solar Position Calculator - NOAA Algorithm
 * 
 * Calculates sunrise and sunset times for any location based on
 * astronomical algorithms from NOAA (National Oceanic and Atmospheric Administration).
 * 
 * Default location: Hyderabad, India (17.385°N, 78.4867°E)
 * 
 * Reference: https://gml.noaa.gov/grad/solcalc/solareqns.PDF
 */

// Hyderabad, India coordinates
const HYDERABAD_LAT = 17.385;
const HYDERABAD_LNG = 78.4867;

// Convert degrees to radians
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Convert radians to degrees
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Calculate the Julian Day Number for a given date
 */
function toJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

/**
 * Calculate Julian Century from Julian Day
 */
function toJulianCentury(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calculate the geometric mean longitude of the sun (degrees)
 */
function sunGeomMeanLon(T: number): number {
  let L0 = 280.46646 + T * (36000.76983 + 0.0003032 * T);
  while (L0 > 360) L0 -= 360;
  while (L0 < 0) L0 += 360;
  return L0;
}

/**
 * Calculate the geometric mean anomaly of the sun (degrees)
 */
function sunGeomMeanAnomaly(T: number): number {
  return 357.52911 + T * (35999.05029 - 0.0001537 * T);
}

/**
 * Calculate the eccentricity of Earth's orbit
 */
function earthOrbitEccentricity(T: number): number {
  return 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
}

/**
 * Calculate the sun's equation of center (degrees)
 */
function sunEqOfCenter(T: number): number {
  const M = sunGeomMeanAnomaly(T);
  const mrad = toRad(M);
  const sinm = Math.sin(mrad);
  const sin2m = Math.sin(2 * mrad);
  const sin3m = Math.sin(3 * mrad);
  return sinm * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    sin2m * (0.019993 - 0.000101 * T) +
    sin3m * 0.000289;
}

/**
 * Calculate the sun's true longitude (degrees)
 */
function sunTrueLon(T: number): number {
  return sunGeomMeanLon(T) + sunEqOfCenter(T);
}

/**
 * Calculate the sun's apparent longitude (degrees)
 */
function sunApparentLon(T: number): number {
  const o = sunTrueLon(T);
  const omega = 125.04 - 1934.136 * T;
  return o - 0.00569 - 0.00478 * Math.sin(toRad(omega));
}

/**
 * Calculate the mean obliquity of the ecliptic (degrees)
 */
function meanObliquityOfEcliptic(T: number): number {
  const seconds = 21.448 - T * (46.815 + T * (0.00059 - T * 0.001813));
  return 23.0 + (26.0 + seconds / 60.0) / 60.0;
}

/**
 * Calculate the corrected obliquity of the ecliptic (degrees)
 */
function obliquityCorrection(T: number): number {
  const e0 = meanObliquityOfEcliptic(T);
  const omega = 125.04 - 1934.136 * T;
  return e0 + 0.00256 * Math.cos(toRad(omega));
}

/**
 * Calculate the sun's declination (degrees)
 */
function sunDeclination(T: number): number {
  const e = obliquityCorrection(T);
  const lambda = sunApparentLon(T);
  const sint = Math.sin(toRad(e)) * Math.sin(toRad(lambda));
  return toDeg(Math.asin(sint));
}

/**
 * Calculate the equation of time (minutes)
 */
function equationOfTime(T: number): number {
  const epsilon = obliquityCorrection(T);
  const l0 = sunGeomMeanLon(T);
  const e = earthOrbitEccentricity(T);
  const m = sunGeomMeanAnomaly(T);

  let y = Math.tan(toRad(epsilon) / 2);
  y *= y;

  const sin2l0 = Math.sin(2.0 * toRad(l0));
  const sinm = Math.sin(toRad(m));
  const cos2l0 = Math.cos(2.0 * toRad(l0));
  const sin4l0 = Math.sin(4.0 * toRad(l0));
  const sin2m = Math.sin(2.0 * toRad(m));

  const Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 -
    0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

  return toDeg(Etime) * 4.0; // in minutes
}

/**
 * Calculate the hour angle of sunset (degrees)
 * 
 * @param lat - Latitude in degrees
 * @param solarDec - Solar declination in degrees
 * @param elevation - Sun elevation angle at sunset (default: -0.833° for atmospheric refraction)
 */
function sunsetHourAngle(lat: number, solarDec: number, elevation: number = -0.833): number {
  const latRad = toRad(lat);
  const sdRad = toRad(solarDec);
  const HA = Math.acos(
    (Math.sin(toRad(elevation)) - Math.sin(latRad) * Math.sin(sdRad)) /
    (Math.cos(latRad) * Math.cos(sdRad))
  );
  return toDeg(HA); // in degrees
}

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
}

/**
 * Calculate sunrise, sunset, and solar noon for a given date and location.
 * 
 * @param date - The date to calculate for
 * @param lat - Latitude (default: Hyderabad)
 * @param lng - Longitude (default: Hyderabad)
 * @returns SunTimes with sunrise, sunset, and solar noon as Date objects in local representation
 */
export function calculateSunTimes(
  date: Date,
  lat: number = HYDERABAD_LAT,
  lng: number = HYDERABAD_LNG
): SunTimes {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const jd = toJulianDay(year, month, day);
  const T = toJulianCentury(jd);

  const eqTime = equationOfTime(T);
  const solarDec = sunDeclination(T);

  // Solar noon in minutes from midnight UTC
  const solarNoonMinUTC = 720 - 4 * lng - eqTime;

  // Hour angle for sunset
  const ha = sunsetHourAngle(lat, solarDec);

  // Sunrise and sunset in minutes from midnight UTC
  const sunriseMinUTC = solarNoonMinUTC - ha * 4;
  const sunsetMinUTC = solarNoonMinUTC + ha * 4;

  // Convert UTC minutes to IST (UTC+5:30 = +330 minutes)
  const IST_OFFSET = 330;
  const sunriseIST = sunriseMinUTC + IST_OFFSET;
  const sunsetIST = sunsetMinUTC + IST_OFFSET;
  const solarNoonIST = solarNoonMinUTC + IST_OFFSET;

  const toDate = (minutesFromMidnight: number): Date => {
    const h = Math.floor(minutesFromMidnight / 60);
    const m = Math.floor(minutesFromMidnight % 60);
    const s = Math.round((minutesFromMidnight % 1) * 60);
    return new Date(year, month - 1, day, h, m, s);
  };

  return {
    sunrise: toDate(sunriseIST),
    sunset: toDate(sunsetIST),
    solarNoon: toDate(solarNoonIST),
  };
}

/**
 * Get the Maghrib (sunset) time for a given date in Hyderabad.
 * This is the PRIMARY function used by the HijriTruthEngine.
 * 
 * @param date - The Gregorian date
 * @returns Date object representing sunset time
 */
export function getMaghribTime(date: Date): Date {
  return calculateSunTimes(date).sunset;
}

/**
 * Get a formatted sunset time string for display
 */
export function formatSunsetTime(date: Date): string {
  const sunset = getMaghribTime(date);
  return sunset.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
