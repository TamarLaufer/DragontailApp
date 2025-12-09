import { useEffect, useRef, useState } from 'react';
import { LocationResult } from '../types/locationTypes';
import { useSettingsStore } from '../store/useSettingsStore';

export const useIdleDetection = (locations: LocationResult) => {
  const [isIdle, setIsIdle] = useState(false);
  const lastLocationTimeRef = useRef<number | null>(null);
  const idleTimeout = useSettingsStore(state => state.idleTimeout);

  useEffect(() => {
    if (locations.length === 0) return;

    const latestLocation = locations[0];
    const currentTimestamp = latestLocation.timestamp;

    if (!lastLocationTimeRef.current) {
      lastLocationTimeRef.current = currentTimestamp;
      return;
    }

    if (currentTimestamp !== lastLocationTimeRef.current) {
      lastLocationTimeRef.current = currentTimestamp;
      setIsIdle(false);
    }
  }, [locations]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastLocationTimeRef.current) return;

      const now = Date.now();
      const diff = now - lastLocationTimeRef.current;

      if (diff >= idleTimeout) {
        setIsIdle(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTimeout]);

  return { isIdle };
};
