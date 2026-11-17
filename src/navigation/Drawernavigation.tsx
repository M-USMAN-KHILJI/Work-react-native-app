import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import {
  LayoutDashboard,
  CalendarCheck,
  FileSpreadsheet,
  User,
  LogOut,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Stacknavigation';
import { WorkPulseLogo } from '../components/WorkPulseLogo';
import { CustomText as Text } from '../components/CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from '../components/CustomTouchableOpacity';
import { colors, wp } from '../constants/display';
import { useAppSelector } from '../redux';
import { styles, DRAWER_WIDTH } from './drawerStyle';

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  activeRoute?: 'Dashboard' | 'Attendance' | 'Contracts' | 'Profile';
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  onLogout,
  activeRoute = 'Dashboard',
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAppSelector((state) => state.auth.user);

  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, slideAnim, opacityAnim]);

  if (!isOpen && (slideAnim as any)._value === -DRAWER_WIDTH) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? 'auto' : 'none'}>
      {/* Dim Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sliding Drawer Container */}
      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* 1. Header with WorkPulse Logo & Subtitle */}
          <View style={styles.headerSection}>
            <WorkPulseLogo
              size={wp(11)}
              variant="horizontal-dark"
              subtitle="Employee Portal"
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.menuScroll}
          >
            {/* 2. MAIN MENU Group */}
            <Text style={styles.groupHeading}>MAIN MENU</Text>

            {/* Dashboard Item */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.menuItem, activeRoute === 'Dashboard' && styles.menuItemActive]}
              onPress={() => {
                onClose();
                if (activeRoute !== 'Dashboard') {
                  navigation.navigate('Dashboard');
                }
              }}
            >
              {activeRoute === 'Dashboard' && <View style={styles.activePillIndicator} />}
              <View style={[styles.menuIconContainer, styles.dashboardIconBg]}>
                <LayoutDashboard size={wp(5.2)} color={colors.textLink} strokeWidth={2.3} />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  activeRoute === 'Dashboard' && styles.menuItemTextActive,
                ]}
              >
                Dashboard
              </Text>
            </TouchableOpacity>

            {/* My Attendance Item */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.menuItem, activeRoute === 'Attendance' && styles.menuItemActive]}
              onPress={() => {
                onClose();
                if (activeRoute !== 'Attendance') {
                  navigation.navigate('Attendance', { fromDashboard: false });
                }
              }}
            >
              {activeRoute === 'Attendance' && <View style={styles.activePillIndicator} />}
              <View style={[styles.menuIconContainer, styles.attendanceIconBg]}>
                <CalendarCheck size={wp(5.2)} color={colors.success} strokeWidth={2.3} />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  activeRoute === 'Attendance' && styles.menuItemTextActive,
                ]}
              >
                My Attendance
              </Text>
            </TouchableOpacity>

            {/* My Contracts Item */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.menuItem, activeRoute === 'Contracts' && styles.menuItemActive]}
              onPress={() => {
                onClose();
                if (activeRoute !== 'Contracts') {
                  navigation.navigate('Contracts');
                }
              }}
            >
              {activeRoute === 'Contracts' && <View style={styles.activePillIndicator} />}
              <View style={[styles.menuIconContainer, styles.contractIconBg]}>
                <FileSpreadsheet size={wp(5.2)} color={colors.textLink} strokeWidth={2.3} />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  activeRoute === 'Contracts' && styles.menuItemTextActive,
                ]}
              >
                My Contracts
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.menuDivider} />

            {/* 3. ACCOUNT Group */}
            <Text style={styles.groupHeading}>ACCOUNT</Text>

            {/* My Profile Item */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.menuItem, activeRoute === 'Profile' && styles.menuItemActive]}
              onPress={() => {
                onClose();
                if (activeRoute !== 'Profile') {
                  navigation.navigate('Profile');
                }
              }}
            >
              {activeRoute === 'Profile' && <View style={styles.activePillIndicator} />}
              <View style={[styles.menuIconContainer, styles.profileIconBg]}>
                <User size={wp(5.2)} color={colors.status.paidLeaveAccent} strokeWidth={2.3} />
              </View>
              <Text
                style={[
                  styles.menuItemText,
                  activeRoute === 'Profile' && styles.menuItemTextActive,
                ]}
              >
                My Profile
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* 4. Bottom User Profile Card */}
          <View style={styles.bottomCardWrapper}>
            <View style={styles.bottomCard}>
              <View style={styles.userAvatarBox}>
                <Text style={styles.userAvatarText}>{user?.initials || 'U'}</Text>
              </View>

              <View style={styles.userInfoCol}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user?.name || 'Usman Khurram'}
                </Text>
                <Text style={styles.userRole} numberOfLines={1}>
                  {user?.role || 'Employee Portal'}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.logoutButton}
                onPress={onLogout}
              >
                <LogOut size={wp(5)} color={colors.status.leaveBadgeText} strokeWidth={2.3} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default CustomDrawer;
