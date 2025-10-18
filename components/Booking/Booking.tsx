'use client';
import React, { useContext } from 'react';
import AutocompleteAddress from './AutocompleteAddress';
import Cars from './Cars';
import Cards from './Cards';
import { useRouter } from 'next/navigation';
import { SelectedCarAmountContext } from './Context/SelectedCarAmountContext';

function Booking() {
  const router = useRouter();
  const { CarAmount } = useContext(SelectedCarAmountContext); // selected car fare

  const handleBook = () => {
    if (!CarAmount) {
      alert('Please select a car first!');
      return;
    }

    // Navigate to payment page
    router.push('/payment');
  };

  return (
    <div>
      <div className="p-5">
        <h2 className="text-[20px] font-semibold">Booking</h2>
      </div>

      {/* Address input */}
      <AutocompleteAddress />

      {/* Cars selection */}
      <Cars />

      {/* Payment method cards (if any) */}
      <Cards />

      {/* Book button */}
      <button
        onClick={handleBook}
        className="w-full bg-yellow-400 p-2 rounded-md mt-4 text-black font-semibold hover:bg-yellow-500 transition"
      >
        Book
      </button>
    </div>
  );
}

export default Booking;
