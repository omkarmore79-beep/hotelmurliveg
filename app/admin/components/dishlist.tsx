"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Dish {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image_url?: string;
}

interface DishListProps {
  onEdit: (dish: Dish) => void;
}

export default function DishList({ onEdit }: DishListProps) {
  const supabase = createClientComponentClient();
  const [dishes, setDishes] = useState<Dish[]>([]);

  async function loadDishes() {
    const { data } = await supabase.from("dishes").select("*").order("id");
    setDishes(data || []);
  }

  async function deleteDish(id: string) {
    await supabase.from("dishes").delete().eq("id", id);
    loadDishes();
  }

  useEffect(() => {
    loadDishes();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">All Dishes</h2>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="border p-3 rounded-xl shadow bg-white flex flex-col"
          >
            <img
              src={dish.image_url || "/placeholder.jpg"}
              className="w-full h-32 object-cover rounded-lg mb-3"
              alt={dish.name}
            />

            <h3 className="font-semibold text-lg">{dish.name}</h3>
            <p className="text-sm text-gray-600">{dish.category}</p>
            <p className="font-bold mt-1">₹{dish.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(dish)}
                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteDish(dish.id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
