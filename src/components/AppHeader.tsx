import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Menu, ArrowLeft, Bell, User, LogOut } from 'lucide-react-native';
import { Avatar } from '@kolking/react-native-avatar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/Stacknavigation';
import { colors, fontSize, radius, hp, wp } from '../constants/display';
import { CustomText as Text } from './CustomText';
import { CustomTouchableOpacity as TouchableOpacity } from './CustomTouchableOpacity';
import { useAppDispatch, useAppSelector, logout } from '../redux';

export interface AppHeaderProps {
  onOpenDrawer?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onPressNotification?: () => void;
  onOpenProfile?: () => void;
  onLogout?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenDrawer,
  showBackButton = false,
  onBackPress,
  onPressNotification,
  onOpenProfile,
  onLogout,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = user?.name || 'Usman Khurram';

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    if (onOpenProfile) {
      onOpenProfile();
    } else {
      navigation.navigate('Profile', { fromDropdown: true });
    }
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.topBar}>
      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={handleBack}
        >
          <ArrowLeft size={wp(6)} color={colors.textPrimary} strokeWidth={2.2} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menuButton}
          onPress={onOpenDrawer}
        >
          <Menu size={wp(6)} color={colors.textPrimary} strokeWidth={2.2} />
        </TouchableOpacity>
      )}

      <View style={styles.topRightActions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bellButton}
          onPress={onPressNotification}
        >
          <Bell size={wp(5.2)} color={colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.avatarButton}
          onPress={() => setIsDropdownOpen((prev) => !prev)}
        >
          <Avatar
            name={userName}
            size={wp(9)}
            color={colors.primaryHover}
            textStyle={styles.avatarText}
          />
        </TouchableOpacity>

        {/* Dropdown Menu */}
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
                onPress={handleProfileClick}
              >
                <User size={wp(4.5)} color="#475569" strokeWidth={2} />
                <Text style={styles.dropdownItemText}>My Profile</Text>
              </TouchableOpacity>

              <View style={styles.dropdownItemDivider} />

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.dropdownItem}
                onPress={handleLogoutClick}
              >
                <LogOut size={wp(4.5)} color="#DC2626" strokeWidth={2} />
                <Text style={[styles.dropdownItemText, { color: '#DC2626' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    zIndex: 100,
  },
  menuButton: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    position: 'relative',
    zIndex: 100,
  },
  bellButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.textWhite,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: -hp(10),
    bottom: -hp(100),
    left: -wp(100),
    right: -wp(100),
    zIndex: 998,
  },
  avatarDropdownMenu: {
    position: 'absolute',
    top: hp(5.2),
    right: 0,
    width: wp(42),
    backgroundColor: colors.cardBackground,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: hp(0.6),
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.3),
    gap: wp(2.8),
  },
  dropdownItemText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dropdownItemDivider: {
    height: 1,
    backgroundColor: colors.borderDivider,
    marginVertical: hp(0.3),
  },
});

export default AppHeader;
