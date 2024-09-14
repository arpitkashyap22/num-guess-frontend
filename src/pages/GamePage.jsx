import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserHighScore, updateUserHighScore } from '../api/userApi';
import NumberGuessingGame from '../components/NumberGuessingGame';

const GamePage = () => {
  const [highScore, setHighScore] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighScore = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await fetchUserHighScore();
        setHighScore(data.highScore);
        setUser(true);
      } catch (error) {
        console.error('Error fetching high score:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchHighScore();
  }, [navigate]);

  const handleGameOver = async (newScore) => {
    if (newScore > highScore) {
      try {
        await updateUserHighScore(newScore);
        setHighScore(newScore);
      } catch (error) {
        console.error('Error updating high score:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Number Guessing Game</h1>
        <div className="flex space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </a>
          )}
          <a
            href="/leaderboard"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Leaderboard
          </a>
        </div>
      </header>
      {user && <NumberGuessingGame highScore={highScore} onGameOver={handleGameOver} />}
    </div>
  );
};

export default GamePage;
