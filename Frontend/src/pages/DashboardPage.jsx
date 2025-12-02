import React from "react";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MinimalTooltip from "../components/MinimalTooltip";

export default function DashboardPage() {
  const movies = [
    { image: "/images/BannerIronMan.jpg", title: "Iron Man", rating: 4.1 },
    { image: "/images/TheMazeRunner.jpg", title: "The Maze Runner", rating: 4.1 },
    { image: "/images/Guardians.jpg", title: "Guardians of th...", rating: 4.1 },
    { image: "/images/JohnWick.jpeg", title: "John Wick", rating: 4.1 },
    { image: "/images/JurassicWorld.jpg", title: "Jurassic World", rating: 4.1 },
    { image: "/images/Wolfs.jpg", title: "Wolfs", rating: 4.1 },
  ];

  const watchData = [
    { name: "Watched", value: 80 },
    { name: "Unwatched", value: 20 },
  ];

  const genreData = [
    { genre: "Action", count: 50 },
    { genre: "Drama", count: 80 },
    { genre: "Comedy", count: 60 },
    { genre: "Sci-Fi", count: 30 },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-20 md:h-24"></div>
      
      <div className="pt-4 px-6 space-y-10">
        <h1 className="text-5xl font-bold text-red-600 drop-shadow-md mb-2 text-center">
          Dashboard
        </h1>


        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-500">
            Recently added to Watchlist
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                image={movie.image}
                title={movie.title}
                rating={movie.rating}
              />
            ))}
          </div>
        </section>



        <section>
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Charts</h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] p-6 backdrop-blur-sm">
              <h3 className="text-lg text-red-500 mb-3 font-semibold">
                Watched vs Unwatched
              </h3>

              <div className="h-56 flex justify-center items-center">
                <ResponsiveContainer width="80%" height={200}>
                  <BarChart data={watchData}>
                    <XAxis dataKey="name" stroke="#f87171" />
                    <YAxis hide />
                    <Tooltip
                      content={<MinimalTooltip />}
                      cursor={false}
                      contentStyle={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}
                    />
                    <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-red-400 text-sm text-center mt-2">
                Watched (80%) vs Unwatched (20%)
              </p>
            </div>



            <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] p-6 backdrop-blur-sm">
              <h3 className="text-lg text-red-500 mb-3 font-semibold">
                Movies per Genre
              </h3>

              <div className="h-56 flex justify-center items-center">
                <ResponsiveContainer width="80%" height={200}>
                  <BarChart data={genreData}>
                    <XAxis dataKey="genre" stroke="#f87171" />
                    <YAxis hide />
                    <Tooltip
                      content={<MinimalTooltip />}
                      cursor={false}
                      contentStyle={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}
                    />
                    <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-red-400 text-sm text-center mt-2">
                Action | Drama | Comedy | Sci-Fi
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
