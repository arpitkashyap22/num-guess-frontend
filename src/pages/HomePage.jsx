import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Simon Game</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Login/Register</Link>
        <Link to="/game" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Play</Link>
        <Link to="/leaderboard" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">Leaderboard</Link>
      </div>
    </div>
  );
};

export default HomePage;
