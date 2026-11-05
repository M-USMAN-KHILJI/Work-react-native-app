import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fontSize, radius, hp, wp } from '../constants/display';

interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, icon, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.accentLight,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    borderRadius: radius.full,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
  },
  iconContainer: {
    marginRight: wp(1.5),
  },
  label: {
    color: colors.accent,
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

