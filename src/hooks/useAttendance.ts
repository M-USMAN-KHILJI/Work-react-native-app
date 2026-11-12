import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getActiveSession,
  getAttendanceHistory,
  StoredAttendanceRecord,
} from '../utils/attendanceStore';

/**
 * useAttendance — loads today's session state, full history, today's record,
 * and computes current-month attendance stats.
 * Shared by Dashboard and Attendance screens.
 */
export function useAttendance() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [todayRecord, setTodayRecord] = useState<StoredAttendanceRecord | null>(null);
  const [allHistory, setAllHistory] = useState<StoredAttendanceRecord[]>([]);

  const loadState = useCallback(async () => {
    const session = await getActiveSession();
    setIsCheckedIn(!!session);

    const history = await getAttendanceHistory();
    setAllHistory(history);

    const todayStr = new Date().toISOString().split('T')[0];
    const found = history.find((h) => h.date === todayStr);
    setTodayRecord(found || null);
  }, []);

  // Reload every time the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadState();
    }, [loadState])
  );

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

  return {
    isCheckedIn,
    todayRecord,
    allHistory,
    thisMonthRecords,
    monthStats,
    reload: loadState,
  };
}

