"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HeritageLocation, MapViewState } from "@/types/heritage";

// Fix Leaflet icon issues
const markerIcon = L.icon({
  iconUrl: "/icons/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const selectedMarkerIcon = L.icon({
  iconUrl: "/icons/marker-selected.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Map view controller component
const MapViewController = ({ 
  viewState 
}: { 
  viewState: MapViewState 
}) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(viewState.center, viewState.zoom);
  }, [map, viewState]);
  
  return null;
};

interface HeritageMapProps {
  locations: HeritageLocation[];
  selectedLocation: HeritageLocation | null;
  setSelectedLocation: (location: HeritageLocation | null) => void;
  viewState: MapViewState;
  setViewState: (viewState: MapViewState) => void;
}

const HeritageMap = ({ 
  locations, 
  selectedLocation, 
  setSelectedLocation,
  viewState,
  setViewState
}: HeritageMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  const handleMarkerClick = (location: HeritageLocation) => {
    setSelectedLocation(location);
    setViewState({
      center: [location.location.lat, location.location.lng],
      zoom: 12
    });
  };

  return (
    <div className="h-[600px] rounded-xl overflow-hidden border border-white-1/10">
      <MapContainer
        center={viewState.center}
        zoom={viewState.zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapViewController viewState={viewState} />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.location.lat, location.location.lng]}
            icon={selectedLocation?.id === location.id ? selectedMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <div className="text-black">
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.state}, India</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HeritageMap;