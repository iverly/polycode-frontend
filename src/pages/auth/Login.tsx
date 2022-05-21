import React, { useEffect, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAxios from 'axios-hooks';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import Layout from '../../components/Layout';
import RHFTextField from '../../components/form/RHFTextField';
import Form from '../../components/form/Form';
import useSnackbar from '../../hooks/useSnackbar';
import useAuth from '../../hooks/useAuth';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export default function LoginPage() {
  const snackbar = useSnackbar();
  const auth = useAuth();
  const navigate = useNavigate();

  const [{ loading, error, data }, execute] = useAxios(
    {
      url: `${process.env.REACT_APP_API_ENDPOINT}/auth/token`,
      method: 'POST',
    },
    { manual: true },
  );

  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    reset,
    resetField,
  } = methods;

  const onSubmit = useCallback(async (inputs: LoginFormInputs) => {
    execute({
      data: {
        grant_type: 'implicit',
        identity: inputs.email,
        secret: inputs.password,
      },
    });
  }, [execute]);

  useEffect(() => {
    if (error) {
      snackbar.error(error.message);
      resetField('password');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      snackbar.success('Login successful');
      auth.setAccessToken(data.access_token);
      navigate('/');
      reset();
    }
  }, [data]);

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <RHFTextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/auth/register" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Layout>
  );
}
