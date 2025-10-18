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

const HomePage: React.FC = () => {
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch("/api/recent");
        if (response.ok) {
          const data = await response.json();
          // Show only the 6 most recent items
          setRecentItems(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching recent items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentItems();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 
      bg-gradient-to-br from-gray-900 via-gray-800 to-black 
      relative overflow-hidden text-white"
    >
      {/* Background animated blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Header */}
      <div className="w-full flex justify-between items-center max-w-5xl relative z-10">
        <div className="flex space-x-2 items-center">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
            🔍
          </div>
          <h1 className="text-xl md:text-2xl font-bold">Lostify</h1>
        </div>
        <div className="space-x-6">
          <a href="/about" className="hover:text-blue-400 transition">
            About
          </a>
          {/* <button className="px-4 py-2 border rounded-lg hover:bg-gray-800 text-sm md:text-base font-semibold transition hover:text-blue-400">
            Login
          </button> */}
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mt-30 gap-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left w-lg">
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            What are you searching for?
          </h2>
          <div className="flex md:flex-col gap-3 w-full md:w-auto">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 w-full md:w-52 transition-transform hover:scale-105">
              <a href="/lost">I Lost Something</a>
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 w-full md:w-52 transition-transform hover:scale-105">
              <a href="/found">I Found Something</a>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="mt-10 w-full max-w-5xl relative z-10">
        <input
          type="text"
          placeholder="Search for an item..."
          className="w-full border rounded-lg px-4 py-3 text-white shadow-md focus:ring-2 focus:ring-white focus:outline-none transition"
        />
      </div> */}

      {/* Recent Items */}
      <div className="mt-10 w-full max-w-5xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold">Recent Items</h3>
          <a
            href="/recent"
            className="text-blue-400 hover:text-blue-300 transition font-medium"
          >
            View All →
          </a>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading recent items...</p>
        ) : recentItems.length === 0 ? (
          <p className="text-center text-gray-400">No items found yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentItems.map((item) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
