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
import RHFCheckbox from '../../components/form/RHFCheckbox';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
  repeatedPassword: string;
  cgu: boolean;
  age: boolean;
}

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  repeatedPassword: yup.string().required(),
  cgu: yup.boolean().isTrue('You must accept the terms and conditions').required(),
  age: yup.boolean().isTrue('You must be over 13 to use PolyCode').required(),
}).required();

export default function RegisterPage() {
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [{ loading, error, data }, execute] = useAxios(
    {
      url: `${process.env.REACT_APP_API_ENDPOINT}/user`,
      method: 'POST',
    },
    { manual: true },
  );

  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeatedPassword: '',
      cgu: false,
      age: false,
    },
  });

  const {
    handleSubmit,
    resetField,
    setError,
  } = methods;

  const onSubmit = useCallback(async (inputs: RegisterFormInputs) => {
    if (inputs.password !== inputs.repeatedPassword) {
      setError('repeatedPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    execute({
      data: {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      },
    });
  }, [execute]);

  useEffect(() => {
    if (error) {
      if (error.response?.status === 400 && Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach(snackbar.error);
      } else {
        snackbar.error(error.message);
      }
      resetField('password');
      resetField('repeatedPassword');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      snackbar.success('Registration successful, check your email for confirmation');
      navigate('/auth/login');
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
            Sign up
          </Typography>
          <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <RHFTextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  fullWidth
                  name="repeatedPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatedPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFCheckbox name="age" label="I certify that I am over 13 years old" />
                <RHFCheckbox name="cgu" label="I accept the terms and conditions" />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/auth/login" variant="body2">
                  Already have an account? Sign in
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
