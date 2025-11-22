"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import HotelDetails from "./components/HotelDetails";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <SplashScreen onFinish={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {isLoaded && (
        <main className="min-h-screen bg-[#f9f1e4] text-black">
          <HotelDetails />
        </main>
      )}
    </>
  );
}
