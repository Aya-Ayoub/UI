import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function ListPage() {
  const navigate = useNavigate();
  const { user, setUser } = useProfile();

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Adventure"];


  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log("Movie fetch error:", err));
  }, []);

  if (!user) return <p className="text-white">Loading...</p>;


  const moviesWithFlags = movies.map((m) => ({
    ...m,
    isWatchlisted: user.watchlist?.includes(m.id),
    isWatched: user.watched?.includes(m.id),
  }));


  const toggleWatchlist = async (movie) => {
    const already = user.watchlist.includes(movie.id);

    const updatedUser = {
      ...user,
      watchlist: already
        ? user.watchlist.filter((x) => x !== movie.id)
        : [...user.watchlist, movie.id],
    };

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watchlist: updatedUser.watchlist }),
    });

    setUser(updatedUser);
  };


  const toggleWatched = async (movie) => {
    const already = user.watched.includes(movie.id);

    const updatedUser = {
      ...user,
      watched: already
        ? user.watched.filter((x) => x !== movie.id)
        : [...user.watched, movie.id],
    };

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watched: updatedUser.watched }),
    });

    setUser(updatedUser);
  };


  const filteredMovies = moviesWithFlags.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesYear = year ? movie.year?.toString() === year : true;
    const matchesRating = rating ? movie.rating >= Number(rating) && movie.rating < Number(rating) + 1: true;


    const movieGenres = movie.genre
      ? movie.genre.split(",").map((g) => g.trim())
      : [];

    const matchesGenre = genre === "All" ? true : movieGenres.includes(genre);

    return matchesTitle && matchesYear && matchesRating && matchesGenre;
  });

  return (
    <div className="bg-black text-white min-h-screen">


      <section className="pt-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 drop-shadow-lg mb-6">
          All Movies
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">

          <div className="w-full md:w-auto flex justify-center">
            <input
              type="text"
              placeholder="Search by Movie Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 p-2.5 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>


          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Release Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-40 p-2.5 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
            />

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-40 p-2.5 rounded-lg bg-black text-white border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
            >
              <option value="">All Ratings</option>
              {[6, 7, 8, 9, 10].map((num) => (<option key={num} value={num}> {num}+ </option>))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-10 md:flex md:flex-wrap md:justify-center">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`border-2 border-red-600 text-white px-4 py-2 rounded-lg transition ${
                genre === g ? "bg-red-600 border-red-600" : "hover:bg-red-600 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>


      <main className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">

          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                image={movie.smallposter}
                title={movie.title}
                rating={movie.rating}
                isWatchlisted={movie.isWatchlisted}
                isWatched={movie.isWatched}
                onToggleWatchlist={() => toggleWatchlist(movie)}
                onToggleWatched={() => toggleWatched(movie)}
                onClick={() => navigate(`/details/${movie.id}`)}
              />
            ))
          ) : (
            <p className="text-red-500 col-span-full text-center">
              No movies found.
            </p>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
