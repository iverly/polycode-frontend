import React from 'react';
import MAppBar from '@mui/material/AppBar';
import CodeIcon from '@mui/icons-material/Code';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBar() {
  return (
    <MAppBar position="relative">
      <Toolbar>
        <CodeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          PolyCode
        </Typography>
      </Toolbar>
    </MAppBar>
  );
}
