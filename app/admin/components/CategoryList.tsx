"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Category {
  id: number;
  name: string;
  image_url: string | null;
}

interface CategoryListProps {
  refresh: boolean;
  onEdit: (cat: Category) => void;
  onSelect: (cat: Category) => void;
}

export default function CategoryList({ refresh, onEdit, onSelect }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase Category Fetch Error:", error.message);
    }

    setCategories(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, [refresh]);

  async function handleDelete(id: number) {
    if (!confirm("Delete category?")) return;

    const { error } = await supabase.from("category").delete().eq("id", id);

    if (error) {
      console.error("Delete Error:", error.message);
      alert("Failed to delete category!");
      return;
    }

    loadCategories();
  }

  return (
    <div>
      <h2 className="font-bold mb-3">All Categories</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border p-3 rounded shadow bg-white flex flex-col"
            >
              <img
                src={cat.image_url || "/placeholder.png"}
                className="w-full h-32 object-cover rounded mb-2 cursor-pointer"
                alt={cat.name}
                onClick={() => onSelect(cat)}
              />

              <h3 className="font-semibold">{cat.name}</h3>

              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => onEdit(cat)}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(cat.id)}
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