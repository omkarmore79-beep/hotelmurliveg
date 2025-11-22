"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";



export default function HotelDetails() {
  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Image
        src="/mainpage.jpg" // change to your image path
        alt="Hotel Details"
        fill
        className="object-cover pointer-events-none select-none"
        priority
        draggable={false}
      />

      {/* Explore Our Menu Button (no animation) */}
      <div className="absolute bottom-28 w-full flex justify-center">
        <Link href="/menu">
          <button className="glow-button bg-[#903e13] text-[#fcf3e6] font-medium px-4 py-2 rounded-full text-base shadow-md active:scale-95 transition">
            Explore Our Menu
          </button>
        </Link>
      </div>
    </motion.section>
  );
}

