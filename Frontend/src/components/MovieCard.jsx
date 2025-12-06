import React from "react";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import MovieSection from "../components/MovieSection";
import { useProfile } from "../context/ProfileContext";

export default function ProfilePage() {
  const { user } = useProfile();

  // If user is not loaded yet (not logged in)
  if (!user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Please log in to see your profile.</p>
      </div>
    );
  }

  // We keep visuals EXACTLY THE SAME, we only replace variables:
  const watchlist = user.watchlist || [];
  const watched = user.watched || [];
  const unwatched = user.unwatched || [];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-32 px-6 flex flex-col items-center">
        <ProfileInfo user={user} />
      </div>

      <MovieSection title="Your Watchlist" movies={watchlist} />
      <MovieSection title="Watched Movies" movies={watched} />
      <MovieSection title="Unwatched Movies" movies={unwatched} />

      <Footer />
    </div>
  );
}
