import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedLink - Healthcare Management System",
  description: "Connect with healthcare providers, manage appointments, and access your medical records all in one place.",
  keywords: "medlink, healthcare, medical, doctor, hospital, appointment, health records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0ea5e9',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              duration: 4000,
              style: {
                background: '#10b981',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
