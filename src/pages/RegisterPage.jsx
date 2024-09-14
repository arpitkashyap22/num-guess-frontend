import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, password);
      navigate('/game'); // Redirect to the game page after successful registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <header className="flex justify-end p-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Home
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
