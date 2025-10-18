"use client";
import { createContext, useState } from "react";

export const SelectedCarAmountContext = createContext<any>(null);

export function SelectedCarAmountProvider({ children }: { children: React.ReactNode }) {
  const [CarAmount, setCarAmount] = useState<number | null>(null);

  return (
    <SelectedCarAmountContext.Provider value={{ CarAmount, setCarAmount }}>
      {children}
    </SelectedCarAmountContext.Provider>
  );
}
