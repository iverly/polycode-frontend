import React, { useEffect } from 'react';
import useAxios from 'axios-hooks';
import Hero from '../components/Hero';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import ChallengeList from '../components/challenge/ChallengeList';
import { Course, Exercise, Module } from '../types/challenges';
import useSnackbar from '../hooks/useSnackbar';

export default function Home() {
  const snackbar = useSnackbar();

  const [{
    loading: exercisesLoading,
    error: exercisesError,
    data: exercisesData,
  }, exercisesExecute] = useAxios<Exercise[]>(`${process.env.REACT_APP_API_ENDPOINT}/exercise`, { manual: true });

  const [{
    loading: modulesLoading,
    error: modulesError,
    data: modulesData,
  }, modulesExecute] = useAxios<Module[]>(`${process.env.REACT_APP_API_ENDPOINT}/module`, { manual: true });

  const [{
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  }, coursesExecute] = useAxios<Course[]>(`${process.env.REACT_APP_API_ENDPOINT}/course`, { manual: true });

  useEffect(() => {
    exercisesExecute();
    modulesExecute();
    coursesExecute();
  }, []);

  useEffect(() => {
    if (exercisesError) {
      snackbar.error('Error while loading exercises.');
    }

    if (modulesError) {
      snackbar.error('Error while loading modules.');
    }

    if (coursesError) {
      snackbar.error('Error while loading courses.');
    }
  }, [exercisesError, modulesError, coursesError]);

  return (
    <>
      <AppBar />
      <main>
        <Hero />
        <ChallengeList
          title="Last viewed"
          challenges={[]}
          negativeTop
          clickable
        />
        <ChallengeList
          title="Courses"
          skeleton={coursesLoading}
          challenges={coursesData || []}
          negativeTop={!coursesLoading}
        />
        <ChallengeList
          title="Modules"
          skeleton={modulesLoading}
          challenges={modulesData || []}
        />
        <ChallengeList
          title="Exercises"
          skeleton={exercisesLoading}
          challenges={exercisesData || []}
          clickable
        />
      </main>
      <Footer />
    </>
  );
}
