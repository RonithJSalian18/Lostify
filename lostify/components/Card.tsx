import React from 'react'

const Card = () => {
  return (
    <div className="border rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="w-18 h-18 bg-gray-300 rounded mb-4"></div>
            <h4 className="font-semibold text-lg">Black Wallet</h4>
            <p className="text-gray-600 text-sm">Central Park, New York</p>
          </div>
  )
}

export default Card
