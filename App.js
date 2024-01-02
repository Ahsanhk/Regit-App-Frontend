import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

import LoginScreen from './screens/loginScreen';
import MyComponent from './screens/testScreen';
import RegistrationScreen from './screens/registrationScreen';
import HomeScreen from './screens/homeScreen';
import TopBar from './components/topbar';
import BottomBar from './components/bottomBar';
import { Camera } from 'react-native-camera-kit';
import CameraScreen from './screens/testScreen';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './components/authProvider';

export default function App() {
  return ( 
    <AppProvider>
    <View style={styles.container}> 
      <StatusBar style='auto'/>
      {/* <HomeScreen /> */}
      {/* <MyComponent /> */}
      {/* <LoginScreen /> */}
      {/* <RegistrationScreen /> */}
      <AppNavigator />
    </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  
});
