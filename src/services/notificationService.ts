import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useSettingsStore } from '../store/useSettingsStore';
import { CHANNEL_ID } from '../constants/constants';

export const initNotifications = async () => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Idle Alerts',
    importance: AndroidImportance.HIGH,
  });
};

export const sendIdleNotification = async () => {
  await notifee.displayNotification({
    title: 'No movement detected',
    body: 'You have been inactive for a while. Tap to stop location tracking.',
    android: {
      channelId: CHANNEL_ID,
      pressAction: { id: 'default' },
    },
    data: {
      type: 'idle',
    },
  });
};

export const listenToNotificationEvents = () => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (
      type === EventType.PRESS &&
      detail.notification?.data?.type === 'idle'
    ) {
      console.log('🔕 User tapped idle notification — stopping tracking');
      useSettingsStore.getState().setTrackingEnabled(false);
    }
  });
};
