import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';
import { StackNavigation } from './src/navigation/Stacknavigation';
import { customToastConfig } from './src/components';

function App(): React.JSX.Element {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StackNavigation />
        <Toast config={customToastConfig} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;