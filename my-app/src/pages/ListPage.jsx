import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const moviesData = [
  { id: 1, title: "Iron Man", image: "/images/BannerIronMan.jpg", rating: 5, year: 2008, genre: "Action" },
  { id: 2, title: "Guardians", image: "/images/Guardians.jpg", rating: 4, year: 2014, genre: "Action" },
  { id: 3, title: "John Wick", image: "/images/JohnWick.jpeg", rating: 5, year: 2014, genre: "Action" },
  { id: 4, title: "Jurassic World", image: "/images/JurassicWorld.jpg", rating: 4, year: 2015, genre: "Sci-Fi" },
  { id: 5, title: "The Maze Runner", image: "/images/TheMazeRunner.jpg", rating: 5, year: 2014, genre: "Action" },
  { id: 6, title: "Wolfs", image: "/images/Wolfs.jpg", rating: 4, year: 2020, genre: "Horror" },
];

export default function ListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  const filteredMovies = moviesData.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = year ? movie.year.toString() === year : true;
    const matchesRating = rating ? movie.rating >= parseInt(rating) : true;
    const matchesGenre = genre === "All" ? true : movie.genre === genre;
    return matchesTitle && matchesYear && matchesRating && matchesGenre;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Filters */}
      <section className="pt-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 drop-shadow-lg mb-6">
          All Movies
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by Movie Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md bg-black text-red-400 placeholder-white-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
          />
          <input
            type="text"
            placeholder="Release Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded-md bg-black text-red-400 placeholder-white-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-40"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 rounded-md bg-black text-white border border-red-600 focus:ring-2 focus:ring-red-500 w-40"
          >
            <option value="">All Ratings</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`border border-red-600 text-white px-4 py-2 rounded-lg transition ${
                genre === g ? "bg-red-600" : "hover:bg-red-600 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* Movie Cards */}
      <main className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                image={movie.image}
                title={movie.title}
                rating={movie.rating}
                onClick={() => navigate("/details", { state: movie })}
              />
            ))
          ) : (
            <p className="text-red-500 col-span-full text-center">No movies found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
