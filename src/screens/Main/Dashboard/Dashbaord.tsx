import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
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
import { CustomDrawer } from '../../../navigation/Drawernavigation';
import {
  performCheckIn,
  performCheckOut,
} from '../../../utils/attendanceStore';
import { useDrawer, useCurrentTime, useAttendance } from '../../../hooks';

import { colors, hp, wp } from '../../../constants/display';
import { styles } from './style';

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

  const currentTime = useCurrentTime();
  const {
    isCheckedIn,
    todayRecord,
    monthStats,
    reload: reloadAttendance,
  } = useAttendance();

  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);

  // Dynamic current date
  const now = new Date();
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
    setIsCheckInModalVisible(true);
  };

  const handleConfirmCheckIn = async () => {
    setIsCheckInModalVisible(false);
    const res = await performCheckIn(new Date());
    if (res.success) {
      Toast.show({
        type: 'success',
        text1: 'Check In',
        text2: res.message,
      });
      reloadAttendance();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Check In Failed',
        text2: res.message,
      });
    }
  };

  const handleCheckOutPress = async () => {
    const res = await performCheckOut(new Date());
    if (res.success) {
      Toast.show({
        type: 'success',
        text1: 'Check Out',
        text2: res.message,
      });
      reloadAttendance();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Check Out Failed',
        text2: res.message,
      });
    }
  };

  useEffect(() => {
    // Show light blue success toast on login
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You have logged in successfully.',
      position: 'top',
      visibilityTime: 3000,
    });
  }, []);

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

            <TouchableOpacity activeOpacity={0.85} style={styles.attendanceButton}>
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

            {/* Status Informational Banner */}
            <View style={styles.statusBanner}>
              <Text style={styles.statusBannerTitle}>
                {isCheckedIn ? 'Currently checked in' : 'Not checked in yet'}
              </Text>
              <Text style={styles.statusBannerSub}>
                {isCheckedIn
                  ? 'Your work hours are being logged. Tap Check Out when you finish.'
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
                  isCheckedIn ? styles.checkInCardDisabled : styles.checkInCardActiveState,
                ]}
                onPress={handleCheckInPress}
                disabled={isCheckedIn}
              >
                {isCheckedIn && (
                  <View style={styles.checkedBadge}>
                    <Check size={wp(3.4)} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}
                <View style={styles.actionIconCircle}>
                  <LogIn
                    size={wp(5.8)}
                    color="#FFFFFF"
                    strokeWidth={2.4}
                  />
                </View>
                <Text style={styles.actionCardText}>
                  Check In
                </Text>
              </TouchableOpacity>

              {/* Check Out card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.actionCard,
                  isCheckedIn ? styles.checkOutCardActive : styles.checkOutCardDisabled,
                ]}
                onPress={handleCheckOutPress}
                disabled={!isCheckedIn}
              >
                <View style={styles.actionIconCircle}>
                  <LogOut
                    size={wp(5.8)}
                    color={isCheckedIn ? '#FFFFFF' : '#94A3B8'}
                    strokeWidth={2.4}
                  />
                </View>
                <Text
                  style={[
                    styles.actionCardText,
                    !isCheckedIn && { color: '#94A3B8' },
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
                  {todayRecord?.workingHoursFormatted || '—'}
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

              <TouchableOpacity activeOpacity={0.7}>
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
              onPress={() => navigation.navigate('Attendance')}
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

      {/* Confirm Check In Modal */}
      <Modal
        visible={isCheckInModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCheckInModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setIsCheckInModalVisible(false)}
          />
          <View style={styles.modalCard}>
            {/* Header */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Confirm check in</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.modalCloseBtn}
                onPress={() => setIsCheckInModalVisible(false)}
              >
                <X size={wp(5.2)} color="#64748B" strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            {/* Time Box with Check-in Icon */}
            <View style={styles.modalTimeBox}>
              <View style={styles.modalTimeIconBox}>
                <LogIn size={wp(5.6)} color="#065F46" strokeWidth={2.4} />
              </View>
              <View style={styles.modalTimeCol}>
                <Text style={styles.modalTimeLabel}>Current Time</Text>
                <Text style={styles.modalTimeValue}>{currentTime}</Text>
              </View>
            </View>

            {/* Explanatory description line */}
            <Text style={styles.modalPromptText}>
              Are you sure you want to record your check in for today? Your attendance status will be calculated based on this timestamp.
            </Text>

            {/* Action Buttons */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.modalCancelBtn}
                onPress={() => setIsCheckInModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              {/* Check in now button styled as requested */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.modalConfirmBtn}
                onPress={handleConfirmCheckIn}
              >
                <LogIn size={wp(4.6)} color="#065F46" strokeWidth={2.5} />
                <Text style={styles.modalConfirmText}>Check in now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DashboardScreen;
