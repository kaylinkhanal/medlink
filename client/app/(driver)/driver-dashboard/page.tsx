'use client'

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// This tells Next.js to only load the component on the client side
const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading Map...</p>
});

export default function Home() {
  const [infrastructures, setInfrastructures] = useState([])
  const [userCoords, setUserCoords] = useState({latitude: 0, longitude: 0})
  const fetchInfastructure = async (action) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/medical-infrastructures?action=${action}`)
    setInfrastructures(data)
  }

  const fetchUserCoords = () => {
    debugger;
    navigator?.geolocation?.getCurrentPosition(pos=> {
      const {latitude, longitude} = pos.coords

      setUserCoords({latitude, longitude})
    })
  }

  useEffect(()=>{
  fetchInfastructure()
  if(navigator) fetchUserCoords()
  },[])
  return (
    <main>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map userCoords={userCoords} infrastructures={infrastructures} fetchInfastructure={fetchInfastructure}/>
      </div>
    </main>
  );
}