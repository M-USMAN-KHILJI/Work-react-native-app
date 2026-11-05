import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';

export { wp, hp };

export const colors = {
  // Brand & Accent Colors
  primary: '#0096C7',
  primaryHover: '#0083B0',
  primaryGradientStart: '#2563EB',
  primaryGradientEnd: '#0891B2',
  accent: '#0891B2',
  accentLight: '#ECFEFF',
  accentBorder: '#BAE6FD',

  // Button Linear Gradient
  buttonGradient: ['#086685', '#027ea7', '#008cb9', '#0095c3'] as const,

  // Deep Background Gradients (WorkPulse Enterprise Dark Teal Theme)
  bgGradientTop: '#084864',
  bgGradientMid: '#043249',
  bgGradientBottom: '#012133',

  // Surfaces & Cards
  cardBackground: '#FFFFFF',
  surfaceLight: '#F8FAFC',
  inputBackground: '#EEF4F8',
  inputBorder: '#E2E8F0',
  inputBorderFocused: '#0096C7',

  // Typography
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',
  textWhiteSecondary: '#C8E4EF',
  textLink: '#0284C7',

  // States & Indicators
  error: '#EF4444',
  success: '#10B981',
  checkboxBorder: '#CBD5E1',
  checkboxActive: '#0096C7',
} as const;

export const fontSize = {
  xs: hp(1.3), // ~11px
  sm: hp(1.6), // ~13-14px
  md: hp(1.9), // ~15-16px
  lg: hp(2.2), // ~18px
  xl: hp(2.6), // ~21px
  xxl: hp(3.1), // ~25px
  hero: hp(3.8), // ~30-32px
} as const;

export const fontFamily = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  semiBold: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', android: 'sans-serif-bold' }),
} as const;

export const radius = {
  xs: wp(1.2), // ~5px
  sm: wp(2),   // ~8px
  md: wp(3),   // ~12px
  lg: wp(4),   // ~16px
  xl: wp(6),   // ~24px
  cardTop: wp(8), // ~32px
  full: wp(50), // 9999px
} as const;

export const spacing = {
  xs: hp(0.6), // ~5px
  sm: hp(1.2), // ~10px
  md: hp(1.8), // ~15px
  lg: hp(2.4), // ~20px
  xl: hp(3),   // ~25px
  xxl: hp(4),  // ~33px
  xxxl: hp(5), // ~41px
} as const;

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    shadowColor: '#0096C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

