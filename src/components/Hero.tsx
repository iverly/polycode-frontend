import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundImage: 'url("https://panaetius.io/post/2020/11/the-difference-between-mod-and-use-in-rust/images/banner.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pt: 14,
        pb: 28,
      }}
    >
      <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
        <Typography
          component="h1"
          variant="h2"
          align="right"
          color="primary.contrastText"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            lineHeight: '1.2',
            mb: 4,
          }}
        >
          Learn Rust in 14 days
        </Typography>
        <Typography variant="h5" align="right" color="primary.contrastText" paragraph maxWidth="sm" sx={{ opacity: '0.8' }}>
          Want to learn Rust in 14 days?
          {' '}
          <br />
          This is the course you need.
          <br />
          Designed to teach you the fundamentals of Rust, and to get you up
          and running with the language.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="right"
        >
          <Button variant="contained">Start the course</Button>
        </Stack>
      </Container>
    </Box>
  );
}
