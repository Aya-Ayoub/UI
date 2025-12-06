import React, { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";

export default function ProfileInfo({ user }) {
  const { setUser } = useProfile();

  const safeUser = user || {
    id: 0,
    name: "User Name",
    email: "user.email@example.com",
    password: "",
    avatar: "/images/profile2.jpeg",
    joined: "March 2025"
  };

  const [formData, setFormData] = useState({
    name: safeUser.name,
    email: safeUser.email,
    password: safeUser.password || "",
    avatar: safeUser.avatar
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password || "",
        avatar: user.avatar
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, ...formData })
      });

      const updatedUser = await res.json();
      setUser(updatedUser);

      setIsOpen(false); 

    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="bg-black border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] w-full max-w-md p-8 text-center">

      <img
        src={formData.avatar}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 mb-4 object-cover"
      />

      <h2 className="text-2xl font-bold text-red-500 mb-2">{safeUser.name}</h2>
      <p className="text-gray-400 mb-1">{safeUser.email}</p>
      <p className="text-gray-500 mb-6">Member since {safeUser.joined}</p>

      <details open={isOpen} className="bg-black border-2 border-red-600 rounded-2xl">
        <summary
          className="bg-red-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg"
          onClick={(e) => {
            e.preventDefault(); 
            setIsOpen(!isOpen);
          }}
        >
          Edit Profile
        </summary>

        <form className="flex flex-col gap-4 mt-4 p-4" onSubmit={handleSubmit}>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-red-600 border-dashed rounded-lg cursor-pointer bg-black hover:bg-red-600/10 transition">
            <span className="text-gray-300 mb-2">Click to upload profile picture</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border-2 border-red-600"
          />

          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border-2 border-red-600"
          />

          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border-2 border-red-600"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg"
          >
            Save Changes
          </button>

        </form>
      </details>
    </div>
  );
}
