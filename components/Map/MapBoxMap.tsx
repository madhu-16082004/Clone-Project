'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvent, useMap } from 'react-leaflet';
import { useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import logo from '@/public/logo.png';
import { MapContext } from '@/components/Map/MapContext';

// ✅ OpenRouteService API key
const apiKey =
  'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjNkMmE2YjAwZDkwMjQ2ZTA5MGY4OWUyMjI3ODNmMjhlIiwiaCI6Im11cm11cjY0In0=';

const LogoIcon = L.icon({
  iconUrl: logo.src,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// 🔹 Fit map to bounds
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
}

// 🔹 Enable scroll wheel zoom only on hover
function ScrollZoomOnHover() {
  const map = useMap();
  useMapEvent('mouseover', () => map.scrollWheelZoom.enable());
  useMapEvent('mouseout', () => map.scrollWheelZoom.disable());
  return null;
}

export default function MapBoxMap() {
  const { sourceMarker, destMarker, setDirectionData } = useContext(MapContext);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const points: [number, number][] = [];
  if (sourceMarker) points.push([sourceMarker.lat, sourceMarker.lon]);
  if (destMarker) points.push([destMarker.lat, destMarker.lon]);

  const defaultCenter: [number, number] = [13.0827, 80.2707];

  // 🔹 Fetch and draw route
  useEffect(() => {
    const fetchRoute = async () => {
      if (!sourceMarker || !destMarker) return;

      try {
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${sourceMarker.lon},${sourceMarker.lat}&end=${destMarker.lon},${destMarker.lat}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.features && data.features.length > 0) {
          const route = data.features[0];
          const props = route.properties.summary;

          console.log('✅ Route:', route);
          console.log('Distance:', props.distance, 'meters');
          console.log('Duration:', props.duration, 'seconds');

          const coords = route.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );
          setRouteCoords(coords);
          setDirectionData(data);
        } else {
          console.error('No route found:', data);
          setRouteCoords([]);
          setDirectionData(null);
        }
      } catch (err) {
        console.error('❌ Error fetching route:', err);
        setRouteCoords([]);
        setDirectionData(null);
      }
    };

    fetchRoute();
  }, [sourceMarker, destMarker, setDirectionData]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={false}  // disabled by default
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Scroll wheel zoom on hover */}
        <ScrollZoomOnHover />

        {/* Markers */}
        {sourceMarker && (
          <Marker position={[sourceMarker.lat, sourceMarker.lon]} icon={LogoIcon}>
            <Popup>Pickup</Popup>
          </Marker>
        )}
        {destMarker && (
          <Marker position={[destMarker.lat, destMarker.lon]} icon={LogoIcon}>
            <Popup>Dropoff</Popup>
          </Marker>
        )}

        {/* Route line */}
        {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" weight={4} />}

        {/* Auto fit map */}
        {points.length > 0 && <FitBounds points={points} />}
      </MapContainer>
    </div>
  );
}
