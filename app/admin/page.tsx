"use client";

import { useState } from "react";
import DishForm from "./components/dishform";
import DishList from "./components/dishlist";

interface Dish {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image_url?: string;
}

export default function AdminDashboard() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [refresh, setRefresh] = useState(false);

  function reload() {
    setRefresh(!refresh);
    setSelectedDish(null);
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <DishForm selectedDish={selectedDish} onSave={reload} />
      <DishList key={refresh.toString()} onEdit={setSelectedDish} />

    </main>
  );
}
