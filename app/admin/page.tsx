"use client";

import { useState, useRef } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import DishForm from "./components/dishform";
import DishList from "./components/dishlist";

export interface Category {
  id: number;
  name: string;
  image_url: string | null;
}

export default function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [selectedDish, setSelectedDish] = useState<any>(null);

  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshDishes, setRefreshDishes] = useState(false);

  // ✨ Scroll Refs
  const categoryFormRef = useRef<HTMLDivElement>(null);
  const dishFormRef = useRef<HTMLDivElement>(null);

  function scrollToCategoryForm() {
    categoryFormRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToDishForm() {
    dishFormRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function reloadCategories() {
    setRefreshCategories((prev) => !prev);
    setEditCategory(null);
  }

  function reloadDishes() {
    setRefreshDishes((prev) => !prev);
    setSelectedDish(null);
  }

  function handleCancelCategory() {
    setEditCategory(null); // go back to Add Category mode
  }

  function handleCancelDish() {
    setSelectedDish(null); // go back to Add Dish mode
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {/* 🌟 CATEGORY FORM */}
      <div ref={categoryFormRef}>
        <CategoryForm
          selectedCategory={editCategory}
          onSave={reloadCategories}
          onCancel={handleCancelCategory} // <-- pass cancel
        />
      </div>

      <hr className="my-6 border-gray-200" />

      {/* 🌟 CATEGORY LIST */}
      <CategoryList
        refresh={refreshCategories}
        onEdit={(cat) => {
          setEditCategory(cat);
          scrollToCategoryForm(); // scroll to form
        }}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          scrollToDishForm();
        }}
      />

      <hr className="my-6 border-gray-200" />

      {/* 🌟 DISH SECTION */}
      {selectedCategory && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-bold mb-3 text-blue-600">
            Dishes in "{selectedCategory.name}"
          </h2>

          {/* 🌟 DISH FORM */}
          <div ref={dishFormRef}>
            <DishForm
              selectedDish={selectedDish}
              categoryId={selectedCategory.id}
              onSave={reloadDishes}
              onCancel={handleCancelDish}
            />
          </div>

          <h3 className="text-md font-semibold mt-4 mb-2">List of Dishes</h3>

          {/* 🌟 DISH LIST */}
          <DishList
            categoryId={selectedCategory.id}
            refresh={refreshDishes}
            onEdit={(dish) => {
              setSelectedDish(dish);
              scrollToDishForm();
            }}
          />
        </div>
      )}
    </main>
  );
}
