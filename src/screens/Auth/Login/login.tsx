
import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../navigation/Stacknavigation';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from 'lucide-react-native';

import {
  WorkPulseLogo,
  Badge,
  InputField,
  PrimaryButton,
  Checkbox,
  FadeInUp,
  GradientText,
  Toast,
  CustomText as Text,
  CustomTouchableOpacity as TouchableOpacity,
} from '../../../components';

import { colors, hp, wp } from '../../../constants/display';
import { styles } from './style';

import {
  useAppDispatch,
  useAppSelector,
  loginSuccess,
} from '../../../redux';

export const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const savedEmailFromRedux = useAppSelector(
    (state) => state.auth.savedEmail
  );

  const currentPasswordHash = useAppSelector(
    (state) => state.auth.passwordHash
  );

  // Form States
  const [email, setEmail] = useState<string>(
    savedEmailFromRedux || 'admin@gmail.com'
  );

  const [password, setPassword] = useState<string>('1234');

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    Boolean(savedEmailFromRedux)
  );

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isToastVisible, setIsToastVisible] = useState(false);

  // Directional scroll tracking to only dismiss keyboard when scrolling up
  const lastOffsetY = useRef(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    // Dismiss keyboard ONLY when scrolling up (moving back toward top: currentY < lastOffsetY)
    if (currentY < lastOffsetY.current && lastOffsetY.current - currentY > 15) {
      Keyboard.dismiss();
    }
    lastOffsetY.current = currentY;
  };

  // Sync saved email from Redux
  useEffect(() => {
    if (savedEmailFromRedux) {
      setEmail(savedEmailFromRedux);
      setRememberMe(true);
    }
  }, [savedEmailFromRedux]);

  // Email and Password Validation
  const validate = () => {
    const errs: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      errs.password = 'Password is required';
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  // Sign In Handler
  const handleSignIn = async () => {
    if (!validate()) return;

    const isValidEmail =
      email.trim().toLowerCase() === 'admin@gmail.com';

    const isValidPassword =
      password === currentPasswordHash || password === '1234';

    if (isValidEmail && isValidPassword) {
      setLoading(true);

      dispatch(
        loginSuccess({
          email: email.trim(),
          rememberMe,
        })
      );

      setTimeout(() => {
        setLoading(false);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }, 500);
    } else {
      setErrors({
        email: 'Invalid credentials.',
        password: 'Invalid credentials.',
      });
    }
  };

  // Forgot Password Handler
  const handleForgotPassword = () => {
    setIsToastVisible(true);
  };

  return (
    <LinearGradient
      colors={[
        colors.bgGradientTop,
        colors.bgGradientMid,
        colors.bgGradientBottom,
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Keyboard Avoiding Container */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top, 14),
                paddingBottom: hp(4),
                flexGrow: 1,
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Top Hero Branding Section */}
            <FadeInUp
              delay={100}
              duration={650}
              distance={hp(4)}
            >
              <View style={styles.heroSection}>
                <View style={styles.heroLogoWrapper}>
                  <WorkPulseLogo
                    size={wp(11)}
                    variant="horizontal-light"
                  />
                </View>

                <Text style={styles.heroTitle}>
                  Work smarter.
                </Text>

                <GradientText
                  text="Stay aligned."
                  fontSize={hp(4)}
                  fontWeight="800"
                  colors={['#38BDF8', '#7DD3FC']}
                  width={wp(75)}
                  height={hp(5.2)}
                  letterSpacing={-0.6}
                  style={{ marginTop: hp(0.3) }}
                />

                <Text style={styles.heroSubtitle}>
                  One portal for attendance, stand-ups, and
                  performance — built for teams that move fast.
                </Text>
              </View>
            </FadeInUp>

            {/* Floating White Login Card */}
            <FadeInUp
              delay={250}
              duration={750}
              distance={hp(8)}
            >
              <View style={styles.cardWrapper}>
                <View style={styles.card}>

                  {/* Card Header Logo */}
                  <View style={styles.cardHeader}>
                    <WorkPulseLogo
                      size={wp(10)}
                      variant="horizontal-dark"
                    />
                  </View>

                  {/* Secure Sign-in Badge */}
                  <Badge
                    label="Secure sign-in"
                    icon={
                      <Sparkles
                        size={wp(3.6)}
                        color={colors.accent}
                      />
                    }
                    style={styles.badge}
                  />

                  {/* Welcome Text */}
                  <Text style={styles.welcomeTitle}>
                    Welcome back
                  </Text>

                  <Text style={styles.welcomeSubtitle}>
                    Sign in to your WorkPulse workspace.
                  </Text>

                  {/* Login Form */}
                  <View style={styles.form}>

                    {/* Email Input */}
                    <InputField
                      label="Email"
                      required
                      value={email}
                      onChangeText={(val) => {
                        setEmail(val);

                        if (errors.email) {
                          setErrors((prev) => ({
                            ...prev,
                            email: undefined,
                          }));
                        }
                      }}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoComplete="email"
                      leftIcon={
                        <Mail
                          size={wp(4.5)}
                          color={colors.textMuted}
                        />
                      }
                      error={errors.email}
                    />

                    {/* Password Input */}
                    <InputField
                      label="Password"
                      required
                      value={password}
                      onChangeText={(val) => {
                        setPassword(val);

                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                        }
                      }}
                      placeholder="Enter your password"
                      secureTextEntry={!showPassword}
                      leftIcon={
                        <Lock
                          size={wp(4.5)}
                          color={colors.textMuted}
                        />
                      }
                      rightIcon={
                        showPassword ? (
                          <EyeOff
                            size={wp(4.5)}
                            color={colors.textMuted}
                          />
                        ) : (
                          <Eye
                            size={wp(4.5)}
                            color={colors.textMuted}
                          />
                        )
                      }
                      onRightIconPress={() =>
                        setShowPassword(!showPassword)
                      }
                      error={errors.password}
                    />

                    {/* Remember Me & Forgot Password */}
                    <View style={styles.rememberForgotRow}>
                      <Checkbox
                        label="Remember me"
                        checked={rememberMe}
                        onPress={() =>
                          setRememberMe(!rememberMe)
                        }
                      />

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleForgotPassword}
                        hitSlop={{
                          top: 8,
                          bottom: 8,
                          left: 8,
                          right: 8,
                        }}
                      >
                        <Text style={styles.forgotPasswordText}>
                          Forgot password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <PrimaryButton
                      title="Sign In"
                      icon={
                        <ArrowRight
                          size={wp(4.5)}
                          color={colors.textWhite}
                        />
                      }
                      loading={loading}
                      onPress={handleSignIn}
                      style={styles.signInButton}
                    />

                  </View>
                </View>
              </View>
            </FadeInUp>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Toast Notification */}
      <Toast
        visible={isToastVisible}
        message="Password reset is not available. Please contact your administrator."
        onHide={() => setIsToastVisible(false)}
      />

    </LinearGradient>
  );
};

export default LoginScreen;
