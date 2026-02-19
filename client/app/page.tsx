'use client';
import Image from "next/image";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Medlink</h1>
          <p className="text-slate-600">home page</p>
        </div>
      </main>
    </div>
  );
}
