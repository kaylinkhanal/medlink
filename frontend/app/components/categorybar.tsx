"use client";

import React, { useState } from "react";
import {
  Hospital,
  Pill,
  Stethoscope,
  Activity,
  Truck,
  Droplet,
  Banknote,
} from "lucide-react";

const categories = [
  { id: "hospitals", label: "Hospitals", icon: Hospital },
  { id: "pharmacies", label: "Pharmacies", icon: Pill },
  { id: "clinics", label: "Clinics", icon: Stethoscope },
  { id: "ICUs", label: "ICUs", icon: Activity },
  { id: "ambulance", label: "Ambulance", icon: Truck },
  { id: "blood-bank", label: "Blood Bank", icon: Droplet },
  { id: "atms", label: "ATMs", icon: Banknote },
];

export default function CategoryBar() {
  const [activeTab, setActiveTab] = useState("hospitals");

  return (
    <div className="absolute top-3 left-0 right-0 z-[100] px-4 pointer-events-none flex justify-center">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mx-auto pointer-events-auto w-full max-w-screen-md px-2 pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                flex items-center gap-2 rounded-full whitespace-nowrap h-9 px-4
                text-sm font-medium transition-all duration-200 border
                ${isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }
              `}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-gray-600"} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
