import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  name: string;
  initials: string;
  email: string;
  role: string;
  employeeId: string;
  designation: string;
  joiningDate: string;
  monthlySalary: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  rememberMe: boolean;
  savedEmail: string;
  passwordHash: string; // Current user password
  user: UserProfile;
  hasShownLoginToast: boolean;
}

const DEFAULT_USER: UserProfile = {
  name: 'Usman Khurram',
  initials: 'UK',
  email: 'admin@gmail.com',
  role: 'Intern • Employee',
  employeeId: 'ST-166642',
  designation: 'Intern',
  joiningDate: 'June 15, 2026',
  monthlySalary: 'PKR 1',
};

const initialState: AuthState = {
  isAuthenticated: false,
  rememberMe: false,
  savedEmail: 'admin@gmail.com',
  passwordHash: '1234',
  user: DEFAULT_USER,
  hasShownLoginToast: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; rememberMe: boolean }>
    ) => {
      state.isAuthenticated = true;
      state.rememberMe = action.payload.rememberMe;
      state.user.email = action.payload.email;
      state.hasShownLoginToast = false; // Reset so toast displays once on initial entry
      if (action.payload.rememberMe) {
        state.savedEmail = action.payload.email;
      } else {
        state.savedEmail = '';
      }
    },
    markLoginToastShown: (state) => {
      state.hasShownLoginToast = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.rememberMe = false;
      state.hasShownLoginToast = false;
    },
    updatePasswordInState: (state, action: PayloadAction<string>) => {
      state.passwordHash = action.payload;
    },
    setSavedEmail: (state, action: PayloadAction<string>) => {
      state.savedEmail = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  loginSuccess,
  logout,
  markLoginToastShown,
  updatePasswordInState,
  setSavedEmail,
  setRememberMe,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;

