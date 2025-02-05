import React, { useState } from 'react';
import Recommendations from './components/Recommendations';
import { Box, TextField, Button, Typography } from '@mui/material';

function App() {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = () => {
    setSubmittedId(userId);
  };

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography
        variant="h3"
        component="h1"
        style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}
      >
        Movie Recommendation System
      </Typography>
      <Box
        style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}
      >
        <TextField
          label="Enter User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '10px 20px',
          }}
        >
          Get Recommendations
        </Button>
      </Box>
      {submittedId && <Recommendations userId={submittedId} />}
    </div>
  );
}

export default App;
