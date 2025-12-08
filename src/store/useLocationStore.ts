import { Location, LocationResult } from '../types/locationTypes';
import { create } from 'zustand';

type LocationState = {
  locations: LocationResult;
  addLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
  updateLocation: (id: string, note: string) => void;
  clear: () => void;
};

export const useLocationStore = create<LocationState>(set => ({
  locations: [],

  addLocation: location =>
    set(state => ({
      locations: [location, ...state.locations].slice(0, 100),
    })),

  deleteLocation: (id: string) =>
    set(state => ({
      locations: state.locations.filter(location => location.id !== id),
    })),

  updateLocation: (id: string, note: string) =>
    set(state => ({
      locations: state.locations.map(location =>
        location.id === id ? { ...location, note } : location,
      ),
    })),

  clear: () => set({ locations: [] }),
}));
