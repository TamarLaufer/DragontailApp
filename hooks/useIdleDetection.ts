import { useEffect, useRef, useState } from 'react';
import { Location } from '../types/locationTypes';

const IDLE_TIMEOUT = 30_000; // 30 seconds

export const useIdleDetection = (locations: Location[]) => {
  const [isIdle, setIsIdle] = useState(false);
  const lastLocationTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (locations.length === 0) return;

    const latestLocation = locations[0];
    const currentTimestamp = latestLocation.timestamp;

    // אם זו הפעם הראשונה
    if (!lastLocationTimeRef.current) {
      lastLocationTimeRef.current = currentTimestamp;
      return;
    }

    // אם התקבלה נקודת מיקום שונה – מאפסים את הטיימר
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

      if (diff >= IDLE_TIMEOUT) {
        setIsIdle(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { isIdle };
};
