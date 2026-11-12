import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../../../constants/display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGradientBottom,
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: hp(0.8),
    paddingBottom: hp(4),
  },
  // Top Hero Section
  heroSection: {
    paddingHorizontal: wp(6),
    paddingTop: hp(1.2),
    paddingBottom: hp(2.5),
  },
  heroLogoWrapper: {
    marginBottom: hp(2.5),
  },
  heroTitle: {
    fontSize: fontSize.hero,
    fontWeight: '800',
    color: colors.textWhite,
    lineHeight: hp(4.6),
    letterSpacing: -0.6,
  },
  heroSubtitle: {
    marginTop: hp(1),
    fontSize: fontSize.sm,
    color: colors.textWhiteSecondary,
    lineHeight: hp(2.3),
    letterSpacing: 0.1,
    maxWidth: '92%',
  },

  // Main White Auth Card
  cardWrapper: {
    paddingHorizontal: wp(4.5),
    marginTop: hp(0.5),
    marginBottom: hp(3),
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: wp(6.5),
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
    ...shadows.card,
  },
  cardHeader: {
    marginBottom: hp(2),
  },
  badge: {
    marginTop: hp(2),
    alignSelf: 'flex-start',
  },
  welcomeTitle: {
    marginTop: hp(1.8),
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  welcomeSubtitle: {
    marginTop: hp(0.6),
    marginBottom: hp(2.8),
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  // Form Controls
  form: {
    width: '100%',
  },
  rememberForgotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    marginBottom: hp(2.8),
  },
  forgotPasswordText: {
    fontSize: fontSize.sm,
    color: colors.textLink,
    fontWeight: '600',
  },
  signInButton: {
    marginTop: hp(0.5),
  },
});
