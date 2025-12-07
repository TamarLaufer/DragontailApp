import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useSettingsStore } from '../store/useSettingsStore';

const CHANNEL_ID = 'idle-channel';

/**
 * יצירת ערוץ נוטיפיקציות בהרצה ראשונית של האפליקציה
 */
export const initNotifications = async () => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Idle Alerts',
    importance: AndroidImportance.HIGH,
  });
};

/**
 * שליחת נוטיפיקציה כאשר המשתמש לא זז
 */
export const sendIdleNotification = async () => {
  await notifee.displayNotification({
    title: 'No movement detected',
    body: 'You have been inactive for a while. Tap to stop location tracking.',
    android: {
      channelId: 'idle-channel',
      pressAction: { id: 'default' },
    },
    data: {
      type: 'idle',
    },
  });
};

/**
 * האזנה ללחיצה על נוטיפיקציה
 * כשנלחץ — מכבים את tracking
 */
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
