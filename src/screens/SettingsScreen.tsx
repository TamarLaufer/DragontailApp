import React from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import { useSettingsStore } from '../store/useSettingsStore';

const SettingsScreen = () => {
  const idleTimeout = useSettingsStore(state => state.idleTimeout);
  const samplingInterval = useSettingsStore(state => state.samplingInterval);
  const setSamplingInterval = useSettingsStore(
    state => state.setSamplingInterval,
  );
  const [localSampling, setLocalSampling] = React.useState(
    samplingInterval.toString(),
  );

  const notificationsEnabled = useSettingsStore(
    state => state.notificationsEnabled,
  );
  const trackingEnabled = useSettingsStore(state => state.trackingEnabled);

  const setNotificationsEnabled = useSettingsStore(
    state => state.setNotificationsEnabled,
  );
  const setTrackingEnabled = useSettingsStore(
    state => state.setTrackingEnabled,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.row}>
        <Text>Track Location</Text>
        <Switch value={trackingEnabled} onValueChange={setTrackingEnabled} />
      </View>

      <View style={styles.row}>
        <Text>Send Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.info}>
        <Text>Idle timeout: {idleTimeout / 60000} minutes</Text>
      </View>
      <View style={styles.row}>
        <Text>Sampling interval (seconds)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={localSampling}
          onChangeText={text => {
            setLocalSampling(text.replace(/[^0-9]/g, ''));
          }}
          onEndEditing={() => {
            const value = Number(localSampling);
            if (!isNaN(value) && value > 0) {
              setSamplingInterval(value);
            }
          }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    marginTop: 20,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    width: 60,
    textAlign: 'center',
    borderRadius: 4,
  },
});
