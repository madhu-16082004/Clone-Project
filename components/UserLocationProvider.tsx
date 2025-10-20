'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';

// Define the type for your context
interface UserLocationContextType {
  userLocation: GeolocationPosition | null;
  setUserLocation: React.Dispatch<React.SetStateAction<GeolocationPosition | null>>;
}

// Create context with default values
export const UserLocationContext = createContext<UserLocationContextType | null>(null);

// Export provider as default
export default function UserLocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation(pos);
          console.log('User location:', pos);
        },
        (err) => {
          console.error('Error getting location:', err);
        }
      );
    }
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}
