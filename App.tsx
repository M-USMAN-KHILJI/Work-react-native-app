import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { StackNavigation } from './src/navigation/Stacknavigation';
import { customToastConfig } from './src/components';
import { colors } from './src/constants/display';

function App(): React.JSX.Element {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0096C7" />
          </View>
        }
        persistor={persistor}
      >
        <GestureHandlerRootView style={styles.root}>
          <SafeAreaProvider>
            <StackNavigation />
            <Toast config={customToastConfig} />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bgGradientMid,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
