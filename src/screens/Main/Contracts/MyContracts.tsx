import React, { useState } from 'react';
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
  FileText,
  Calendar,
  Wallet,
  Briefcase,
  History,
  ListFilter,
  Inbox,
  User,
  LogOut,
} from 'lucide-react-native';
import {
  CustomText as Text,
  CustomTouchableOpacity as TouchableOpacity,
} from '../../../components';
import { CustomDrawer } from '../../../navigation/Drawernavigation';
import { colors, hp, wp } from '../../../constants/display';
import { useDrawer } from '../../../hooks';
import { styles } from './style';

export const MyContractsScreen: React.FC = () => {
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
                  <User size={wp(4.2)} color="#475569" strokeWidth={2} />
                  <Text style={styles.dropdownItemText}>My Profile</Text>
                </TouchableOpacity>

                <View style={styles.dropdownItemDivider} />

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <LogOut size={wp(4.2)} color="#DC2626" strokeWidth={2} />
                  <Text style={[styles.dropdownItemText, { color: '#DC2626' }]}>
                    Log Out
                  </Text>
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
        <View style={styles.body}>
          {/* 1. Hero Gradient Banner */}
          <LinearGradient
            colors={['#0F766E', '#0284C7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBanner}
          >
            <View style={styles.heroCategoryRow}>
              <FileText size={wp(4.2)} color="#FFFFFF" strokeWidth={2.2} />
              <Text style={styles.heroCategoryText}>Contracts</Text>
            </View>
            <Text style={styles.heroTitle}>My contracts</Text>
            <Text style={styles.heroSubtitle}>
              Your current contract is pinned at the top. Past and upcoming contracts appear below.
            </Text>
          </LinearGradient>

          {/* 2. Active Contract Card */}
          <View style={styles.activeCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.headerIconBox}>
                <FileText size={wp(5.2)} color="#059669" strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Active contract</Text>
                <Text style={styles.headerSub}>Your current employment terms</Text>
              </View>
            </View>

            <View style={styles.contractDetailsContainer}>
              <View style={styles.roleHeaderRow}>
                <Text style={styles.roleTitle}>Intern</Text>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>Active</Text>
                </View>
                <View style={styles.internPill}>
                  <Text style={styles.internPillText}>Intern</Text>
                </View>
              </View>

              <Text style={styles.contractIdText}>CNT-261318</Text>

              {/* Info Mini Cards */}
              <View style={styles.infoBoxesGroup}>
                {/* Duration */}
                <View style={styles.infoMiniBox}>
                  <View style={styles.infoMiniLabelRow}>
                    <Calendar size={wp(4)} color="#64748B" strokeWidth={2} />
                    <Text style={styles.infoMiniLabel}>Duration</Text>
                  </View>
                  <Text style={styles.infoMiniValue}>Jun 15, 2026 – Open</Text>
                </View>

                {/* Salary */}
                <View style={styles.infoMiniBox}>
                  <View style={styles.infoMiniLabelRow}>
                    <Wallet size={wp(4)} color="#64748B" strokeWidth={2} />
                    <Text style={styles.infoMiniLabel}>Salary</Text>
                  </View>
                  <Text style={styles.infoMiniValue}>PKR 1</Text>
                </View>

                {/* Paid Leaves */}
                <View style={styles.infoMiniBox}>
                  <View style={styles.infoMiniLabelRow}>
                    <Briefcase size={wp(4)} color="#64748B" strokeWidth={2} />
                    <Text style={styles.infoMiniLabel}>Paid Leaves</Text>
                  </View>
                  <Text style={styles.infoMiniValue}>Not allowed</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 3. Previous Contracts Card */}
          <View style={styles.previousCard}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.headerIconBox, { backgroundColor: '#E0F2FE' }]}>
                <History size={wp(5.2)} color="#0284C7" strokeWidth={2.2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Previous contracts</Text>
                <Text style={styles.headerSub}>
                  Scheduled, completed, and cancelled contracts
                </Text>
              </View>
            </View>

            {/* Records Counter Pill */}
            <View style={styles.recordsPillRow}>
              <View style={styles.recordsPill}>
                <ListFilter size={wp(3.5)} color="#64748B" strokeWidth={2.2} />
                <Text style={styles.recordsPillText}>0 records</Text>
              </View>
            </View>

            {/* Empty State */}
            <View style={styles.emptyStateBox}>
              <View style={styles.emptyIconCircle}>
                <Inbox size={wp(6)} color="#94A3B8" strokeWidth={1.8} />
              </View>
              <Text style={styles.emptyStateText}>No previous contracts</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onLogout={handleLogout}
        activeRoute="Contracts"
      />
    </SafeAreaView>
  );
};

export default MyContractsScreen;
