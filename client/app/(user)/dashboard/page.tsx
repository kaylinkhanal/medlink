'use client';

import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/use-auth";

// This tells Next.js to only load the component on the client side
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

export default function DashboardPage() {
  const { user, loading, logout } = useAuth(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main>
      {/* Top bar with user info */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 20px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottomLeftRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontWeight: 600, color: "#1E293B" }}>
          👋 {user?.fullName}
        </span>
        <span
          style={{
            fontSize: "12px",
            background: "#E0F2FE",
            color: "#0369A1",
            padding: "2px 8px",
            borderRadius: "999px",
            fontWeight: 500,
          }}
        >
          {user?.role}
        </span>
        <button
          onClick={logout}
          style={{
            background: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 14px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "13px",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ height: "100vh", width: "100vw" }}>
        <Map />
      </div>
    </main>
  );
}