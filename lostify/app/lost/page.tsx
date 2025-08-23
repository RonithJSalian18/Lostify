"use client";
import React, { useState } from "react";

const Lost: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600">🔍</div>
          <span className="font-bold text-lg">Lostify</span>
        </div>
        <div className="space-x-6">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </a>
        </div>
      </nav>

      <div className="flex justify-center items-center py-12">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Lost Something?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Post details of your lost item so others can help you find it.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Item name
              </label>
              <input
                type="text"
                placeholder="e.g. Black Wallet"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                placeholder="e.g. Leather wallet with ID card inside"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last seen location
              </label>
              <input
                type="text"
                placeholder="e.g. Central Park, NY"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm border rounded-md px-2 py-1"
              />
            </div>

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
              Post Lost Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lost;
