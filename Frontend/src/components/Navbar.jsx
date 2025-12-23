import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { useProfile } from "../context/ProfileContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { movies } = useMovies();
  const { user } = useProfile();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const filtered = query.trim()
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClick(e) {
      // 🔥 allow React Router <Link> navigation
      if (e.target.closest("a")) return;

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
        setMobileSearch(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeClass = (path) =>
    location.pathname === path
      ? "text-red-500"
      : "hover:text-red-500";

  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-[9999]">

      <Link to="/home">
        <img
          src="/images/logo.png"
          alt="CineHaven Logo"
          className="h-14 w-auto drop-shadow-lg cursor-pointer"
        />
      </Link>

      {/* ================= DESKTOP ================= */}
      <nav className="hidden md:flex items-center space-x-8 mr-12 text-lg">

        <div ref={searchRef} className="relative flex items-center">
          {!searchOpen && (
            <img
              src="/images/search.png"
              alt="Search"
              className="h-6 w-6 cursor-pointer hover:opacity-80"
              onClick={() => setSearchOpen(true)}
            />
          )}

          {searchOpen && (
            <div
              className="
                absolute right-0 top-1/2 -translate-y-1/2 w-64
                backdrop-blur-lg bg-white/10 border border-white/10
                shadow-2xl rounded-xl p-1 animate-fadeIn flex flex-col
              "
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-300 outline-none py-1.5 px-3 text-sm"
              />

              {query && (
                <div
                  className="
                    absolute left-0 right-0 top-full mt-1
                    max-h-48 overflow-y-auto
                    backdrop-blur-lg bg-white/10 border border-white/10
                    rounded-xl shadow-xl z-[9999]
                  "
                >
                  {filtered.slice(0, 4).map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/details/${movie.id}`}
                      className="block px-3 py-2 text-sm text-white hover:bg-white/20 rounded-lg"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      {movie.title}
                    </Link>
                  ))}

                  {filtered.length === 0 && (
                    <div className="px-3 py-2 text-gray-300 text-sm">
                      No results
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Link to="/home" className={activeClass("/home")}>Home</Link>
        <Link to="/list" className={activeClass("/list")}>Movies</Link>
        <Link to="/dashboard" className={activeClass("/dashboard")}>Dashboard</Link>

        {isAdmin && (
          <Link to="/form" className={activeClass("/form")}>Add Movie</Link>
        )}

        <Link to="/profile" className={activeClass("/profile")}>Profile</Link>
      </nav>

      {/* ================= MOBILE ================= */}
      <button
        className="md:hidden text-white focus:outline-none z-[99999]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"/>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"/>
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="
            md:hidden fixed top-20 right-4 bg-black border-2 border-red-600
            rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.6)] z-[99998]
            animate-fadeIn
          "
        >
          <nav className="flex flex-col py-4 px-6 space-y-3 text-base">

            <div className="relative">
              {!mobileSearch && (
                <button
                  onClick={() => setMobileSearch(true)}
                  className="text-white flex items-center gap-2"
                >
                  <img src="/images/search.png" className="h-5 w-5" />
                  Search
                </button>
              )}

              {mobileSearch && (
                <div
                  className="
                    mt-2 w-56
                    backdrop-blur-lg bg-white/10 border border-white/10
                    shadow-2xl p-2 rounded-xl animate-fadeIn
                  "
                >
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent text-white placeholder-gray-300 outline-none py-1 px-2 text-sm"
                  />

                  {query && (
                    <div className="mt-2 max-h-40 overflow-y-auto rounded-lg">
                      {filtered.slice(0, 4).map((movie) => (
                        <Link
                          key={movie.id}
                          to={`/details/${movie.id}`}
                          className="block px-3 py-2 text-sm text-white rounded-lg hover:bg-white/20"
                          onClick={() => {
                            setMobileSearch(false);
                            setIsOpen(false);
                            setQuery("");
                          }}
                        >
                          {movie.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {query && filtered.length === 0 && (
                    <p className="px-3 py-2 text-gray-300 text-sm">No results</p>
                  )}
                </div>
              )}
            </div>

            <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/list" onClick={() => setIsOpen(false)}>Movies</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>

            {isAdmin && (
              <Link to="/form" onClick={() => setIsOpen(false)}>Add Movie</Link>
            )}

            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>

          </nav>
        </div>
      )}
    </header>
  );
}
