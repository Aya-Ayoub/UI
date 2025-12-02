import React, { useState } from "react";

export default function ProfileInfo({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
  };

  return (
    <div className="bg-black border-2 border-red-600 rounded-2xl shadow-[0_0_50px_-10px_rgba(220,38,38,0.8)] w-full max-w-md p-8 text-center backdrop-blur-sm relative z-10">
      <img 
        src={user.avatar} 
        alt="Profile" 
        className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.6)] mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold text-red-500 mb-2">{user.name}</h2>
      <p className="text-gray-400 mb-1">{user.email}</p>
      <p className="text-gray-500 mb-6">Member since {user.joined}</p>

      <details className="bg-black border-2 border-red-600 rounded-2xl shadow-[0_0_30px_-10px_rgba(255,0,0,0.6)]">
        <summary className="bg-red-600 hover:bg-red-800 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 list-none">
          Edit Profile
        </summary>

        <form className="flex flex-col gap-4 mt-4 p-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter new name" 
            className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
          />
          <input 
            type="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter new email" 
            className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
          />
          <input 
            type="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Enter new password" 
            className="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 border-2 border-red-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-300"
          />
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </form>
      </details>
    </div>
  );
}
