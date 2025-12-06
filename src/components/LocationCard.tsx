import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Location } from '../src/types/locationTypes';

type Props = {
  location: Location;
};

export const LocationCard: React.FC<Props> = ({ location }) => {
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
});
