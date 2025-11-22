"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuSection from "../components/MenuSection";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#f9f1e4] text-black">
        <MenuSection />
      </main>
    </>
  );
}
