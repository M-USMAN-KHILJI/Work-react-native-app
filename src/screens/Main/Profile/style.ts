import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../../../constants/display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FA',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.5),
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  menuButton: {
    padding: wp(1.5),
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    position: 'relative',
    zIndex: 999,
  },
  bellButton: {
    padding: wp(1.5),
  },
  avatarSmallCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSmallText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textWhite,
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

  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.8),
    paddingBottom: hp(5),
  },

  // 1. Top Hero Profile Card
  heroProfileCard: {
    borderRadius: radius.xl,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
    marginBottom: hp(2),
    ...shadows.card,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  avatarLarge: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.8),
  },
  avatarLargeText: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textWhite,
  },
  heroNameCol: {
    flex: 1,
  },
  heroSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textWhiteSecondary,
    fontWeight: '500',
    marginBottom: hp(0.2),
  },
  heroTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: -0.3,
  },
  heroRole: {
    fontSize: fontSize.xs,
    color: colors.textWhiteSecondary,
    marginTop: hp(0.2),
    fontWeight: '500',
  },

  // Hero Pills Row
  heroPillsList: {
    gap: hp(0.9),
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: radius.full,
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(0.65),
    alignSelf: 'flex-start',
    gap: wp(2),
  },
  heroPillText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textWhite,
  },

  // 2. Summary Info Cards (MEMBER SINCE, ACCOUNT STATUS, EMPLOYEE ID)
  summaryCardsCol: {
    gap: hp(1.2),
    marginBottom: hp(2),
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.lg,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  summaryIconBox: {
    width: wp(11.5),
    height: wp(11.5),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  summaryInfoCol: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: hp(0.2),
  },
  summaryValue: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
  },

  // 3. Container Card (Personal Information & Change Password)
  sectionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    paddingHorizontal: wp(4.8),
    paddingTop: hp(2.4),
    paddingBottom: hp(2.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(2.2),
  },
  sectionHeaderIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderCol: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },

  // Personal Info Input Cards (read-only tiles)
  personalInfoList: {
    gap: hp(1.2),
  },
  infoTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFCFE',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.lg,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.2),
  },
  infoTileIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  infoTileContent: {
    flex: 1,
  },
  infoTileLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoTileValue: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: hp(0.2),
  },

  // 4. Change Password Elements
  passwordRuleBox: {
    backgroundColor: '#FFFDF5',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: radius.md,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.4),
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp(2.5),
    marginBottom: hp(2.2),
  },
  passwordRuleText: {
    flex: 1,
    fontSize: fontSize.xs,
    color: '#92400E',
    lineHeight: hp(2.1),
  },

  // Custom Input Field Inside Change Password
  inputGroup: {
    marginBottom: hp(1.8),
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.6),
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  requiredStar: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.error,
  },
  customInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    paddingHorizontal: wp(3.5),
    height: hp(5.6),
  },
  customInputBoxFocused: {
    borderColor: colors.primary,
  },
  customInputBoxError: {
    borderColor: colors.error, // Red border line under field when error occurs
    borderWidth: 1.5,
  },
  customTextInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    paddingVertical: 0,
    fontWeight: '500',
  },
  eyeButton: {
    padding: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: hp(0.4),
    marginLeft: wp(1),
  },

  // Update Password Button
  updateButtonTouch: {
    borderRadius: radius.md,
    overflow: 'hidden',
    marginTop: hp(1),
    ...shadows.button,
  },
  updateButtonGradient: {
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  updateButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textWhite,
    letterSpacing: 0.2,
  },
});
