'use client';
import { useContext } from 'react';
import { UserLocationContext } from '@/components/UserLocationProvider';

export default function ShowUserLocation() {
  const { userLocation } = useContext(UserLocationContext);

  if (!userLocation) return <div>Loading location...</div>;

  return (
    <div>
      Your Location: <br />
      Latitude: {userLocation.coords.latitude} <br />
      Longitude: {userLocation.coords.longitude}
    </div>
  );
}
