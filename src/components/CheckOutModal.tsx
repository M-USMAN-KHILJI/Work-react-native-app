import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LogOut, X } from 'lucide-react-native';
import { colors, fontSize, radius, shadows, wp, hp } from '../constants/display';
import { CustomText as Text } from './CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from './CustomTouchableOpacity';

export interface CheckOutModalProps {
  visible: boolean;
  currentTime: string;
  checkInTime: string;
  workingHours: string;
  isEarlyCheckout?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CheckOutModal: React.FC<CheckOutModalProps> = ({
  visible,
  currentTime,
  checkInTime,
  workingHours,
  isEarlyCheckout = true,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Confirm Check Out</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={onClose}
            >
              <X size={wp(5.2)} color={colors.textSecondary} strokeWidth={2.2} />
            </TouchableOpacity>
          </View>

          {/* Current Time Box */}
          <View style={styles.timeCard}>
            <View style={styles.iconBadge}>
              <LogOut size={wp(6)} color="#FFFFFF" strokeWidth={2.6} />
            </View>
            <View style={styles.timeInfoCol}>
              <Text style={styles.timeLabel}>Current time</Text>
              <Text style={styles.timeValue}>{currentTime}</Text>
            </View>
          </View>

          {/* Body Description */}
          <Text style={styles.descriptionText}>
            End your shift for today? Your working hours will be saved when you confirm.
          </Text>

          {/* Stats Two-Column Cards: CHECKED IN and WORKING */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>CHECKED IN</Text>
              <Text style={styles.statValue}>{checkInTime || '—'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>WORKING</Text>
              <Text style={styles.statValue}>{workingHours || '0m'}</Text>
            </View>
          </View>

          {/* Warning / Reminder banner */}
          <View style={styles.warningBanner}>
            <Text style={styles.warningBannerText}>
              {isEarlyCheckout
                ? `You are checking out before office end (7:00 PM). Current working time: `
                : `Office end shift reached (7:00 PM). Total working time: `}
              <Text style={styles.warningBannerTextBold}>{workingHours || '0m'}</Text>.
            </Text>
          </View>

          {/* Actions Row */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelBtn}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.confirmTouch}
              onPress={onConfirm}
            >
              <LinearGradient
                colors={[...colors.checkInButtonGradient]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.confirmGradient}
              >
                <Text style={styles.confirmText}>Check Out Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  card: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.cardTop,
    paddingHorizontal: wp(6),
    paddingTop: hp(2.8),
    paddingBottom: hp(2.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.2),
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  closeBtn: {
    padding: wp(1),
  },
  timeCard: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.xl,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3.8),
    marginBottom: hp(2),
  },
  iconBadge: {
    width: wp(13),
    height: wp(13),
    borderRadius: radius.md,
    backgroundColor: colors.actionOcean,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInfoCol: {
    justifyContent: 'center',
  },
  timeLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: hp(0.2),
  },
  timeValue: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  descriptionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: hp(2.4),
    marginBottom: hp(2),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(3),
    marginBottom: hp(2),
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.performanceTealBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.performanceBorder,
    paddingVertical: hp(1.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.performanceTeal,
    letterSpacing: 0.5,
    marginBottom: hp(0.3),
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.actionOcean,
  },
  warningBanner: {
    backgroundColor: '#FFFBEB',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    marginBottom: hp(3),
  },
  warningBannerText: {
    fontSize: fontSize.xs,
    color: '#92400E',
    lineHeight: hp(2.3),
  },
  warningBannerTextBold: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: '#92400E',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3.2),
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: hp(1.4),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  confirmTouch: {
    flex: 1.4,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.button,
  },
  confirmGradient: {
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  confirmText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textWhite,
    letterSpacing: 0.2,
  },
});

