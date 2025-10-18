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
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
            🔍
          </div>
          <span className="font-bold text-lg text-white">Lostify</span>
        </div>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-600 text-white">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-blue-600">
            About
          </Link>
        </div>
      </nav>

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
      <div className="flex justify-center items-center py-12">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Lost Something?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Post details of your lost item so others can help you find it.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Item name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Item name
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Black Wallet"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Leather wallet with ID card inside"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last seen location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Central Park, NY"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. yourname@example.com"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Upload Image */}
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
              <div className="mt-3 relative w-full h-64">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md border"
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
