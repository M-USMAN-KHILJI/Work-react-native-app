import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

interface FadeInLeftProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: ViewStyle | ViewStyle[];
}

export const FadeInLeft: React.FC<FadeInLeftProps> = ({
  children,
  delay = 0,
  duration = 700,
  distance = 50,
  style,
}) => {
  const translateX = useRef(new Animated.Value(-distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration,
        delay: delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration,
        delay: delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [delay, duration, distance, opacity, translateX]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
