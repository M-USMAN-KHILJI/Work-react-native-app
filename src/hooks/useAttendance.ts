import { useAppSelector } from '../redux';

/**
 * useAttendance — reads state directly from Redux store,
 * providing reactive updates across Dashboard, Attendance, and all components.
 */
export function useAttendance() {
  const allHistory = useAppSelector((state) => state.attendance.history);
  const activeSession = useAppSelector((state) => state.attendance.activeSession);

  const isCheckedIn = !!activeSession;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = allHistory.find((h) => h.date === todayStr) || null;

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
