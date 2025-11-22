"use client";

import { ChangeEvent } from "react";
import Image from "next/image";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search starters, mains or desserts...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="p-2 bg-transparent pt-2">
      <div className="max-w-sm mx-auto">
        <div className="relative">
          {/* 🔍 Search Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Image
              src="/search.png" // put image in /public
              alt="Search Icon"
              width={16}
              height={16}
              className="opacity-70"
            />
          </div>

          {/* Input Box */}
          <input
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            placeholder={placeholder}
            className="w-full rounded-full pl-8 pr-10 py-1.5 text-sm placeholder-gray-400 bg-white/95 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            aria-label="Search menu"
          />
        </div>
      </div>
    </div>
  );
}
