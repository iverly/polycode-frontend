import React from 'react';
import { Link, Typography } from '@mui/material';

export default function Copyright(props: any) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://polycode.iverly.net/">
        PolyCode
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
