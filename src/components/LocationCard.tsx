import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
} from 'react-native';
import { Location } from '../types/locationTypes';
import { useLocationStore } from '../store/useLocationStore';

type Props = {
  location: Location;
};

export const LocationCard: React.FC<Props> = ({ location }) => {
  const deleteLocation = useLocationStore(state => state.deleteLocation);

  const openMaps = () => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    Linking.openURL(url);
  };

  const shareLocation = async () => {
    await Share.share({
      message: `Location:
https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
    });
  };

  const confirmDelete = () => {
    Alert.alert('Delete Location', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteLocation(location.id),
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📍 Location</Text>

      <Text>Latitude: {location.latitude.toFixed(5)}</Text>
      <Text>Longitude: {location.longitude.toFixed(5)}</Text>

      <Text style={styles.time}>
        {new Date(location.timestamp).toLocaleTimeString()}
      </Text>

      {location.accuracy && (
        <Text style={styles.accuracy}>
          Accuracy: ±{Math.round(location.accuracy)}m
        </Text>
      )}

      <View style={styles.actions}>
        <TouchableOpacity onPress={openMaps}>
          <Text style={styles.action}>🗺️ Map</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareLocation}>
          <Text style={styles.action}>📤 Share</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete}>
          <Text style={[styles.action, styles.delete]}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: '600',
    marginBottom: 6,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
  accuracy: {
    fontSize: 12,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  action: {
    color: '#007AFF',
    fontWeight: '500',
  },
  delete: {
    color: '#D00000',
  },
});
