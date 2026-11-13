import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { LoginScreen } from '../screens/Auth/Login/login';
import { DashboardScreen } from '../screens/Main/Dashboard/Dashbaord';
import { MyAttendanceScreen } from '../screens/Main/Attendance/Myattendance';
import { MyContractsScreen } from '../screens/Main/Contracts/MyContracts';
import { MyProfileScreen } from '../screens/Main/Profile/MyProfile';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  Attendance: { scrollToHistory?: boolean; fromDashboard?: boolean } | undefined;
  Contracts: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Attendance" component={MyAttendanceScreen} />
        <Stack.Screen name="Contracts" component={MyContractsScreen} />
        <Stack.Screen name="Profile" component={MyProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
