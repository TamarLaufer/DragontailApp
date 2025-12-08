import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import {
  initNotifications,
  listenToNotificationEvents,
} from './src/services/notificationService';

export default function App() {
  useEffect(() => {
    initNotifications();
    const unsubscribe = listenToNotificationEvents();

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
