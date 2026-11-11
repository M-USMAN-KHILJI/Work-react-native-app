/**
 * Helper to parse a time string like "10:18 AM", "7:19 PM", or "—"
 */
function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr || timeStr === '—' || timeStr === '-') return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Calculates lateBy and statuses dynamically from check-in and check-out strings
 */
export function computeRecordRules(
  checkInStr: string,
  checkOutStr: string
): {
  workingHours: string;
  extraHours: string;
  lateBy: string;
  statuses: Array<'Present' | 'Late' | 'Half Leave' | 'Short Leave' | 'Leave'>;
} {
  const checkInMin = parseTimeToMinutes(checkInStr);
  const checkOutMin = parseTimeToMinutes(checkOutStr);

  // If no check-in -> Leave
  if (checkInMin === null) {
    return {
      workingHours: '—',
      extraHours: '—',
      lateBy: '—',
      statuses: ['Leave'],
    };
  }

  // Check if Late (Office cutoff is 10:15 AM = 615 minutes)
  const isLate = checkInMin > 10 * 60 + 15;
  // Rule 3: Check-in after 11:00 AM (660 minutes) starts as Half Day until checkout
  const startsAsHalfDay = checkInMin >= 11 * 60;

  const lateMinutes = isLate ? checkInMin - (10 * 60 + 15) : 0;
  const lateBy = isLate
    ? `${Math.floor(lateMinutes / 60) > 0 ? `${Math.floor(lateMinutes / 60)}h ` : ''}${lateMinutes % 60}m`
    : '—';

  // If currently still checked in without checkout
  if (checkOutMin === null) {
    const statuses: Array<'Present' | 'Late' | 'Half Leave' | 'Short Leave' | 'Leave'> = [];
    if (startsAsHalfDay) {
      // Check-in after 11:00 AM starts as Half Day
      statuses.push('Half Leave');
      statuses.push('Late');
    } else {
      statuses.push('Present');
      if (isLate) statuses.push('Late');
    }
    return {
      workingHours: '—',
      extraHours: '—',
      lateBy,
      statuses,
    };
  }

  // Calculate worked duration
  let diffMinutes = checkOutMin - checkInMin;
  if (diffMinutes < 0) {
    // Overnight checkout past midnight
    diffMinutes += 24 * 60;
  }

  const workHours = Math.floor(diffMinutes / 60);
  const workMins = diffMinutes % 60;
  const workingHours = `${workHours}h ${workMins}m`;

  const extraMin = Math.max(0, diffMinutes - 9 * 60);
  const extraHours =
    extraMin > 0
      ? `${Math.floor(extraMin / 60)}h ${extraMin % 60}m`
      : '—';

  const statuses: Array<'Present' | 'Late' | 'Half Leave' | 'Short Leave' | 'Leave'> = [];

  // Duration rules:
  // < 7h -> Half Leave
  // 7h to < 9h -> Short Leave (also counts as Late for leaving before 9 hours)
  // >= 9h -> Present (and Late if check-in was late)
  if (diffMinutes < 7 * 60) {
    statuses.push('Half Leave');
    if (isLate) statuses.push('Late');
  } else if (diffMinutes < 9 * 60) {
    statuses.push('Short Leave');
    statuses.push('Late');
  } else {
    statuses.push('Present');
    if (isLate) {
      statuses.push('Late');
    }
  }

  return {
    workingHours,
    extraHours,
    lateBy,
    statuses,
  };
}

