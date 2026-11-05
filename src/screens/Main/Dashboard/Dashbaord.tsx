import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  
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
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, hp, wp } from '../../../constants/display';
import { styles } from './style';

export const DashboardScreen: React.FC = () => {
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const [currentTime, setCurrentTime] = useState<string>(formatTime());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Application Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
          <Menu size={wp(6)} color={colors.textPrimary} strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={styles.topRightActions}>
          <TouchableOpacity activeOpacity={0.7} style={styles.bellButton}>
            <Bell size={wp(5.2)} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>UK</Text>
          </View>
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
            <Text style={styles.heroDate}>Thursday • November 2026</Text>
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
                <Text style={styles.heroPillText}>4 working days</Text>
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

            {/* Status Informational Banner (Not checked in yet) */}
            <View style={styles.statusBanner}>
              <Text style={styles.statusBannerTitle}>Not checked in yet</Text>
              <Text style={styles.statusBannerSub}>
                Tap Check In to start your day. Location is required and must be inside the office radius.
              </Text>
            </View>

            {/* Check In & Check Out Action Cards matching image */}
            <View style={styles.actionButtonsRow}>
              {/* Check In card without tick */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.actionCard, styles.checkInCardDisabled]}
                onPress={() => setIsCheckedIn(true)}
              >
                <View style={styles.actionIconCircle}>
                  <LogIn size={wp(5.8)} color="#FFFFFF" strokeWidth={2.4} />
                </View>
                <Text style={styles.actionCardText}>Check In</Text>
              </TouchableOpacity>

              {/* Check Out card */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.actionCard, styles.checkOutCardActive]}
                onPress={() => setIsCheckedIn(false)}
              >
                <View style={styles.actionIconCircle}>
                  <LogOut size={wp(5.8)} color="#FFFFFF" strokeWidth={2.4} />
                </View>
                <Text style={styles.actionCardText}>Check Out</Text>
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
                <Text style={styles.metricValue}>10:11 AM</Text>
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
                <Text style={styles.metricValue}>—</Text>
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
                <Text style={styles.metricValue}>—</Text>
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
                <Text style={styles.metricValue}>—</Text>
              </View>
            </LinearGradient>
          </View>

          {/* 4. This Month Attendance Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionPreTitle}>THIS MONTH</Text>
                <Text style={styles.sectionMainTitle}>November 2026</Text>
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
                  <Text style={styles.rateLabel}>
                    <Text style={styles.rateLabelIcon}>📈  </Text>
                    ATTENDANCE RATE
                  </Text>
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
                <Text style={styles.statsNumber}>4</Text>
                <Text style={styles.statsLabel}>Present</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>0</Text>
                <Text style={styles.statsLabel}>Late</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>0</Text>
                <Text style={styles.statsLabel}>Half Leave</Text>
              </View>
              <View style={styles.statsGridItem}>
                <Text style={styles.statsNumber}>0</Text>
                <Text style={styles.statsLabel}>Leave</Text>
              </View>
            </View>
          </View>

          {/* 5. Paid Leaves Section */}
          <View style={styles.sectionCard}>
            <View style={styles.leavesHeaderTitleRow}>
              <Calendar size={wp(4.2)} color="#3B4FC8" />
              <Text style={styles.leavesHeaderTitle}>Paid Leaves (Current Contract)</Text>
            </View>

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
              <Text style={styles.leaveDetailLabel}>November 2026 • 0 paid leave per month</Text>
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

          {/* 6. Quick Links */}
          <View style={styles.quickLinksCard}>
            <View style={styles.quickLinksHeaderRow}>
              <View>
                <Text style={styles.quickLinksTitle}>Quick links</Text>
                <Text style={styles.quickLinksSub}>Jump to your modules</Text>
              </View>
              <FileText size={wp(5)} color="#0284C7" />
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.quickLinkItem}>
              <View style={styles.quickLinkLeft}>
                <Calendar size={wp(4.2)} color="#0D9488" />
                <Text style={styles.quickLinkText}>Attendance overview</Text>
              </View>
              <ChevronRight size={wp(4.5)} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
