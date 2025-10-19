"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// --- Themed LostItemCard ---
interface LostItemCardProps {
  name: string;
  location: string;
  imageUrl: string;
}

const LostItemCard: React.FC<LostItemCardProps> = ({
  name,
  location,
  imageUrl,
}) => {
  return (
    <div
      className="
        relative rounded-2xl overflow-hidden 
        bg-gradient-to-br from-gray-800 via-gray-900 to-black
        shadow-lg shadow-blue-900/40
        border border-gray-700/50
        hover:border-blue-500/60
        hover:shadow-blue-700/50
        transition-all duration-300 transform hover:scale-[1.03]
      "
    >
      <div className="relative w-full h-48 sm:h-60">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-t-2xl"
          sizes="100%"
        />
      </div>
      <div className="p-3 text-white">
        <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
          📍 {location}
        </p>
      </div>
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-blue-500/10 to-transparent"></div>
    </div>
  );
};

// --- LostPage Component ---
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
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

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

  useEffect(() => {
    let filtered = allItems;

    filtered = filtered.filter((item) => {
      if (showLost && item.type === "lost") return true;
      if (showFound && item.type === "found") return true;
      return false;
    });

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, locationFilter, showLost, showFound, allItems]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 sm:px-6">
      {/* Background Blobs */}
      <div className="absolute top-20 left-4 sm:left-10 w-60 sm:w-72 h-60 sm:h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-4 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-40 sm:w-60 h-40 sm:h-60 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Navbar */}
      <header className="flex items-center justify-between py-4">
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

      {/* Search */}
      <main className="mt-6 relative z-10">
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden flex justify-end mb-2">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="bg-blue-600 px-3 py-1 rounded-md text-white"
          >
            {showFiltersMobile ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          {/* Filters */}
          <aside
            className={`${
              showFiltersMobile ? "block" : "hidden"
            } sm:block w-full sm:w-56 bg-gray-800 p-4 rounded-xl shadow-lg`}
          >
            <button className="py-2 mb-4 font-semibold text-xl text-blue-400 w-full">
              Filters
            </button>
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-300">Type</h3>
              <label className="flex items-center gap-2 mb-1">
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
              <h3 className="font-medium mb-2 text-gray-300">Location</h3>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <Image
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              width={500}
              height={400}
              className="w-full h-56 sm:h-72 object-cover rounded-md mb-4"
              priority
            />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {selectedItem.name}
            </h3>
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
