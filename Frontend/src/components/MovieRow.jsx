import React from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, onCardClick, onToggleWatchlist, onToggleWatched }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4 text-red-500">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-none py-2">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
            <MovieCard
              image={movie.smallposter}
              title={movie.title}
              rating={movie.rating}
              isWatchlisted={movie.isWatchlisted}
              isWatched={movie.isWatched}
              onToggleWatchlist={() => onToggleWatchlist(movie)}
              onToggleWatched={() => onToggleWatched(movie)}
              onClick={() => onCardClick(movie.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
