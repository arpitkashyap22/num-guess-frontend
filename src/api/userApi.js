import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  headers: {
    'Content-Type': 'application/json', // Ensure correct content type for JSON
  },
  withCredentials: false, // Assuming you're manually handling JWT tokens
});

export const loginUser = async (username, password) => {
    try {
      console.log('Logging in with:', { username, password }); // Log request data
      const response = await apiClient.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error('Login failed. Please check your credentials.');
    }
  };
  

export const registerUser = async (username, password) => {
  try {
    
    const response = await apiClient.post('/users/register', { username, password });
    localStorage.setItem('token', response.data.token); // Save token to local storage
    
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error('Registration failed. Please try again.');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from local storage
};

export const fetchUserHighScore = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await apiClient.get('/users/highscore', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch high score:', error.response?.data || error.message);
    throw new Error('Failed to fetch high score. Please try again.');
  }
};

export const updateUserHighScore = async (newScore) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiClient.post('/users/updatehighscore', { newScore }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating high score:', error);
      throw error; // Re-throw to handle errors in the calling function
    }
  };