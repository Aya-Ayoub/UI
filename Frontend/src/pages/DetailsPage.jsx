import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import CastMember from "../components/CastMember";
import { useProfile } from "../context/ProfileContext";

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useProfile();
  const [added, setAdded] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);

        if (user?.watchlist?.includes(data.id)) {
          setAdded(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading movie:", err);
        setLoading(false);
      });
  }, [id, user]);


  const handleAddWatchlist = async () => {
    if (!user) return;

    const updatedWatchlist = added
      ? user.watchlist.filter((mid) => mid !== movie.id)
      : [...user.watchlist, movie.id];

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ watchlist: updatedWatchlist }),
    });

    setUser({ ...user, watchlist: updatedWatchlist });
    setAdded(!added);
  };

  if (loading) {
    return <div className="text-white p-10 text-center text-2xl">Loading...</div>;
  }

  if (!movie) {
    return (
      <div className="text-white p-10 text-center text-2xl">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-white">


      <section className="relative flex flex-col justify-center min-h-[80vh] pt-32 md:pt-40">
        <div className="absolute inset-0">
          <img
            src={movie.bigposter}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-center px-6 md:px-20 py-12 gap-14">


          <img
            src={movie.smallposter}
            alt={movie.title}
            className="w-72 h-[430px] object-cover rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.6)]"
          />


          <div className="max-w-[600px] w-full text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-3 drop-shadow-xl break-words leading-tight">
              {movie.title}
            </h1>


            {movie.genre && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {movie.genre.split(",").map((g) => (
                  <span
                    key={g}
                    className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>
            )}

            <p className="text-lg text-gray-200 mb-3">
              Release Date:{" "}
              <span className="text-white font-semibold">{movie.year}</span>
            </p>

            <p className="text-yellow-400 text-2xl mb-3">
              {movie.rating} ★
            </p>


            <p className="text-gray-200 mb-6 min-h-[110px]">
              {movie.description}
            </p>


            <div className="flex space-x-4 justify-center md:justify-start">


              <button
                className="
                  px-6 py-2 rounded-lg font-bold
                  bg-red-600 text-white
                  shadow-[0_0_18px_rgba(220,38,38,0.45)]
                  transition-all duration-300
                  border-2 border-transparent
                  hover:bg-black hover:text-red-600
                  hover:border-red-600
                  hover:shadow-[0_0_28px_rgba(220,38,38,0.7)]
                  hover:scale-[1.03]
                "
              >
                Watch
              </button>


              <button
                onClick={handleAddWatchlist}
                className={`
                  px-6 py-2 rounded-lg font-bold flex items-center
                  bg-black text-red-500
                  border-2 border-red-600
                  shadow-[0_0_14px_rgba(220,38,38,0.45)]
                  transition-all duration-300
                  hover:bg-red-600 hover:text-white
                  hover:shadow-[0_0_22px_rgba(220,38,38,0.7)]
                  hover:scale-[1.03]
                  ${added ? "bg-black text-red-500 border-red-600" : ""}
                `}
              >
                {added ? "Added" : "+ Add to Watchlist"}
              </button>

            </div>
          </div>
        </div>
      </section>


      {movie.trailer && (
        <section className="mt-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-red-500 mb-4">Official Trailer</h2>

          <div className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.6)] flex justify-center">
            <iframe
              className="w-full md:w-[800px] h-[400px] rounded-xl"
              src={movie.trailer}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}


      {movie.cast && movie.cast.length > 0 && (
        <section className="mt-16 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-red-500 mb-6">Cast & Crew</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {movie.cast.map((actor, index) => (
              <CastMember
                key={index}
                image={actor.image}
                name={actor.name}
                role={actor.role}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
