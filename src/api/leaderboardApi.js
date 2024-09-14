import axiosInstance from './axiosInstance';

// Fetch Leaderboard
export const fetchLeaderboard = async () => {
  try {
    const response = await axiosInstance.get('/leaderboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || 'Server error');
  }
};
