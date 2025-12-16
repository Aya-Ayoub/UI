import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useMovies } from "../context/MovieContext";

export default function FormPage() {
  const navigate = useNavigate();
  const { movies, addMovie } = useMovies();


  const [cast, setCast] = useState([{ name: "", role: "", image: "" }]);
  const [genres, setGenres] = useState([]);

  const allGenres = [
    "Action", "Drama", "Comedy", "Horror", "Romance",
    "Sci-Fi", "Adventure"
  ];

  const toggleGenre = (g) => {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const updateCast = (i, field, value) => {
    const updated = [...cast];
    updated[i][field] = value;
    setCast(updated);
  };

  const addCastField = () =>
    setCast([...cast, { name: "", role: "", image: "" }]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastId =
      movies.length > 0 ? Math.max(...movies.map((m) => Number(m.id))) : 0;

    const movie = {
      id: String(lastId + 1),
      title: e.target.title.value,
      year: Number(e.target.year.value),
      rating: Number(e.target.rating.value),
      description: e.target.description.value,
      smallposter: e.target.smallposter.value,
      bigposter: e.target.bigposter.value,
      trailer: e.target.trailer.value,
      genres,
      cast, 
    };

    addMovie(movie);

    await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    navigate("/home");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="h-20 md:h-24"></div>

      <main className="flex flex-col items-center flex-grow px-4 py-8 relative z-0">
        <div
          className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950
            border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)]
            w-full max-w-lg p-8 mt-8 relative z-10 backdrop-blur-sm"
        >
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-6">
            Add / Edit Movie
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Movie Title"
              name="title"
              placeholder="Enter movie title"
              required
            />


            <div>
              <label className="block text-base mb-2 text-red-400 font-semibold">
                Genres (Select multiple)
              </label>

              <div className="grid grid-cols-2 gap-2">
                {allGenres.map((g) => (
                  <label
                    key={g}
                    className={`flex items-center p-2 rounded-lg border-2 cursor-pointer transition
                      ${
                        genres.includes(g)
                          ? "border-red-600 bg-zinc-900"
                          : "border-zinc-600 bg-black"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={genres.includes(g)}
                      onChange={() => toggleGenre(g)}
                      className="mr-2 accent-red-600"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Release Year"
                name="year"
                type="number"
                min="1900"
                max="2100"
                required
              />
              <Input
                label="Rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
              />
            </div>

            <Input
              label="Small Poster URL"
              name="smallposter"
              placeholder="https://..."
            />
            <Input
              label="Big Poster URL"
              name="bigposter"
              placeholder="https://..."
            />
            <Input
              label="Trailer URL"
              name="trailer"
              placeholder="https://youtube.com/..."
            />

            <TextArea label="Description" name="description" required />


            <div>
              <label className="block text-base mb-2 text-red-400 font-semibold">
                Cast
              </label>

              {cast.map((actor, i) => (
                <div
                  key={i}
                  className="mb-4 p-3 border border-zinc-700 rounded-lg bg-black"
                >
                  <Input
                    label="Name"
                    value={actor.name}
                    onChange={(e) => updateCast(i, "name", e.target.value)}
                    placeholder="Cast name"
                  />

                  <Input
                    label="Role"
                    value={actor.role}
                    onChange={(e) => updateCast(i, "role", e.target.value)}
                    placeholder="Character role"
                  />

                  <Input
                    label="Image URL"
                    value={actor.image}
                    onChange={(e) => updateCast(i, "image", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addCastField}
                className="w-full py-2 rounded-lg border-2 border-red-600 text-red-500 font-bold
                hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                + Add Another Cast Member
              </button>
            </div>


            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)]
                hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              Save Movie
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const Input = ({ label, ...rest }) => (
  <div className="mb-3">
    <label className="block text-base mb-1 text-red-400 font-semibold">
      {label}
    </label>
    <input
      className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500
        focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 transition-all duration-300"
      {...rest}
    />
  </div>
);

const TextArea = ({ label, ...rest }) => (
  <div>
    <label className="block text-base mb-2 text-red-400 font-semibold">
      {label}
    </label>
    <textarea
      rows="4"
      className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-zinc-500
        focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 transition-all duration-300 resize-none"
      {...rest}
    />
  </div>
);
