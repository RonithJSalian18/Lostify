"use client";

import React, { useState } from "react";

const FoundItemForm: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ itemName, description, location, image });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black 
      relative overflow-hidden px-4"
    >
      <nav className="w-full flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            🔍
          </div>
          <span className="font-bold text-lg text-white">Lostify</span>
        </div>
        <div className="space-x-6 text-gray-700">
          <a href="/" className="hover:text-blue-600 text-white">
            Home
          </a>
          <a href="/about" className="hover:text-blue-600 text-white">
            About
          </a>
        </div>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full shadow-lg rounded-2xl p-8 mt-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">
          Found Something
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Help others find their lost items by posting a description and image
          of the item you found.
        </p>

        <label className="block mb-2 font-medium">Item name</label>
        <input
          type="text"
          placeholder="e.g. Black Wallet"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          placeholder="e.g. Leather wallet with ID card inside"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        <label className="block mb-2 font-medium">Location</label>
        <input
          type="text"
          placeholder="e.g. New York, NY"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full border rounded-md px-3 py-2 mb-6"
        />

        {image && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-md border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post Found Item
        </button>
      </form>
    </div>
  );
};

export default FoundItemForm;
