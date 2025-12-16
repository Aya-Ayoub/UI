import React from "react";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies }) {
  return (
    <section className="px-6 mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-red-500">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-none py-2">
        {movies?.map((movie, index) => (
          <div
            key={movie.id || index}
            className="shrink-0 min-w-[150px] md:min-w-[200px]"
          >
            <MovieCard
              image={movie.smallposter || movie.image}
              title={movie.title}
              rating={movie.rating}
              onClick={() => console.log("Movie clicked")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
