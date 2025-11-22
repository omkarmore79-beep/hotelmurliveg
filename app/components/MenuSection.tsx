"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Hot Beverages");
  const [searchTerm, setSearchTerm] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🧾 Categories + Manual Image Paths
  const categories = [
    { name: "Hot Beverages", image: "/images/hotbeverages.png" },
    { name: "Wadi Special", image: "/images/wadispecial.png" },
    { name: "Pakoda", image: "/images/Pakoda.png" },
    { name: "Appetizers", image: "/images/Appetizers.png" },
    { name: "Toast & Sandwich", image: "/images/freshjuice.png" },
    { name: "Pizza", image: "/images/pizza.png" },
    { name: "Fries", image: "/images/fries.png" },
    { name: "Salad", image: "/images/Salad.png" },
    { name: "Pav Bhaji", image: "/images/pavbhaji.png" },
    { name: "Sizzlers", image: "/images/sizzlers.png" },
    { name: "Fried Kabab", image: "/images/friedkabab.png" },
    { name: "Soup", image: "/images/soup.png" },
    { name: "Tandoori Kabab", image: "/images/tandoorikabab.png" },
    { name: "Continental Starter", image: "/images/lassi.png" },
    { name: "Chinese Starter", image: "/images/chinesestarter.png" },
    { name: "Thali Special", image: "/images/thali.png" },
    { name: "Maharashtrian Special", image: "/images/maharashtrianspc.png" },
    { name: "Tawa Special", image: "/images/tawaspecial.png" },
    { name: "Indian Sweet Dish", image: "/images/indiansweetdish.png" },
    { name: "Paneer Main Course", image: "/images/paneermaincourse.png" },
    { name: "Veg Main Course", image: "/images/vegmaincourse.png" },
    { name: "Murali Chef's Spl Punjabi Dishes", image: "/images/muralichefs.png" },
    { name: "Roti", image: "/images/roti.png" },
    { name: "Dal", image: "/images/dal.png" },
    { name: "Bhat Special", image: "/images/bhaatspecial.png" },
    { name: "Basmati Rice", image: "/images/basmatirice.png" },
    { name: "Chinese Rice", image: "/images/chinese.png" },
    { name: "Chinese Noodels", image: "/images/chinese.png" },
    { name: "Lassi", image: "/images/lassi.png" },
    { name: "Shakes", image: "/images/shakes.png" },
    { name: "Mocktails", image: "/images/mocktails.png" },
    { name: "Fresh Seasonal Juice", image: "/images/freshjuice.png" },
    { name: "Mojito", image: "/images/mojito.png" },
    { name: "Dessert", image: "/images/dessert.png" },
    { name: "Mastani", image: "/images/dessert.png" },
    { name: "Ice Cream", image: "/images/icecream.png" },
  ];

  // Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 🔄 Fetch dishes when active category changes
  useEffect(() => {
    fetchDishesByCategory(activeCategory);
  }, [activeCategory]);

  const fetchDishesByCategory = async (categoryName: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (!supabaseUrl || !supabaseKey) {
        setError("Supabase credentials not configured");
        return;
      }

      const query = `?select=*&category=ilike.${encodeURIComponent(
        categoryName
      )}&order=id.asc`;

      const response = await fetch(`${supabaseUrl}/rest/v1/dishes${query}`, {
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        } as HeadersInit,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dishes");
      }

      const data: Dish[] = await response.json();
      setDishes(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filter dishes based on search term
  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      //dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcf3e6] text-[#903e13]">
      {/* 🔍 Search Bar */}
      <div className="px-4 pt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search starters, mains or desserts..."
          className="w-full px-4 py-2 rounded-full border-2 border-[#903e13] bg-white text-[#903e13] placeholder-[#903e13]/50 focus:outline-none focus:border-[#903e13]"
        />
      </div>

      {/* 🧭 Scrollable Categories */}
      <div className="relative mt-1">
        <div
          id="scrollMenu"
          className="flex overflow-x-auto scroll-smooth scrollbar-hide px-4 py-2 space-x-3"
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

                  const { name, image } = categories[idx];
                  const isActive = activeCategory === name;

                  return (
                    <button
                      key={name}
                      onClick={() => setActiveCategory(name)}
                      className="flex flex-col items-center justify-center cursor-pointer focus:outline-none w-16"
                    >
                      <div
                        className={`w-12 h-12 overflow-hidden flex items-center justify-center mb-1 rounded-md ${
                          isActive ? "bg-[#903e13]" : "bg-[#fcf3e6]"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <span
                        className="text-[10px] font-medium text-center w-full truncate text-[#903e13]"
                        title={name}
                      >
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* 📋 Dishes Section */}
      <div className="px-4 py-5">
        <h2 className="text-xl font-bold text-[#903e13] mb-4">
          {activeCategory}
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-[#903e13] animate-spin" />
            <span className="ml-2 text-[#903e13]">Loading dishes...</span>
          </div>
        )}

        {/* 🟧 Compact Dish Cards */}
        {!loading && filteredDishes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-[#903e13]/20"
              >
                {/* Image */}
                {dish.image_url && (
                  <div className="h-32 overflow-hidden bg-gray-200">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-[#903e13] flex-1 leading-tight">
                      {dish.name}
                    </h3>

                    <span className="text-sm font-bold text-[#903e13] ml-2 whitespace-nowrap">
                      ₹{dish.price}
                    </span>
                  </div>

                  <p className="text-[#903e13]/70 text-xs line-clamp-2 leading-snug">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredDishes.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[#903e13]/60 text-lg">
              {searchTerm
                ? "No dishes found matching your search"
                : "No dishes found in this category"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
