import React from "react";
import Card from "./Card";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full flex justify-between items-center max-w-5xl">
        <h1 className="text-xl md:text-2xl font-bold">Lostify</h1>
        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 text-sm md:text-base font-semibold">
          Login
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mt-10 gap-6">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left w-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            What are you searching for?
          </h2>
          <div className="flex md:flex-col gap-3 w-full md:w-auto">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-600 w-full md:w-52">
              I Lost Something
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-600 w-full md:w-52">
              I Found Something
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full max-w-5xl">
        <input
          type="text"
          placeholder="Search for an item"
          className="w-full border rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Recent Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
