'use client';
import React from "react";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface NavBarProps {
  setActivePage: (page: 'home' | 'about' | 'history') => void;
}

function NavBar({ setActivePage }: NavBarProps) {
  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm items-center">
      {/* Left side: Logo + Menu */}
      <div className="flex gap-10 items-center">
        <Image
          src="/Taxi Workers.png"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="hidden md:flex gap-6">
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => setActivePage('home')}
          >
            Home
          </h2>
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => setActivePage('about')}
          >
            About
          </h2>
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => setActivePage('history')}
          >
            History
          </h2>
        </div>
      </div>

      {/* Right side: User Button / Sign In */}
      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <a
            href="/sign-in"
            className="p-2 border rounded hover:bg-gray-100 transition-all"
          >
            Sign In
          </a>
        </SignedOut>
      </div>
    </div>
  );
}

export default NavBar;
