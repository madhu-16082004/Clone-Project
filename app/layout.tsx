'use client';
import React, { useState } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import UserLocationProvider from "@/components/UserLocationProvider";
import { MapProvider } from "@/components/Map/MapContext";

// Import pages
import AboutPage from "@/components/Pages/AboutPage";
import HistoryPage from "@/components/Pages/HistoryPage";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'history'>('home');

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${outfit.variable} antialiased`}>
          <NavBar setActivePage={setActivePage} />
          <UserLocationProvider>
            <MapProvider>
              <div className="p-4">
                {activePage === 'home' ? (
                  children
                ) : activePage === 'about' ? (
                  <AboutPage />
                ) : (
                  <HistoryPage />
                )}
              </div>
            </MapProvider>
          </UserLocationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}