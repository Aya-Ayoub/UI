import React from "react";
import { Heart, Eye, EyeOff } from "lucide-react";

export default function MovieCard({
  image,
  title,
  rating,
  isWatchlisted,
  isWatched,
  onToggleWatchlist,
  onToggleWatched,
  onClick
}) {
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
          <p className="text-sm font-semibold text-white leading-tight">
            <span className="block md:hidden">
              {title.length > 7 ? title.slice(0, 7) + "..." : title}
            </span>

            <span className="hidden md:block">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </span>
          </p>


          <p className="text-xs text-gray-300 mt-1">⭐ {rating}</p>
        </div>

        <div className="flex items-center space-x-3 mt-2">


          <Heart
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist();
            }}
            className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
              isWatchlisted ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />


          {isWatched ? (
            <Eye
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatched();
              }}
              className="w-5 h-5 cursor-pointer text-red-500"
            />
          ) : (
            <EyeOff
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatched();
              }}
              className="w-5 h-5 cursor-pointer text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
