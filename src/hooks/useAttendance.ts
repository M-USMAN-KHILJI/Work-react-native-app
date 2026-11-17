import { useAppSelector } from '../redux';
import { getLocalDateString } from '../utils/dateUtils';

/**
 * useAttendance — reads state directly from Redux store,
 * providing reactive updates across Dashboard, Attendance, and all components.
 */
export function useAttendance() {
  const allHistory = useAppSelector((state) => state.attendance.history);
  const activeSession = useAppSelector((state) => state.attendance.activeSession);

  const todayStr = getLocalDateString(new Date());
  const todayRecord = allHistory.find((h) => h.date === todayStr) || null;

  // An active check-in is only valid if:
  // 1. There is an activeSession in Redux
  // 2. The activeSession belongs to today's date (or overnight shift within 6 AM next day)
  // 3. The todayRecord has NOT already been checked out
  const isCheckedIn = (() => {
    if (!activeSession?.checkInISO) return false;
    // If today already has a recorded checkout, we cannot be checked in
    if (todayRecord?.checkOutISO) return false;

    // Check if session check-in date matches today (or is an overnight shift from yesterday)
    const checkInDate = new Date(activeSession.checkInISO);
    const sessionDateStr = getLocalDateString(checkInDate);

    if (sessionDateStr === todayStr) {
      return true;
    }

    // Overnight edge case: check-in was yesterday, current time is before 6:00 AM today
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (sessionDateStr === getLocalDateString(yesterday) && now.getHours() < 6) {
      return true;
    }

    // Old stale session from a previous day
    return false;
  })();

  // Current-month stats
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const currentYearStr = String(now.getFullYear());

  const thisMonthRecords = allHistory.filter((rec) => {
    const parts = rec.date.split('-');
    const y = parts[0];
    const m = parseInt(parts[1], 10) - 1;
    return y === currentYearStr && m === currentMonthIdx;
  });

  const monthStats = {
    present: thisMonthRecords.filter((r) => r.statuses.includes('Present')).length,
    late: thisMonthRecords.filter((r) => r.statuses.includes('Late')).length,
    shortLeave: thisMonthRecords.filter((r) => r.statuses.includes('Short Leave')).length,
    halfLeave: thisMonthRecords.filter((r) => r.statuses.includes('Half Leave')).length,
    leave: thisMonthRecords.filter((r) => r.statuses.includes('Leave')).length,
    workingDays: thisMonthRecords.length,
  };

  const reload = () => {
    // Redux automatically re-renders when store state updates!
  };

  return {
    isCheckedIn,
    todayRecord,
    allHistory,
    thisMonthRecords,
    monthStats,
    reload,
  };
}
