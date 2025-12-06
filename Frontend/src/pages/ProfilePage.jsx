import React from "react";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import MovieSection from "../components/MovieSection";
import { useProfile } from "../context/ProfileContext";

export default function ProfilePage() {
  const { user } = useProfile();

  const fallbackUser = {
    id: 0,
    name: "User Name",
    email: "user.email@example.com",
    avatar: "/images/profile2.jpeg",
    joined: "March 2025",
    watchlist: [
      { title: "Iron Man", rating: 5, image: "/images/BannerIronMan.jpg" },
      { title: "Guardians", rating: 4, image: "/images/Guardians.jpg" },
      { title: "John Wick", rating: 5, image: "/images/JohnWick.jpeg" }
    ],
    watched: [
      { title: "Iron Man", rating: 5, image: "/images/BannerIronMan.jpg" }
    ],
    unwatched: [
      { title: "Guardians", rating: 4, image: "/images/Guardians.jpg" }
    ]
  };

  const displayUser = user || fallbackUser;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-32 px-6 flex flex-col items-center">
        <ProfileInfo user={displayUser} />
      </div>

      <MovieSection title="Your Watchlist" movies={displayUser.watchlist} />
      <MovieSection title="Watched Movies" movies={displayUser.watched} />
      <MovieSection title="Unwatched Movies" movies={displayUser.unwatched} />

      <Footer />
    </div>
  );
}
