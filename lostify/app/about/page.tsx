// src/pages/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600">🔍</div>
          <span className="font-bold text-lg">Lostify</span>
        </div>
        <div className="space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-blue-600 font-semibold">
            About
          </a>
        </div>
      </nav>

      {/* About Section */}
      <div className="flex-grow max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          About Lostify
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Helping people reconnect with their belongings by bridging the gap
          between what’s lost and what’s found.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🔍 Search Lost Items
            </h2>
            <p className="text-gray-600">
              Easily search through posted items to check if someone has found
              your lost belongings. Use filters like category, date, and
              location.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              📌 Post Found Items
            </h2>
            <p className="text-gray-600">
              Found something? Upload a picture, add details, and help the
              rightful owner reclaim their lost property quickly and safely.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🤝 Community Driven
            </h2>
            <p className="text-gray-600">
              Our platform thrives on community support. Each post contributes
              to helping someone reunite with something they’ve lost.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🔒 Safe & Secure
            </h2>
            <p className="text-gray-600">
              We ensure privacy and safe communication between users while
              prioritizing trust and responsibility.
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lostify is more than just a lost-and-found platform. It’s about
            building trust, supporting communities, and ensuring that valuable
            belongings make their way back to their rightful owners.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Me</h3>
          <p className="text-gray-400">
            Designed & Developed by{" "}
            <span className="font-bold">Ronith J Salian</span>
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:ronithjsalian01@gmail.com"
              className="hover:text-white"
            >
              📧 Email
            </a>
            <a
              href="https://github.com/RonithJSalian18"
              target="_blank"
              className="hover:text-white"
            >
              💻 GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ronith-j-salian-093b76288/"
              target="_blank"
              className="hover:text-white"
            >
              🔗 LinkedIn
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Lostify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
