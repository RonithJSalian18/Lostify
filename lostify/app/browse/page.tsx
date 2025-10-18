"use client";

import Link from "next/link";
import Image from "next/image";
import LostItemCard from "@/components/LostItemCard";
import React, { useState, useEffect } from "react";

interface DBItem {
  id: number;
  itemName: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  image: string | null;
  createdAt: string;
}

interface Item {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
  description?: string;
  contact?: string;
  email?: string;
  type: "lost" | "found";
}

const LostPage: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showLost, setShowLost] = useState(true);
  const [showFound, setShowFound] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch items from both APIs
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const [lostResponse, foundResponse] = await Promise.all([
          fetch("/api/lost"),
          fetch("/api/found"),
        ]);

        const lostData: DBItem[] = await lostResponse.json();
        const foundData: DBItem[] = await foundResponse.json();

        // Transform lost items
        const lostItems: Item[] = lostData.map((item) => ({
          id: item.id,
          name: item.itemName,
          location: item.location,
          imageUrl: item.image
            ? `data:image/jpeg;base64,${item.image}`
            : "/images/placeholder.jpg",
          description: item.description,
          contact: item.contact,
          email: item.email,
          type: "lost",
        }));

        // Transform found items
        const foundItems: Item[] = foundData.map((item) => ({
          id: item.id,
          name: item.itemName,
          location: item.location,
          imageUrl: item.image
            ? `data:image/jpeg;base64,${item.image}`
            : "/images/placeholder.jpg",
          description: item.description,
          contact: item.contact,
          email: item.email,
          type: "found",
        }));

        const combined = [...lostItems, ...foundItems];
        setAllItems(combined);
        setFilteredItems(combined);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on search, location, and type
  useEffect(() => {
    let filtered = allItems;

    // Filter by type
    filtered = filtered.filter((item) => {
      if (showLost && item.type === "lost") return true;
      if (showFound && item.type === "found") return true;
      return false;
    });

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, locationFilter, showLost, showFound, allItems]);

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
        <Link href="/" className="text-gray-200 hover:text-blue-400 transition">
          Home
        </Link>
      </header>

      {/* Search & Filters */}
      <main className="p-6 max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">
          What are you looking for?
        </h2>

        <input
          type="text"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={showLost}
                  onChange={(e) => setShowLost(e.target.checked)}
                />
                Lost
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-green-500"
                  checked={showFound}
                  onChange={(e) => setShowFound(e.target.checked)}
                />
                Found
              </label>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-gray-300">Location</h3>
              <input
                type="text"
                placeholder="Enter location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </aside>

          {/* Items Grid */}
          <section className="flex-1">
            {loading ? (
              <div className="text-center text-gray-400 py-20">
                Loading items...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                No items found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
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
              </div>
            )}
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
            <Image
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              width={800}
              height={426}
              className="w-full h-64 object-cover rounded-md mb-4"
              priority
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
