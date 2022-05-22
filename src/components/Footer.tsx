import React from 'react';
import Box from '@mui/material/Box';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Copyright />
    </Box>
  );
}
