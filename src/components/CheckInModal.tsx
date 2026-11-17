import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LogIn, Clock, X, Home, MapPinOff, AlertCircle } from 'lucide-react-native';
import { colors, fontSize, radius, shadows, wp, hp, fontFamily } from '../constants/display';
import { CustomText as Text } from './CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from './CustomTouchableOpacity';

export interface CheckInModalProps {
  visible: boolean;
  currentTime: string;
  isOutsideRadius?: boolean;
  onClose: () => void;
  onConfirm: (data: { isWFH: boolean; wfhReason?: string }) => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  visible,
  currentTime,
  isOutsideRadius = false,
  onClose,
  onConfirm,
}) => {
  const [wfhReason, setWfhReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  // Reset input and error state when modal opens or mode changes
  useEffect(() => {
    if (visible) {
      setWfhReason('');
      setReasonError('');
    }
  }, [visible, isOutsideRadius]);

  const handleConfirmPress = () => {
    if (isOutsideRadius) {
      const trimmed = wfhReason.trim();
      if (!trimmed) {
        setReasonError('Please provide a reason for working from home.');
        return;
      }
      setReasonError('');
      onConfirm({ isWFH: true, wfhReason: trimmed });
    } else {
      onConfirm({ isWFH: false });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
              <View style={styles.headerTitleRow}>
                {isOutsideRadius && (
                  <View style={styles.wfhIconPill}>
                    <Home size={wp(4.2)} color="#D97706" strokeWidth={2.4} />
                  </View>
                )}
                <Text style={styles.title}>
                  {isOutsideRadius ? 'Work From Home Check-In' : 'Confirm Check In'}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeBtn}
                onPress={onClose}
              >
                <X size={wp(5.2)} color={colors.textSecondary} strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Outside Radius Notice Banner */}
              {isOutsideRadius && (
                <View style={styles.radiusWarningBanner}>
                  <View style={styles.warningIconCircle}>
                    <MapPinOff size={wp(4.5)} color="#D97706" strokeWidth={2.3} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.radiusWarningTitle}>Outside Office Radius</Text>
                    <Text style={styles.radiusWarningSub}>
                      You are beyond the 50 m office geofence. To record your attendance, submit a work from home reason.
                    </Text>
                  </View>
                </View>
              )}

              {/* Current Time Box */}
              <View
                style={[
                  styles.timeCard,
                  isOutsideRadius && styles.timeCardWFH,
                ]}
              >
                <View
                  style={[
                    styles.iconBadge,
                    isOutsideRadius && styles.iconBadgeWFH,
                  ]}
                >
                  {isOutsideRadius ? (
                    <Home size={wp(6)} color="#FFFFFF" strokeWidth={2.4} />
                  ) : (
                    <LogIn size={wp(6)} color="#FFFFFF" strokeWidth={2.6} />
                  )}
                </View>
                <View style={styles.timeInfoCol}>
                  <Text style={styles.timeLabel}>Current time</Text>
                  <Text style={styles.timeValue}>{currentTime}</Text>
                </View>
              </View>

              {/* Outside 50m Radius: WFH Reason Input Section */}
              {isOutsideRadius ? (
                <View style={styles.wfhInputSection}>
                  <View style={styles.wfhLabelRow}>
                    <Text style={styles.wfhInputLabel}>
                      Why do you want to work from home?
                    </Text>
                    <Text style={styles.requiredAsterisk}> *</Text>
                  </View>
                  <TextInput
                    value={wfhReason}
                    onChangeText={(text) => {
                      setWfhReason(text);
                      if (reasonError && text.trim().length > 0) {
                        setReasonError('');
                      }
                    }}
                    placeholder="e.g. Doctor appointment in the morning, internet maintenance at site..."
                    placeholderTextColor={colors.textMuted}
                    multiline
                    numberOfLines={3}
                    style={[
                      styles.wfhTextInput,
                      !!reasonError && styles.wfhTextInputError,
                    ]}
                    textAlignVertical="top"
                  />
                  {!!reasonError && (
                    <View style={styles.errorRow}>
                      <AlertCircle size={wp(3.8)} color={colors.error} strokeWidth={2} />
                      <Text style={styles.errorText}>{reasonError}</Text>
                    </View>
                  )}
                </View>
              ) : (
                /* Standard Office Body Description */
                <Text style={styles.descriptionText}>
                  You are about to mark your attendance for today. Your check-in time will be recorded at the moment you confirm.
                </Text>
              )}

              {/* Reminder Box */}
              <View style={styles.reminderCard}>
                <View style={styles.reminderHeader}>
                  <Clock size={wp(4.2)} color="#0083B0" strokeWidth={2.2} />
                  <Text style={styles.reminderTitle}>Reminder</Text>
                </View>
                <Text style={styles.reminderRuleText}>After 10:15 AM → Late</Text>
                <Text style={styles.reminderRuleText}>After 11:00 AM → Half Day</Text>
                {isOutsideRadius && (
                  <Text style={styles.reminderRuleText}>
                    WFH Check-In will be tagged as Remote Work
                  </Text>
                )}
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
                  onPress={handleConfirmPress}
                >
                  <LinearGradient
                    colors={
                      isOutsideRadius
                        ? ['#D97706', '#B45309']
                        : [...colors.checkInButtonGradient]
                    }
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.confirmGradient}
                  >
                    <Text style={styles.confirmText}>
                      {isOutsideRadius ? 'Submit WFH Check In' : 'Check In Now'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5.5),
  },
  keyboardAvoid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxHeight: hp(82),
    backgroundColor: colors.cardBackground,
    borderRadius: radius.cardTop,
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2.6),
    paddingBottom: hp(2.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.8),
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    flex: 1,
  },
  wfhIconPill: {
    width: wp(8),
    height: wp(8),
    borderRadius: radius.sm,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
    flex: 1,
  },
  closeBtn: {
    padding: wp(1),
  },

  // Outside Radius Warning
  radiusWarningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: radius.md,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
    gap: wp(3),
    marginBottom: hp(1.8),
  },
  warningIconCircle: {
    width: wp(7.8),
    height: wp(7.8),
    borderRadius: radius.full,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.2),
  },
  radiusWarningTitle: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: hp(0.2),
  },
  radiusWarningSub: {
    fontSize: fontSize.xs,
    color: '#B45309',
    lineHeight: hp(1.9),
  },

  // Time card
  timeCard: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.xl,
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(4.2),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3.5),
    marginBottom: hp(1.8),
  },
  timeCardWFH: {
    backgroundColor: '#FFFDF9',
    borderColor: '#FED7AA',
  },
  iconBadge: {
    width: wp(12),
    height: wp(12),
    borderRadius: radius.md,
    backgroundColor: colors.checkInActive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBadgeWFH: {
    backgroundColor: '#D97706',
  },
  timeInfoCol: {
    justifyContent: 'center',
  },
  timeLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: hp(0.2),
  },
  timeValue: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },

  // WFH reason input
  wfhInputSection: {
    marginBottom: hp(2),
  },
  wfhLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  wfhInputLabel: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  requiredAsterisk: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.error,
  },
  wfhTextInput: {
    minHeight: hp(9.5),
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.2),
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontFamily: fontFamily.regular,
  },
  wfhTextInputError: {
    borderColor: colors.error,
    backgroundColor: '#FEF2F2',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginTop: hp(0.6),
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.error,
    fontWeight: '600',
  },

  descriptionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: hp(2.3),
    marginBottom: hp(1.8),
  },
  reminderCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.4),
    marginBottom: hp(2.4),
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(0.6),
  },
  reminderTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reminderRuleText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: hp(2.1),
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
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
    flex: 1.5,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.button,
  },
  confirmGradient: {
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(2.5),
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


