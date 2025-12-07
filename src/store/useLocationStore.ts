import { Location } from '../types/locationTypes';
import { create } from 'zustand';

type LocationState = {
  locations: Location[];
  addLocation: (location: Location) => void;
  deleteLocation: (id: string) => void;
  editLocation: (id: string, location: Location) => void;
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

  editLocation: (id: string) =>
    set(state => ({
      locations: state.locations.map(location =>
        location.id === id ? location : location,
      ),
    })),

  clear: () => set({ locations: [] }),
}));
