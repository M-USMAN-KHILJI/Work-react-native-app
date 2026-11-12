import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  Bell,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  XCircle,
  HelpCircle,
  Info,
  UserCheck,
  Send,
  LogOut,
  User,
  Plane,
  UserX,
  CalendarDays,
  ChevronsUpDown,
  Inbox,
  History,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  CustomText as Text,
  CustomTouchableOpacity as TouchableOpacity,
} from '../../../components';
import { CustomDrawer } from '../../../navigation/Drawernavigation';
import type { RootStackParamList } from '../../../navigation/Stacknavigation';
import { colors, hp, wp } from '../../../constants/display';
import { ATTENDANCE_RULES_LIST } from '../../../utils/attendanceRules';
import {
  StoredAttendanceRecord,
  getAttendanceHistory,
} from '../../../utils/attendanceStore';
import { computeRecordRules } from '../../../utils/recordCalculator';
import { styles } from './style';

type AttendanceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Attendance'>;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const YEARS = ['2026', '2025', '2024'];

export const MyAttendanceScreen: React.FC = () => {
  const navigation = useNavigation<AttendanceNavigationProp>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamic current date defaults
  const currentDate = new Date();
  const currentMonthName = MONTHS[currentDate.getMonth()];
  const currentYearStr = String(currentDate.getFullYear());

  // Filters
  const [reportType, setReportType] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthName);
  const [selectedYear, setSelectedYear] = useState<string>(currentYearStr);

  // Dynamic history from attendance store
  const [historyRecords, setHistoryRecords] = useState<StoredAttendanceRecord[]>([]);

  const loadHistory = async () => {
    const list = await getAttendanceHistory();
    setHistoryRecords(list);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  // Filter records based on selected month and year, computing dynamic rules for each record
  const filteredRecords = historyRecords
    .filter((rec) => {
      const recYear = rec.date.split('-')[0];
      const recMonthIndex = parseInt(rec.date.split('-')[1], 10) - 1;
      const recMonthName = MONTHS[recMonthIndex];

      if (reportType === 'Yearly') {
        return recYear === selectedYear;
      }
      return recYear === selectedYear && recMonthName === selectedMonth;
    })
    .map((rec) => {
      // Recompute rules dynamically from check-in & check-out times
      const computed = computeRecordRules(
        rec.checkInTimeFormatted,
        rec.checkOutTimeFormatted
      );
      return {
        ...rec,
        workingHoursFormatted: computed.workingHours,
        extraHoursFormatted: computed.extraHours,
        lateByFormatted: computed.lateBy,
        statuses: computed.statuses,
      };
    });

  // Calculate live dynamic counts from filtered records
  const presentCount = filteredRecords.filter((r) => r.statuses.includes('Present')).length;
  const lateCount = filteredRecords.filter((r) => r.statuses.includes('Late')).length;
  const shortLeaveCount = filteredRecords.filter((r) => r.statuses.includes('Short Leave')).length;
  const halfLeaveCount = filteredRecords.filter((r) => r.statuses.includes('Half Leave')).length;
  const leaveCount = filteredRecords.filter((r) => r.statuses.includes('Leave')).length;
  const workingDaysCount = filteredRecords.length;

  // Dropdown open states
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  // Accordion state for rules
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await AsyncStorage.removeItem('@workpulse_remember_me');
    } catch (e) {
      // ignore
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Application Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={() => setIsDrawerOpen(true)}
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
            onPress={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Text style={styles.avatarText}>UK</Text>
          </TouchableOpacity>

          {/* Avatar Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <Pressable
                style={styles.dropdownBackdrop}
                onPress={() => setIsDropdownOpen(false)}
              />
              <View style={styles.avatarDropdownMenu}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.dropdownItem}
                  onPress={() => setIsDropdownOpen(false)}
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
            <Text style={styles.heroPreTitle}>Attendance Module</Text>
            <Text style={styles.heroTitle}>My attendance overview</Text>
            <Text style={styles.heroDescription}>
              Review monthly stats, track every status from Present to Paid Leave, and browse your full attendance history below.
            </Text>

            <View style={styles.heroPillsRow}>
              <View style={styles.heroPill}>
                <Calendar size={wp(3.4)} color="#FFFFFF" />
                <Text style={styles.heroPillText}>
                  {reportType === 'Monthly' ? 'Monthly view' : 'Yearly view'}
                </Text>
              </View>

              <View style={styles.heroPill}>
                <TrendingUp size={wp(3.4)} color="#FFFFFF" />
                <Text style={styles.heroPillText}>100% rate</Text>
              </View>

              <View style={styles.heroPill}>
                <Briefcase size={wp(3.4)} color="#FFFFFF" />
                <Text style={styles.heroPillText}>8 working days</Text>
              </View>
            </View>

            <View style={styles.monthSelectorButton}>
              <Calendar size={wp(4.2)} color={colors.textPrimary} />
              <Text style={styles.monthSelectorButtonText}>
                {reportType === 'Monthly' ? `${selectedMonth} ${selectedYear}` : selectedYear}
              </Text>
            </View>

            <Text style={styles.heroFooterHint}>Selected recording period</Text>
          </LinearGradient>

          {/* 2. My Attendance Report Filter Card */}
          <View style={styles.reportCard}>
            <View style={styles.reportHeaderRow}>
              <View style={styles.reportIconBox}>
                <FileText size={wp(5)} color="#0284C7" strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.reportTitle}>My Attendance Report</Text>
                <Text style={styles.reportSub}>
                  Monthly breakdown — Present, Late, Short Leave, Half Leave, Leave & Paid Leave
                </Text>
              </View>
            </View>

            {/* Select Report View Type (Monthly / Yearly) */}
            <View style={styles.selectorWrapper}>
              <Text style={styles.selectorLabel}>REPORT TYPE</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.selectorButton}
                onPress={() => {
                  setIsTypeOpen((prev) => !prev);
                  setIsMonthOpen(false);
                  setIsYearOpen(false);
                }}
              >
                <Text style={styles.selectorButtonText}>{reportType}</Text>
                {isTypeOpen ? (
                  <ChevronUp size={wp(4.5)} color="#64748B" />
                ) : (
                  <ChevronDown size={wp(4.5)} color="#64748B" />
                )}
              </TouchableOpacity>

              {isTypeOpen && (
                <View style={styles.dropdownOptionsList}>
                  {(['Monthly', 'Yearly'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.dropdownOptionItem,
                        reportType === type && styles.dropdownOptionItemActive,
                      ]}
                      onPress={() => {
                        setReportType(type);
                        setIsTypeOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          reportType === type && styles.dropdownOptionTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Select Month (shown when Monthly is chosen) */}
            {reportType === 'Monthly' && (
              <View style={styles.selectorWrapper}>
                <Text style={styles.selectorLabel}>MONTH</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.selectorButton}
                  onPress={() => {
                    setIsMonthOpen((prev) => !prev);
                    setIsTypeOpen(false);
                    setIsYearOpen(false);
                  }}
                >
                  <Text style={styles.selectorButtonText}>{selectedMonth}</Text>
                  {isMonthOpen ? (
                    <ChevronUp size={wp(4.5)} color="#64748B" />
                  ) : (
                    <ChevronDown size={wp(4.5)} color="#64748B" />
                  )}
                </TouchableOpacity>

                {isMonthOpen && (
                  <View style={styles.dropdownOptionsList}>
                    {MONTHS.map((m) => (
                      <TouchableOpacity
                        key={m}
                        style={[
                          styles.dropdownOptionItem,
                          selectedMonth === m && styles.dropdownOptionItemActive,
                        ]}
                        onPress={() => {
                          setSelectedMonth(m);
                          setIsMonthOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            selectedMonth === m && styles.dropdownOptionTextActive,
                          ]}
                        >
                          {m}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Select Year */}
            <View style={styles.selectorWrapper}>
              <Text style={styles.selectorLabel}>YEAR</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.selectorButton}
                onPress={() => {
                  setIsYearOpen((prev) => !prev);
                  setIsTypeOpen(false);
                  setIsMonthOpen(false);
                }}
              >
                <Text style={styles.selectorButtonText}>{selectedYear}</Text>
                {isYearOpen ? (
                  <ChevronUp size={wp(4.5)} color="#64748B" />
                ) : (
                  <ChevronDown size={wp(4.5)} color="#64748B" />
                )}
              </TouchableOpacity>

              {isYearOpen && (
                <View style={styles.dropdownOptionsList}>
                  {YEARS.map((y) => (
                    <TouchableOpacity
                      key={y}
                      style={[
                        styles.dropdownOptionItem,
                        selectedYear === y && styles.dropdownOptionItemActive,
                      ]}
                      onPress={() => {
                        setSelectedYear(y);
                        setIsYearOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          selectedYear === y && styles.dropdownOptionTextActive,
                        ]}
                      >
                        {y}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* 3. Attendance Rate Card */}
          <View style={styles.rateSnapshotBox}>
            <View style={styles.rateTopRow}>
              <View
                style={[
                  styles.rateBadge,
                  workingDaysCount === 0 && { backgroundColor: colors.rateZeroBg },
                ]}
              >
                <Text style={styles.rateBadgeText}>
                  {workingDaysCount === 0 ? '0%' : '100%'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rateLabelRow}>
                  <TrendingUp
                    size={wp(3.8)}
                    color={workingDaysCount === 0 ? colors.rateZeroBg : '#0D9488'}
                    strokeWidth={2.4}
                  />
                  <Text
                    style={[
                      styles.rateLabel,
                      workingDaysCount === 0 && { color: colors.rateZeroBg },
                    ]}
                  >
                    ATTENDANCE RATE
                  </Text>
                </View>
                {/* Shows Current selected month and year */}
                <Text style={styles.rateMonthTitle}>
                  {reportType === 'Monthly'
                    ? `${selectedMonth} ${selectedYear}`
                    : `Year ${selectedYear}`}
                </Text>
                <Text style={styles.rateSub}>Monthly performance snapshot</Text>
              </View>
            </View>

            {/* Working days container under current month and year */}
            <View style={styles.workingDaysCard}>
              <View style={styles.workingDaysIconBox}>
                <Briefcase size={wp(4.8)} color="#64748B" strokeWidth={2} />
              </View>
              <View>
                <Text style={styles.workingDaysLabel}>Working days</Text>
                <Text style={styles.workingDaysCount}>{workingDaysCount}</Text>
              </View>
            </View>

            {/* Progress Bar under working day */}
            <View style={styles.progressRow}>
              <Text style={styles.progressTextLeft}>Period progress</Text>
              <Text style={styles.progressTextRight}>
                {workingDaysCount === 0 ? '0% attended' : '100% attended'}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: workingDaysCount === 0 ? '0%' : '100%' },
                ]}
              />
            </View>
          </View>

          {/* 4. 8-Grid Attendance Metric Cards */}
          <View style={styles.statsGrid}>
            {/* 1. Present */}
            <View style={[styles.statCard, styles.cardPresent]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#DCFCE7' }]}>
                  <CalendarDays size={wp(5.2)} color="#059669" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>PRESENT</Text>
                  <Text style={styles.statNumber}>{presentCount}</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                Includes Late · {selectedMonth} {selectedYear}
              </Text>
            </View>

            {/* 2. Late */}
            <View style={[styles.statCard, styles.cardLate]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#FFEDD5' }]}>
                  <Clock size={wp(5.2)} color="#EA580C" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>LATE</Text>
                  <Text style={styles.statNumber}>{lateCount}</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                Also in Present · {selectedMonth} {selectedYear}
              </Text>
            </View>

            {/* 3. Short Leave */}
            <View style={[styles.statCard, styles.cardShortLeave]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#FEF3C7' }]}>
                  <AlertTriangle size={wp(5.2)} color="#D97706" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>SHORT LEAVE</Text>
                  <Text style={styles.statNumber}>{shortLeaveCount}</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                {selectedMonth} {selectedYear}
              </Text>
            </View>

            {/* 4. Half Leave */}
            <View style={[styles.statCard, styles.cardHalfLeave]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#E0F2FE' }]}>
                  <Clock size={wp(5.2)} color="#0284C7" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>HALF LEAVE</Text>
                  <Text style={styles.statNumber}>{halfLeaveCount}</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                {selectedMonth} {selectedYear}
              </Text>
            </View>

            {/* 5. Leave */}
            <View style={[styles.statCard, styles.cardLeave]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#FFE4E6' }]}>
                  <UserX size={wp(5.2)} color="#E11D48" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>LEAVE</Text>
                  <Text style={styles.statNumber}>{leaveCount}</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>Unpaid absences</Text>
            </View>

            {/* 6. Leave - Accommodated */}
            <View style={[styles.statCard, styles.cardLeaveAccommodated]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#DCFCE7' }]}>
                  <CalendarDays size={wp(5.2)} color="#059669" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>LEAVE - ACCOMMODATED</Text>
                  <Text style={styles.statNumber}>0</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                Adjusted against flexible work
              </Text>
            </View>

            {/* 7. Paid Leave */}
            <View style={[styles.statCard, styles.cardPaidLeave]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#F3E8FF' }]}>
                  <Plane size={wp(5.2)} color="#9333EA" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>PAID LEAVE</Text>
                  <Text style={styles.statNumber}>0</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>Approved leave</Text>
            </View>

            {/* 8. Remaining Paid Leaves */}
            <View style={[styles.statCard, styles.cardRemainingPaidLeaves]}>
              <View style={styles.statCardRow}>
                <View style={[styles.statIconBox, { backgroundColor: '#E0E7FF' }]}>
                  <Calendar size={wp(5.2)} color="#4F46E5" strokeWidth={2.3} />
                </View>
                <View style={styles.statContentCol}>
                  <Text style={styles.statLabel}>REMAINING PAID LEAVES</Text>
                  <Text style={styles.statNumber}>0</Text>
                </View>
              </View>
              <Text style={styles.statSubtext}>
                {selectedMonth} {selectedYear}
              </Text>
            </View>
          </View>

          {/* 5. Attendance History Table / Empty State */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyIconBox}>
                <Clock size={wp(5)} color="#0284C7" strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>Attendance History</Text>
                <Text style={styles.historySub}>
                  Daily records for {selectedMonth} {selectedYear} — check-in, hours, and status
                </Text>
              </View>
            </View>

            <View style={styles.historyBadgeRow}>
              <View style={styles.recordPill}>
                <FileText size={wp(3.6)} color="#64748B" />
                <Text style={styles.recordPillText}>{filteredRecords.length} records</Text>
              </View>
            </View>

            {filteredRecords.length === 0 ? (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconBox}>
                  <Inbox size={wp(8.5)} color="#94A3B8" strokeWidth={2} />
                </View>
                <Text style={styles.emptyTitle}>No attendance records</Text>
                <Text style={styles.emptySubtitle}>
                  No records for the selected period. Try another month or year.
                </Text>
              </View>
            ) : (
              <View style={styles.tableContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={styles.tableScrollContent}
                >
                  <View>
                    {/* Table Header Row */}
                    <View style={styles.tableHeaderRow}>
                      <View style={[styles.colDate, styles.colHeaderWithSort]}>
                        <Text style={styles.tableHeaderCol}>Date</Text>
                        <ChevronsUpDown size={wp(3.4)} color="#94A3B8" />
                      </View>
                      <View style={styles.colCheckIn}>
                        <Text style={styles.tableHeaderCol}>Check In</Text>
                      </View>
                      <View style={styles.colCheckOut}>
                        <Text style={styles.tableHeaderCol}>Check Out</Text>
                      </View>
                      <View style={styles.colWorking}>
                        <Text style={styles.tableHeaderCol}>Working Hours</Text>
                      </View>
                      <View style={styles.colExtra}>
                        <Text style={styles.tableHeaderCol}>Extra Hours</Text>
                      </View>
                      <View style={styles.colLateBy}>
                        <Text style={styles.tableHeaderCol}>Late By</Text>
                      </View>
                      <View style={styles.colStatus}>
                        <Text style={styles.tableHeaderCol}>Status</Text>
                      </View>
                    </View>

                    {/* Table Data Rows */}
                    {filteredRecords.map((row, index) => (
                      <View
                        key={row.date}
                        style={[styles.tableRow, index % 2 === 1 && styles.tableRowEven]}
                      >
                        {/* Date */}
                        <View style={styles.colDate}>
                          <Text style={styles.tableTextDate}>{row.date}</Text>
                        </View>

                        {/* Check In */}
                        <View style={styles.colCheckIn}>
                          <Text
                            style={
                              row.checkInTimeFormatted === '—'
                                ? styles.tableTextMuted
                                : styles.tableTextRegular
                            }
                          >
                            {row.checkInTimeFormatted}
                          </Text>
                        </View>

                        {/* Check Out */}
                        <View style={styles.colCheckOut}>
                          <Text
                            style={
                              row.checkOutTimeFormatted === '—'
                                ? styles.tableTextMuted
                                : styles.tableTextRegular
                            }
                          >
                            {row.checkOutTimeFormatted}
                          </Text>
                        </View>

                        {/* Working Hours */}
                        <View style={styles.colWorking}>
                          <Text
                            style={
                              row.workingHoursFormatted === '—'
                                ? styles.tableTextMuted
                                : styles.tableTextRegular
                            }
                          >
                            {row.workingHoursFormatted}
                          </Text>
                        </View>

                        {/* Extra Hours */}
                        <View style={styles.colExtra}>
                          <Text
                            style={
                              !row.extraHoursFormatted || row.extraHoursFormatted === '—'
                                ? styles.tableTextMuted
                                : styles.tableTextRegular
                            }
                          >
                            {row.extraHoursFormatted || '—'}
                          </Text>
                        </View>

                        {/* Late By */}
                        <View style={styles.colLateBy}>
                          <Text
                            style={
                              !row.lateByFormatted || row.lateByFormatted === '—'
                                ? styles.tableTextMuted
                                : [styles.tableTextRegular, { color: '#B45309', fontWeight: '700' }]
                            }
                          >
                            {row.lateByFormatted || '—'}
                          </Text>
                        </View>

                        {/* Status Badges */}
                        <View style={styles.colStatus}>
                          <View style={styles.statusBadgesContainer}>
                            {row.statuses.map((st) => (
                              <View
                                key={st}
                                style={[
                                  styles.statusBadge,
                                  st === 'Present' && styles.statusBadgePresent,
                                  st === 'Late' && styles.statusBadgeLate,
                                  st === 'Short Leave' && styles.statusBadgeLate,
                                  st === 'Half Leave' && styles.statusBadgeLate,
                                  st === 'Leave' && styles.statusBadgeLeave,
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.statusBadgeText,
                                    st === 'Present' && styles.statusTextPresent,
                                    (st === 'Late' || st === 'Short Leave' || st === 'Half Leave') &&
                                      styles.statusTextLate,
                                    st === 'Leave' && styles.statusTextLeave,
                                  ]}
                                >
                                  {st}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>

          {/* 6. Attendance Rules Accordion */}
          <View style={styles.rulesCard}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.rulesHeaderRow}
              onPress={() => setIsRulesExpanded((prev) => !prev)}
            >
              <View style={styles.rulesHeaderLeft}>
                <View style={styles.rulesIconBox}>
                  <Info size={wp(5.2)} color="#0284C7" strokeWidth={2.2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rulesTitle}>Attendance rules</Text>
                  <Text style={styles.rulesSub}>
                    How Present, Late, Short Leave, Half Leave, and Leave are calculated
                  </Text>
                </View>
              </View>
              {isRulesExpanded ? (
                <ChevronUp size={wp(4.8)} color="#64748B" strokeWidth={2} />
              ) : (
                <ChevronDown size={wp(4.8)} color="#64748B" strokeWidth={2} />
              )}
            </TouchableOpacity>

            {isRulesExpanded && (
              <View style={styles.rulesContent}>
                {ATTENDANCE_RULES_LIST.map((rule, index) => {
                  const isLast = index === ATTENDANCE_RULES_LIST.length - 1;
                  return (
                    <View key={rule.step} style={styles.timelineItemRow}>
                      {/* Left vertical timeline line + badge */}
                      <View style={styles.timelineCol}>
                        <View style={styles.timelineBadge}>
                          <Text style={styles.timelineBadgeText}>{rule.step}</Text>
                        </View>
                        {!isLast && <View style={styles.timelineLine} />}
                      </View>

                      {/* Right rule text */}
                      <View style={styles.timelineContentCol}>
                        <Text style={styles.timelineRuleText}>{rule.text}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Custom Animated Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={handleLogout}
        activeRoute="Attendance"
      />
    </SafeAreaView>
  );
};

export default MyAttendanceScreen;
