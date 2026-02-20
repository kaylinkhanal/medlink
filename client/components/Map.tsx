"use client";

// IMPORTANT: These imports must be in this order
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SearchBar from "./search-bar";

export default function Map() {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={false} 
      style={{ height: "100vh", width: "100%" }}
    >
      <SearchBar/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}