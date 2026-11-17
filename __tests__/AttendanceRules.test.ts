import {
  evaluateCheckInEligibility,
  evaluateCheckOutEligibility,
  calculateDayAttendance,
  calculateDeductions,
  formatDuration,
  getDistanceInMeters,
  OFFICE_COORDINATES,
} from '../src/utils/attendanceRules';
import { computeRecordRules } from '../src/utils/recordCalculator';
import { getLocalDateString } from '../src/utils/dateUtils';

describe('Attendance Rules Engine & Record Calculator - Stress Testing & Edge Cases', () => {
  describe('Rule 1 to 4: Check-in Eligibility & Timing Limits', () => {
    test('Before 10:00 AM cannot check in', () => {
      const earlyDate = new Date(2026, 10, 17, 9, 59, 0); // 9:59 AM
      const res = evaluateCheckInEligibility(earlyDate, undefined, true);
      expect(res.canCheckIn).toBe(false);
      expect(res.reason).toMatch(/10:00 AM/);
      expect(res.isLate).toBe(false);
    });

    test('At 10:00 AM exactly can check in on time', () => {
      const onTimeDate = new Date(2026, 10, 17, 10, 0, 0); // 10:00 AM
      const res = evaluateCheckInEligibility(onTimeDate, undefined, true);
      expect(res.canCheckIn).toBe(true);
      expect(res.isLate).toBe(false);
      expect(res.lateMinutes).toBe(0);
      expect(res.startsAsHalfDay).toBe(false);
    });

    test('At 10:15 AM (grace period boundary) is NOT late', () => {
      const graceLimit = new Date(2026, 10, 17, 10, 15, 0); // 10:15 AM
      const res = evaluateCheckInEligibility(graceLimit, undefined, true);
      expect(res.canCheckIn).toBe(true);
      expect(res.isLate).toBe(false);
      expect(res.lateMinutes).toBe(0);
    });

    test('At 10:16 AM is late by 1 minute', () => {
      const lateDate = new Date(2026, 10, 17, 10, 16, 0); // 10:16 AM
      const res = evaluateCheckInEligibility(lateDate, undefined, true);
      expect(res.canCheckIn).toBe(true);
      expect(res.isLate).toBe(true);
      expect(res.lateMinutes).toBe(1);
      expect(res.startsAsHalfDay).toBe(false);
    });

    test('At 11:00 AM check-in starts as half-day', () => {
      const halfDayDate = new Date(2026, 10, 17, 11, 0, 0); // 11:00 AM
      const res = evaluateCheckInEligibility(halfDayDate, undefined, true);
      expect(res.canCheckIn).toBe(true);
      expect(res.isLate).toBe(true);
      expect(res.startsAsHalfDay).toBe(true);
      expect(res.lateMinutes).toBe(45);
    });

    test('At 7:00 PM (19:00) check-in is closed and blocked', () => {
      const closedDate = new Date(2026, 10, 17, 19, 0, 0); // 7:00 PM
      const res = evaluateCheckInEligibility(closedDate, undefined, true);
      expect(res.canCheckIn).toBe(false);
      expect(res.reason).toMatch(/7:00 PM/);
    });
  });

  describe('Rule 6: GPS Geofence 50m Office Radius', () => {
    test('Within 50m radius can check in', () => {
      const checkDate = new Date(2026, 10, 17, 10, 10, 0);
      const closeLocation = {
        latitude: OFFICE_COORDINATES.latitude + 0.0001,
        longitude: OFFICE_COORDINATES.longitude,
      };
      const res = evaluateCheckInEligibility(checkDate, closeLocation, false);
      expect(res.canCheckIn).toBe(true);
    });

    test('Beyond 50m radius is blocked when isWFH is false', () => {
      const checkDate = new Date(2026, 10, 17, 10, 10, 0);
      const farLocation = {
        latitude: OFFICE_COORDINATES.latitude + 0.01, // ~1.1km away
        longitude: OFFICE_COORDINATES.longitude,
      };
      const res = evaluateCheckInEligibility(checkDate, farLocation, false);
      expect(res.canCheckIn).toBe(false);
      expect(res.reason).toMatch(/outside the office radius/);
    });

    test('Beyond 50m radius is allowed when isWFH is true', () => {
      const checkDate = new Date(2026, 10, 17, 10, 10, 0);
      const farLocation = {
        latitude: OFFICE_COORDINATES.latitude + 0.01,
        longitude: OFFICE_COORDINATES.longitude,
      };
      const res = evaluateCheckInEligibility(checkDate, farLocation, true);
      expect(res.canCheckIn).toBe(true);
    });
  });

  describe('Rule 7 & 8: Overnight Check-Out & Admin Cutoff', () => {
    test('Check out before 6:00 AM next day is allowed', () => {
      const checkInDate = new Date(2026, 10, 17, 10, 0, 0);
      const checkOutDate = new Date(2026, 10, 18, 5, 30, 0); // 5:30 AM next day
      const res = evaluateCheckOutEligibility(checkInDate, checkOutDate, undefined, true);
      expect(res.canCheckOut).toBe(true);
      expect(res.needsAdmin).toBe(false);
    });

    test('Check out after 6:00 AM next day requires admin', () => {
      const checkInDate = new Date(2026, 10, 17, 10, 0, 0);
      const checkOutDate = new Date(2026, 10, 18, 6, 1, 0); // 6:01 AM next day
      const res = evaluateCheckOutEligibility(checkInDate, checkOutDate, undefined, true);
      expect(res.canCheckOut).toBe(false);
      expect(res.needsAdmin).toBe(true);
      expect(res.reason).toMatch(/admin/i);
    });
  });

  describe('Rule 5: Working Hours Duration & Status Calculations', () => {
    test('No check-in results in Leave status', () => {
      const res = calculateDayAttendance(null, null);
      expect(res.statuses).toEqual(['Leave']);
      expect(res.workingHoursFormatted).toBe('—');
    });

    test('Checked in at 10:10 AM, still open (no checkout)', () => {
      const checkIn = new Date(2026, 10, 17, 10, 10, 0);
      const res = calculateDayAttendance(checkIn, null);
      expect(res.statuses).toEqual(['Present']);
      expect(res.lateByFormatted).toBe('—');
    });

    test('Checked in at 10:20 AM, still open (Late)', () => {
      const checkIn = new Date(2026, 10, 17, 10, 20, 0);
      const res = calculateDayAttendance(checkIn, null);
      expect(res.statuses).toContain('Present');
      expect(res.statuses).toContain('Late');
      expect(res.lateByFormatted).toBe('5m');
    });

    test('Less than 6 hours worked (<6h) results in Half Leave', () => {
      const checkIn = new Date(2026, 10, 17, 10, 0, 0);
      const checkOut = new Date(2026, 10, 17, 15, 30, 0); // 5h 30m
      const res = calculateDayAttendance(checkIn, checkOut);
      expect(res.workingHoursFormatted).toBe('5h 30m');
      expect(res.statuses).toContain('Half Leave');
    });

    test('6h to under 9h worked results in Short Leave and Late', () => {
      const checkIn = new Date(2026, 10, 17, 10, 0, 0);
      const checkOut = new Date(2026, 10, 17, 17, 0, 0); // 7h
      const res = calculateDayAttendance(checkIn, checkOut);
      expect(res.workingHoursFormatted).toBe('7h');
      expect(res.statuses).toContain('Short Leave');
      expect(res.statuses).toContain('Late');
    });

    test('9 hours or more worked results in Present', () => {
      const checkIn = new Date(2026, 10, 17, 10, 0, 0);
      const checkOut = new Date(2026, 10, 17, 19, 0, 0); // 9h 0m
      const res = calculateDayAttendance(checkIn, checkOut);
      expect(res.workingHoursFormatted).toBe('9h');
      expect(res.statuses).toEqual(['Present']);
    });

    test('9h 30m worked includes extra hours of 30m', () => {
      const checkIn = new Date(2026, 10, 17, 10, 0, 0);
      const checkOut = new Date(2026, 10, 17, 19, 30, 0); // 9h 30m
      const res = calculateDayAttendance(checkIn, checkOut);
      expect(res.workingHoursFormatted).toBe('9h 30m');
      expect(res.extraHoursFormatted).toBe('30m');
      expect(res.statuses).toEqual(['Present']);
    });
  });

  describe('Rule 9: 3 Late or Short Leave in any mix deducts 1 half day', () => {
    test('Calculates half days deducted for mixed counts', () => {
      const dummyRecords = [
        { statuses: ['Late'] },
        { statuses: ['Short Leave'] },
        { statuses: ['Late'] },
        { statuses: ['Present'] },
        { statuses: ['Short Leave'] },
        { statuses: ['Short Leave'] },
      ] as any;

      const deductions = calculateDeductions(dummyRecords);
      expect(deductions.lateCount).toBe(2);
      expect(deductions.shortLeaveCount).toBe(3);
      expect(deductions.combinedLateOrShort).toBe(5);
      expect(deductions.halfDaysDeducted).toBe(1); // 5 / 3 = 1
    });

    test('6 combined late/short leave equals 2 half days deducted', () => {
      const dummyRecords = [
        { statuses: ['Late'] },
        { statuses: ['Late'] },
        { statuses: ['Late'] },
        { statuses: ['Short Leave'] },
        { statuses: ['Short Leave'] },
        { statuses: ['Short Leave'] },
      ] as any;

      const deductions = calculateDeductions(dummyRecords);
      expect(deductions.combinedLateOrShort).toBe(6);
      expect(deductions.halfDaysDeducted).toBe(2); // 6 / 3 = 2
    });
  });

  describe('computeRecordRules Edge Cases', () => {
    test('Handles missing check-in correctly', () => {
      const res = computeRecordRules('—', '—');
      expect(res.statuses).toEqual(['Leave']);
      expect(res.workingHours).toBe('—');
    });

    test('Overnight checkout past midnight (e.g. 10:00 PM to 2:00 AM)', () => {
      const res = computeRecordRules('10:00 PM', '2:00 AM');
      expect(res.workingHours).toBe('4h 0m');
      expect(res.statuses).toContain('Half Leave');
    });
  });

  describe('Late Check-In Banner & Progress Bar Logic (Design Spec)', () => {
    test('Calculates late progress correctly for 0 lates (0% fill)', () => {
      const combinedCount = 0;
      const progressPercent = Math.min(100, Math.round((Math.min(combinedCount, 3) / 3) * 100));
      expect(progressPercent).toBe(0);
    });

    test('Calculates late progress correctly for 1 out of 3 (33% fill)', () => {
      const combinedCount = 1;
      const progressPercent = Math.min(100, Math.round((Math.min(combinedCount, 3) / 3) * 100));
      expect(progressPercent).toBe(33);
    });

    test('Calculates late progress correctly for 2 out of 3 (67% fill)', () => {
      const combinedCount = 2;
      const progressPercent = Math.min(100, Math.round((Math.min(combinedCount, 3) / 3) * 100));
      expect(progressPercent).toBe(67);
    });

    test('Calculates late progress correctly for 3 out of 3 (100% full bar)', () => {
      const combinedCount = 3;
      const progressPercent = Math.min(100, Math.round((Math.min(combinedCount, 3) / 3) * 100));
      expect(progressPercent).toBe(100);
    });

    test('For lates > 3 (e.g. 4/3, 5/3), number increases but bar stays clamped at 100%', () => {
      const count4 = 4;
      const progressPercent4 = Math.min(100, Math.round((Math.min(count4, 3) / 3) * 100));
      expect(progressPercent4).toBe(100);

      const count5 = 5;
      const progressPercent5 = Math.min(100, Math.round((Math.min(count5, 3) / 3) * 100));
      expect(progressPercent5).toBe(100);

      const count10 = 10;
      const progressPercent10 = Math.min(100, Math.round((Math.min(count10, 3) / 3) * 100));
      expect(progressPercent10).toBe(100);
    });
  });

  describe('Outside 50m Radius WFH Check-In Logic', () => {
    test('Outside radius without WFH flag is rejected', () => {
      const farLocation = {
        latitude: OFFICE_COORDINATES.latitude + 0.05,
        longitude: OFFICE_COORDINATES.longitude + 0.05,
      };
      const checkInDate = new Date(2026, 10, 17, 10, 30, 0);
      const res = evaluateCheckInEligibility(checkInDate, farLocation, false);
      expect(res.canCheckIn).toBe(false);
      expect(res.reason).toMatch(/outside the office radius/i);
    });

    test('Outside radius with WFH flag and valid reason is approved', () => {
      const farLocation = {
        latitude: OFFICE_COORDINATES.latitude + 0.05,
        longitude: OFFICE_COORDINATES.longitude + 0.05,
      };
      const checkInDate = new Date(2026, 10, 17, 10, 30, 0);
      const res = evaluateCheckInEligibility(checkInDate, farLocation, true);
      expect(res.canCheckIn).toBe(true);
      expect(res.isLate).toBe(true); // 10:30 AM is after 10:15 AM
    });
  });

  describe('dateUtils: getLocalDateString', () => {
    test('Formats date properly as YYYY-MM-DD', () => {
      const testDate = new Date(2026, 0, 5); // Jan 5, 2026
      expect(getLocalDateString(testDate)).toBe('2026-01-05');
    });
  });
});
