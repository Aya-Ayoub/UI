import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import MovieRow from "../components/MovieRow";
import { useProfile } from "../context/ProfileContext";

export default function ProfilePage() {
  const { user, setUser } = useProfile();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  if (!user) return <p className="text-white">Loading...</p>;

  const moviesWithFlags = movies.map((m) => ({
    ...m,
    isWatchlisted: user.watchlist?.includes(m.id),
    isWatched: user.watched?.includes(m.id),
  }));

  const userWatchlist = moviesWithFlags.filter((m) =>
    user.watchlist?.includes(m.id)
  );

  const userWatched = moviesWithFlags.filter((m) =>
    user.watched?.includes(m.id)
  );

  const userUnwatched = moviesWithFlags.filter(
    (m) => user.watchlist?.includes(m.id) && !user.watched?.includes(m.id)
  );

  const handleCardClick = (id) => navigate(`/details/${id}`);

  const toggleWatchlist = async (movie) => {
    const already = user.watchlist.includes(movie.id);

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
    const already = user.watched.includes(movie.id);

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

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="flex justify-center mb-10">
        <ProfileInfo user={user} />
      </div>

      <MovieRow title="Your Watchlist" movies={userWatchlist} onCardClick={handleCardClick} onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} />
      <MovieRow title="Watched Movies" movies={userWatched} onCardClick={handleCardClick} onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} />
      <MovieRow title="Unwatched Movies" movies={userUnwatched} onCardClick={handleCardClick} onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} />

      <Footer />
    </div>
  );
}