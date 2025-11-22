"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Dish {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image_url?: string;
}

interface DishFormProps {
  selectedDish: Dish | null;
  onSave: () => void;
}

export default function DishForm({ selectedDish, onSave }: DishFormProps) {
  const supabase = createClientComponentClient();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedDish) {
      setName(selectedDish.name);
      setPrice(selectedDish.price);
      setCategory(selectedDish.category);
      setDescription(selectedDish.description);
    }
  }, [selectedDish]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let image_url = selectedDish?.image_url ?? null;

    // ---- Image Upload ----
    if (imageFile) {
      const fileName = `dish-${Date.now()}.${imageFile.name.split(".").pop()}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("dishes") // bucket name
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        return;
      }

      image_url = supabase.storage
        .from("dishes")
        .getPublicUrl(uploadData.path).data.publicUrl;
    }

    // ---- Update Dish ----
    if (selectedDish) {
      await supabase
        .from("dishes")
        .update({
          name,
          price: Number(price), // FIXED
          category,
          description,
          image_url,
        })
        .eq("id", selectedDish.id);
    }

    // ---- Add New Dish ----
    else {
      await supabase.from("dishes").insert([
        {
          name,
          price: Number(price), // FIXED
          category,
          description,
          image_url,
        },
      ]);
    }

    // Reset form
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
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
        type="text"
        placeholder="Category"
        className="border p-2 w-full mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {selectedDish ? "Update Dish" : "Add Dish"}
      </button>
    </form>
  );
}
