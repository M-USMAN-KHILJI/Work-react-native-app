import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import { ShieldAlert, X } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSize, radius, shadows, hp, wp } from '../constants/display';

interface AdminNoticeModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  style?: ViewStyle;
}

export const AdminNoticeModal: React.FC<AdminNoticeModalProps> = ({
  isVisible,
  onClose,
  title = 'Password Reset Unavailable',
  message = 'Self-service password reset is currently not available for this organization. Please contact your workspace administrator to reset your credentials.',
  buttonText = 'Got it',
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [isVisible, scaleAnim, opacityAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.card,
                style,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleClose}
                style={styles.closeBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={wp(5)} color={colors.textMuted} />
              </TouchableOpacity>

              {/* Icon Badge */}
              <View style={styles.iconCircle}>
                <ShieldAlert size={wp(7.5)} color={colors.accent} strokeWidth={2.2} />
              </View>

              {/* Content */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleClose}
                style={styles.actionButton}
              >
                <LinearGradient
                  colors={[...colors.buttonGradient]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>{buttonText}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.cardBackground,
    borderRadius: radius.xl,
    paddingHorizontal: wp(6),
    paddingTop: hp(3.5),
    paddingBottom: hp(3),
    alignItems: 'center',
    position: 'relative',
    ...shadows.card,
  },
  closeBtn: {
    position: 'absolute',
    top: hp(1.8),
    right: wp(4),
    padding: wp(1),
  },
  iconCircle: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: colors.accentLight,
    borderWidth: 1.5,
    borderColor: colors.accentBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: hp(1.2),
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: hp(2.4),
    marginBottom: hp(3),
    paddingHorizontal: wp(2),
  },
  actionButton: {
    width: '100%',
    height: hp(5.8),
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.button,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: fontSize.md,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default AdminNoticeModal;
