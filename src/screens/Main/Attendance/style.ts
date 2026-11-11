import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../../../constants/display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FA',
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBF1F5',
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
    backgroundColor: '#0083B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    backgroundColor: '#F1F5F9',
    marginHorizontal: wp(2),
  },
  dropdownItemText: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: '#475569',
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
    color: '#FFFFFF',
    fontSize: hp(2.6),
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
    color: '#FFFFFF',
    fontSize: hp(1.25),
    fontWeight: '600',
  },
  monthSelectorButton: {
    backgroundColor: '#FFFFFF',
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
    fontSize: hp(1.1),
    marginTop: hp(1.2),
    fontWeight: '500',
  },

  // 2. Report Filter Card (Select Year / Month / View Type)
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: hp(1.9),
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  reportSub: {
    fontSize: hp(1.2),
    color: '#64748B',
    marginTop: hp(0.2),
  },

  // Dropdown Selectors inside Report Card
  selectorWrapper: {
    marginBottom: hp(1.4),
  },
  selectorLabel: {
    fontSize: hp(1.15),
    fontWeight: '700',
    color: '#64748B',
    marginBottom: hp(0.5),
    letterSpacing: 0.3,
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: radius.md,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.3),
  },
  selectorButtonText: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: '#1E293B',
  },
  dropdownOptionsList: {
    marginTop: hp(0.6),
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...shadows.card,
  },
  dropdownOptionItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownOptionItemActive: {
    backgroundColor: '#F0F9FF',
  },
  dropdownOptionText: {
    fontSize: hp(1.5),
    color: '#334155',
    fontWeight: '500',
  },
  dropdownOptionTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },

  // 3. Attendance Rate Snapshot Box
  rateSnapshotBox: {
    backgroundColor: '#F8FCFE',
    borderWidth: 1,
    borderColor: '#E0F2FE',
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
    backgroundColor: '#0D9488',
    width: wp(15),
    height: wp(14),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  rateBadgeText: {
    color: '#FFFFFF',
    fontSize: hp(2.1),
    fontWeight: '800',
  },
  rateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  rateLabel: {
    fontSize: hp(1.15),
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  rateMonthTitle: {
    fontSize: hp(2),
    fontWeight: '800',
    color: '#0F172A',
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
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.2),
    marginBottom: hp(1.5),
  },
  workingDaysIconBox: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: radius.sm,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  workingDaysLabel: {
    fontSize: hp(1.2),
    color: '#64748B',
    fontWeight: '600',
  },
  workingDaysCount: {
    fontSize: hp(2),
    fontWeight: '800',
    color: '#0F172A',
  },

  // Progress Bar
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.6),
  },
  progressTextLeft: {
    fontSize: hp(1.2),
    color: '#64748B',
    fontWeight: '600',
  },
  progressTextRight: {
    fontSize: hp(1.2),
    color: '#0D9488',
    fontWeight: '700',
  },
  progressBarBg: {
    height: hp(0.9),
    backgroundColor: '#E2E8F0',
    borderRadius: hp(0.45),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0D9488',
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
  // Specific card backgrounds & borders
  cardPresent: {
    backgroundColor: '#F9FEFB',
    borderColor: '#A7F3D0',
  },
  cardLate: {
    backgroundColor: '#FFFCFA',
    borderColor: '#FED7AA',
  },
  cardShortLeave: {
    backgroundColor: '#FFFDF9',
    borderColor: '#FDE68A',
  },
  cardHalfLeave: {
    backgroundColor: '#FBFEFF',
    borderColor: '#BAE6FD',
  },
  cardLeave: {
    backgroundColor: '#FEFAFB',
    borderColor: '#FECDD3',
  },
  cardLeaveAccommodated: {
    backgroundColor: '#FEFAFB',
    borderColor: '#A7F3D0',
  },
  cardPaidLeave: {
    backgroundColor: '#FCFCFE',
    borderColor: '#DDD6FE',
  },
  cardRemainingPaidLeaves: {
    backgroundColor: '#F9FBFF',
    borderColor: '#C7D2FE',
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
    fontSize: hp(1.2),
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  statNumber: {
    fontSize: hp(2.5),
    fontWeight: '800',
    color: '#0F172A',
    marginTop: hp(0.2),
    letterSpacing: -0.3,
  },
  statSubtext: {
    fontSize: hp(1.2),
    color: '#64748B',
    marginTop: hp(0.8),
    fontWeight: '500',
    lineHeight: hp(1.6),
  },

  // 5. Attendance History Section
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: hp(1.9),
    fontWeight: '800',
    color: '#0F172A',
  },
  historySub: {
    fontSize: hp(1.2),
    color: '#64748B',
    marginTop: hp(0.2),
  },
  historyBadgeRow: {
    marginBottom: hp(1.5),
  },
  recordPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderRadius: radius.full,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  recordPillText: {
    fontSize: hp(1.2),
    fontWeight: '600',
    color: '#475569',
  },

  // Attendance History Table
  tableContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  tableScrollContent: {
    minWidth: wp(185),
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  tableHeaderCol: {
    fontSize: hp(1.3),
    fontWeight: '700',
    color: '#64748B',
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
    borderBottomColor: '#F1F5F9',
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: '#FAFCFE',
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
    fontSize: hp(1.35),
    fontWeight: '600',
    color: '#1E293B',
  },
  tableTextRegular: {
    fontSize: hp(1.35),
    fontWeight: '500',
    color: '#334155',
  },
  tableTextMuted: {
    fontSize: hp(1.4),
    color: '#94A3B8',
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
    backgroundColor: '#DCFCE7',
  },
  statusBadgeLate: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeLeave: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: hp(1.2),
    fontWeight: '700',
  },
  statusTextPresent: {
    color: '#15803D',
  },
  statusTextLate: {
    color: '#B45309',
  },
  statusTextLeave: {
    color: '#B91C1C',
  },

  // 6. Attendance Rules Accordion Card
  rulesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesTitle: {
    fontSize: hp(1.75),
    fontWeight: '700',
    color: '#0F172A',
  },
  rulesSub: {
    fontSize: hp(1.2),
    color: '#64748B',
    marginTop: hp(0.2),
    lineHeight: hp(1.7),
  },
  rulesContent: {
    marginTop: hp(2),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
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
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineBadgeText: {
    fontSize: hp(1.3),
    fontWeight: '700',
    color: '#0284C7',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: hp(3.5),
    backgroundColor: '#BAE6FD',
    marginVertical: hp(0.4),
  },
  timelineContentCol: {
    flex: 1,
    paddingBottom: hp(2.2),
    justifyContent: 'center',
  },
  timelineRuleText: {
    fontSize: hp(1.35),
    color: '#475569',
    lineHeight: hp(2.1),
    fontWeight: '400',
  },
  ruleItem: {
    fontSize: hp(1.3),
    color: '#475569',
    marginBottom: hp(0.8),
    lineHeight: hp(1.8),
  },
});

