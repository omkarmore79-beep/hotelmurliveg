"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Category {
  id: number;
  name: string;
  image_url: string | null;
}

interface CategoryFormProps {
  selectedCategory: Category | null;
  onSave: () => void;
  onCancel: () => void; // <-- NEW
}

export default function CategoryForm({ selectedCategory, onSave, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
    } else {
      setName("");
      setImageFile(null);
    }
  }, [selectedCategory]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let image_url = selectedCategory?.image_url || null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `category-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("category")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        return;
      }

      const { data: publicUrlInfo } = supabase.storage
        .from("category")
        .getPublicUrl(uploadData.path);

      image_url = publicUrlInfo.publicUrl;
    }

    if (selectedCategory) {
      const { error } = await supabase
        .from("category")
        .update({ name, image_url })
        .eq("id", selectedCategory.id);

      if (error) {
        alert("Failed to update category: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("category")
        .insert([{ name, image_url }]);

      if (error) {
        alert("Failed to add category: " + error.message);
        return;
      }
    }

    setName("");
    setImageFile(null);

    onSave();
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4">
      <h2 className="font-bold mb-2">
        {selectedCategory ? "Edit Category" : "Add Category"}
      </h2>

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-2"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${selectedCategory ? "bg-blue-600" : "bg-green-600"}`}
        >
          {selectedCategory ? "Update Category" : "Add Category"}
        </button>

        {selectedCategory && (
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