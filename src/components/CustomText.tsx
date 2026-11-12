import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, fontSize } from '../constants/display';

export interface CustomTextProps extends TextProps {
  children?: React.ReactNode;
}

export const CustomText: React.FC<CustomTextProps> = ({
  onPress,
  allowFontScaling = false,
  numberOfLines,
  ellipsizeMode,
  style,
  children,
  ...restProps
}) => {
  return (
    <RNText
      onPress={onPress ?? undefined}
      allowFontScaling={allowFontScaling}
      numberOfLines={numberOfLines ?? undefined}
      ellipsizeMode={ellipsizeMode ?? undefined}
      style={[styles.textContainer, style]}
      {...restProps}
    >
      {children}
    </RNText>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  textContainer: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
});

