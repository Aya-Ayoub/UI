import React from "react";
import Footer from "../components/Footer";
import CastMember from "../components/CastMember";

export default function DetailsPage() {
  return (
    <div className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center bg-black text-white min-h-[75vh] md:min-h-[80vh] pt-32 md:pt-40">
        <div className="absolute inset-0">
          <img
            src="/images/IronManBigPoster.jpg"
            alt="Iron Man Poster"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* MAIN MOVIE INFO */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 gap-10">
          <img
            src="/images/BannerIronMan.jpg"
            alt="Iron Man Movie Poster"
            className="w-64 md:w-80 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.6)] hover:scale-105 transition-transform duration-300"
          />

          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-3 drop-shadow-xl">Iron Man</h1>

            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                Action
              </span>
              <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                Sci-Fi
              </span>
            </div>

            <p className="text-lg text-gray-200 mb-3">
              Release Date: <span className="text-white font-semibold">May 2, 2008</span>
            </p>

            <p className="text-yellow-400 text-2xl mb-3">★★★★☆</p>

            <p className="text-gray-200 mb-6">
              After being held captive in an Afghan cave, billionaire engineer Tony Stark
              creates a unique weaponized suit of armor to fight evil and becomes Iron Man.
            </p>

            <div className="flex space-x-4 justify-center md:justify-start">
              <button className="bg-red-600 hover:bg-black text-white hover:text-red-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-transparent hover:border-red-600">
                Watch
              </button>

              <button className="bg-black border border-red-600 hover:bg-red-600 hover:text-white text-red-500 font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
                + Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER */}
      <section className="mt-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-red-500 mb-4">Official Trailer</h2>

        <div className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.6)] flex justify-center">
          <iframe
            className="w-full md:w-[800px] h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/8hYlB38asDY"
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* CAST & CREW */}
      <section className="mt-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-red-500 mb-6">Cast & Crew</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          <CastMember 
            image="/images/RDJ.jpg" 
            name="Robert Downey Jr." 
            role="Tony Stark / Iron Man" 
          />
          <CastMember 
            image="/images/Gwyneth.jpg" 
            name="Gwyneth Paltrow" 
            role="Pepper Potts" 
          />
          <CastMember 
            image="/images/Jeff.webp" 
            name="Jeff Bridges" 
            role="Obadiah Stane" 
          />
          <CastMember 
            image="/images/Jon.webp" 
            name="Jon Favreau" 
            role="Director" 
          />
          <CastMember 
            image="/images/Terrence.webp" 
            name="Terrence Howard" 
            role="James Rhodes" 
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}