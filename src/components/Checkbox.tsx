import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, fontSize, radius, hp, wp } from '../constants/display';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Check size={wp(3.5)} color="#FFFFFF" strokeWidth={3} />}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.checkboxBorder,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  boxChecked: {
    backgroundColor: colors.checkboxActive,
    borderColor: colors.checkboxActive,
  },
  label: {
    marginLeft: wp(2),
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

