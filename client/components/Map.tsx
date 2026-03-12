"use client";

// IMPORTANT: These imports must be in this order
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Search, MapPin, Navigation, Droplet, Activity, Building, BriefcaseMedical } from 'lucide-react';


import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, Polyline } from "react-leaflet";
import SearchBar from "./search-bar";
import L from "leaflet";
import { Button } from "./ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";

const hospitalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>`;

const hospitalIcon = L.divIcon({
  html: `<div style="background-color: white; border: 2px solid #ef4444; border-radius: 50%; padding: 4px; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; color: #ef4444; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${hospitalSvg}</div>`,
  className: "custom-hospital-marker",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

const hospitalIconSelected = L.divIcon({
  html: `<div style="background-color: teal; border: 2px solid teal; border-radius: 50%; padding: 4px; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${hospitalSvg}</div>`,
  className: "custom-hospital-marker",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});


const locationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>`;

const lollipopIcon = L.divIcon({
  html: `
    <div style="
      position: relative;
      background-color: red;
      border: 3px solid #ef4444;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ef4444;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    ">

      <div style="
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: 12px;
        background-color: white;
      "></div>
    </div>
  `,
  className: "custom-lollipop-marker",
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -52],
});

export default function Map(props) {
const markerRef = useRef(null)
const CHIPS = [
  { label: 'Hospitals', action:'', icon: Building, color: 'text-blue-500' },
  { label: 'Blood Banks', action:'hasBloodBank' , icon: Droplet, color: 'text-red-500' },
];
  const [markerPosition, setMarkerPosition] = useState({ lat: props?.userCoords?.latitude, lng: props?.userCoords?.longitude });

  const fectchPickUpDetails = async (lat, lng) => {
    const {data}  = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=4125c37d2937453bbee3e5b84422b4d2`)
    setPickAddress(data?.features[0]?.properties?.formatted)
  }

  const {latitude, longitude}  =props?.userCoords
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      setMarkerPosition({ lat, lng });
      fectchPickUpDetails(lat, lng)
      }
    },

  }), []);





  

  const [selectedInfrastructure, setSelectedInfrastructure] = useState<{ _id: string; name: string; address: string } | null>(null)

  const [pickAddress, setPickAddress] = useState('')
  const [suggestions, setSuggestions] = useState<{ formatted: string; lat: number; lon: number; address_line1: string; address_line2: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [step, setStep] = useState(1)
  const [desinationAddress, setDesinationAddress] = useState('')
  const fetchAutocomplete = async (input: string) => {
    if (!input.trim()) { setSuggestions([]); return; }
    const { data } = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&limit=5&format=json&apiKey=4125c37d2937453bbee3e5b84422b4d2`)
    setSuggestions(data?.results ?? [])
    setShowSuggestions(true)
  }

  const handleSuggestionSelect = (suggestion: { formatted: string; lat: number; lon: number }) => {
    setPickAddress(suggestion.formatted)
    setMarkerPosition({ lat: suggestion.lat, lng: suggestion.lon })
    setSuggestions([])
    setShowSuggestions(false)
  }


  useEffect(()=>{
    fectchPickUpDetails(latitude,  longitude)
  },[])


  useEffect(()=>{
      if(selectedInfrastructure){
        setDesinationAddress(selectedInfrastructure)
      }
  },[selectedInfrastructure?._id])

  const handleConfirmation = async() => {

    setStep(2)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ambulance-request`, {
      "user": "69927df76d304063daf3a5b8",
      "hospital": selectedInfrastructure?._id,
      "pickupLocation": {
        "address": pickAddress,
        "coordinates": { "type": "Point", "coordinates": [markerPosition.lat, markerPosition.lng] }
      },
      "dropLocation": {
        "address": selectedInfrastructure?._id,
        "coordinates": { "type": "Point", "coordinates": [ selectedInfrastructure?.location?.coordinates?.[0],  selectedInfrastructure?.location?.coordinates?.[1]] }
      },
      "type": "Ambulance",
      "status": "Pending",
      "estimatedCost": 100,
    })

  }
  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>

      {/* Overlay UI — sits above the map */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[min(680px,calc(100%-2rem))] flex flex-col gap-2 pointer-events-none">

        {/* Search + Filter Row */}
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="flex-1 flex flex-col pointer-events-auto">
            <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-white/80 px-4 h-12 transition-shadow hover:shadow-[0_6px_28px_rgba(0,0,0,0.18)]">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={pickAddress || ''}
                onChange={(e) => {
                  setPickAddress(e.target.value);
                  fetchAutocomplete(e.target.value);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Select Pick Up Address..."
                className="flex-1 bg-transparent px-3 outline-none text-gray-800 placeholder-gray-400 text-sm"
              />
              {pickAddress ? (
                <button
                  onClick={() => { setPickAddress(''); setSuggestions([]); setShowSuggestions(false); }}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors shrink-0 text-gray-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              ) : (
                <button className="p-1.5 rounded-full hover:bg-blue-50 transition-colors shrink-0 text-blue-500">
                  <Navigation className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-1.5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onMouseDown={() => handleSuggestionSelect(s)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{s.address_line1}</p>
                      <p className="text-xs text-gray-400 truncate">{s.address_line2}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {CHIPS.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  onClick={() => props.fetchInfastructure(chip.action)}
                  className="flex items-center gap-1.5 whitespace-nowrap bg-white/95 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-white/80 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 hover:shadow-[0_6px_24px_rgba(59,130,246,0.15)] transition-all active:scale-95"
                >
                  <Icon className={`w-3.5 h-3.5 ${chip.color}`} />
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Filter Chips */}
     
        </div>

        {/* Pickup Address Confirmation Banner */}
    

      </div>


      {/* Map */}
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
              {pickAddress && (
          <div className="absolute bottom-10 left-1/4 z-999 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-emerald-100 px-4 py-3 pointer-events-auto">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex flex-col gap-1">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">Pickup Location</p>
              <p className="text-sm text-gray-700 truncate font-medium">{pickAddress}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">Desination Hospital</p>
              <p className="text-sm text-gray-700 truncate font-medium">{desinationAddress?.name}</p>
            </div>
            </div>
           
            <button onClick={handleConfirmation} className="shrink-0 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all">
              Confirm
            </button>
          </div>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            {
         step == 2 &&
         <Dialog open={true}>
       
         <DialogContent className="z-[10000] w-[100%] bg-teal-50 rounded-xl shadow-lg border border-teal-200">
           <DialogHeader>
           <Progress value={90} className="w-[60%]" />
             <DialogTitle>Finding ambulance service nearby....</DialogTitle>
             <DialogDescription>
              We are currently searching for available ambulance services in your area. Please wait while we connect you to the nearest one. This may take a few moments.
             </DialogDescription>
             <Button
              onClick={()=> setStep(1)}
             className="bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all mt-4">
              Cancel
             </Button>
           </DialogHeader>
         </DialogContent>
       </Dialog>
        }
        <CircleMarker
          center={[latitude, longitude]}
          pathOptions={{ color: 'blue' }}
          radius={10}
        >
          <Tooltip>Tooltip for CircleMarker</Tooltip>
        </CircleMarker>
        {
          selectedInfrastructure?.location?.coordinates?.[0]
          && markerPosition.lat
        &&
        <Polyline positions={[[selectedInfrastructure?.location?.coordinates?.[1] , selectedInfrastructure?.location?.coordinates?.[0]], [markerPosition.lat, markerPosition.lng]]} pathOptions={{ color: 'red' }} />
        }
        <Marker
          key={1}
          ref={markerRef}
          position={[markerPosition.lat, markerPosition.lng]}
          icon={lollipopIcon}
          draggable={true}
          eventHandlers={eventHandlers}
        >
          <Popup>
            <div>
              <Button className="bg-blue-200 p-4 shadow-md">Call Ambulance on Emergency</Button>
            </div>
          </Popup>
        </Marker>
        {props.infrastructures.map((item: { _id: string; name: string; address: string; location: { coordinates: number[] } }, id: number) => (
          <Marker
            key={id}
            position={[item.location.coordinates[1], item.location.coordinates[0]]}
            icon={selectedInfrastructure?._id === item._id ? hospitalIconSelected : hospitalIcon}
            eventHandlers={{ click: () => setSelectedInfrastructure(item) }}
          >
         
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}
