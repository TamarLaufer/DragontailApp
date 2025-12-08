import { useEffect, useRef, useState } from 'react';
import {
  requestLocationPermission,
  startLocationTracking,
  stopLocationTracking,
} from '../services/locationService';
import { useLocationStore } from '../store/useLocationStore';
import { useSettingsStore } from '../store/useSettingsStore';

export const useLocation = () => {
  const data = useLocationStore(state => state.locations);
  const addLocation = useLocationStore(state => state.addLocation);
  const trackingEnabled = useSettingsStore(state => state.trackingEnabled);
  const samplingInterval = useSettingsStore(state => state.samplingInterval);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!trackingEnabled) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const allowed = await requestLocationPermission();

      if (!allowed) {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      watchIdRef.current = startLocationTracking(
        location => {
          addLocation(location);
        },
        message => setError(message),
        samplingInterval * 1000,
      );

      setLoading(false);
    };

    init();

    return () => {
      if (watchIdRef.current !== null) {
        stopLocationTracking(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [trackingEnabled, addLocation, samplingInterval]);

  return {
    data,
    error,
    loading,
  };
};
