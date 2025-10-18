'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MapContext } from '@/components/Map/MapContext';

interface Suggestion {
  fullAddress: string;
  lat: number;
  lon: number;
}

export default function Autocomplete() {
  const { setSourceMarker, setDestMarker } = useContext(MapContext);

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceList, setSourceList] = useState<Suggestion[]>([]);
  const [destList, setDestList] = useState<Suggestion[]>([]);
  const [focusedInput, setFocusedInput] = useState<'source' | 'destination' | null>(null);

  const sourceRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        sourceRef.current &&
        !sourceRef.current.contains(e.target as Node) &&
        destRef.current &&
        !destRef.current.contains(e.target as Node)
      ) {
        setFocusedInput(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const fetchAddresses = async (query: string, type: 'source' | 'destination') => {
    if (!query || query.length < 2) {
      type === 'source' ? setSourceList([]) : setDestList([]);
      return;
    }
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=5`
      );
      const data = await res.json();

      const list: Suggestion[] = data.features.map((f: any) => ({
        fullAddress: [
          f.properties.name,
          f.properties.street,
          f.properties.suburb,
          f.properties.city,
          f.properties.state,
          f.properties.country,
        ]
          .filter(Boolean)
          .join(', '),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      }));

      type === 'source' ? setSourceList(list) : setDestList(list);
    } catch (err) {
      console.error(err);
      type === 'source' ? setSourceList([]) : setDestList([]);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (focusedInput === 'source') fetchAddresses(source, 'source');
      else if (focusedInput === 'destination') fetchAddresses(destination, 'destination');
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [source, destination, focusedInput]);

  const handleSelect = (item: Suggestion, type: 'source' | 'destination') => {
    if (type === 'source') {
      setSource(item.fullAddress);
      setSourceMarker({ lat: item.lat, lon: item.lon });
      setSourceList([]);
    } else {
      setDestination(item.fullAddress);
      setDestMarker({ lat: item.lat, lon: item.lon });
      setDestList([]);
    }
    setFocusedInput(null);
  };

  const renderDropdown = (list: Suggestion[], type: 'source' | 'destination') => {
    if (!list.length || focusedInput !== type) return null; // only show active input's dropdown
    return (
      <ul className="absolute z-50 top-full mt-2 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto text-white">
        {list.map((addr, idx) => (
          <li
            key={idx}
            className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer"
            onClick={() => handleSelect(addr, type)}
          >
            {addr.fullAddress}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto mt-8">
      <div ref={sourceRef} className="relative">
        <label className="text-yellow-500 block mb-1">Pickup location</label>
        <input
          type="text"
          value={source}
          onFocus={() => setFocusedInput('source')}
          onChange={(e) => {
            setSource(e.target.value);
            setFocusedInput('source');
          }}
          placeholder="Enter pickup location"
          className="w-full border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {renderDropdown(sourceList, 'source')}
      </div>

      <div ref={destRef} className="relative">
        <label className="text-yellow-500  block mb-1">Dropoff location</label>
        <input
          type="text"
          value={destination}
          onFocus={() => setFocusedInput('destination')}
          onChange={(e) => {
            setDestination(e.target.value);
            setFocusedInput('destination');
          }}
          placeholder="Enter dropoff location"
          className="w-full border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {renderDropdown(destList, 'destination')}
      </div>
    </div>
  );
}
