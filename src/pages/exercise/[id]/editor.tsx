import React, { useCallback, useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import AppBar from '../../../components/AppBar';
import Editor from '../../../components/editor/Editor';
import ModalResult from '../../../components/editor/ModalResult';
import useSnackbar from '../../../hooks/useSnackbar';
import useAuth from '../../../hooks/useAuth';

export default function ExerciseEditor() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const auth = useAuth();

  const [{
    loading: submissionLoading,
    error: submissionError,
    data: submissionData,
  }, submissionExecute] = useAxios(`${process.env.REACT_APP_API_ENDPOINT}/submission/exercise`, { manual: true });
  const [{
    loading: exerciseLoading,
    error: exerciseError,
    data: exerciseData,
  }, exerciseExecute] = useAxios(`${process.env.REACT_APP_API_ENDPOINT}/exercise/${exerciseId}`, { manual: true });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(async (source: string) => {
    await submissionExecute({
      method: 'post',
      headers: {
        ...auth.headers,
      },
      data: {
        source,
        exerciseId,
      },
    });
    setModalOpen(true);
  }, [exerciseId, auth.headers]);

  useEffect(() => {
    exerciseExecute();
  }, []);

  useEffect(() => {
    if (submissionError) {
      snackbar.error('Something went wrong while submitting your solution.');
    }

    if (exerciseError) {
      snackbar.error('Something went wrong while fetching the exercise.');
      navigate('/');
    }
  }, [submissionError, exerciseError]);

  useEffect(() => {
    if (!exerciseData) {
      document.title = 'Loading...';
    } else {
      document.title = `${exerciseData.name} - PolyCode`;
    }
  }, [exerciseData]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth/login');
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <AppBar />
      {exerciseLoading && !exerciseData && (
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '50px' }}>
          Loading...
        </Typography>
      )}
      {!exerciseLoading && exerciseData && (
      <>
        <Editor
          statement={exerciseData?.statement}
          language={exerciseData?.language}
          defaultSource={exerciseData?.defaultSource}
          onSubmit={handleSubmit}
          loading={submissionLoading}
        />
        <ModalResult
          open={isModalOpen}
          setOpen={setModalOpen}
          success={submissionData?.execution?.success}
          stdout={submissionData?.execution?.output?.stdout}
          stderr={submissionData?.execution?.output?.stderr}
        />
      </>
      )}
    </>
  );
}
