import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Fetch movie recommendations from backend
export const getRecommendations = async (userId, num = 10) => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/recommendations`, {
      params: { user_id: userId, num },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

// Fetch movie details (like poster) from TMDb API
export const getMovieImage = async (title) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
      },
    });

    if (response.data.results.length > 0) {
      const movie = response.data.results[0];
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Image URL
    }

    return null; // No image found
  } catch (error) {
    console.error(`Error fetching image for ${title}:`, error);
    return null;
  }
};
