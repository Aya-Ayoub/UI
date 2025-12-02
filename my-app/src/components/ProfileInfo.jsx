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
    <div className="bg-black border border-red-600 rounded-2xl shadow-[0_0_20px_-5px_rgba(255,0,0,0.7)] p-8 w-full max-w-md text-center">
      <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.6)] mb-4 object-cover"/>
      <h2 className="text-2xl font-bold text-red-500 mb-2">{user.name}</h2>
      <p className="text-gray-400 mb-1">{user.email}</p>
      <p className="text-gray-500 mb-6">Member since {user.joined}</p>

      <details className="bg-black border border-red-600 rounded-lg shadow-md">
        <summary className="bg-red-600 hover:bg-red-800 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 list-none">
          Edit Profile
        </summary>

        <form className="flex flex-col gap-4 mt-4 p-4" onSubmit={handleSubmit}>
          <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter new name" className="p-2 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter new email" className="p-2 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" className="p-2 rounded-md bg-black text-red-400 placeholder-red-500 border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          <button type="submit" className="bg-red-600 hover:bg-red-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
            Save Changes
          </button>
        </form>
      </details>
    </div>
  );
}
