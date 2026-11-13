import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  Bell,
  Clock,
  Calendar,
  CheckCircle,
  Briefcase,
  TrendingUp,
  LogIn,
  LogOut,
  ChevronRight,
  FileText,
  User,
  X,
  Check,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {
  CustomText as Text,
  CustomTouchableOpacity as TouchableOpacity,
  CheckInModal,
  CheckOutModal,
  showCustomToast,
} from '../../../components';
import { CustomDrawer } from '../../../navigation/Drawernavigation';
import {
  performCheckIn,
  performCheckOut,
} from '../../../utils/attendanceStore';
import { useDrawer, useCurrentTime, useAttendance } from '../../../hooks';

import { colors, hp, wp } from '../../../constants/display';
import { styles } from './style';
import { useAppDispatch, useAppSelector, markLoginToastShown } from '../../../redux';

export const DashboardScreen: React.FC = () => {
  const {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
    navigation,
  } = useDrawer();

  const dispatch = useAppDispatch();
  const hasShownLoginToast = useAppSelector((state) => state.auth.hasShownLoginToast);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const rememberMe = useAppSelector((state) => state.auth.rememberMe);
  const currentTime = useCurrentTime();
  const {
    isCheckedIn,
    todayRecord,
    monthStats,
    reload: reloadAttendance,
  } = useAttendance();

  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [liveWorkingMinutes, setLiveWorkingMinutes] = useState(0);

  // Live timer for working hours when checked in
  useEffect(() => {
    if (!isCheckedIn || !todayRecord?.checkInISO) {
      setLiveWorkingMinutes(0);
      return;
    }

    const updateMinutes = () => {
      const checkInMs = new Date(todayRecord.checkInISO!).getTime();
      const nowMs = Date.now();
      const diffMins = Math.max(0, Math.floor((nowMs - checkInMs) / 60000));
      setLiveWorkingMinutes(diffMins);
    };

    updateMinutes();
    const interval = setInterval(updateMinutes, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, [isCheckedIn, todayRecord?.checkInISO]);

  // Formatted live working hours string
  const formatMinutes = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m}m`;
  };

  const displayWorkingHours = isCheckedIn
    ? formatMinutes(liveWorkingMinutes)
    : todayRecord?.workingHoursFormatted || '—';

  // Dynamic current date
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const hasCheckedOutToday = !!todayRecord?.checkOutISO;
  // If user has checked out today, check in is locked until tomorrow
  const isAfter10AM = currentMinutes >= 10 * 60 && !hasCheckedOutToday;

  const currentMonthYear = now.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const currentDayMonthYear = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
  });

  const handleCheckInPress = () => {
    if (isCheckedIn) return;
    if (hasCheckedOutToday) {
      Toast.show({
        type: 'info',
        text1: 'Shift Completed',
        text2: 'You have already checked out today. Check-in opens tomorrow after 10:00 AM.',
      });
      return;
    }
    if (!isAfter10AM) {
      Toast.show({
        type: 'info',
        text1: 'Check In Locked',
        text2: 'Check-in opens at 10:00 AM.',
      });
      return;
    }
    setIsCheckInModalVisible(true);
  };

  const handleConfirmCheckIn = async () => {
    setIsCheckInModalVisible(false);
    const res = await performCheckIn(new Date());
    if (res.success) {
      showCustomToast({
        type: 'success',
        title: 'Check In Successful',
        message: 'You have checked in successfully.',
      });
      reloadAttendance();
    } else {
      showCustomToast({
        type: 'error',
        title: 'Check In Failed',
        message: res.message,
      });
    }
  };

  const handleCheckOutPress = () => {
    if (!isCheckedIn) return;
    setIsCheckOutModalVisible(true);
  };

  const handleConfirmCheckOut = async () => {
    setIsCheckOutModalVisible(false);
    const res = await performCheckOut(new Date());
    if (res.success) {
      showCustomToast({
        type: 'success',
        title: 'Check Out Successful',
        message: 'You have checked out successfully.',
      });
      reloadAttendance();
    } else {
      showCustomToast({
        type: 'error',
        title: 'Check Out Failed',
        message: res.message,
      });
    }
  };

  useEffect(() => {
    // Show login toast only once upon logging in or app startup when remembered
    if (!hasShownLoginToast && (isAuthenticated || rememberMe)) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have logged in successfully.',
        position: 'top',
        visibilityTime: 3000,
      });
      dispatch(markLoginToastShown());
    }
  }, [hasShownLoginToast, isAuthenticated, rememberMe, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Application Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={openDrawer}
        >
          <Menu size={wp(6)} color={colors.textPrimary} strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={styles.topRightActions}>
          <TouchableOpacity activeOpacity={0.7} style={styles.bellButton}>
            <Bell size={wp(5.2)} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarCircle}
            onPress={toggleDropdown}
          >
            <Text style={styles.avatarText}>UK</Text>
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
                    navigation.navigate('Profile');
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainContent}>
          {/* 1. Hero Card */}
          <LinearGradient
            colors={['#085B7A', '#064963', '#03374B']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.heroCard}
          >
            <Text style={styles.heroDate}>{currentDayMonthYear.replace(',', ' •')}</Text>
            <Text style={styles.heroGreeting}>Good evening,{'\n'}Usman</Text>
            <Text style={styles.heroDescription}>
              Check in, track your day, and review Present, Late, Half Leave, Leave, and
              Paid Leave — all from one place.
            </Text>

            <View style={styles.heroPillsRow}>
              <View style={styles.heroPill}>
                <TrendingUp size={wp(3.5)} color="#FFFFFF" />
                <Text style={styles.heroPillText}>100% this month</Text>
              </View>

              <View style={styles.heroPill}>
                <Briefcase size={wp(3.5)} color="#FFFFFF" />
                <Text style={styles.heroPillText}>{monthStats.workingDays} working days</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.attendanceButton}
              onPress={() => navigation.navigate('Attendance', { fromDashboard: true })}
            >
              <Calendar size={wp(4.2)} color={colors.textPrimary} />
              <Text style={styles.attendanceButtonText}>Attendance</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* 2. Today's Attendance Card */}
          <View style={styles.attendanceCard}>
            <View style={styles.attendanceCardHeader}>
              <View>
                <Text style={styles.attendanceTitle}>Today's Attendance</Text>
                <Text style={styles.attendanceSubinfo}>Late after 10:15 AM • Radius 50 m</Text>
              </View>

              <View style={styles.currentTimeContainer}>
                <Text style={styles.currentTimeLabel}>CURRENT TIME</Text>
                <View style={styles.currentTimeBadge}>
                  <Text style={styles.currentTimeValue}>{currentTime}</Text>
                </View>
              </View>
            </View>

            {/* Status Informational Banner & Dynamic Checked In Badges */}
            {isCheckedIn && (
              <View style={styles.checkedInPillsRow}>
                {/* Present Badge */}
                <View style={styles.presentBadge}>
                  <View style={styles.presentDot} />
                  <Text style={styles.presentBadgeText}>Present</Text>
                </View>

                {/* In time badge */}
                <View style={styles.inTimeBadge}>
                  <Text style={styles.inTimeBadgeText}>
                    In {todayRecord?.checkInTimeFormatted || '—'}
                  </Text>
                </View>

                {/* Working hours badge */}
                <View style={styles.workingTimeBadge}>
                  <Text style={styles.workingTimeBadgeText}>
                    Working {displayWorkingHours}
                  </Text>
                </View>
              </View>
            )}

            {/* Status Informational Banner */}
            <View style={styles.statusBanner}>
              <Text style={styles.statusBannerTitle}>
                {isCheckedIn ? 'Currently checked in' : 'Not checked in yet'}
              </Text>
              <Text style={styles.statusBannerSub}>
                {isCheckedIn
                  ? `Working ${displayWorkingHours}. Tap Check Out when you finish.`
                  : 'Tap Check In to start your day. Location is required and must be inside the office radius.'}
              </Text>
            </View>

            {/* Check In & Check Out Action Cards matching image */}
            <View style={styles.actionButtonsRow}>
              {/* Check In card */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.actionCard,
                  (isCheckedIn || hasCheckedOutToday)
                    ? styles.checkInCardDisabled
                    : !isAfter10AM
                    ? styles.checkInCardLocked
                    : styles.checkInCardActiveState,
                ]}
                onPress={handleCheckInPress}
                disabled={isCheckedIn || hasCheckedOutToday || !isAfter10AM}
              >
                {(isCheckedIn || hasCheckedOutToday) && (
                  <View style={styles.checkedBadge}>
                    <Check size={wp(3.4)} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}
                <View style={styles.actionIconCircle}>
                  <LogIn
                    size={wp(5.8)}
                    color={(isCheckedIn || hasCheckedOutToday || isAfter10AM) ? '#FFFFFF' : '#94A3B8'}
                    strokeWidth={2.4}
                  />
                </View>
                <Text
                  style={[
                    styles.actionCardText,
                    !isCheckedIn && !hasCheckedOutToday && !isAfter10AM && { color: '#94A3B8' },
                  ]}
                >
                  Check In
                </Text>
              </TouchableOpacity>

              {/* Check Out card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.actionCard,
                  hasCheckedOutToday
                    ? styles.checkOutCardCompleted
                    : isCheckedIn
                    ? styles.checkOutCardActive
                    : styles.checkOutCardDisabled,
                ]}
                onPress={handleCheckOutPress}
                disabled={!isCheckedIn || hasCheckedOutToday}
              >
                {hasCheckedOutToday && (
                  <View style={styles.checkedBadge}>
                    <Check size={wp(3.4)} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}
                <View style={styles.actionIconCircle}>
                  <LogOut
                    size={wp(5.8)}
                    color={hasCheckedOutToday || isCheckedIn ? '#FFFFFF' : '#94A3B8'}
                    strokeWidth={2.4}
                  />
                </View>
                <Text
                  style={[
                    styles.actionCardText,
                    !isCheckedIn && !hasCheckedOutToday && { color: '#94A3B8' },
                  ]}
                >
                  Check Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. Metric Info Cards with Exact Linear Gradients */}
          {/* Card 1: Check In */}
          <View style={[styles.metricCardWrapper, { borderColor: '#BAE6FD' }]}>
            <LinearGradient
              colors={['#F0F9FF', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.metricCardGradient}
            >
              <LinearGradient
                colors={['#BAE6FD', '#E0F2FE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricIconGradientBox}
              >
                <Clock size={wp(5.6)} color="#0369A1" strokeWidth={2.4} />
              </LinearGradient>
              <View style={styles.metricTextCol}>
                <Text style={styles.metricLabel}>CHECK IN</Text>
                <Text style={styles.metricValue}>
                  {todayRecord?.checkInTimeFormatted || '—'}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Card 2: Check Out */}
          <View style={[styles.metricCardWrapper, { borderColor: '#BAE6FD' }]}>
            <LinearGradient
              colors={['#F0F9FF', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.metricCardGradient}
            >
              <LinearGradient
                colors={['#E0F2FE', '#F0F9FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricIconGradientBox}
              >
                <Clock size={wp(5.6)} color="#0284C7" strokeWidth={2.4} />
              </LinearGradient>
              <View style={styles.metricTextCol}>
                <Text style={styles.metricLabel}>CHECK OUT</Text>
                <Text style={styles.metricValue}>
                  {todayRecord?.checkOutTimeFormatted || '—'}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Card 3: Working Hours */}
          <View style={[styles.metricCardWrapper, { borderColor: '#A7F3D0' }]}>
            <LinearGradient
              colors={['#F0FDF4', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.metricCardGradient}
            >
              <LinearGradient
                colors={['#D1FAE5', '#ECFDF5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricIconGradientBox}
              >
                <Calendar size={wp(5.6)} color="#059669" strokeWidth={2.4} />
              </LinearGradient>
              <View style={styles.metricTextCol}>
                <Text style={styles.metricLabel}>WORKING HOURS</Text>
                <Text style={styles.metricValue}>
                  {displayWorkingHours}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Card 4: Status */}
          <View style={[styles.metricCardWrapper, { borderColor: '#DDD6FE' }]}>
            <LinearGradient
              colors={['#FAF5FF', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.metricCardGradient}
            >
              <LinearGradient
                colors={['#EDE9FE', '#F5F3FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricIconGradientBox}
              >
                <CheckCircle size={wp(5.6)} color="#0D9488" strokeWidth={2.4} />
              </LinearGradient>
              <View style={styles.metricTextCol}>
                <Text style={styles.metricLabel}>STATUS</Text>
                <Text style={styles.metricValue}>
                  {todayRecord?.statuses && todayRecord.statuses.length > 0
                    ? todayRecord.statuses.join(' · ')
                    : '—'}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* 4. This Month Attendance Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionPreTitle}>THIS MONTH</Text>
                <Text style={styles.sectionMainTitle}>{currentMonthYear}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Attendance', {
                    scrollToHistory: true,
                    fromDashboard: true,
                  })
                }
              >
                <Text style={styles.viewReportLink}>View report →</Text>
              </TouchableOpacity>
            </View>

            {/* Attendance Rate Snapshot Banner */}
            <View style={styles.rateSnapshotBox}>
              <View style={styles.rateTopRow}>
                <View style={styles.rateBadge}>
                  <Text style={styles.rateBadgeText}>100%</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.rateLabelRow}>
                    <TrendingUp size={wp(3.8)} color="#0D9488" strokeWidth={2.4} />
                    <Text style={styles.rateLabel}>ATTENDANCE RATE</Text>
                  </View>
                  <Text style={styles.rateSub}>Monthly performance snapshot</Text>
                </View>
              </View>

              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
            </View>

            {/* 4-Stat Attendance Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>{monthStats.present}</Text>
                <Text style={styles.statsLabel}>Present</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>{monthStats.late}</Text>
                <Text style={styles.statsLabel}>Late</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>{monthStats.halfLeave}</Text>
                <Text style={styles.statsLabel}>Half Leave</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>{monthStats.leave}</Text>
                <Text style={styles.statsLabel}>Leave</Text>
              </View>
            </View>
          </View>

          {/* 5. Paid Leaves Section */}
          <View style={styles.paidLeavesCard}>
            <View style={styles.paidLeavesHeaderBanner}>
              <View style={styles.leavesHeaderTitleRow}>
                <Calendar size={wp(4.4)} color="#4F46E5" strokeWidth={2.3} />
                <Text style={styles.leavesHeaderTitle}>Paid Leaves (Current Contract)</Text>
              </View>
            </View>

            <View style={styles.paidLeavesBody}>
              <Text style={styles.bigLeaveNumber}>0</Text>
              <Text style={styles.bigLeaveSub}>Remaining • 0 total on current contract</Text>

              {/* 4-Stat Leaves Grid */}
              <View style={[styles.statsGrid, { marginBottom: hp(1.8) }]}>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsNumber}>0</Text>
                  <Text style={styles.statsLabel}>Total</Text>
                </View>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsNumber}>0</Text>
                  <Text style={styles.statsLabel}>Remaining</Text>
                </View>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsNumber}>0</Text>
                  <Text style={styles.statsLabel}>This month</Text>
                </View>
                <View style={styles.statsGridItem}>
                  <Text style={styles.statsNumber}>0</Text>
                  <Text style={styles.statsLabel}>Monthly limit</Text>
                </View>
              </View>

              <View style={styles.leaveDetailRow}>
                <Text style={styles.leaveDetailLabel}>{currentMonthYear} • 0 paid leave per month</Text>
                <Text style={styles.leaveDetailValue}>0 / 0</Text>
              </View>
              <View style={styles.leaveDetailRow}>
                <Text style={styles.leaveDetailLabel}>No monthly paid leave allowance</Text>
                <Text style={styles.leaveDetailValue}>—</Text>
              </View>
              <View style={styles.leaveDetailRow}>
                <Text style={styles.leaveDetailLabel}>Contract balance</Text>
                <Text style={styles.leaveDetailValue}>0 / 0</Text>
              </View>
            </View>
          </View>

          {/* 6. Quick Links */}
          <View style={styles.quickLinksCard}>
            <View style={styles.quickLinksHeaderRow}>
              <View>
                <Text style={styles.quickLinksTitle}>Quick links</Text>
                <Text style={styles.quickLinksSub}>Jump to your modules</Text>
              </View>
              <FileText size={wp(5)} color="#0284C7" />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.quickLinkItem}
              onPress={() => navigation.navigate('Attendance', { fromDashboard: true })}
            >
              <View style={styles.quickLinkLeft}>
                <Calendar size={wp(4.2)} color="#0D9488" />
                <Text style={styles.quickLinkText}>Attendance overview</Text>
              </View>
              <ChevronRight size={wp(4.5)} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Custom Animated Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onLogout={handleLogout}
        activeRoute="Dashboard"
      />

      {/* Confirm Check In Modal Component */}
      <CheckInModal
        visible={isCheckInModalVisible}
        currentTime={currentTime}
        onClose={() => setIsCheckInModalVisible(false)}
        onConfirm={handleConfirmCheckIn}
      />

      {/* Confirm Check Out Modal Component */}
      <CheckOutModal
        visible={isCheckOutModalVisible}
        currentTime={currentTime}
        checkInTime={todayRecord?.checkInTimeFormatted || '—'}
        workingHours={displayWorkingHours}
        isEarlyCheckout={currentMinutes < 19 * 60}
        onClose={() => setIsCheckOutModalVisible(false)}
        onConfirm={handleConfirmCheckOut}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
