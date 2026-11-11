import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LayoutDashboard,
  CalendarCheck,
  FileSpreadsheet,
  User,
  LogOut,
} from 'lucide-react-native';

import { WorkPulseLogo } from '../components/WorkPulseLogo';
import { hp, wp, radius } from '../constants/display';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = wp(78);

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
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
  }, [isOpen]);

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
            paddingTop: insets.top + hp(1.5),
            paddingBottom: Math.max(insets.bottom, hp(2)),
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
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

          {/* Dashboard Item (Active State) */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.menuItem, styles.menuItemActive]}
            onPress={onClose}
          >
            <View style={styles.activePillIndicator} />
            <View style={[styles.menuIconContainer, styles.dashboardIconBg]}>
              <LayoutDashboard size={wp(5.2)} color="#0284C7" strokeWidth={2.3} />
            </View>
            <Text style={[styles.menuItemText, styles.menuItemTextActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>

          {/* My Attendance Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuItem}
            onPress={onClose}
          >
            <View style={[styles.menuIconContainer, styles.attendanceIconBg]}>
              <CalendarCheck size={wp(5.2)} color="#10B981" strokeWidth={2.3} />
            </View>
            <Text style={styles.menuItemText}>My Attendance</Text>
          </TouchableOpacity>

          {/* My Contracts Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuItem}
            onPress={onClose}
          >
            <View style={[styles.menuIconContainer, styles.contractIconBg]}>
              <FileSpreadsheet size={wp(5.2)} color="#0284C7" strokeWidth={2.3} />
            </View>
            <Text style={styles.menuItemText}>My Contracts</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.menuDivider} />

          {/* 3. ACCOUNT Group */}
          <Text style={styles.groupHeading}>ACCOUNT</Text>

          {/* My Profile Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuItem}
            onPress={onClose}
          >
            <View style={[styles.menuIconContainer, styles.profileIconBg]}>
              <User size={wp(5.2)} color="#8B5CF6" strokeWidth={2.3} />
            </View>
            <Text style={styles.menuItemText}>My Profile</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 4. Bottom User Profile Card */}
        <View style={styles.bottomCardWrapper}>
          <View style={styles.bottomCard}>
            <View style={styles.userAvatarBox}>
              <Text style={styles.userAvatarText}>U</Text>
            </View>

            <View style={styles.userInfoCol}>
              <Text style={styles.userName} numberOfLines={1}>
                Usman Khurram
              </Text>
              <Text style={styles.userRole} numberOfLines={1}>
                Employee Portal
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.logoutButton}
              onPress={onLogout}
            >
              <LogOut size={wp(5)} color="#DC2626" strokeWidth={2.3} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    zIndex: 9998,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 20,
  },
  headerSection: {
    paddingHorizontal: wp(5.5),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.2),
  },
  groupHeading: {
    fontSize: hp(1.2),
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: hp(1.2),
    paddingHorizontal: wp(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
    borderRadius: radius.lg,
    marginBottom: hp(0.6),
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: '#E0F2FE',
  },
  activePillIndicator: {
    position: 'absolute',
    left: 0,
    top: hp(1.2),
    bottom: hp(1.2),
    width: 4,
    borderRadius: 2,
    backgroundColor: '#0284C7',
  },
  menuIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  dashboardIconBg: {
    backgroundColor: '#BAE6FD',
  },
  attendanceIconBg: {
    backgroundColor: '#D1FAE5',
  },
  contractIconBg: {
    backgroundColor: '#E0F2FE',
  },
  profileIconBg: {
    backgroundColor: '#EDE9FE',
  },
  menuItemText: {
    fontSize: hp(1.65),
    fontWeight: '600',
    color: '#334155',
  },
  menuItemTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: hp(1.8),
    marginHorizontal: wp(2),
  },
  bottomCardWrapper: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.2),
  },
  bottomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: radius.xl,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.4),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userAvatarBox: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  userAvatarText: {
    fontSize: hp(1.9),
    fontWeight: '800',
    color: '#0284C7',
  },
  userInfoCol: {
    flex: 1,
    marginRight: wp(2),
  },
  userName: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  userRole: {
    fontSize: hp(1.25),
    color: '#64748B',
    marginTop: hp(0.2),
    fontWeight: '500',
  },
  logoutButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.md,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomDrawer;