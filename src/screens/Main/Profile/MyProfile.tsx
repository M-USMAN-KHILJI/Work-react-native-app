import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  Bell,
  User,
  Mail,
  Briefcase,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Hash,
  Shield,
  KeyRound,
  Building,
  CreditCard,
  CheckCircle,
  LogOut,
} from 'lucide-react-native';

import {
  CustomText as Text,
  CustomTouchableOpacity as TouchableOpacity,
  showCustomToast,
} from '../../../components';
import { CustomDrawer } from '../../../navigation/Drawernavigation';
import { colors, hp, wp } from '../../../constants/display';
import { useDrawer, useChangePassword } from '../../../hooks';
import { styles } from './style';

export const MyProfileScreen: React.FC = () => {
  const {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
  } = useDrawer();

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    isUpdating,
    updatePassword,
  } = useChangePassword();

  const [currentFocused, setCurrentFocused] = useState(false);
  const [newFocused, setNewFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const currentPasswordRef = useRef<React.ElementRef<typeof View>>(null);
  const newPasswordRef = useRef<React.ElementRef<typeof View>>(null);
  const confirmPasswordRef = useRef<React.ElementRef<typeof View>>(null);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      const height = e.endCoordinates ? e.endCoordinates.height : 0;
      setKeyboardSpace(height);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardSpace(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const lastOffsetY = useRef(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    // Dismiss keyboard ONLY when scrolling up (moving back to top)
    if (currentY < lastOffsetY.current && lastOffsetY.current - currentY > 20) {
      Keyboard.dismiss();
    }
    lastOffsetY.current = currentY;
  };

  const scrollToField = (ref: React.RefObject<any>) => {
    setTimeout(() => {
      if (ref.current && scrollViewRef.current) {
        ref.current.measureLayout(
          scrollViewRef.current,
          (_x: number, y: number) => {
            // Scroll to the field with an offset so it sits nicely at the top of the viewport
            scrollViewRef.current?.scrollTo({ y: Math.max(0, y - hp(2)), animated: true });
          },
          () => {
            // fallback scroll to end
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }
        );
      }
    }, Platform.OS === 'android' ? 150 : 80);
  };

  const handleUpdatePasswordPress = async () => {
    const res = await updatePassword();
    if (res.success) {
      showCustomToast({
        type: 'success',
        title: 'Success',
        message: res.message,
      });
    } else {
      showCustomToast({
        type: 'error',
        title: 'Password Update Failed',
        message: res.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Application Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={() => {
            Keyboard.dismiss();
            openDrawer();
          }}
        >
          <Menu size={wp(6)} color={colors.textPrimary} strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={styles.topRightActions}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bellButton}
            onPress={() => Keyboard.dismiss()}
          >
            <Bell size={wp(5.2)} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarSmallCircle}
            onPress={() => {
              Keyboard.dismiss();
              toggleDropdown();
            }}
          >
            <Text style={styles.avatarSmallText}>UK</Text>
          </TouchableOpacity>

          {/* Avatar Dropdown */}
          {isDropdownOpen && (
            <>
              <Pressable
                style={styles.dropdownBackdrop}
                onPress={closeDropdown}
              />
              <View style={styles.avatarDropdownMenu}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.dropdownItem}
                  onPress={() => {
                    closeDropdown();
                  }}
                >
                  <User size={wp(4.5)} color="#475569" strokeWidth={2} />
                  <Text style={styles.dropdownItemText}>My Profile</Text>
                </TouchableOpacity>

                <View style={styles.dropdownItemDivider} />

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <LogOut size={wp(4.5)} color="#475569" strokeWidth={2} />
                  <Text style={styles.dropdownItemText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={[
              styles.content,
              { paddingBottom: keyboardSpace > 0 ? keyboardSpace + hp(3) : hp(6) },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
          {/* 1. Hero Profile Card with Deep Gradient */}
        <LinearGradient
          colors={['#085B7A', '#064963', '#03374B']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.heroProfileCard}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>UK</Text>
            </View>
            <View style={styles.heroNameCol}>
              <Text style={styles.heroSubtitle}>Account • My Profile</Text>
              <Text style={styles.heroTitle}>Usman Khurram</Text>
              <Text style={styles.heroRole}>Intern • Employee</Text>
            </View>
          </View>

          <View style={styles.heroPillsList}>
            <View style={styles.heroPill}>
              <Building size={wp(3.6)} color="#FFFFFF" />
              <Text style={styles.heroPillText}>ST-166642</Text>
            </View>

            <View style={styles.heroPill}>
              <Mail size={wp(3.6)} color="#FFFFFF" />
              <Text style={styles.heroPillText}>usman.khurram@interns.senewtch.com</Text>
            </View>

            <View style={styles.heroPill}>
              <Shield size={wp(3.6)} color="#FFFFFF" />
              <Text style={styles.heroPillText}>Active account</Text>
            </View>
          </View>
        </LinearGradient>

        {/* 2. Top Summary Metric Cards */}
        <View style={styles.summaryCardsCol}>
          {/* Member Since Card */}
          <View style={[styles.summaryCard, { backgroundColor: colors.profile.memberSinceBg }]}>
            <View style={[styles.summaryIconBox, { backgroundColor: '#DCFCE7' }]}>
              <Calendar size={wp(5.2)} color="#15803D" strokeWidth={2.2} />
            </View>
            <View style={styles.summaryInfoCol}>
              <Text style={styles.summaryLabel}>MEMBER SINCE</Text>
              <Text style={styles.summaryValue}>June 15, 2026</Text>
            </View>
          </View>

          {/* Account Status Card */}
          <View style={[styles.summaryCard, { backgroundColor: colors.profile.accountStatusBg }]}>
            <View style={[styles.summaryIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Shield size={wp(5.2)} color="#0284C7" strokeWidth={2.2} />
            </View>
            <View style={styles.summaryInfoCol}>
              <Text style={styles.summaryLabel}>ACCOUNT STATUS</Text>
              <Text style={styles.summaryValue}>Active</Text>
            </View>
          </View>

          {/* Employee ID Card */}
          <View style={[styles.summaryCard, { backgroundColor: colors.profile.employeeIdBg }]}>
            <View style={[styles.summaryIconBox, { backgroundColor: '#F3E8FF' }]}>
              <Hash size={wp(5.2)} color="#9333EA" strokeWidth={2.2} />
            </View>
            <View style={styles.summaryInfoCol}>
              <Text style={styles.summaryLabel}>EMPLOYEE ID</Text>
              <Text style={styles.summaryValue}>ST-166642</Text>
            </View>
          </View>
        </View>

        {/* 3. Personal Information Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIconBox}>
              <User size={wp(5)} color="#0284C7" strokeWidth={2.2} />
            </View>
            <View style={styles.sectionHeaderCol}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <Text style={styles.sectionSubtitle}>Your basic profile and employment details</Text>
            </View>
          </View>

          <View style={styles.personalInfoList}>
            {/* Full Name */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.fullNameBg }]}>
              <View style={styles.infoTileIconBox}>
                <User size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>FULL NAME</Text>
                <Text style={styles.infoTileValue}>Usman Khurram</Text>
              </View>
            </View>

            {/* Email Address */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.emailAddressBg }]}>
              <View style={styles.infoTileIconBox}>
                <Mail size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>EMAIL ADDRESS</Text>
                <Text style={styles.infoTileValue}>usman.khurram@interns.senewtch.com</Text>
              </View>
            </View>

            {/* Employee ID */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.employeeIdTileBg }]}>
              <View style={styles.infoTileIconBox}>
                <Hash size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>EMPLOYEE ID</Text>
                <Text style={styles.infoTileValue}>ST-166642</Text>
              </View>
            </View>

            {/* Designation */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.designationBg }]}>
              <View style={styles.infoTileIconBox}>
                <Briefcase size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>DESIGNATION</Text>
                <Text style={styles.infoTileValue}>Intern</Text>
              </View>
            </View>

            {/* Joining Date */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.joiningDateBg }]}>
              <View style={styles.infoTileIconBox}>
                <Calendar size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>JOINING DATE</Text>
                <Text style={styles.infoTileValue}>June 15, 2026</Text>
              </View>
            </View>

            {/* Monthly Salary */}
            <View style={[styles.infoTile, { backgroundColor: colors.profile.monthlySalaryBg }]}>
              <View style={styles.infoTileIconBox}>
                <CreditCard size={wp(4.8)} color="#0284C7" />
              </View>
              <View style={styles.infoTileContent}>
                <Text style={styles.infoTileLabel}>MONTHLY SALARY</Text>
                <Text style={styles.infoTileValue}>PKR 1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. Change Password Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIconBox, { backgroundColor: '#F0FDFA' }]}>
              <KeyRound size={wp(5)} color="#0D9488" strokeWidth={2.2} />
            </View>
            <View style={styles.sectionHeaderCol}>
              <Text style={styles.sectionTitle}>Change Password</Text>
              <Text style={styles.sectionSubtitle}>Enter your current password, then choose a new one</Text>
            </View>
          </View>

          {/* Rule Box */}
          <View style={styles.passwordRuleBox}>
            <Lock size={wp(4)} color="#D97706" style={{ marginTop: hp(0.2) }} />
            <Text style={styles.passwordRuleText}>
              At least 8 characters, with a letter, a number, and a special character. Your new password must be different from the current one.
            </Text>
          </View>

          {/* Current Password Field */}
          <View ref={currentPasswordRef} collapsable={false} style={styles.inputGroup}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <Text style={styles.requiredStar}> *</Text>
            </View>
            <View
              style={[
                styles.customInputBox,
                currentFocused && styles.customInputBoxFocused,
                errors.currentPasswordError ? styles.customInputBoxError : null,
              ]}
            >
              <TextInput
                style={styles.customTextInput}
                value={currentPassword}
                onChangeText={(t) => {
                  setCurrentPassword(t);
                  if (errors.currentPasswordError) {
                    setErrors((prev) => ({ ...prev, currentPasswordError: undefined }));
                  }
                }}
                secureTextEntry={!showCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor={colors.textMuted}
                onFocus={() => {
                  setCurrentFocused(true);
                  scrollToField(currentPasswordRef);
                }}
                onBlur={() => setCurrentFocused(false)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff size={wp(4.6)} color={colors.textSecondary} />
                ) : (
                  <Eye size={wp(4.6)} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.currentPasswordError ? (
              <Text style={styles.errorText}>{errors.currentPasswordError}</Text>
            ) : null}
          </View>

          {/* New Password Field */}
          <View ref={newPasswordRef} collapsable={false} style={styles.inputGroup}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>New Password</Text>
              <Text style={styles.requiredStar}> *</Text>
            </View>
            <View
              style={[
                styles.customInputBox,
                newFocused && styles.customInputBoxFocused,
                errors.newPasswordError ? styles.customInputBoxError : null,
              ]}
            >
              <TextInput
                style={styles.customTextInput}
                value={newPassword}
                onChangeText={(t) => {
                  setNewPassword(t);
                  if (errors.newPasswordError) {
                    setErrors((prev) => ({ ...prev, newPasswordError: undefined }));
                  }
                }}
                secureTextEntry={!showNewPassword}
                placeholder="Enter new password"
                placeholderTextColor={colors.textMuted}
                onFocus={() => {
                  setNewFocused(true);
                  scrollToField(newPasswordRef);
                }}
                onBlur={() => setNewFocused(false)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={wp(4.6)} color={colors.textSecondary} />
                ) : (
                  <Eye size={wp(4.6)} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.newPasswordError ? (
              <Text style={styles.errorText}>{errors.newPasswordError}</Text>
            ) : null}
          </View>

          {/* Confirm New Password Field */}
          <View ref={confirmPasswordRef} collapsable={false} style={styles.inputGroup}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <Text style={styles.requiredStar}> *</Text>
            </View>
            <View
              style={[
                styles.customInputBox,
                confirmFocused && styles.customInputBoxFocused,
                errors.confirmPasswordError ? styles.customInputBoxError : null,
              ]}
            >
              <TextInput
                style={styles.customTextInput}
                value={confirmPassword}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  if (errors.confirmPasswordError) {
                    setErrors((prev) => ({ ...prev, confirmPasswordError: undefined }));
                  }
                }}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={colors.textMuted}
                onFocus={() => {
                  setConfirmFocused(true);
                  scrollToField(confirmPasswordRef);
                }}
                onBlur={() => setConfirmFocused(false)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={wp(4.6)} color={colors.textSecondary} />
                ) : (
                  <Eye size={wp(4.6)} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPasswordError ? (
              <Text style={styles.errorText}>{errors.confirmPasswordError}</Text>
            ) : null}
          </View>

          {/* Update Password Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.updateButtonTouch}
            onPress={handleUpdatePasswordPress}
            disabled={isUpdating}
          >
            <LinearGradient
              colors={[...colors.checkInButtonGradient]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.updateButtonGradient}
            >
              <Text style={styles.updateButtonText}>
                {isUpdating ? 'Updating...' : 'Update Password'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>

      {/* Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onLogout={handleLogout}
        activeRoute="Profile"
      />
    </SafeAreaView>
  );
};

export default MyProfileScreen;
