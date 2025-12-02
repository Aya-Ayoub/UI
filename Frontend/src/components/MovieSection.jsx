import React from "react";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies }) {
  return (
    <section className="mt-16 px-6">
      <h3 className="text-3xl font-semibold text-red-500 text-center mb-8">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
        {movies.map((movie, idx) => (
          <MovieCard 
            key={idx}
            image={movie.image}
            title={movie.title}
            rating={movie.rating}
            onClick={() => console.log("Clicked", movie.title)}
          />
        ))}
      </div>
    </section>
  );
}