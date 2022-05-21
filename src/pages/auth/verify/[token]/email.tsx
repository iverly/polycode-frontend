import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import { useParams, useNavigate } from 'react-router-dom';
import useSnackbar from '../../../../hooks/useSnackbar';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [{ data, error }, execute] = useAxios(`${process.env.REACT_APP_API_ENDPOINT}/user/email-verification`, { manual: true });

  useEffect(() => {
    execute({
      method: 'post',
      data: {
        token,
      },
    });
  }, [token]);

  useEffect(() => {
    if (error) {
      snackbar.error('Something went wrong while verifying your email.');
      navigate('/auth/login');
    } else {
      snackbar.success('Your email has been verified.');
      navigate('/auth/login');
    }
  }, [error, data]);

  return (
    <Typography>
      Loading ...
    </Typography>
  );
}
