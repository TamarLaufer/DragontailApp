export type Location = {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
  note?: string;
};

export type LocationResult = Location[];
