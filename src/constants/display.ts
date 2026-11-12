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
  checkInButtonGradient: ['#086685', '#027EA7', '#0095C3'] as const,

  // Deep Background Gradients (WorkPulse Enterprise Dark Teal Theme)
  bgGradientTop: '#084864',
  bgGradientMid: '#043249',
  bgGradientBottom: '#012133',

  // Surfaces & Backgrounds
  appBackground: '#F3F7FA',
  cardBackground: '#FFFFFF',
  surfaceLight: '#F8FAFC',
  surfaceCardMuted: '#FAFCFD',
  surfaceRowAlternate: '#FAFCFE',
  inputBackground: '#EEF4F8',
  inputBorder: '#E2E8F0',
  inputBorderFocused: '#0096C7',
  cardBorder: '#E8EFF4',
  borderDivider: '#F1F5F9',
  borderSubtle: '#EBF1F5',
  borderLight: '#EDF2F7',
  borderBox: '#EEF2F6',

  // Typography
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textDark: '#1E293B',
  textBody: '#334155',
  textSlate: '#475569',
  textWhite: '#FFFFFF',
  textWhiteSecondary: '#C8E4EF',
  textLink: '#0284C7',

  // States & Indicators
  error: '#EF4444',
  success: '#10B981',
  checkboxBorder: '#CBD5E1',
  checkboxActive: '#0096C7',

  // Action Buttons (Check In / Check Out)
  actionOcean: '#006D8F',
  checkInActive: '#00bc7c',
  checkInSuccess: '#a6e0cc',
  checkInSuccessText: '#065F46',
  checkOutSuccess: '#94d2bd',
  actionDisabledBg: '#F1F5F9',

  // Teal Performance & Badges
  performanceTeal: '#0D9488',
  performanceTealBg: '#F8FCFE',
  performanceBorder: '#E0F2FE',
  rateZeroBg: '#fc2a3e',

  // Attendance Metric & Status Card Colors (Preserving exact visual design)
  status: {
    // Present
    presentCardBg: '#F9FEFB',
    presentBorder: '#A7F3D0',
    presentBadgeBg: '#DCFCE7',
    presentBadgeText: '#15803D',

    // Late
    lateCardBg: '#FFFCFA',
    lateBorder: '#FED7AA',
    lateBadgeBg: '#FEF3C7',
    lateBadgeText: '#B45309',

    // Short Leave
    shortLeaveCardBg: '#FFFDF9',
    shortLeaveBorder: '#FDE68A',

    // Half Leave
    halfLeaveCardBg: '#FBFEFF',
    halfLeaveBorder: '#BAE6FD',

    // Leave (Absent)
    leaveCardBg: '#FEFAFB',
    leaveBorder: '#FECDD3',
    leaveBadgeBg: '#FEE2E2',
    leaveBadgeText: '#B91C1C',

    // Accommodated / Flexible
    accommodatedCardBg: '#FEFAFB',
    accommodatedBorder: '#A7F3D0',

    // Paid Leave
    paidLeaveCardBg: '#FCFCFE',
    paidLeaveBorder: '#DDD6FE',
    paidLeaveBannerBg: '#F5F7FF',
    paidLeaveBannerBorder: '#EEF2FF',
    paidLeaveAccent: '#4F46E5',

    // Remaining Paid Leaves
    remainingPaidLeavesCardBg: '#F9FBFF',
    remainingPaidLeavesBorder: '#C7D2FE',
  },

  // Modal Colors
  modal: {
    timeBoxBg: '#F0FDFA',
    timeBoxBorder: '#99F6E4',
    iconBoxBg: '#A7F3D0',
  },

  // Profile Tiles & Containers (Enriched tint for clear visual distinction)
  profile: {
    memberSinceBg: '#E0F7EF',
    accountStatusBg: '#D9ECF7',
    employeeIdBg: '#EFEAFD',
    fullNameBg: '#EBF9F4',
    emailAddressBg: '#E5F4FC',
    employeeIdTileBg: '#F1F3F6',
    designationBg: '#E0F2F7',
    joiningDateBg: '#FFFBE8',
    monthlySalaryBg: '#F3EBFD',
  },
} as const;

/**
 * Responsive fontSize calibrated in wp to match the exact mobile visual proportions:
 * xs:   wp(2.9)  ~ 11.5px (subtitles, meta text, badge captions)
 * sm:   wp(3.4)  ~ 13.5px (secondary text, labels, inputs)
 * md:   wp(3.8)  ~ 15px   (body regular, dropdowns, buttons)
 * lg:   wp(4.4)  ~ 17.5px (card titles, prominent labels)
 * xl:   wp(5.2)  ~ 20.5px (section headers, dialog titles)
 * xxl:  wp(6.0)  ~ 24px   (large card statistics, welcome headers)
 * hero: wp(7.8)  ~ 31px   (main banners, large metric displays)
 */
export const fontSize = {
  xs: wp(2.9),
  sm: wp(3.4),
  md: wp(3.8),
  lg: wp(4.4),
  xl: wp(5.2),
  xxl: wp(6.0),
  hero: wp(7.8),
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
