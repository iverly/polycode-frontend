import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

export default function HomePage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [startClicked, setStartClicked] = useState<boolean>(false);

  useEffect(() => {
    if (auth.isAuthenticated && auth.headers) {
      navigate('/challenges');
    }
  }, [auth.isAuthenticated, auth.headers]);

  return (
    <>
      <AppBar />
      <main>
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6,
        }}
        >
          <Typography variant="h3">Welcome to PolyCode !</Typography>
          {!startClicked && <Button variant="contained" sx={{ mt: 8 }} onClick={() => setStartClicked(true)}>Start the experience</Button>}
          {startClicked
            && (
            <Box sx={{ mt: 8 }}>
              <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/auth/login')}>I have an account</Button>
              <Button variant="contained" onClick={() => navigate('/auth/register')}>I want to create an account</Button>
            </Box>
            )}
        </Box>
      </main>
      <Footer />
    </>
  );
}
