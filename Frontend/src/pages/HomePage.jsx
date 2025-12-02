import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

const movies = [
  { image: "/images/BannerIronMan.jpg", title: "Iron Man", rating: 4.1 },
  { image: "/images/TheMazeRunner.jpg", title: "The Maze Runner", rating: 4.1 },
  { image: "/images/Guardians.jpg", title: "Guardians of th...", rating: 4.1 },
  { image: "/images/JohnWick.jpeg", title: "John Wick", rating: 4.1 },
  { image: "/images/JurassicWorld.jpg", title: "Jurassic World", rating: 4.1 },
  { image: "/images/Wolfs.jpg", title: "Wolfs", rating: 4.1 },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate("/details");
    }
  };

  return (
    <div className="bg-black text-white">
      <HeroSection />

      <main className="p-4 space-y-10 relative z-10">
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-red-500">Popular Movies</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
            {movies.map((movie, idx) => (
              <MovieCard 
                key={idx} 
                image={movie.image} 
                title={movie.title} 
                rating={movie.rating}
                onClick={() => handleCardClick(idx)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-red-500">Movies You May Like</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
            {movies.map((movie, idx) => (
              <MovieCard 
                key={idx + 100} 
                image={movie.image} 
                title={movie.title} 
                rating={movie.rating}
                onClick={() => handleCardClick(idx)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-red-500">Newly Released Movies</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
            {movies.map((movie, idx) => (
              <MovieCard 
                key={idx + 200} 
                image={movie.image} 
                title={movie.title} 
                rating={movie.rating}
                onClick={() => handleCardClick(idx)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
          <button
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
          >
            Watch
          </button>

          <button
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
          >
            Add to Watchlist
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
