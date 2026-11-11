/**
 * WorkPulse Attendance Rules Engine
 *
 * Rules:
 * 1. Check-in opens at 10:00 AM.
 * 2. Check-in after 10:15 AM is counted as Late (shown alongside Present).
 * 3. Check-in after 11:00 AM starts as Half Day until checkout (full office hours still count as Late).
 * 4. Check-in is not allowed after 7:00 PM.
 * 5. Working Hours calculation:
 *    - Less than 6h worked -> Half Leave
 *    - 6h to under 9h worked -> Short Leave
 *    - 9h+ worked -> Full day (Present or Late depending on check-in time)
 * 6. You must be within 50 m of the office for office check-in.
 * 7. Overnight check-out allowed until 6:00 AM next day (office check-in must be inside radius; WFH may check out outside).
 * 8. After that cutoff (6:00 AM next day), only an admin can add your check-out time.
 * 9. 3 Late or Short Leave days in any mix (e.g. 3 Late, 3 Short Leave, or 2 Short Leave + 1 Late) deduct 1 half day.
 */

export type AttendanceStatusType =
  | 'Present'
  | 'Late'
  | 'Half Leave'
  | 'Short Leave'
  | 'Leave';

export interface CheckInEligibility {
  canCheckIn: boolean;
  reason?: string;
  isLate: boolean;
  lateMinutes: number;
  startsAsHalfDay: boolean;
}

export interface CheckOutEligibility {
  canCheckOut: boolean;
  reason?: string;
  needsAdmin: boolean;
}

export interface DayAttendanceResult {
  checkInTime: string | null;
  checkOutTime: string | null;
  workingMinutes: number;
  workingHoursFormatted: string;
  extraHoursFormatted: string;
  lateByFormatted: string;
  statuses: AttendanceStatusType[];
  halfDayDeductions: number;
}

export const OFFICE_COORDINATES = {
  latitude: 31.5204, // sample coordinates, configured for office radius
  longitude: 74.3587,
  radiusMeters: 50,
};

/**
 * Calculates distance between two GPS coordinates using the Haversine formula (in meters)
 */
export function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Rule 1, 2, 3, 4, 6:
 * Evaluates whether a user can check in at a given date/time and GPS location
 */
export function evaluateCheckInEligibility(
  date: Date = new Date(),
  userLocation?: { latitude: number; longitude: number },
  isWFH: boolean = false
): CheckInEligibility {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Rule 1: Check-in opens at 10:00 AM (600 mins)
  if (totalMinutes < 10 * 60) {
    return {
      canCheckIn: false,
      reason: 'Check-in opens at 10:00 AM.',
      isLate: false,
      lateMinutes: 0,
      startsAsHalfDay: false,
    };
  }

  // Rule 4: Check-in is not allowed after 7:00 PM (19:00 = 1140 mins)
  if (totalMinutes >= 19 * 60) {
    return {
      canCheckIn: false,
      reason: 'Check-in is closed after 7:00 PM. Marked as Leave.',
      isLate: true,
      lateMinutes: totalMinutes - (10 * 60 + 15),
      startsAsHalfDay: true,
    };
  }

  // Rule 6: Location radius check (within 50 m of office) if not WFH
  if (!isWFH && userLocation) {
    const distance = getDistanceInMeters(
      userLocation.latitude,
      userLocation.longitude,
      OFFICE_COORDINATES.latitude,
      OFFICE_COORDINATES.longitude
    );
    if (distance > OFFICE_COORDINATES.radiusMeters) {
      return {
        canCheckIn: false,
        reason: `You are ${(distance - OFFICE_COORDINATES.radiusMeters).toFixed(0)}m outside the office radius (50m required).`,
        isLate: totalMinutes > 10 * 60 + 15,
        lateMinutes: Math.max(0, totalMinutes - (10 * 60 + 15)),
        startsAsHalfDay: totalMinutes >= 11 * 60,
      };
    }
  }

  // Rule 2 & 3: Late and Half-Day checks
  const isLate = totalMinutes > 10 * 60 + 15; // after 10:15 AM
  const lateMinutes = isLate ? totalMinutes - (10 * 60 + 15) : 0;
  const startsAsHalfDay = totalMinutes >= 11 * 60; // after 11:00 AM

  return {
    canCheckIn: true,
    isLate,
    lateMinutes,
    startsAsHalfDay,
  };
}

/**
 * Rule 7 & 8:
 * Evaluates whether check-out is allowed
 */
export function evaluateCheckOutEligibility(
  checkInDate: Date,
  checkOutDate: Date = new Date(),
  userLocation?: { latitude: number; longitude: number },
  isWFH: boolean = false
): CheckOutEligibility {
  // Check if check-out is on the next day after 6:00 AM cutoff
  const nextDayCutoff = new Date(checkInDate);
  nextDayCutoff.setDate(nextDayCutoff.getDate() + 1);
  nextDayCutoff.setHours(6, 0, 0, 0);

  if (checkOutDate > nextDayCutoff) {
    // Rule 8: Cutoff passed, only admin can add checkout
    return {
      canCheckOut: false,
      needsAdmin: true,
      reason: 'Overnight check-out cutoff (6:00 AM) passed. Contact an admin to record checkout.',
    };
  }

  // Rule 7: Location check for office check-in
  if (!isWFH && userLocation) {
    const distance = getDistanceInMeters(
      userLocation.latitude,
      userLocation.longitude,
      OFFICE_COORDINATES.latitude,
      OFFICE_COORDINATES.longitude
    );
    if (distance > OFFICE_COORDINATES.radiusMeters) {
      return {
        canCheckOut: false,
        needsAdmin: false,
        reason: `You must be inside office radius (50m) to check out. Currently ${(distance - OFFICE_COORDINATES.radiusMeters).toFixed(0)}m outside.`,
      };
    }
  }

  return {
    canCheckOut: true,
    needsAdmin: false,
  };
}

/**
 * Formats minutes into `Xh Ym`
 */
export function formatDuration(minutes: number): string {
  if (minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

/**
 * Rule 5, Rule 2, Rule 3:
 * Calculates the day's attendance status and duration from check-in and check-out timestamps
 */
export function calculateDayAttendance(
  checkIn: Date | null,
  checkOut: Date | null
): DayAttendanceResult {
  // If user did not check in before 7 PM
  if (!checkIn) {
    return {
      checkInTime: null,
      checkOutTime: null,
      workingMinutes: 0,
      workingHoursFormatted: '—',
      extraHoursFormatted: '—',
      lateByFormatted: '—',
      statuses: ['Leave'],
      halfDayDeductions: 0,
    };
  }

  const checkInHours = checkIn.getHours();
  const checkInMinutes = checkIn.getMinutes();
  const checkInTotalMin = checkInHours * 60 + checkInMinutes;

  const isLate = checkInTotalMin > 10 * 60 + 15;
  const lateMinutes = isLate ? checkInTotalMin - (10 * 60 + 15) : 0;
  const lateByFormatted = isLate ? formatDuration(lateMinutes) : '—';

  // If still currently checked in (no checkout recorded yet)
  if (!checkOut) {
    const statuses: AttendanceStatusType[] = [];
    if (checkInTotalMin >= 11 * 60) {
      // Rule 3: Check-in after 11:00 AM starts as Half Day until checkout
      statuses.push('Half Leave');
      statuses.push('Late');
    } else {
      statuses.push('Present');
      if (isLate) statuses.push('Late');
    }
    return {
      checkInTime: formatTime(checkIn),
      checkOutTime: '—',
      workingMinutes: 0,
      workingHoursFormatted: '—',
      extraHoursFormatted: '—',
      lateByFormatted,
      statuses,
      halfDayDeductions: 0,
    };
  }

  // Calculate working minutes
  const workingMinutes = Math.max(
    0,
    Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60))
  );

  // Extra hours over 9 hours (540 mins)
  const extraMinutes = Math.max(0, workingMinutes - 9 * 60);
  const extraHoursFormatted = extraMinutes > 0 ? formatDuration(extraMinutes) : '—';
  const workingHoursFormatted = formatDuration(workingMinutes);

  const statuses: AttendanceStatusType[] = [];

  // Duration & Checkout rules:
  // - If check-in was after 10:15 AM -> Late
  // - If check-out is before completing 7 hours -> Half Leave
  // - If check-out is before completing 9 hours (7h to under 9h) -> Short Leave / Late
  // - If 9h+ completed -> Present (and Late if check-in was late)
  if (workingMinutes < 7 * 60) {
    statuses.push('Half Leave');
  } else if (workingMinutes < 9 * 60) {
    statuses.push('Short Leave');
    // Early departure before 9 hours counts as Late as per user requirements
    if (!statuses.includes('Late')) {
      statuses.push('Late');
    }
  } else {
    // 9 hours or more completed
    statuses.push('Present');
    if (isLate && !statuses.includes('Late')) {
      statuses.push('Late');
    }
  }

  return {
    checkInTime: formatTime(checkIn),
    checkOutTime: formatTime(checkOut),
    workingMinutes,
    workingHoursFormatted,
    extraHoursFormatted,
    lateByFormatted,
    statuses,
    halfDayDeductions: 0,
  };
}

/**
 * Rule 9:
 * 3 Late or Short Leave days in any mix deduct 1 half day
 * Returns the total half-day deductions for a list of daily attendance records.
 */
export function calculateDeductions(records: DayAttendanceResult[]): {
  lateCount: number;
  shortLeaveCount: number;
  halfLeaveCount: number;
  combinedLateOrShort: number;
  halfDaysDeducted: number;
} {
  let lateCount = 0;
  let shortLeaveCount = 0;
  let halfLeaveCount = 0;

  records.forEach((rec) => {
    if (rec.statuses.includes('Late')) lateCount++;
    if (rec.statuses.includes('Short Leave')) shortLeaveCount++;
    if (rec.statuses.includes('Half Leave')) halfLeaveCount++;
  });

  const combinedLateOrShort = lateCount + shortLeaveCount;
  // 3 Late or Short Leave days in any mix deduct 1 half day
  const halfDaysDeducted = Math.floor(combinedLateOrShort / 3);

  return {
    lateCount,
    shortLeaveCount,
    halfLeaveCount,
    combinedLateOrShort,
    halfDaysDeducted,
  };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Full detailed rules text for the UI Rules Accordion
 */
export const ATTENDANCE_RULES_LIST = [
  {
    step: 1,
    text: 'Check-in opens at 10:00 AM',
  },
  {
    step: 2,
    text: 'Check-in after 10:15 AM is counted as Late (shown with Present)',
  },
  {
    step: 3,
    text: 'Check-in after 11:00 AM starts as Half Day until checkout (full office hours still count as Late)',
  },
  {
    step: 4,
    text: 'Check-in is not allowed after 7:00 PM',
  },
  {
    step: 5,
    text: 'Less than 6h worked → Half Leave · 6h to under 9h → Short Leave · 9h+ → full day (Present or Late)',
  },
  {
    step: 6,
    text: 'You must be within 50 m of the office for office check-in',
  },
  {
    step: 7,
    text: 'Overnight check-out allowed until 6:00 AM next day (office check-in must be inside radius; WFH may check out outside)',
  },
  {
    step: 8,
    text: 'After that cutoff, only an admin can add your check-out time',
  },
  {
    step: 9,
    text: '3 Late or Short Leave days in any mix (e.g. 3 Late, 3 Short Leave, or 2 Short Leave + 1 Late) deduct 1 half day',
  },
];

