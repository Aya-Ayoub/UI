import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function HeroSection({ trending = [] }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useProfile();


  useEffect(() => {
    if (trending.length === 0) return;

    const interval = setInterval(() => {
      smoothNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [index, trending]);

  const smoothNext = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % trending.length);
      setFade(false);
    }, 300);
  };

  const smoothPrev = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((i) => (i - 1 + trending.length) % trending.length);
      setFade(false);
    }, 300);
  };

  if (trending.length === 0) {
    return (
      <section className="relative h-[80vh] md:h-[85vh] bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </section>
    );
  }

  const movie = trending[index];


  const handleAddWatchlist = async () => {
    if (!user) return;

    const exists = user.watchlist?.includes(movie.id);

    const updatedList = exists
      ? user.watchlist.filter((m) => m !== movie.id)
      : [...user.watchlist, movie.id];

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watchlist: updatedList }),
    });

    setUser({ ...user, watchlist: updatedList });
  };

  const isAdded = user?.watchlist?.includes(movie.id);


  const handleWatch = () => navigate(`/details/${movie.id}`);

  return (
    <section className="relative h-[80vh] md:h-[85vh] overflow-hidden bg-black">

      <img
        src={movie.bigposter}
        alt={movie.title}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-20" />
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent z-20" />

      <div
        className={`absolute top-1/4 left-10 z-30 text-white max-w-lg transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-xl leading-tight">
          {movie.title}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre?.split(",").map((g, i) => (
            <span
              key={i}
              className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full"
            >
              {g.trim()}
            </span>
          ))}
        </div>

        <p className="relative text-sm md:text-base mb-4 brightness-110 drop-shadow-[0_0_18px_rgba(0,0,0,1)] before:absolute before:inset-0 before:-z-10 before:bg-black/25 before:blur-md before:rounded">
          {movie.description}
        </p>

        <p className="text-xl md:text-2xl mb-2 drop-shadow-md text-yellow-400">
          ★ {movie.rating}
        </p>

        <p className="text-xl md:text-2xl mb-4 drop-shadow-md">
          Release Year: {movie.year}
        </p>

        <div className="flex space-x-4">


          <button
            onClick={handleWatch}
            className="
              px-6 py-2 rounded-lg font-bold
              bg-red-600 text-white
              shadow-[0_0_18px_rgba(220,38,38,0.45)]
              transition-all duration-300
              border-2 border-transparent
              hover:bg-black hover:text-red-600
              hover:border-red-600
              hover:shadow-[0_0_28px_rgba(220,38,38,0.7)]
              hover:scale-[1.03]
            "
          >
            Watch
          </button>


          <button
            onClick={handleAddWatchlist}
            className="
              px-6 py-2 rounded-lg font-bold flex items-center
              bg-black text-red-500
              border-2 border-red-600
              shadow-[0_0_14px_rgba(220,38,38,0.45)]
              transition-all duration-300
              hover:bg-red-600 hover:text-white
              hover:shadow-[0_0_22px_rgba(220,38,38,0.7)]
              hover:scale-[1.03]
            "
          >
            {isAdded ? "Added" : "+ Add to Watchlist"}
          </button>

        </div>
      </div>

      <div className="absolute bottom-5 right-10 z-30 flex space-x-3">
        <button
          onClick={smoothPrev}
          className="bg-black bg-opacity-50 backdrop-blur-sm hover:bg-red-600 text-white p-2.5 rounded-full border-2 border-red-600 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={smoothNext}
          className="bg-black bg-opacity-50 backdrop-blur-sm hover:bg-red-600 text-white p-2.5 rounded-full border-2 border-red-600 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </section>
  );
}
