import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, hp, wp } from '../../../constants/display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  scrollContent: {
    paddingBottom: hp(4),
  },

  // Top App Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  menuButton: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    position: 'relative',
    zIndex: 100,
  },
  bellButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: colors.primaryHover,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.textWhite,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },

  // Avatar Dropdown Menu
  dropdownBackdrop: {
    position: 'absolute',
    top: -hp(10),
    bottom: -hp(100),
    left: -wp(100),
    right: -wp(100),
    zIndex: 998,
  },
  avatarDropdownMenu: {
    position: 'absolute',
    top: hp(5.2),
    right: 0,
    width: wp(42),
    backgroundColor: colors.cardBackground,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: hp(0.6),
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.3),
    gap: wp(2.8),
  },
  dropdownItemDivider: {
    height: 1,
    backgroundColor: colors.borderDivider,
    marginHorizontal: wp(2),
  },
  dropdownItemText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Main Body
  body: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2),
    gap: hp(2),
  },

  // 1. Hero Gradient Banner
  heroBanner: {
    borderRadius: radius.cardTop,
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(2.8),
    shadowColor: colors.primaryHover,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  heroCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(0.8),
  },
  heroCategoryText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  heroTitle: {
    fontSize: fontSize.hero,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.3,
    marginBottom: hp(1),
  },
  heroSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: hp(2.1),
    fontWeight: '400',
  },

  // 2. Active Contract Card
  activeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.cardTop,
    padding: wp(4.5),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    paddingBottom: hp(1.8),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  headerIconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: radius.lg,
    backgroundColor: colors.status.presentBadgeBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },

  // Contract Details inside Active Card
  contractDetailsContainer: {
    paddingTop: hp(2),
  },
  roleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(2),
    marginBottom: hp(0.6),
  },
  roleTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  activePill: {
    backgroundColor: colors.status.presentBadgeBg,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
    borderRadius: radius.full,
  },
  activePillText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.success,
  },
  internPill: {
    backgroundColor: colors.borderDivider,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
    borderRadius: radius.full,
  },
  internPillText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  contractIdText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: hp(1.8),
  },

  // Info Mini Cards (Duration, Salary, Paid Leaves)
  infoBoxesGroup: {
    gap: hp(1.2),
  },
  infoMiniBox: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderColor: colors.borderBox,
  },
  infoMiniLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.8),
    marginBottom: hp(0.5),
  },
  infoMiniLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  infoMiniValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // 3. Previous Contracts Card
  previousCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.cardTop,
    padding: wp(4.5),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recordsPillRow: {
    marginTop: hp(1.5),
    marginBottom: hp(1.8),
  },
  recordsPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: radius.full,
  },
  recordsPillText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Empty State Container inside Previous Contracts
  emptyStateBox: {
    borderWidth: 1,
    borderColor: colors.borderDivider,
    borderRadius: radius.xl,
    paddingVertical: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceCardMuted,
  },
  emptyIconCircle: {
    width: wp(14),
    height: wp(14),
    borderRadius: radius.full,
    backgroundColor: colors.borderDivider,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  emptyStateText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
