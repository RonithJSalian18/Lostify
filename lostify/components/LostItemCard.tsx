import React from "react";
import Image from "next/image";

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
  // Check if it's a data URL (base64 encoded)
  const isDataUrl = imageUrl.startsWith("data:");

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow rounded-2xl w-48 h-56">
      <div className="w-20 h-20 relative mb-3 border">
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500 text-center">{location}</p>
    </div>
  );
};

export default LostItemCard;
