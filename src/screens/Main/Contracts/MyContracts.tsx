import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  RefreshControl,
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
  FadeInUp,
  AppHeader,
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Application Bar */}
      <AppHeader
        onOpenDrawer={openDrawer}
        onLogout={handleLogout}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.textLink, '#047498']}
            tintColor={colors.textLink}
          />
        }
      >
        <View style={styles.body}>
          {/* 1. Hero Gradient Banner */}
          <FadeInUp delay={100} duration={650} distance={hp(4)}>
            <LinearGradient
              colors={[...colors.heroGradient]}
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
          </FadeInUp>

          {/* 2. Active Contract Card */}
          <FadeInUp delay={250} duration={750} distance={hp(7)}>
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
          </FadeInUp>

          {/* 3. Previous Contracts Card */}
          <FadeInUp delay={380} duration={800} distance={hp(7)}>
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
          </FadeInUp>
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
