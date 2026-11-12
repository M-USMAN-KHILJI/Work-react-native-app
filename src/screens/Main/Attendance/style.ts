import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../../../constants/display';

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

  // Main Screen Padding
  mainContent: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2),
  },

  // 1. Hero Card
  heroCard: {
    borderRadius: radius.xl,
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(2.5),
    marginBottom: hp(2),
  },
  heroPreTitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginBottom: hp(0.6),
    letterSpacing: 0.3,
  },
  heroTitle: {
    color: colors.textWhite,
    fontSize: fontSize.hero,
    fontWeight: '800',
    lineHeight: hp(3.2),
    letterSpacing: -0.4,
  },
  heroDescription: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontSize.xs,
    lineHeight: hp(2),
    marginTop: hp(1),
    marginBottom: hp(1.8),
  },
  heroPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
    marginBottom: hp(2),
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.55),
    borderRadius: radius.full,
    gap: wp(1.2),
  },
  heroPillText: {
    color: colors.textWhite,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  monthSelectorButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.1),
    gap: wp(2),
    ...shadows.button,
  },
  monthSelectorButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  heroFooterHint: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: fontSize.xs,
    marginTop: hp(1.2),
    fontWeight: '500',
  },

  // 2. Report Filter Card (Select Year / Month / View Type)
  reportCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  reportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(2),
  },
  reportIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: colors.performanceBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  reportSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },

  // Dropdown Selectors inside Report Card
  selectorWrapper: {
    marginBottom: hp(1.4),
  },
  selectorLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: hp(0.5),
    letterSpacing: 0.3,
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1.2,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.3),
  },
  selectorButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textDark,
  },
  dropdownOptionsList: {
    marginTop: hp(0.6),
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    overflow: 'hidden',
    ...shadows.card,
  },
  dropdownOptionItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  dropdownOptionItemActive: {
    backgroundColor: '#F0F9FF',
  },
  dropdownOptionText: {
    fontSize: fontSize.md,
    color: colors.textBody,
    fontWeight: '500',
  },
  dropdownOptionTextActive: {
    color: colors.textLink,
    fontWeight: '700',
  },

  // 3. Attendance Rate Snapshot Box
  rateSnapshotBox: {
    backgroundColor: colors.performanceTealBg,
    borderWidth: 1,
    borderColor: colors.performanceBorder,
    borderRadius: radius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(2.2),
  },
  rateTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  rateBadge: {
    backgroundColor: colors.performanceTeal,
    width: wp(15),
    height: wp(14),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  rateBadgeText: {
    color: colors.textWhite,
    fontSize: fontSize.xxl,
    fontWeight: '800',
  },
  rateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  rateLabel: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.performanceTeal,
    letterSpacing: 0.5,
  },
  rateMonthTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: hp(0.2),
    letterSpacing: -0.2,
  },
  rateSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },

  // Working Days Container inside Attendance Rate
  workingDaysCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.2),
    marginBottom: hp(1.5),
  },
  workingDaysIconBox: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: radius.sm,
    backgroundColor: colors.borderDivider,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  workingDaysLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  workingDaysCount: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
  },

  // Progress Bar
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.6),
  },
  progressTextLeft: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  progressTextRight: {
    fontSize: fontSize.xs,
    color: colors.performanceTeal,
    fontWeight: '700',
  },
  progressBarBg: {
    height: hp(0.9),
    backgroundColor: colors.inputBorder,
    borderRadius: hp(0.45),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.performanceTeal,
    borderRadius: hp(0.45),
  },

  // 4. 8-Stat Attendance Grid (Present, Late, Short Leave, Half Leave, etc.)
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: hp(1.4),
    marginBottom: hp(2.5),
  },
  statCard: {
    width: '48.2%',
    borderRadius: radius.xl,
    borderWidth: 1.2,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.6),
  },
  // Specific card backgrounds & borders from centralized colors.status
  cardPresent: {
    backgroundColor: colors.status.presentCardBg,
    borderColor: colors.status.presentBorder,
  },
  cardLate: {
    backgroundColor: colors.status.lateCardBg,
    borderColor: colors.status.lateBorder,
  },
  cardShortLeave: {
    backgroundColor: colors.status.shortLeaveCardBg,
    borderColor: colors.status.shortLeaveBorder,
  },
  cardHalfLeave: {
    backgroundColor: colors.status.halfLeaveCardBg,
    borderColor: colors.status.halfLeaveBorder,
  },
  cardLeave: {
    backgroundColor: colors.status.leaveCardBg,
    borderColor: colors.status.leaveBorder,
  },
  cardLeaveAccommodated: {
    backgroundColor: colors.status.accommodatedCardBg,
    borderColor: colors.status.accommodatedBorder,
  },
  cardPaidLeave: {
    backgroundColor: colors.status.paidLeaveCardBg,
    borderColor: colors.status.paidLeaveBorder,
  },
  cardRemainingPaidLeaves: {
    backgroundColor: colors.status.remainingPaidLeavesCardBg,
    borderColor: colors.status.remainingPaidLeavesBorder,
  },

  statCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp(3),
  },
  statIconBox: {
    width: wp(11.5),
    height: wp(11.5),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContentCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.textSlate,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: hp(0.2),
    letterSpacing: -0.3,
  },
  statSubtext: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.8),
    fontWeight: '500',
    lineHeight: hp(1.6),
  },

  // 5. Attendance History Section
  historyCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(1.2),
  },
  historyIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: colors.borderDivider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  historySub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },
  historyBadgeRow: {
    marginBottom: hp(1.5),
  },
  recordPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.borderDivider,
    borderRadius: radius.full,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  recordPillText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSlate,
  },

  // Attendance History Table
  tableContainer: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
  },
  tableScrollContent: {
    minWidth: wp(185),
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
    alignItems: 'center',
  },
  tableHeaderCol: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  colHeaderWithSort: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: colors.surfaceRowAlternate,
  },

  // Column Widths
  colDate: {
    width: wp(28),
  },
  colCheckIn: {
    width: wp(24),
  },
  colCheckOut: {
    width: wp(24),
  },
  colWorking: {
    width: wp(27),
  },
  colExtra: {
    width: wp(25),
  },
  colLateBy: {
    width: wp(24),
  },
  colStatus: {
    width: wp(33),
  },

  tableTextDate: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textDark,
  },
  tableTextRegular: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.textBody,
  },
  tableTextMuted: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },

  // Status Badges
  statusBadgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: wp(1.2),
  },
  statusBadge: {
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.35),
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  statusBadgePresent: {
    backgroundColor: colors.status.presentBadgeBg,
  },
  statusBadgeLate: {
    backgroundColor: colors.status.lateBadgeBg,
  },
  statusBadgeLeave: {
    backgroundColor: colors.status.leaveBadgeBg,
  },
  statusBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  statusTextPresent: {
    color: colors.status.presentBadgeText,
  },
  statusTextLate: {
    color: colors.status.lateBadgeText,
  },
  statusTextLeave: {
    color: colors.status.leaveBadgeText,
  },

  // 6. Attendance Rules Accordion Card
  rulesCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  rulesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rulesHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    flex: 1,
    paddingRight: wp(2),
  },
  rulesIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: colors.performanceBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rulesSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
    lineHeight: hp(1.7),
  },
  rulesContent: {
    marginTop: hp(2),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: colors.borderDivider,
  },
  timelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineCol: {
    alignItems: 'center',
    width: wp(8),
    marginRight: wp(3),
  },
  timelineBadge: {
    width: wp(6.2),
    height: wp(6.2),
    borderRadius: radius.full,
    backgroundColor: colors.performanceBorder,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textLink,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: hp(3.5),
    backgroundColor: colors.accentBorder,
    marginVertical: hp(0.4),
  },
  timelineContentCol: {
    flex: 1,
    paddingBottom: hp(2.2),
    justifyContent: 'center',
  },
  timelineRuleText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: hp(2.1),
    fontWeight: '400',
  },
  ruleItem: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: hp(0.8),
    lineHeight: hp(1.8),
  },
});
