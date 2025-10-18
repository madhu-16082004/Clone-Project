'use client'; // must be first line

import dynamic from 'next/dynamic';
import Booking from '@/components/Booking/Booking';
import { useContext } from 'react';
import { UserLocationContext } from '@/components/UserLocationProvider';
import { MapProvider } from '@/components/Map/MapContext';
import { SelectedCarAmountProvider } from '@/components/Booking/Context/SelectedCarAmountContext';

// Dynamically import the map to avoid SSR issues
const MapBoxMap = dynamic(() => import('@/components/Map/MapBoxMap'), { ssr: false });

export default function Home() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  return (
    <SelectedCarAmountProvider>
      <MapProvider>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Taxi App</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Booking form on left */}
            <div className="bg-white p-4 rounded shadow">
              <Booking />
            </div>

            {/* Map on right, taking 2 columns */}
            <div className="col-span-2 bg-gray-100 p-4 rounded shadow">
              <MapBoxMap />
            </div>
          </div>
        </div>
      </MapProvider>
    </SelectedCarAmountProvider>
  );
}
