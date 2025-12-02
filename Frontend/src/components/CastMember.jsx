import React from "react";

export default function CastMember({ image, name, role }) {
  return (
    <div className="text-center">
      <img
        src={image}
        alt={name}
        className="rounded-full h-32 w-32 mx-auto object-cover shadow-[0_0_25px_rgba(255,0,0,0.5)]
        transform transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(255,0,0,0.8)] mb-2"
      />
      <p className="font-semibold text-white">{name}</p>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  );
}