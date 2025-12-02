import React from "react";

export default function MovieCard({ image, title, rating, onClick }) {
  return (
    <div 
      className="bg-black rounded-lg p-1 shadow-[0_12px_30px_-10px_rgba(255,0,0,0.7)] transform transition-transform duration-300 hover:scale-105 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-64 md:h-72 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between px-2 mt-2">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-yellow-400 flex items-center gap-1">{rating} ★</p>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <img 
            src="/images/heart.png" 
            alt="Heart" 
            className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity duration-200" 
            onClick={(e) => e.stopPropagation()}
          />
          <img 
            src="/images/eye.png" 
            alt="Eye" 
            className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity duration-200" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}