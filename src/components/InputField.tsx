import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, fontSize, radius, hp, wp } from '../constants/display';

export interface InputFieldProps extends TextInputProps {
  label?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  onRightIconPress?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required = false,
  leftIcon,
  rightIcon,
  error,
  containerStyle,
  isPassword = false,
  secureTextEntry,
  onRightIconPress,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required ? <Text style={styles.requiredAsterisk}> *</Text> : null}
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}

        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          autoCapitalize="none"
          {...rest}
        />

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(2),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  requiredAsterisk: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: radius.md,
    borderWidth: 1.2,
    borderColor: 'transparent',
    paddingHorizontal: wp(3.5),
    height: hp(6),
  },
  inputFocused: {
    borderColor: colors.inputBorderFocused,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: colors.error,
  },
  leftIconContainer: {
    marginRight: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '500',
    paddingVertical: 0,
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: hp(0.5),
    marginLeft: wp(1),
  },
});

