'use client';
import React, { useState } from "react";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface NavBarProps {
  setActivePage: (page: 'home' | 'about' | 'history') => void;
}

function NavBar({ setActivePage }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative border-b-[1px] shadow-sm">
      <div className="flex justify-between p-3 px-10 items-center">
        {/* Left side: Logo + Menu */}
        <div className="flex gap-10 items-center">
          <Image
            src="/taxi-workers.png"
            alt="Taxi Logo"
            width={100}
            height={100}
          />

          {/* Desktop menu */}
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

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border rounded"
            >
              ☰
            </button>
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

      {/* Mobile menu items */}
      {menuOpen && (
        <div className="md:hidden bg-white w-full shadow-md flex flex-col gap-2 p-4 z-50">
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => { setActivePage('home'); setMenuOpen(false); }}
          >
            Home
          </h2>
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => { setActivePage('about'); setMenuOpen(false); }}
          >
            About
          </h2>
          <h2
            className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all"
            onClick={() => { setActivePage('history'); setMenuOpen(false); }}
          >
            History
          </h2>
        </div>
      )}
    </div>
  );
}

export default NavBar;
