"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Dish {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  category_id: number;
}

interface DishListProps {
  categoryId: number; // 😎 Filter dishes by selected category
  refresh: boolean;   // 🔄 Reload when new dish added/updated
  onEdit: (dish: Dish) => void;
}

export default function DishList({ categoryId, refresh, onEdit }: DishListProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);

  async function loadDishes() {
    if (!categoryId) return;

    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("category_id", categoryId)
      .order("id", { ascending: true });

    if (error) console.error(error);
    setDishes(data || []);
  }

  async function deleteDish(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this dish?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("dishes").delete().eq("id", id);
    if (error) {
      alert("Failed to delete dish: " + error.message);
      return;
    }

    loadDishes(); // reload after delete
  }

  useEffect(() => {
    loadDishes();
  }, [categoryId, refresh]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">All Dishes</h2>

      {dishes.length === 0 ? (
        <p className="text-gray-500">No dishes found</p>
      ) : (
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
      )}
    </div>
  );
}