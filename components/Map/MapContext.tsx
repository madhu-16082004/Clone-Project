'use client';
import { createContext, useState } from 'react';

export const MapContext = createContext<any>(null);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [sourceMarker, setSourceMarker] = useState<{ lat: number; lon: number } | null>(null);
  const [destMarker, setDestMarker] = useState<{ lat: number; lon: number } | null>(null);
  const [directionData, setDirectionData] = useState<any>(null); // ✅ added

  return (
    <MapContext.Provider
      value={{
        sourceMarker,
        setSourceMarker,
        destMarker,
        setDestMarker,
        directionData,
        setDirectionData, // ✅ added
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
