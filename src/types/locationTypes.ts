export type Location = {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
};

export type LocationResult = Location[];
