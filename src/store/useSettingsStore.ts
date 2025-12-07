import { create } from 'zustand';

export type SettingsState = {
  idleTimeout: number;
  trackingEnabled: boolean;
  notificationsEnabled: boolean;
  samplingInterval: number;
  setSamplingInterval: (seconds: number) => void;
  setIdleTimeout: (ms: number) => void;
  setTrackingEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>(set => ({
  idleTimeout: 30_000,
  trackingEnabled: true,
  notificationsEnabled: true,
  samplingInterval: 8,

  setIdleTimeout: ms => set({ idleTimeout: ms }),
  setTrackingEnabled: enabled => set({ trackingEnabled: enabled }),
  setNotificationsEnabled: enabled => set({ notificationsEnabled: enabled }),
  setSamplingInterval: seconds => set({ samplingInterval: seconds }),
}));
