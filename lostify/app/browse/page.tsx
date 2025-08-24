import LostItemCard from "@/components/LostItemCard";
import React from "react";

const LostPage: React.FC = () => {
  // Example lost items (replace with backend data later)
  const lostItems = [
    {
      name: "Black Wallet",
      location: "Central Park, New York",
      imageUrl: "/images/wallet.jpg", // replace with uploaded image path
    },
    {
      name: "Silver Watch",
      location: "Downtown, San Francisco",
      imageUrl: "/images/watch.jpg",
    },
    {
      name: "Gray Backpack",
      location: "Western District, Hong Kong",
      imageUrl: "/images/backpack.jpg",
    },
    {
      name: "Black iPhone",
      location: "Williamsburg, Brooklyn",
      imageUrl: "/images/iphone.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 md:mx-20">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600">🔍</div>
          <h1 className="text-xl font-bold">Lostify</h1>
        </div>
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
      </header>

      {/* Search & Filters */}
      <main className="p-6 max-w-5xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">What are you looking for?</h2>

        <input
          type="text"
          placeholder="Search for an item"
          className="w-full p-3 border rounded-lg mb-6"
        />

        <div className="flex gap-6">
          {/* Filters */}
          <aside className="w-48">
            <button className=" py-2 mb-2 font-semibold text-xl">
              Filters
            </button>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Type</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Lost
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Found
              </label>
            </div>
            <div>
              <h3 className="font-medium mb-2">Location</h3>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </aside>
          {/* Items Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {lostItems.map((item, index) => (
              <LostItemCard
                key={index}
                name={item.name}
                location={item.location}
                imageUrl={item.imageUrl}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default LostPage;
