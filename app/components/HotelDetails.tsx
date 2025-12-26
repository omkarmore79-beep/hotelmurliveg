"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HotelDetails() {
  return (
    <motion.section
      className="relative w-full min-h-screen overflow-hidden md:hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* ================= VIDEO ARCH (CLIP-PATH) ================= */}
      <div className="relative flex justify-center pt--16 overflow-hidden">
        <div
          className="relative w-full max-w-sm h-[550px] bg-black overflow-hidden"
          style={{
            clipPath: "ellipse(100% 100% at 50% 0%)",
          }}
        >
          <video
            src="/murlivideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* ================= BUTTON ================= */}
      <div className="absolute top-[480px] w-full flex justify-center z-10">
        <Link href="/menu">
          <button className="bg-[#903e13] text-[#fcf3e6] font-medium px-4 py-2 rounded-full text-xs shadow-md active:scale-95 transition">
            Explore Our Menu
          </button>
        </Link>
      </div>

      {/* ================= CONTENT UNDER VIDEO ================= */}
      <div className="mt-32">

        {/* ================= SPECIALITY SECTION ================= */}
        <div className="px-4 py-20 bg-[#fafafa]">
          <h2
            className="font-serif tracking-widest mb-10 text-center text-black"
            style={{ fontSize: "22px" }}
          >
            OUR SPECIALITY
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-2">
            <SpecialityCard
              image="/spec-1.jpeg"
              title="Punjabi thali"
              desc="Rich curries with fresh breads."
            />
            <SpecialityCard
              image="/spec-2.jpeg"
              title="Seekh Masala Veg"
              desc="Smoky veg seekh in masala."
            />
            <SpecialityCard
              image="/spec-3.jpeg"
              title="Masvadi Special"
              desc="Classic Maharashtrian masvad."
            />
          </div>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div className="px-4 py-20 bg-white">
          <h2
            className="font-serif tracking-widest mb-12 text-center text-black"
            style={{ fontSize: "22px" }}
          >
            CONTACT
          </h2>

          <div className="max-w-md mx-auto space-y-7 text-center">
            <a
              href="https://maps.google.com/?q=Velora+Pune"
              target="_blank"
              className="block bg-[#f5f5f5] rounded-xl p-7 active:scale-[0.97]"
            >
              <p className="text-gray-600 text-xs tracking-widest mb-2">
                LOCATION
              </p>
              <p className="text-sm text-black">
                Murli Veg, Pune
              </p>
            </a>

            <div className="bg-[#f5f5f5] rounded-xl p-7">
              <p className="text-gray-600 text-xs tracking-widest mb-2">
                TIMINGS
              </p>
              <p className="text-sm text-black">
                Everyday · 12:00 PM – 11:30 PM
              </p>
            </div>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="block bg-[#903e13] rounded-xl p-7 active:scale-[0.97]"
            >
              <p className="text-[#dff3e8] text-xs tracking-widest mb-2">
                WHATSAPP
              </p>
              <p className="text-sm text-white">
                Chat with us on WhatsApp
              </p>
            </a>
          </div>
        </div>

        {/* ================= BRANDING ================= */}
        <div className="mt-16 mb-6 text-center text-[11px] text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/tableos-icon.png"
              alt="Table OS"
              className="w-4 h-4 opacity-70"
            />
            <span>
              Powered by <span className="font-medium">Table OS</span>
            </span>
          </div>

          <a
            href="mailto:tableoswork@gmail.com"
            className="underline block mt-1"
          >
            tableoswork@gmail.com
          </a>
        </div>
      </div>
    </motion.section>
  );
}

/* ================= SPECIALITY CARD ================= */
function SpecialityCard({
  image,
  title,
  desc,
}: {
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="min-w-[220px] bg-white rounded-xl overflow-hidden border active:scale-[0.97]">
      <img
        src={image}
        alt={title}
        className="w-full h-[320px] object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium mb-1 text-black">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
