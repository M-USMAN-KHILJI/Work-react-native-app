import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react-native';

import {
  WorkPulseLogo,
  Badge,
  InputField,
  PrimaryButton,
  Checkbox,
  FadeInUp,
  GradientText,
  Toast,
} from '../../../components';
import { colors, hp, wp } from '../../../constants/display';
import { styles } from './style';

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      const height = e.endCoordinates ? e.endCoordinates.height : 0;
      setKeyboardHeight(height);
      setIsKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollToInput = (offsetY: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: offsetY, animated: true });
    }, Platform.OS === 'android' ? 120 : 60);
  };

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('WorkPulse', `Signed in successfully as ${email}`);
    }, 1200);
  };

  const handleForgotPassword = () => {
    setIsToastVisible(true);
  };

  return (
    <LinearGradient
      colors={[colors.bgGradientTop, colors.bgGradientMid, colors.bgGradientBottom]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
        enabled={Platform.OS === 'ios'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            ref={scrollViewRef}
            scrollEnabled={isKeyboardVisible}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top, 14),
                paddingBottom: isKeyboardVisible
                  ? (keyboardHeight > 0 ? keyboardHeight + hp(6) : hp(38))
                  : hp(4),
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Top Hero Branding Section */}
            <FadeInUp delay={100} duration={650} distance={hp(4)}>
              <View style={styles.heroSection}>
                <View style={styles.heroLogoWrapper}>
                  <WorkPulseLogo size={wp(11)} variant="horizontal-light" />
                </View>

                <Text style={styles.heroTitle}>Work smarter.</Text>
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
                  One portal for attendance, stand-ups, and performance — built for teams
                  that move fast.
                </Text>
              </View>
            </FadeInUp>

            {/* Floating White Card */}
            <FadeInUp delay={250} duration={750} distance={hp(8)}>
              <View style={styles.cardWrapper}>
              <View style={styles.card}>
                {/* Card Header Brand Logo */}
                <View style={styles.cardHeader}>
                  <WorkPulseLogo size={wp(10)} variant="horizontal-dark" />
                </View>

                {/* Secure Sign-in Pill Badge */}
                <Badge
                  label="Secure sign-in"
                  icon={<Sparkles size={wp(3.6)} color={colors.accent} />}
                  style={styles.badge}
                />

                {/* Welcome Titles */}
                <Text style={styles.welcomeTitle}>Welcome back</Text>
                <Text style={styles.welcomeSubtitle}>
                  Sign in to your WorkPulse workspace.
                </Text>

                {/* Form Fields */}
                <View style={styles.form}>
                  <InputField
                    label="Email"
                    required
                    value={email}
                    onFocus={() => scrollToInput(hp(16))}
                    onChangeText={(val) => {
                      setEmail(val);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoComplete="email"
                    leftIcon={<Mail size={wp(4.5)} color={colors.textMuted} />}
                    error={errors.email}
                  />

                  <InputField
                    label="Password"
                    required
                    value={password}
                    onFocus={() => scrollToInput(hp(28))}
                    onChangeText={(val) => {
                      setPassword(val);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    leftIcon={<Lock size={wp(4.5)} color={colors.textMuted} />}
                    rightIcon={
                      showPassword ? (
                        <EyeOff size={wp(4.5)} color={colors.textMuted} />
                      ) : (
                        <Eye size={wp(4.5)} color={colors.textMuted} />
                      )
                    }
                    onRightIconPress={() => setShowPassword(!showPassword)}
                    error={errors.password}
                  />

                  {/* Remember Me & Forgot Password Row */}
                  <View style={styles.rememberForgotRow}>
                    <Checkbox
                      label="Remember me"
                      checked={rememberMe}
                      onPress={() => setRememberMe(!rememberMe)}
                    />

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleForgotPassword}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sign In Primary CTA */}
                  <PrimaryButton
                    title="Sign In"
                    icon={<ArrowRight size={wp(4.5)} color={colors.textWhite} />}
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
