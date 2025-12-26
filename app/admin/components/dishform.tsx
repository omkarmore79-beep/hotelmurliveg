"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Dish {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  category_id: number;
}

interface DishFormProps {
  selectedDish: Dish | null;
  categoryId: number;
  onSave: () => void;
  onCancel: () => void; // <-- NEW
}

export default function DishForm({ selectedDish, categoryId, onSave, onCancel }: DishFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedDish) {
      setName(selectedDish.name);
      setPrice(selectedDish.price.toString());
    } else {
      setName("");
      setPrice("");
      setImageFile(null);
    }
  }, [selectedDish]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let image_url = selectedDish?.image_url ?? null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `dish-${Date.now()}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("dishes")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        return;
      }

      image_url = supabase.storage
        .from("dishes")
        .getPublicUrl(uploadData.path).data.publicUrl;
    }

    const dishData = {
      name,
      price: Number(price),
      category_id: categoryId,
      image_url,
    };

    if (selectedDish) {
      await supabase.from("dishes").update(dishData).eq("id", selectedDish.id);
    } else {
      await supabase.from("dishes").insert([dishData]);
    }

    setName("");
    setPrice("");
    setImageFile(null);

    onSave();
  }

  return (
    <form className="p-4 border rounded-lg mb-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-3">
        {selectedDish ? "Edit Dish" : "Add Dish"}
      </h2>

      <input
        type="text"
        placeholder="Dish Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${selectedDish ? "bg-blue-600" : "bg-green-600"}`}
        >
          {selectedDish ? "Update Dish" : "Add Dish"}
        </button>

        {selectedDish && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}