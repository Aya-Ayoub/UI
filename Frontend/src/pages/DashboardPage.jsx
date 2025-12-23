import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import MinimalTooltip from "../components/MinimalTooltip";

export default function DashboardPage() {
  const { user, setUser } = useProfile();
  const [movies, setMovies] = useState([]);
  const [mode, setMode] = useState("watchlist"); // watchlist | watched
  const navigate = useNavigate();

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

  const baseMovies =
    mode === "watchlist"
      ? moviesWithFlags.filter((m) => m.isWatchlisted)
      : moviesWithFlags.filter((m) => m.isWatched);

  
  const recentWatchlist = moviesWithFlags
    .filter((m) => m.isWatchlisted)
    .slice(-8);

  
  const watchedCount = moviesWithFlags.filter(
    (m) => m.isWatchlisted && m.isWatched
  ).length;

  const totalWatchlist = moviesWithFlags.filter(
    (m) => m.isWatchlisted
  ).length;

  const watchData = [
    {
      name: "Watched",
      value: totalWatchlist
        ? Math.round((watchedCount / totalWatchlist) * 100)
        : 0,
      fill: "#b91c1c",
    },
    {
      name: "Unwatched",
      value: totalWatchlist
        ? 100 -
          Math.round((watchedCount / totalWatchlist) * 100)
        : 0,
      fill: "#dc2626",
    },
  ];

 
  const genreCount = {};
  baseMovies.forEach((m) => {
    const genres = m.genre
      ? m.genre.split(",").map((g) => g.trim())
      : ["Unknown"];
    genres.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    });
  });

  const redShades = ["#991b1b", "#b91c1c", "#dc2626", "#ef4444", "#f87171"];

  const genreData = Object.keys(genreCount).map((g, i) => ({
    genre: g,
    count: genreCount[g],
    fill: redShades[i % redShades.length],
  }));

  
  const ratingData = baseMovies.map((m) => ({
    title: m.title,
    rating: m.rating,
  }));


  const yearCount = {};
  baseMovies.forEach((m) => {
    yearCount[m.year] = (yearCount[m.year] || 0) + 1;
  });

  const yearData = Object.keys(yearCount).map((y, i) => ({
    year: y,
    count: yearCount[y],
    fill: redShades[i % redShades.length],
  }));

  
  const handleCardClick = (id) => navigate(`/details/${id}`);

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

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-20 md:h-24"></div>

      <div className="pt-4 px-4 sm:px-6 space-y-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 text-center">
          Dashboard
        </h1>

        
        <div className="flex justify-center">
          <button
            onClick={() =>
              setMode(mode === "watchlist" ? "watched" : "watchlist")
            }
            className="border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Mode: {mode}
          </button>
        </div>

        <MovieRow
          title="Recently added to Watchlist"
          movies={recentWatchlist}
          onCardClick={handleCardClick}
          onToggleWatchlist={toggleWatchlist}
          onToggleWatched={toggleWatched}
        />


        <div className="grid md:grid-cols-2 gap-6">

          <ChartBox title="Watched vs Unwatched">
            <BarChart data={watchData}>
              <XAxis dataKey="name" stroke="#f87171" />
              <YAxis hide />
              <Tooltip content={<MinimalTooltip />} cursor={false} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartBox>

 
          <ChartBox title="Genres Distribution">
            <BarChart data={genreData}>
              <XAxis dataKey="genre" stroke="#f87171" />
              <YAxis hide />
              <Tooltip content={<MinimalTooltip />} cursor={false} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartBox>

      
          <ChartBox title="Ratings Trend">
            <LineChart data={ratingData}>
              <XAxis dataKey="title" hide />
              <YAxis stroke="#f87171" />
              <Tooltip content={<MinimalTooltip />} cursor={false} />
              <Line type="monotone" dataKey="rating" stroke="#dc2626" />
            </LineChart>
          </ChartBox>

     
          <ChartBox title="Movies Per Year">
            <BarChart data={yearData}>
              <XAxis dataKey="year" stroke="#f87171" />
              <YAxis hide />
              <Tooltip content={<MinimalTooltip />} cursor={false} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartBox>
        </div>
      </div>

      <Footer />
    </div>
  );
}


function ChartBox({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 
      border-2 border-red-600 rounded-2xl p-4 sm:p-6
      shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)]">
      <h3 className="text-red-500 mb-3 font-semibold">{title}</h3>
      <div className="h-56 flex justify-center items-center">
        <ResponsiveContainer width="80%" height={200}>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
