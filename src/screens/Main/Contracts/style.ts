import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, hp, wp } from '../../../constants/display';

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
    shadowColor: '#0083B0',
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
    fontSize: hp(1.4),
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  heroTitle: {
    fontSize: hp(2.6),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: hp(1),
  },
  heroSubtitle: {
    fontSize: hp(1.35),
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: hp(2.1),
    fontWeight: '400',
  },

  // 2. Active Contract Card
  activeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.cardTop,
    padding: wp(4.5),
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    borderBottomColor: '#F1F5F9',
  },
  headerIconBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: radius.lg,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: hp(1.85),
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: hp(1.25),
    color: '#64748B',
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
    fontSize: hp(2.1),
    fontWeight: '800',
    color: '#0F172A',
  },
  activePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
    borderRadius: radius.full,
  },
  activePillText: {
    fontSize: hp(1.2),
    fontWeight: '700',
    color: '#059669',
  },
  internPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
    borderRadius: radius.full,
  },
  internPillText: {
    fontSize: hp(1.2),
    fontWeight: '600',
    color: '#475569',
  },
  contractIdText: {
    fontSize: hp(1.35),
    fontWeight: '600',
    color: '#64748B',
    marginBottom: hp(1.8),
  },

  // Info Mini Cards (Duration, Salary, Paid Leaves)
  infoBoxesGroup: {
    gap: hp(1.2),
  },
  infoMiniBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.xl,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  infoMiniLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.8),
    marginBottom: hp(0.5),
  },
  infoMiniLabel: {
    fontSize: hp(1.25),
    fontWeight: '600',
    color: '#64748B',
  },
  infoMiniValue: {
    fontSize: hp(1.5),
    fontWeight: '700',
    color: '#0F172A',
  },

  // 3. Previous Contracts Card
  previousCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.cardTop,
    padding: wp(4.5),
    borderWidth: 1,
    borderColor: '#E8EFF4',
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: radius.full,
  },
  recordsPillText: {
    fontSize: hp(1.2),
    fontWeight: '600',
    color: '#64748B',
  },

  // Empty State Container inside Previous Contracts
  emptyStateBox: {
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: radius.xl,
    paddingVertical: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFCFD',
  },
  emptyIconCircle: {
    width: wp(14),
    height: wp(14),
    borderRadius: radius.full,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  emptyStateText: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#0F172A',
  },
});
