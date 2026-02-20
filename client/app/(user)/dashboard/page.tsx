'use client'

import dynamic from "next/dynamic";

// This tells Next.js to only load the component on the client side
const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading Map...</p>
});

export default function Home() {
  return (
    <main>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map />
      </div>
    </main>
  );
}