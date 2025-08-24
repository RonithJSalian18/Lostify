import React from "react";

type LostItemCardProps = {
  name: string;
  location: string;
  imageUrl: string; // now we take image URL instead of icon
};

const LostItemCard: React.FC<LostItemCardProps> = ({
  name,
  location,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow rounded-2xl w-48 h-56">
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-cover mb-3 border"
      />
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500 text-center">{location}</p>
    </div>
  );
};

export default LostItemCard;
