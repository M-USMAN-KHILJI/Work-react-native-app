import React from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

export interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

export const CustomTouchableOpacity: React.FC<CustomTouchableOpacityProps> = ({
  activeOpacity = 0.7,
  style,
  children,
  ...restProps
}) => {
  return (
    <RNTouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.buttonContainer, style]}
      {...restProps}
    >
      {children}
    </RNTouchableOpacity>
  );
};

export default CustomTouchableOpacity;

const styles = StyleSheet.create({
  buttonContainer: {},
});

