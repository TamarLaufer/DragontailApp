import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { Location } from '../types/locationTypes';
import uuid from 'react-native-uuid';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'App needs access to your location',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const startLocationTracking = (
  onLocationUpdate: (location: Location) => void,
  onError: (message: string) => void,
  interval: number,
) => {
  return Geolocation.watchPosition(
    position => {
      const newLocation: Location = {
        id: uuid.v4().toString(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Date.now(),
        accuracy: position.coords.accuracy,
      };

      onLocationUpdate(newLocation);
    },
    error => onError(error.message),
    {
      enableHighAccuracy: true,
      interval,
      fastestInterval: interval,
    },
  );
};

export const stopLocationTracking = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
