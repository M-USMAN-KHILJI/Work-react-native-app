import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/Stacknavigation';
import { WorkPulseLogo } from '../../components/WorkPulseLogo';
import { useAppSelector } from '../../redux';
import { wp } from '../../constants/display';
import { styles } from './style';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const rememberMe = useAppSelector((state) => state.auth.rememberMe);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Subtle smooth entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // After splash delay, navigate based on auth & rememberMe state:
    // 1. If user is logged in AND rememberMe is true -> Dashboard
    // 2. If user is not logged in OR (logged in and rememberMe is false) -> Login
    const timer = setTimeout(() => {
      if (isAuthenticated && rememberMe) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated, rememberMe, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <WorkPulseLogo size={wp(44)} variant="icon-only" />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

