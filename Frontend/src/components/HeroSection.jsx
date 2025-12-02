import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] overflow-hidden bg-black">
      <img
        src="/images/Rampage.jpg"
        alt="Rampage"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-20" />
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent z-20" />

      <div className="absolute top-1/4 left-10 z-30 text-white max-w-lg">
        <p className="text-xl md:text-2xl mb-1 drop-shadow-md">Duration: 2h 15m</p>
        <h2 className="text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-xl leading-tight">Rampage</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">Action</span>
          <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">Sci-Fi</span>
        </div>
        <p className="text-sm md:text-base mb-4 drop-shadow-md">
          An Action movie with The Rock and a big gorilla monkey planning to save the earth!
        </p>
        <p className="text-xl md:text-2xl mb-2 drop-shadow-md text-yellow-400">★★★★★</p>
        <p className="text-xl md:text-2xl mb-4 drop-shadow-md">Release Year: 1990</p>

        <div className="flex space-x-4">
          <button className="bg-red-600 hover:bg-black text-white hover:text-red-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-transparent hover:border-red-600">
            Watch
          </button>
          <button className="bg-black border border-red-600 hover:bg-red-600 hover:text-white text-red-500 font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
            + Add to Watchlist
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-22 right-10 z-30 flex space-x-3">
        <button className="bg-black bg-opacity-50 backdrop-blur-sm hover:bg-red-600 text-white p-2.5 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300 border-2 border-red-600 hover:scale-110">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="bg-black bg-opacity-50 backdrop-blur-sm hover:bg-red-600 text-white p-2.5 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300 border-2 border-red-600 hover:scale-110">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}