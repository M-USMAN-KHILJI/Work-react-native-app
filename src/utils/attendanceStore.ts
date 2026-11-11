import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DayAttendanceResult,
  calculateDayAttendance,
  evaluateCheckInEligibility,
  evaluateCheckOutEligibility,
} from './attendanceRules';

export interface StoredAttendanceRecord {
  date: string; // 'YYYY-MM-DD'
  checkInISO: string | null;
  checkOutISO: string | null;
  checkInTimeFormatted: string;
  checkOutTimeFormatted: string;
  workingHoursFormatted: string;
  extraHoursFormatted: string;
  lateByFormatted: string;
  statuses: Array<'Present' | 'Late' | 'Half Leave' | 'Short Leave' | 'Leave'>;
}

const STORAGE_KEY = '@workpulse_attendance_history_v2';
const ACTIVE_SESSION_KEY = '@workpulse_active_attendance_session';

export const INITIAL_MOCK_HISTORY: StoredAttendanceRecord[] = [
  {
    date: '2026-11-10',
    checkInISO: '2026-11-10T10:18:00.000Z',
    checkOutISO: '2026-11-10T19:19:00.000Z',
    checkInTimeFormatted: '10:15 AM',
    checkOutTimeFormatted: '7:19 PM',
    workingHoursFormatted: '9h 1m',
    extraHoursFormatted: '0h 1m',
    lateByFormatted: '3m',
    statuses: ['Present', 'Late'],
  },
  {
    date: '2026-11-09',
    checkInISO: '2026-11-09T10:12:00.000Z',
    checkOutISO: '2026-11-09T19:18:00.000Z',
    checkInTimeFormatted: '10:18 AM',
    checkOutTimeFormatted: '7:18 PM',
    workingHoursFormatted: '9h 6m',
    extraHoursFormatted: '0h 6m',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
  {
    date: '2026-11-06',
    checkInISO: '2026-11-06T10:14:00.000Z',
    checkOutISO: '2026-11-06T19:14:00.000Z',
    checkInTimeFormatted: '10:18 AM',
    checkOutTimeFormatted: '7:14 PM',
    workingHoursFormatted: '9h 0m',
    extraHoursFormatted: '—',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
  {
    date: '2026-11-05',
    checkInISO: '2026-11-05T10:11:00.000Z',
    checkOutISO: '2026-11-05T19:26:00.000Z',
    checkInTimeFormatted: '10:11 AM',
    checkOutTimeFormatted: '7:26 PM',
    workingHoursFormatted: '9h 15m',
    extraHoursFormatted: '0h 15m',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
  {
    date: '2026-11-04',
    checkInISO: '2026-11-04T10:15:00.000Z',
    checkOutISO: '2026-11-04T19:16:00.000Z',
    checkInTimeFormatted: '10:15 AM',
    checkOutTimeFormatted: '7:16 PM',
    workingHoursFormatted: '9h 1m',
    extraHoursFormatted: '0h 1m',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
  {
    date: '2026-11-03',
    checkInISO: '2026-11-03T10:13:00.000Z',
    checkOutISO: '2026-11-03T19:13:00.000Z',
    checkInTimeFormatted: '10:13 AM',
    checkOutTimeFormatted: '7:13 PM',
    workingHoursFormatted: '9h 0m',
    extraHoursFormatted: '—',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
  {
    date: '2026-11-02',
    checkInISO: '2026-11-02T10:14:00.000Z',
    checkOutISO: '2026-11-02T19:15:00.000Z',
    checkInTimeFormatted: '10:14 AM',
    checkOutTimeFormatted: '7:15 PM',
    workingHoursFormatted: '9h 1m',
    extraHoursFormatted: '0h 1m',
    lateByFormatted: '—',
    statuses: ['Present'],
  },
];

export async function getAttendanceHistory(): Promise<StoredAttendanceRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_HISTORY));
      return INITIAL_MOCK_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_HISTORY;
  }
}

export async function saveAttendanceHistory(records: StoredAttendanceRecord[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    // ignore
  }
}

export async function getActiveSession(): Promise<{ checkInISO: string } | null> {
  try {
    const raw = await AsyncStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveActiveSession(session: { checkInISO: string } | null): Promise<void> {
  try {
    if (session) {
      await AsyncStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } else {
      await AsyncStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  } catch {
    // ignore
  }
}

/**
 * Executes a Check-In based on current time and rules
 */
export async function performCheckIn(
  date: Date = new Date(),
  userLocation?: { latitude: number; longitude: number },
  isWFH: boolean = false
): Promise<{ success: boolean; message: string; record?: StoredAttendanceRecord }> {
  const eligibility = evaluateCheckInEligibility(date, userLocation, isWFH);

  if (!eligibility.canCheckIn) {
    return {
      success: false,
      message: eligibility.reason || 'Check-in not allowed at this time.',
    };
  }

  const checkInISO = date.toISOString();
  await saveActiveSession({ checkInISO });

  const dateStr = date.toISOString().split('T')[0];
  const dayResult = calculateDayAttendance(date, null);

  const newRecord: StoredAttendanceRecord = {
    date: dateStr,
    checkInISO,
    checkOutISO: null,
    checkInTimeFormatted: dayResult.checkInTime || '—',
    checkOutTimeFormatted: '—',
    workingHoursFormatted: '—',
    extraHoursFormatted: '—',
    lateByFormatted: dayResult.lateByFormatted,
    statuses: dayResult.statuses,
  };

  const history = await getAttendanceHistory();
  const existingIdx = history.findIndex((h) => h.date === dateStr);
  if (existingIdx >= 0) {
    history[existingIdx] = newRecord;
  } else {
    history.unshift(newRecord);
  }

  await saveAttendanceHistory(history);

  let successMsg = 'Checked in successfully!';
  if (eligibility.isLate) {
    successMsg = `Checked in! Marked as Late (${dayResult.lateByFormatted} after 10:15 AM).`;
  }
  if (eligibility.startsAsHalfDay) {
    successMsg = `Checked in after 11:00 AM. Counts as Half Day.`;
  }

  return {
    success: true,
    message: successMsg,
    record: newRecord,
  };
}

/**
 * Executes a Check-Out based on current time and rules
 */
export async function performCheckOut(
  date: Date = new Date(),
  userLocation?: { latitude: number; longitude: number },
  isWFH: boolean = false
): Promise<{ success: boolean; message: string; record?: StoredAttendanceRecord }> {
  const activeSession = await getActiveSession();
  if (!activeSession) {
    return {
      success: false,
      message: 'You have not checked in yet today.',
    };
  }

  const checkInDate = new Date(activeSession.checkInISO);
  const eligibility = evaluateCheckOutEligibility(checkInDate, date, userLocation, isWFH);

  if (!eligibility.canCheckOut) {
    return {
      success: false,
      message: eligibility.reason || 'Check-out not allowed.',
    };
  }

  const checkOutISO = date.toISOString();
  const dateStr = checkInDate.toISOString().split('T')[0];

  const dayResult = calculateDayAttendance(checkInDate, date);

  const updatedRecord: StoredAttendanceRecord = {
    date: dateStr,
    checkInISO: activeSession.checkInISO,
    checkOutISO,
    checkInTimeFormatted: dayResult.checkInTime || '—',
    checkOutTimeFormatted: dayResult.checkOutTime || '—',
    workingHoursFormatted: dayResult.workingHoursFormatted,
    extraHoursFormatted: dayResult.extraHoursFormatted,
    lateByFormatted: dayResult.lateByFormatted,
    statuses: dayResult.statuses,
  };

  const history = await getAttendanceHistory();
  const existingIdx = history.findIndex((h) => h.date === dateStr);
  if (existingIdx >= 0) {
    history[existingIdx] = updatedRecord;
  } else {
    history.unshift(updatedRecord);
  }

  await saveAttendanceHistory(history);
  await saveActiveSession(null);

  const statusText = dayResult.statuses.join(', ');
  return {
    success: true,
    message: `Checked out! Worked: ${dayResult.workingHoursFormatted}. Status: ${statusText}.`,
    record: updatedRecord,
  };
}

