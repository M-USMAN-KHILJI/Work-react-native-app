import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/Stacknavigation';
import { useAppDispatch, logout } from '../redux';

/**
 * useDrawer — manages drawer open state, avatar dropdown state, and shared logout logic.
 * Eliminates duplication across Dashboard, Attendance, Contracts, Profile screens.
 */
export function useDrawer() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Dispatch Redux logout action
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    openDrawer,
    closeDrawer,
    isDropdownOpen,
    setIsDropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleLogout,
    navigation,
  };
}
