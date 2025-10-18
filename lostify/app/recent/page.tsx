"use client";

import React, { useEffect, useState } from "react";
import LostItemCard from "@/components/LostItemCard";

type Item = {
  id: number;
  itemName: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  type: "lost" | "found";
};

export default function RecentItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/recent");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Recent Items</h1>
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Recent Items</h1>
          <p className="text-center text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Recent Items</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <div key={`${item.type}-${item.id}`} className="relative">
                <div
                  className={`absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    item.type === "lost" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {item.type === "lost" ? "Lost" : "Found"}
                </div>
                <LostItemCard
                  name={item.itemName}
                  location={item.location}
                  imageUrl={
                    item.image
                      ? `data:image/jpeg;base64,${item.image}`
                      : "/placeholder-image.png"
                  }
                />
                <div className="mt-2 text-sm text-gray-500 text-center">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
