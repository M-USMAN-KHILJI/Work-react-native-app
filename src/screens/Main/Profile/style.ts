import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../../../constants/display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
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
  },
  bellButton: {
    padding: wp(1.5),
  },
  content: {
    padding: wp(5),
  },
  profileHeaderCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    padding: wp(6),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: hp(2.5),
  },
  avatarLarge: {
    width: wp(18),
    height: wp(18),
    borderRadius: radius.full,
    backgroundColor: colors.textLink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  avatarLargeText: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.textWhite,
  },
  profileName: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  profileRole: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp(0.3),
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: radius.full,
    marginTop: hp(1.5),
  },
  statusBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.success,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    padding: wp(5),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: hp(1.8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.8),
  },
  infoIconBox: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: radius.md,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: hp(0.2),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: hp(1),
  },
});

