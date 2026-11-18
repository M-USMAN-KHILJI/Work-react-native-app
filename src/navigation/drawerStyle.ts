import { StyleSheet } from 'react-native';
import {
  colors,
  fontSize,
  fontFamily,
  radius,
  shadows,
  spacing,
  hp,
  wp,
} from '../constants/display';

export const DRAWER_WIDTH = wp(70);

export const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    zIndex: 9998,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: colors.cardBackground,
    zIndex: 9999,
    shadowColor: shadows.card.shadowColor,
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 20,
  },
  safeArea: {
    flex: 1,
  },
  headerSection: {
    paddingTop: hp(2),
    paddingHorizontal: wp(5.5),
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  menuScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.2),
  },
  groupHeading: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingHorizontal: wp(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
    borderRadius: radius.lg,
    marginBottom: spacing.xs,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: colors.profile.emailAddressBg, // #E5F4FC soft sky tint
  },
  activePillIndicator: {
    position: 'absolute',
    left: 0,
    top: spacing.md,
    bottom: spacing.md,
    width: 3,
    borderRadius: radius.xs,
    backgroundColor: colors.textLink, // #0284C7
  },
  menuIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  dashboardIconBg: {
    backgroundColor: colors.accentBorder, // #BAE6FD
  },
  attendanceIconBg: {
    backgroundColor: colors.status.presentBadgeBg, // #DCFCE7
  },
  contractIconBg: {
    backgroundColor: colors.profile.designationBg, // #E0F2F7
  },
  profileIconBg: {
    backgroundColor: colors.profile.employeeIdBg, // #EFEAFD
  },
  menuItemText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textBody,
  },
  menuItemTextActive: {
    color: colors.textLink,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderDivider,
    marginVertical: spacing.md,
    marginHorizontal: wp(2),
  },
  bottomCardWrapper: {
    paddingHorizontal: wp(4),
    paddingTop: spacing.sm,
    marginBottom: hp(2.2),
  },
  bottomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  userAvatarBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: radius.full,
    backgroundColor: colors.profile.emailAddressBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  userAvatarText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.textLink,
  },
  userInfoCol: {
    flex: 1,
    marginRight: wp(2),
  },
  userName: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    // fontFamily: fontFamily.medium, 
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  userRole: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },
  logoutButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: colors.status.leaveBadgeBg, // #FEE2E2
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
