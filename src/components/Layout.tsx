import React from 'react';
import Box from '@mui/material/Box';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      {children}
    </Box>
  );
}
