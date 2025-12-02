import React from "react";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import MovieSection from "../components/MovieSection";

export default function ProfilePage() {
  const user = {
    name: "User Name",
    email: "user.email@example.com",
    avatar: "/images/profile2.jpeg",
    joined: "March 2025"
  };

  const watchlist = [
    { title: "Iron Man", rating: 5, image: "/images/BannerIronMan.jpg" },
    { title: "Guardians", rating: 4, image: "/images/Guardians.jpg" },
    { title: "John Wick", rating: 5, image: "/images/JohnWick.jpeg" },
  ];

  const watched = [
    { title: "Iron Man", rating: 5, image: "/images/BannerIronMan.jpg" },
  ];

  const unwatched = [
    { title: "Guardians", rating: 4, image: "/images/Guardians.jpg" },
  ];

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
