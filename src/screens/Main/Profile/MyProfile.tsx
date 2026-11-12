import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, User, Mail, Briefcase, Building, Calendar } from 'lucide-react-native';

import { CustomDrawer } from '../../../navigation/Drawernavigation';
import { colors, hp, wp, radius } from '../../../constants/display';
import { useDrawer } from '../../../hooks';
import { styles } from './style';

export const MyProfileScreen: React.FC = () => {
  const { isDrawerOpen, openDrawer, closeDrawer, handleLogout } = useDrawer();

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
        onClose={closeDrawer}
        onLogout={handleLogout}
        activeRoute="Profile"
      />
    </SafeAreaView>
  );
};

export default MyProfileScreen;

