import React, { useEffect, useState } from 'react';
import { getRecommendations, getMovieImage } from '../services/api';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  fontFamily: 'Montserrat, sans-serif',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

function Recommendations({ userId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendationsWithImages = async () => {
      setLoading(true);

      const recommendations = await getRecommendations(userId, 10);
      const moviesWithImages = await Promise.all(
        recommendations.map(async (movie) => {
          const imageUrl = await getMovieImage(movie.movie_title);
          return { ...movie, imageUrl };
        })
      );

      setMovies(moviesWithImages);
      setLoading(false);
    };

    fetchRecommendationsWithImages();
  }, [userId]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', fontFamily: 'Montserrat, sans-serif' }}>
      <Typography
        variant="h4"
        component="h2"
        style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}
      >
        Movie Recommendations for User {userId}
      </Typography>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : movies.length > 0 ? (
        <Grid container spacing={3}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StyledCard>
                {movie.imageUrl && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.imageUrl}
                    alt={movie.movie_title}
                  />
                )}
                <CardContent style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {movie.movie_title}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Avatar style={{ backgroundColor: '#FFD700' }}>
                      <StarIcon style={{ color: '#fff' }} />
                    </Avatar>
                    <Typography variant="h6" color="text.secondary" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {movie.predicted_rating.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
          No recommendations available.
        </Typography>
      )}
    </div>
  );
}

export default Recommendations;
