"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SearchBar from "./search-bar";
import { LocateFixed } from "lucide-react";

// Component to handle map recentering when location is found
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  const getSytemLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    getSytemLocation();
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Floating GPS Button */}
      <button
        onClick={getSytemLocation}
        className="absolute bottom-10 right-10 z-[1000] bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center border border-gray-200"
        title="Locate Me"
      >
        <LocateFixed className="w-6 h-6 text-[#2A7FFF]" />
      </button>

      <MapContainer
        center={[27.7172, 85.3240]} // Default to Kathmandu if location not yet found
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // Customizing for a cleaner look
      >
        <SearchBar />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position && (
          <>
            <ChangeView center={position} />
            <Marker position={position}>
              <Popup>
                <div className="font-sans">
                  <p className="font-bold text-[#1E293B]">Your Location</p>
                  <p className="text-sm text-gray-500">GPS Accuracy Point</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
