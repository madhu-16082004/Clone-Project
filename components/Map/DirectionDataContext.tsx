'use client';
import React, { createContext, useState } from 'react';

export const DirectionDataContext = createContext<{
  directionData: any;
  setDirectionData: (data: any) => void;
} | null>(null);

export function DirectionDataProvider({ children }: { children: React.ReactNode }) {
  const [directionData, setDirectionData] = useState<any>(null);

  return (
    <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
      {children}
    </DirectionDataContext.Provider>
  );
}
