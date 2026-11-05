import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { Info, X } from 'lucide-react-native';
import { fontSize, radius, shadows, hp, wp } from '../constants/display';

export interface ToastProps {
  visible: boolean;
  message?: string;
  onHide: () => void;
  duration?: number;
  style?: ViewStyle;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message = 'Password reset is not available yet.\nContact your administrator.',
  onHide,
  duration = 4000,
  style,
}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 8,
          tension: 70,
          useNativeDriver: true,
        }),
      ]).start();

      hideTimer = setTimeout(() => {
        dismissToast();
      }, duration);
    } else {
      opacityAnim.setValue(0);
      translateYAnim.setValue(-30);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [visible]);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ translateY: translateYAnim }],
        },
        style,
      ]}
    >
      {/* Vertical light indicator pill on far left */}
      <View style={styles.leftPill} />

      {/* Circular translucent icon wrapper */}
      <View style={styles.iconCircle}>
        <Info size={wp(4.8)} color="#E0F2FE" strokeWidth={2.4} />
      </View>

      {/* Two-line text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Password reset is not available yet.</Text>
        <Text style={styles.subtitle}>Contact your administrator.</Text>
      </View>

      {/* Close button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={dismissToast}
        style={styles.closeBtn}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <X size={wp(4.2)} color="#94A3B8" strokeWidth={2.2} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: hp(5.5),
    left: wp(4),
    right: wp(4),
    backgroundColor: '#073347',
    borderRadius: radius.xl, // fully rounded pill style
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
    borderWidth: 1,
    borderColor: '#0C4A63',
    zIndex: 9999,
    ...shadows.card,
  },
  leftPill: {
    width: 3.5,
    height: hp(3.2),
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginRight: wp(2.5),
  },
  iconCircle: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    lineHeight: hp(2.2),
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    lineHeight: hp(2.2),
  },
  closeBtn: {
    padding: wp(1.5),
    marginLeft: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Toast;
