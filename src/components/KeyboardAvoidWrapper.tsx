import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface KeyboardAvoidWrapperProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  keyboardVerticalOffset?: number;
  behavior?: 'height' | 'position' | 'padding';
  style?: ViewStyle;
}

export const KeyboardAvoidWrapper: React.FC<KeyboardAvoidWrapperProps> = ({
  children,
  contentContainerStyle,
  keyboardVerticalOffset = 0,
  behavior = Platform.OS === 'ios' ? 'padding' : undefined,
  style,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.container, style]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidWrapper;

