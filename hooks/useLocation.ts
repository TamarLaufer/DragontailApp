import { useEffect, useState } from 'react';
import { Location } from '../types/locationTypes';
import {
  requestLocationPermission,
  startLocationTracking,
  stopLocationTracking,
} from '../services/locationService';

export const useLocation = () => {
  const [data, setData] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    let watchId: number | null = null;

    const init = async () => {
      setLoading(true);
      const allowed = await requestLocationPermission();

      if (!allowed) {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      watchId = startLocationTracking(
        location => {
          if (!isTracking) return;

          setData(prev => {
            const updated = [location, ...prev];
            return updated.slice(0, 100);
          });
        },
        message => setError(message),
      );

      setLoading(false);
    };

    init();

    return () => {
      if (watchId !== null) {
        stopLocationTracking(watchId);
      }
    };
  }, [isTracking]);

  return { data, error, loading, stopTracking: () => setIsTracking(false) };
};
