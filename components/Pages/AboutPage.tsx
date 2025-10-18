'use client';
import React from "react";

export default function AboutPage() {
  return (
    <div className="text-center text-gray-700 mt-10 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">About This App</h2>

      <p className="mb-4">
        <strong>Taxi Booking App</strong> — This app is built with
        <strong> Next.js</strong>, <strong>React.js</strong>, <strong>Tailwind CSS</strong>,<strong>TypeScript</strong> and 
        <strong> Clerk</strong> and other cutting-edge web technologies for a secure and seamless experience.
      </p>

      <p className="mb-4">
        This project is a clone of a taxi booking application, created by combining the power of 
        <strong> AI tools</strong> and practical learning from <strong>YouTube tutorials</strong>.
      </p>

      <p className="mb-4">
        Instead of using Mapbox, i was used <strong>OpenStreetMap</strong>a free, open-source 
        mapping experience for location tracking and route visualization.
      </p>
    </div>
  );
}
