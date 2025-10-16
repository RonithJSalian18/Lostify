"use client";

import LostItemCard from "@/components/LostItemCard";
import React, { useState } from "react";

interface Item {
  name: string;
  location: string;
  imageUrl: string;
  description?: string;
  contact?: string;
  email?: string;
}

const LostPage: React.FC = () => {
  // Example lost items (replace with backend data later)
  const lostItems: Item[] = [
    {
      name: "Black Wallet",
      location: "Central Park, New York",
      imageUrl: "/images/wallet.jpg",
      description: "Leather wallet with multiple cards inside.",
      contact: "9876543210",
      email: "walletfinder@mail.com",
    },
    {
      name: "Silver Watch",
      location: "Downtown, San Francisco",
      imageUrl: "/images/watch.jpg",
      description: "Rolex silver watch, slightly scratched.",
      contact: "9876541230",
      email: "watchowner@mail.com",
    },
    {
      name: "Gray Backpack",
      location: "Western District, Hong Kong",
      imageUrl: "/images/backpack.jpg",
      description: "Nike backpack with books and water bottle.",
      contact: "9911223344",
      email: "bagsearch@mail.com",
    },
    {
      name: "Black iPhone",
      location: "Williamsburg, Brooklyn",
      imageUrl: "/images/iphone.jpg",
      description: "iPhone 12 with black case, screen protector cracked.",
      contact: "9998887777",
      email: "lostiphone@mail.com",
    },
  ];

  // Modal state
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      {/* --- Creative Background --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 md:mx-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
            🔍
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Lostify</h1>
        </div>
        <a href="/" className="text-gray-200 hover:text-blue-400 transition">
          Home
        </a>
      </header>

      {/* Search & Filters */}
      <main className="p-6 max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">
          What are you looking for?
        </h2>

        <input
          type="text"
          placeholder="Search for an item..."
          className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-8">
          {/* Filters */}
          <aside className="w-56 bg-gray-800 p-4 rounded-xl shadow-lg">
            <button className="py-2 mb-4 font-semibold text-xl text-blue-400">
              Filters
            </button>
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-gray-300">Type</h3>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="accent-blue-500" />
                Lost
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                Found
              </label>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-gray-300">Location</h3>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </aside>

          {/* Items Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {lostItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer"
              >
                <LostItemCard
                  name={item.name}
                  location={item.location}
                  imageUrl={item.imageUrl}
                />
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            {/* Item Image */}
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />

            {/* Item Details */}
            <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {selectedItem.location}
            </p>
            {selectedItem.description && (
              <p className="text-gray-400 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {selectedItem.description}
              </p>
            )}
            {selectedItem.contact && (
              <p className="text-gray-400 mb-2">
                <span className="font-semibold">Contact:</span>{" "}
                {selectedItem.contact}
              </p>
            )}
            {selectedItem.email && (
              <p className="text-gray-400 mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {selectedItem.email}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostPage;
