import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast, { BaseToastProps, ToastShowParams } from 'react-native-toast-message';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react-native';
import { colors, fontSize, radius, shadows, hp, wp } from '../constants/display';
import { CustomText as Text } from './CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from './CustomTouchableOpacity';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastConfigOptions {
  title?: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  position?: 'top' | 'bottom';
}

/**
 * Custom Toast layout matching WorkPulse UI:
 * - Left vertical status accent pill
 * - Rounded status icon circle
 * - Title and message typography
 * - Clean close button
 */
export const customToastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.container, styles.successContainer]}>
      <View style={[styles.leftAccent, styles.successAccent]} />
      <View style={[styles.iconCircle, styles.successIconCircle]}>
        <CheckCircle2 size={wp(5.2)} color="#00bc7c" strokeWidth={2.5} />
      </View>
      <View style={styles.textCol}>
        {text1 ? <Text style={[styles.title, styles.successTitle]}>{text1}</Text> : null}
        {text2 ? <Text style={[styles.subtitle, styles.successSubtitle]}>{text2}</Text> : null}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Toast.hide()}
        style={styles.closeBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={wp(4.2)} color="#059669" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={[styles.leftAccent, styles.errorAccent]} />
      <View style={[styles.iconCircle, styles.errorIconCircle]}>
        <AlertCircle size={wp(5.2)} color={colors.error} strokeWidth={2.5} />
      </View>
      <View style={styles.textCol}>
        {text1 ? <Text style={[styles.title, styles.errorTitle]}>{text1}</Text> : null}
        {text2 ? <Text style={[styles.subtitle, styles.errorSubtitle]}>{text2}</Text> : null}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Toast.hide()}
        style={styles.closeBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={wp(4.2)} color={colors.error} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  ),

  info: ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.container, styles.infoContainer]}>
      <View style={[styles.leftAccent, styles.infoAccent]} />
      <View style={[styles.iconCircle, styles.infoIconCircle]}>
        <Info size={wp(5.2)} color="#0284C7" strokeWidth={2.5} />
      </View>
      <View style={styles.textCol}>
        {text1 ? <Text style={[styles.title, styles.infoTitle]}>{text1}</Text> : null}
        {text2 ? <Text style={[styles.subtitle, styles.infoSubtitle]}>{text2}</Text> : null}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => Toast.hide()}
        style={styles.closeBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={wp(4.2)} color="#0284C7" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  ),
};

/**
 * Universal helper to trigger toast notification from anywhere in the app
 */
export const showCustomToast = ({
  title,
  message,
  type = 'success',
  duration = 3500,
  position = 'top',
}: ToastConfigOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position,
    visibilityTime: duration,
    autoHide: true,
    topOffset: hp(6),
    bottomOffset: hp(6),
  });
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    borderRadius: radius.lg,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.8),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    position: 'relative',
    overflow: 'hidden',
    ...shadows.card,
    elevation: 8,
  },
  leftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  iconCircle: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    marginLeft: wp(1),
  },
  textCol: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: hp(2.2),
  },
  subtitle: {
    fontSize: fontSize.xs,
    marginTop: hp(0.2),
    lineHeight: hp(2),
  },
  closeBtn: {
    padding: wp(1.5),
    marginLeft: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Success variant (#00bc7c emerald theme)
  successContainer: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  successAccent: {
    backgroundColor: '#00bc7c',
  },
  successIconCircle: {
    backgroundColor: '#DCFCE7',
  },
  successTitle: {
    color: '#065F46',
  },
  successSubtitle: {
    color: '#047857',
  },

  // Error variant (Red theme)
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  errorAccent: {
    backgroundColor: colors.error,
  },
  errorIconCircle: {
    backgroundColor: '#FEE2E2',
  },
  errorTitle: {
    color: '#991B1B',
  },
  errorSubtitle: {
    color: '#B91C1C',
  },

  // Info variant (Ocean blue theme)
  infoContainer: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },
  infoAccent: {
    backgroundColor: '#0284C7',
  },
  infoIconCircle: {
    backgroundColor: '#E0F2FE',
  },
  infoTitle: {
    color: '#0369A1',
  },
  infoSubtitle: {
    color: '#0284C7',
  },
});
