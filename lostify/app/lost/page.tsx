"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Lost: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("contact", contact);
    formData.append("email", email);
    if (image) formData.append("image", image);

    const res = await fetch("/api/lost", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setPopup({
        message: "Lost item posted successfully ✅",
        type: "success",
      });
      setItemName("");
      setDescription("");
      setLocation("");
      setContact("");
      setEmail("");
      setImage(null);
    } else {
      setPopup({ message: "Failed to post lost item ❌", type: "error" });
    }

    // Hide popup automatically after 3 seconds
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black 
      relative overflow-hidden"
    >
      {/* Navbar */}
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-8 mt-8">
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

      {/* Popup Message */}
      <AnimatePresence>
        {popup.message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              px-6 py-4 rounded-xl shadow-2xl text-white z-50 text-center
              ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            <p className="font-semibold text-lg">{popup.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 max-w-md w-full mx-auto shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-2 text-white">
          Lost Something?
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
          Post Lost Item
        </button>
      </form>
    </div>
  );
};

export default Lost;
