'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';

// Create context
export const UserLocationContext = createContext<any>(null);

export default function UserLocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation(pos);
      console.log("User location:", pos);
    });
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}
