'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CardsList from '@/app/data/CardsList'; // ✅ adjust path if needed

function Cards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-[14px] font-medium">Select The Payment Methods</h2>
      <div className="grid grid-cols-3 mt-2 pl-2 gap-5">
        {CardsList.map((card, index) => (
          <div
            key={card.id}
            className={`w-[130px] h-[60px] border flex items-center justify-center rounded-md cursor-pointer hover:border-yellow-400 hover:scale-110 transition-all ${
              activeIndex === index ? 'border-yellow-400 border-[2px]' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={card.image}
              alt={card.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
