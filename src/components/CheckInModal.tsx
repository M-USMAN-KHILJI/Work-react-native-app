import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LogIn, Clock, X } from 'lucide-react-native';
import { colors, fontSize, radius, shadows, wp, hp } from '../constants/display';
import { CustomText as Text } from './CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from './CustomTouchableOpacity';

export interface CheckInModalProps {
  visible: boolean;
  currentTime: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  visible,
  currentTime,
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
            <Text style={styles.title}>Confirm Check In</Text>
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
              <LogIn size={wp(6)} color="#FFFFFF" strokeWidth={2.6} />
            </View>
            <View style={styles.timeInfoCol}>
              <Text style={styles.timeLabel}>Current time</Text>
              <Text style={styles.timeValue}>{currentTime}</Text>
            </View>
          </View>

          {/* Body Description */}
          <Text style={styles.descriptionText}>
            You are about to mark your attendance for today. Your check-in time will be recorded at the moment you confirm.
          </Text>

          {/* Reminder Box */}
          <View style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <Clock size={wp(4.2)} color="#0083B0" strokeWidth={2.2} />
              <Text style={styles.reminderTitle}>Reminder</Text>
            </View>
            <Text style={styles.reminderRuleText}>After 10:15 AM → Late</Text>
            <Text style={styles.reminderRuleText}>After 11:00 AM → Half Day</Text>
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
                <Text style={styles.confirmText}>Check In Now</Text>
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
    marginBottom: hp(2.2),
  },
  iconBadge: {
    width: wp(13),
    height: wp(13),
    borderRadius: radius.md,
    backgroundColor: colors.checkInActive,
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
  reminderCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    marginBottom: hp(3),
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(0.8),
  },
  reminderTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reminderRuleText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: hp(2.2),
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

