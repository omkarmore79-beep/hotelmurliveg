"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface Category {
  id: number;
  name: string;
  image_url: string;
}

interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: number;
  image_url: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      return;
    }

    setCategories(data);
    if (data.length > 0) setActiveCategory(data[0].id);
  };

  useEffect(() => {
    if (activeCategory !== null) fetchDishes(activeCategory);
  }, [activeCategory]);

  const fetchDishes = async (categoryId: number) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .eq("category_id", categoryId)
        .order("id", { ascending: true });

      if (error) throw error;
      setDishes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcf3e6] text-[#903e13]">
      {/* Search Bar */}
      <div className="px-4 pt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search starters, mains or desserts..."
          className="w-full px-4 py-2 rounded-full border-2 border-[#903e13] bg-white text-[#903e13] placeholder-[#903e13]/50"
        />
      </div>

      {/* 🧭 Scrollable Categories (2 rows) */}
      <div className="relative mt-2">
        <div
          id="scrollMenu"
          className="flex overflow-x-auto scroll-smooth scrollbar-hide px-4 py-2 space-x-5"
        >
          {Array.from({ length: Math.ceil(categories.length / 2) }).map(
            (_, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col space-y-2 flex-shrink-0 items-center"
              >
                {[0, 1].map((rowPos) => {
                  const idx = colIndex * 2 + rowPos;
                  if (idx >= categories.length) return null;

                  const cat = categories[idx];
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="flex flex-col items-center justify-center cursor-pointer focus:outline-none w-16"
                    >
                      <div
                        className={`w-12 h-12 overflow-hidden flex items-center justify-center mb-1 rounded-md ${
                          isActive ? "bg-[#903e13]" : "bg-[#fcf3e6]"
                        }`}
                      >
                        <img
                          src={cat.image_url}
                          alt={cat.name}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <span
                        className="text-[10px] font-medium text-center w-full truncate text-[#903e13]"
                        title={cat.name}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* Dishes Section */}
      <div className="px-4 py-5">
        <h2 className="text-xl font-bold mb-4 text-[#903e13]">
          {categories.find((c) => c.id === activeCategory)?.name || ""}
        </h2>

        {error && (
          <div className="bg-red-200 p-3 text-red-800 rounded mb-3">{error}</div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader className="w-8 h-8 animate-spin" />
            <span className="ml-2 font-medium">Loading dishes...</span>
          </div>
        )}

        {!loading && filteredDishes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden border border-[#903e13]/20"
              >
                {dish.image_url && (
                  <div className="h-32 overflow-hidden bg-gray-200">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                )}

                <div className="p-3">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-sm font-semibold flex-1 leading-tight">
                      {dish.name}
                    </h3>
                    <span className="text-sm font-bold whitespace-nowrap">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2 text-[#903e13]/70">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredDishes.length === 0 && (
           <div className="flex justify-center items-center py-10">
            <Loader className="animate-spin w-6 h-6 text-[#903e13]" />
          </div>
        )}
      </div>
    </div>
  );
}
