import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoredAttendanceRecord, INITIAL_MOCK_HISTORY } from '../../utils/attendanceStore';

export interface ActiveSession {
  checkInISO: string;
}

export interface AttendanceState {
  history: StoredAttendanceRecord[];
  activeSession: ActiveSession | null;
}

const initialState: AttendanceState = {
  history: INITIAL_MOCK_HISTORY,
  activeSession: null,
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    checkInAction: (
      state,
      action: PayloadAction<{ record: StoredAttendanceRecord; checkInISO: string }>
    ) => {
      state.activeSession = { checkInISO: action.payload.checkInISO };
      const dateStr = action.payload.record.date;
      const existingIdx = state.history.findIndex((h) => h.date === dateStr);
      if (existingIdx >= 0) {
        state.history[existingIdx] = action.payload.record;
      } else {
        state.history.unshift(action.payload.record);
      }
    },
    checkOutAction: (
      state,
      action: PayloadAction<{ record: StoredAttendanceRecord }>
    ) => {
      state.activeSession = null;
      const dateStr = action.payload.record.date;
      const existingIdx = state.history.findIndex((h) => h.date === dateStr);
      if (existingIdx >= 0) {
        state.history[existingIdx] = action.payload.record;
      } else {
        state.history.unshift(action.payload.record);
      }
    },
    setAttendanceHistory: (
      state,
      action: PayloadAction<StoredAttendanceRecord[]>
    ) => {
      state.history = action.payload;
    },
    setActiveSession: (
      state,
      action: PayloadAction<ActiveSession | null>
    ) => {
      state.activeSession = action.payload;
    },
  },
});

export const {
  checkInAction,
  checkOutAction,
  setAttendanceHistory,
  setActiveSession,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;

