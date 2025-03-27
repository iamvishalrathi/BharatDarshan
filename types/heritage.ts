export interface HeritageLocation {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  category: string;
  state: string;
  yearBuilt?: string;
  unesco?: boolean;
  visitingHours?: string;
  entryFee?: string;
  website?: string;
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
}