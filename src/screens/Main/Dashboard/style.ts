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

  // Main Screen Padding
  mainContent: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2),
  },

  // Hero Card
  heroCard: {
    borderRadius: radius.xl,
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(2.5),
    marginBottom: hp(2),
    // ...shadows.card,
  },
  heroDate: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontSize.xs,
    fontWeight: '500',
    marginBottom: hp(0.8),
  },
  heroGreeting: {
    color: '#FFFFFF',
    fontSize: hp(2.8),
    fontWeight: '800',
    lineHeight: hp(3.4),
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
    gap: wp(2.5),
    marginBottom: hp(2),
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: radius.full,
    gap: wp(1.5),
  },
  heroPillText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  attendanceButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    gap: wp(2),
    ...shadows.button,
  },
  attendanceButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },

  // Today's Attendance Card
  attendanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#E8EFF4',
    ...shadows.card,
  },
  attendanceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  attendanceTitle: {
    fontSize: hp(2.1),
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  attendanceSubinfo: {
    fontSize: hp(1.4),
    color: '#64748B',
    marginTop: hp(0.4),
    fontWeight: '500',
  },
  currentTimeContainer: {
    alignItems: 'flex-end',
  },
  currentTimeLabel: {
    fontSize: hp(1.1),
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.6,
  },
  currentTimeBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: wp(3),
    paddingHorizontal: wp(2.1),
    paddingVertical: hp(0.5),
    marginTop: hp(0.5),
    marginRight: wp(1),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  currentTimeValue: {
    fontSize: hp(1.3),
    // fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.2,
  },
  statusBanner: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: radius.lg,
    paddingHorizontal: wp(2.7),
    paddingVertical: hp(0.5),
    marginBottom: hp(2),
  },
  statusBannerTitle: {
    fontSize: hp(1.7),
    fontWeight: '700',
    color: '#0284C7',
    marginBottom: hp(0.4),
  },
  statusBannerSub: {
    fontSize: hp(1.4),
    color: '#64748B',
    lineHeight: hp(2),
  },

  // Action Buttons Grid (Check In & Check Out - Large square/rounded cards)
  actionButtonsRow: {
    flexDirection: 'row',
    gap: wp(3.5),
  },
  actionCard: {
    flex: 1,
    height: hp(9),
    borderRadius: radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  checkInCardDisabled: {
    backgroundColor: '#02ac70ff', // soft mint inactive as in user's image without tick
  },
  checkOutCardActive: {
    backgroundColor: '#006D8F', // deep cyan/ocean
    ...shadows.button,
  },
  actionIconCircle: {
    width: wp(9.5),
    height: wp(8.2),
    borderRadius: wp(3.5),
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  actionCardText: {
    color: '#FFFFFF',
    fontSize: hp(1.2),
    fontWeight: '700',
    letterSpacing: 0.1,
  },

  // Metric Cards (Check In, Check Out, Working Hours, Status)
  metricCardWrapper: {
    borderRadius: radius.xl,
    marginBottom: hp(1.5),
    borderWidth: 1.2,
    overflow: 'hidden',
    ...shadows.card,
  },
  metricCardGradient: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.xl,
  },
  metricIconGradientBox: {
    width: wp(12),
    height: wp(12),
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.8),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  metricTextCol: {
    flex: 1,
  },
  metricLabel: {
    fontSize: hp(1),
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  metricValue: {
    fontSize: hp(2),
    fontWeight: '800',
    color: '#0F172A',
    marginTop: hp(0.2),
    letterSpacing: -0.3,
  },

  // Section Cards: This Month
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: wp(4.5),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#E8EFF4',
    // ...shadows.card,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  sectionPreTitle: {
    fontSize: hp(1.1),
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  sectionMainTitle: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: hp(0.2),
  },
  viewReportLink: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textLink,
  },

  // Attendance Rate Snapshot Box
  rateSnapshotBox: {
    backgroundColor: '#F8FCFE',
    borderWidth: 1,
    borderColor: '#E0F2FE',
    borderRadius: radius.md,
    padding: wp(3.5),
    marginBottom: hp(2),
  },
  rateTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  rateBadge: {
    backgroundColor: '#0D9488',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    borderRadius: radius.sm,
    marginRight: wp(3),
  },
  rateBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '800',
  },
  rateLabel: {
    fontSize: hp(1.1),
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  rateSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },
  progressBarBg: {
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },

  // 4-Grid Stats (Present, Late, Half Leave, Leave)
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  statsGridItem: {
    width: '50%',
    paddingVertical: hp(1.5),
    alignItems: 'center',
    backgroundColor: '#FAFCFE',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F1F5F9',
  },
  statsNumber: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statsLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },

  // Paid Leaves Section
  leavesHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1.5),
  },
  leavesHeaderTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: '#3B4FC8',
  },
  bigLeaveNumber: {
    fontSize: hp(3.8),
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bigLeaveSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: hp(2),
  },
  leaveDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.8),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  leaveDetailLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  leaveDetailValue: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // Quick Links
  quickLinksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: wp(4.5),
    borderWidth: 1,
    borderColor: '#E8EFF4',
    // ...shadows.card,
  },
  quickLinksHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.8),
  },
  quickLinksTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  quickLinksSub: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: hp(0.2),
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFCFE',
    borderWidth: 1,
    borderColor: '#EBF1F5',
    borderRadius: radius.md,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
  },
  quickLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  quickLinkText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

