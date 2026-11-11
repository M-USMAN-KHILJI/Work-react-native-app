import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, User, Mail, Briefcase, Building, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomDrawer } from '../../../navigation/Drawernavigation';
import type { RootStackParamList } from '../../../navigation/Stacknavigation';
import { colors, hp, wp, radius } from '../../../constants/display';

export const MyProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
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
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>U</Text>
          </View>
          <Text style={styles.profileName}>Usman Khurram</Text>
          <Text style={styles.profileRole}>Software Engineer · Employee</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Active Employee</Text>
          </View>
        </View>

        {/* Profile Info Fields */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionHeading}>PERSONAL DETAILS</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Mail size={wp(4.5)} color="#0284C7" />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>usman.khurram@senew-tech.com</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Briefcase size={wp(4.5)} color="#10B981" />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Department</Text>
              <Text style={styles.infoValue}>Engineering & Product</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Building size={wp(4.5)} color="#8B5CF6" />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Office Location</Text>
              <Text style={styles.infoValue}>Headquarters (Floor 3)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Calendar size={wp(4.5)} color="#F59E0B" />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Join Date</Text>
              <Text style={styles.infoValue}>November 2026</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={handleLogout}
        activeRoute="Profile"
      />
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuButton: {
    padding: wp(1.5),
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    padding: wp(1.5),
  },
  content: {
    padding: wp(5),
  },
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: wp(6),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: hp(2.5),
  },
  avatarLarge: {
    width: wp(18),
    height: wp(18),
    borderRadius: radius.full,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  avatarLargeText: {
    fontSize: hp(2.8),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: hp(2.2),
    fontWeight: '800',
    color: '#0F172A',
  },
  profileRole: {
    fontSize: hp(1.35),
    color: '#64748B',
    marginTop: hp(0.3),
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: radius.full,
    marginTop: hp(1.5),
  },
  statusBadgeText: {
    fontSize: hp(1.2),
    fontWeight: '700',
    color: '#059669',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.xl,
    padding: wp(5),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: hp(1.25),
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: hp(1.8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.8),
  },
  infoIconBox: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: radius.md,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: hp(1.2),
    color: '#64748B',
  },
  infoValue: {
    fontSize: hp(1.45),
    fontWeight: '700',
    color: '#1E293B',
    marginTop: hp(0.2),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: hp(1),
  },
});

