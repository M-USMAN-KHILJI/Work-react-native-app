import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { CheckCircle2 } from 'lucide-react-native';
import { StackNavigation } from './src/navigation/Stacknavigation';
import { hp, wp, radius } from './src/constants/display';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <View style={styles.toastContainer}>
      <View style={styles.toastLeftAccent} />
      <View style={styles.toastIconBox}>
        <CheckCircle2 size={wp(5.2)} color="#0284C7" strokeWidth={2.4} />
      </View>
      <View style={styles.toastContent}>
        {props.text1 ? <Text style={styles.toastTitle}>{props.text1}</Text> : null}
        {props.text2 ? <Text style={styles.toastSubtitle}>{props.text2}</Text> : null}
      </View>
    </View>
  ),
};

function App(): React.JSX.Element {
  useEffect(() => {
    // Lock orientation to portrait so the user cannot rotate the screen
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StackNavigation />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  toastContainer: {
    width: '92%',
    backgroundColor: '#F0F9FF',
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: '#BAE6FD',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
  },
  toastLeftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#0284C7',
  },
  toastIconBox: {
    marginLeft: wp(1.5),
    marginRight: wp(3),
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(4.25),
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContent: {
    flex: 1,
  },
  toastTitle: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#0369A1',
    letterSpacing: -0.2,
  },
  toastSubtitle: {
    fontSize: hp(1.3),
    color: '#0284C7',
    marginTop: hp(0.2),
    fontWeight: '500',
  },
});

export default App;
