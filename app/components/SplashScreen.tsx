"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2500); // splash screen duration (2.5 seconds)
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center text-black z-50 bg-[#f9f1e4]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hotel Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/logo.png" // 👈 your logo path (put logo inside public folder)
          alt="Murli Veg Logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* Hotel Name */}
      <motion.h1
        className="text-3xl mt-4 text-[#914115]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
    >
        Welcome to Murli Veg
    </motion.h1>

      {/* Optional Tagline */}
      <motion.p
        className="mt-2 text-gray-700 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your comfort is our priority 🌿
      </motion.p>
    </motion.div>
  );
}