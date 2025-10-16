"use client";

import React, { useState, useEffect } from "react";

const FoundItemForm: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ Notification state
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  // ✅ Automatically hide notification after 3 seconds
  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("contact", contact);
    formData.append("email", email);
    if (image) formData.append("image", image);

    const res = await fetch("/api/found", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setNotification({
        message: "Found item posted successfully ✅",
        type: "success",
        visible: true,
      });

      // Clear the form
      setItemName("");
      setDescription("");
      setLocation("");
      setContact("");
      setEmail("");
      setImage(null);
    } else {
      setNotification({
        message: "Failed to post found item ❌",
        type: "error",
        visible: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden px-4">
      {/* ✅ Notification Popup */}
      {notification.visible && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-4 rounded-xl shadow-xl transition-all duration-300
          ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} 
          text-white text-lg font-semibold`}
        >
          {notification.message}
        </div>
      )}

      {/* Navigation */}
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

      {/* Form */}
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

        <label className="block mb-2 font-medium">Contact Number</label>
        <input
          type="tel"
          placeholder="e.g. +1 234 567 8901"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Email Address</label>
        <input
          type="email"
          placeholder="e.g. example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
