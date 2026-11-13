import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { reduxStorage } from './storage';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';

const authPersistConfig = {
  key: 'auth',
  storage: reduxStorage,
  whitelist: ['isAuthenticated', 'rememberMe', 'savedEmail', 'passwordHash', 'user'],
};

const attendancePersistConfig = {
  key: 'attendance',
  storage: reduxStorage,
  whitelist: ['history', 'activeSession'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  attendance: persistReducer(attendancePersistConfig, attendanceReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
