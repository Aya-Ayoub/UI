import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

import HeroSection from "../components/HeroSection";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [randomizedMovies, setRandomizedMovies] = useState([]);

  const { user, setUser } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then(res => res.json())
      .then(data => {
        setMovies(data);


        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setRandomizedMovies(shuffled);
      })
      .catch(err => console.error("Error fetching movies:", err));
  }, []);


  const lastFourMovies = movies.slice(-4);


  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };


  const toggleWatchlist = async (movie) => {
    if (!user) return alert("Log in to use your watchlist!");

    const already = user.watchlist?.includes(movie.id);

    const updatedUser = {
      ...user,
      watchlist: already
        ? user.watchlist.filter((mid) => mid !== movie.id)
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
    if (!user) return alert("Log in to mark watched!");

    const already = user.watched?.includes(movie.id);

    const updatedUser = {
      ...user,
      watched: already
        ? user.watched.filter((mid) => mid !== movie.id)
        : [...user.watched, movie.id],
    };

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watched: updatedUser.watched }),
    });

    setUser(updatedUser);
  };


  const moviesWithUserFlags = randomizedMovies.map((m) => ({
    ...m,
    isWatchlisted: user?.watchlist?.includes(m.id) || false,
    isWatched: user?.watched?.includes(m.id) || false,
  }));




  const popularMovies = moviesWithUserFlags.filter((m) => m.rating >= 8);


  const watchedGenres = new Set(
    movies
      .filter(m => user?.watched?.includes(m.id))
      .map(m => m.genre)
  );

  const recommendedMovies = moviesWithUserFlags.filter(
    (m) => watchedGenres.has(m.genre)
  );


  const newlyReleased = moviesWithUserFlags.filter((m) => m.year >= 2015);

  return (
    <div className="bg-black text-white">

      <HeroSection trending={lastFourMovies} />

      <main className="p-4 space-y-12">

        <MovieRow
          title="Popular Movies"
          movies={popularMovies}
          onCardClick={handleCardClick}
          onToggleWatchlist={toggleWatchlist}
          onToggleWatched={toggleWatched}
        />

        {user?.watchlist?.length > 0 && (
          <MovieRow
            title="Movies You May Like"
            movies={recommendedMovies}
            onCardClick={handleCardClick}
            onToggleWatchlist={toggleWatchlist}
            onToggleWatched={toggleWatched}
          />
        )}

        <MovieRow
          title="Newly Released Movies"
          movies={newlyReleased}
          onCardClick={handleCardClick}
          onToggleWatchlist={toggleWatchlist}
          onToggleWatched={toggleWatched}
        />

      </main>

      <Footer />
    </div>
  );
}
