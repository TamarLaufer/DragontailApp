import React, { useEffect } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { Location } from '../types/locationTypes';
import { LocationCard } from '../components/LocationCard';
import { useIdleDetection } from '../hooks/useIdleDetection';
import { sendIdleNotification } from '../services/notificationService';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSettingsStore } from '../store/useSettingsStore';

const HomeScreen = () => {
  const { data, loading, error } = useLocation();
  const { isIdle } = useIdleDetection(data);
  const notificationSentRef = useRef(false);
  const navigation = useNavigation();
  const notificationsEnabled = useSettingsStore(
    state => state.notificationsEnabled,
  );
  const trackingEnabled = useSettingsStore(state => state.trackingEnabled);

  useEffect(() => {
    if (
      isIdle &&
      notificationsEnabled &&
      trackingEnabled &&
      !notificationSentRef.current
    ) {
      sendIdleNotification();
      notificationSentRef.current = true;
    }
  }, [isIdle, notificationsEnabled, trackingEnabled]);

  useEffect(() => {
    if (!isIdle) {
      notificationSentRef.current = false;
    }
  }, [isIdle]);

  const renderItem = ({ item }: { item: Location }) => (
    <LocationCard location={item} />
  );

  if (loading) {
    return <Text style={styles.center}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.center}>{error}</Text>;
  }

  return (
    <>
      {isIdle && notificationsEnabled && (
        <View style={styles.idleBanner}>
          <Text style={styles.idleText}>⚠️ User is inactive</Text>
        </View>
      )}
      <Text
        style={styles.settingsLink}
        onPress={() => navigation.navigate('Settings' as never)}
      >
        ⚙️ Settings
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  idleBanner: {
    backgroundColor: '#ffe4e4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  idleText: {
    color: '#b00020',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsLink: {
    textAlign: 'right',
    color: '#007AFF',
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 16,
  },
});
