'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import CarsList from '@/app/data/CarsList';
import { MapContext } from '@/components/Map/MapContext';
import { SelectedCarAmountContext } from '@/components/Booking/Context/SelectedCarAmountContext';

function Cars() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const { directionData } = useContext(MapContext);
  const { setCarAmount } = useContext(SelectedCarAmountContext);

  // ✅ Function to calculate fare per trip
  const getCost = (ratePerKm: number) => {
    if (!directionData || !directionData.features || directionData.features.length === 0) return 0;
    const distanceMeters = directionData.features[0].properties.summary.distance;
    const distanceKm = distanceMeters / 1000;
    const totalCost = distanceKm * ratePerKm;
    return totalCost.toFixed(2);
  };

  // ✅ Function to get cost per km (rate)
  const getRatePerKm = (ratePerKm: number) => ratePerKm.toFixed(2);

  const handleSelectCar = (index: number, rate: number) => {
    setSelectedCar(index);
    const fare = getCost(rate);
    setCarAmount(Number(fare)); // store selected fare in context
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold mb-3 text-lg">Choose Cars</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CarsList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectCar(index, item.charges)}
            className={`p-4 border-2 rounded-md cursor-pointer flex flex-col items-center transition-all text-center ${
              index === selectedCar ? 'border-yellow-400 shadow-lg' : 'border-gray-200'
            } hover:border-yellow-400`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="object-contain mb-2"
            />
            <h2 className="text-sm font-medium text-gray-700 mb-1">{item.name}</h2>

            {/* Show Rate per KM */}
            <p className="text-sm text-gray-500">Rate: ₹{getRatePerKm(item.charges)} / km</p>

            {/* Show Total Fare only when route available */}
            {directionData && (
              <p className="text-sm font-semibold text-black mt-1">
                Trip Fare: ₹{getCost(item.charges)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
