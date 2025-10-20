'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CardsList from '@/app/data/CardsList';

function Cards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-[14px] sm:text-[16px] font-medium">
        Select The Payment Methods
      </h2>

      <div
        className="
          grid grid-cols-3
          mt-2 gap-3 sm:gap-5
          px-2
        "
      >
        {CardsList.map((card, index) => (
          <div
            key={card.id}
            className={`
              flex items-center justify-center
              border rounded-md cursor-pointer
              hover:border-yellow-400 hover:scale-105 transition-all
              ${activeIndex === index ? 'border-yellow-400 border-[2px]' : ''}
              aspect-[2/1] w-full max-w-[120px] mx-auto
            `}
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
