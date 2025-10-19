"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const FoundItemForm: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden px-4 py-8">
      {/* Notification */}
      {notification.visible && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-4 rounded-xl shadow-xl
            ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} 
            text-white text-lg font-semibold text-center transition-all duration-300`}
        >
          {notification.message}
        </div>
      )}

      {/* Navbar */}
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            🔍
          </div>
          <span className="text-2xl font-bold text-white tracking-wide">
            Lostify
          </span>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-white hover:text-blue-400 transition">
            Home
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-blue-400 transition"
          >
            About
          </Link>
        </nav>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 max-w-md w-full mx-auto shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-2 text-white">
          Found Something?
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Help others find their lost items by posting a description and image
          of the item you found.
        </p>

        <label className="block mb-2 font-medium text-white">Item name</label>
        <input
          type="text"
          placeholder="e.g. Black Wallet"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-white">Description</label>
        <textarea
          placeholder="e.g. Leather wallet with ID card inside"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        <label className="block mb-2 font-medium text-white">Location</label>
        <input
          type="text"
          placeholder="e.g. New York, NY"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-white">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="e.g. +1 234 567 8901"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          placeholder="e.g. example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium text-white">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full border border-gray-700 rounded-md px-3 py-2 mb-6 bg-gray-900 text-white"
        />

        {image && (
          <Image
            src={URL.createObjectURL(image)}
            alt="Preview"
            width={800}
            height={512}
            className="w-full max-h-64 object-cover rounded-md border mb-4"
            unoptimized
          />
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
