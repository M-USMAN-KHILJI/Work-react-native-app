import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PASSWORD_KEY = '@workpulse_user_password';
const DEFAULT_PASSWORD = '1234'; // Default password from Login screen

export interface PasswordValidationResult {
  currentPasswordError?: string;
  newPasswordError?: string;
  confirmPasswordError?: string;
}

export function useChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<PasswordValidationResult>({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Password rules validation:
  // At least 8 characters, with a letter, a number, and a special character.
  // Must be different from the current one.
  const validateNewPasswordRules = (pwd: string): boolean => {
    if (pwd.length < 8) return false;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    return hasLetter && hasNumber && hasSpecial;
  };

  const updatePassword = async (): Promise<{ success: boolean; message: string }> => {
    const newErrors: PasswordValidationResult = {};

    // Get current stored password
    const savedPassword = (await AsyncStorage.getItem(USER_PASSWORD_KEY)) || DEFAULT_PASSWORD;

    // 1. Verify Current Password
    if (!currentPassword) {
      newErrors.currentPasswordError = 'Please enter your current password.';
    } else if (currentPassword !== savedPassword) {
      newErrors.currentPasswordError = 'Incorrect current password.';
    }

    // 2. Validate New Password
    if (!newPassword) {
      newErrors.newPasswordError = 'Please enter a new password.';
    } else if (newPassword === currentPassword) {
      newErrors.newPasswordError = 'New password must be different from current password.';
    } else if (!validateNewPasswordRules(newPassword)) {
      newErrors.newPasswordError =
        'Must be at least 8 characters, with a letter, a number, and a special character.';
    }

    // 3. Validate Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPasswordError = 'Please confirm your new password.';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPasswordError = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return { success: false, message: 'Please correct the errors before updating.' };
    }

    setIsUpdating(true);
    try {
      await AsyncStorage.setItem(USER_PASSWORD_KEY, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      setIsUpdating(false);
      return { success: true, message: 'Password updated successfully!' };
    } catch (e) {
      setIsUpdating(false);
      return { success: false, message: 'Failed to save password. Please try again.' };
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    isUpdating,
    updatePassword,
  };
}

