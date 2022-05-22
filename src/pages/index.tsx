/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Hero from '../components/Hero';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import ChallengeList from '../components/challenge/ChallengeList';
import { Course, Exercise, Module } from '../types/challenges';
import useSnackbar from '../hooks/useSnackbar';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const auth = useAuth();
  const snackbar = useSnackbar();

  const [submissions, setSubmissions] = useState(undefined);

  const [{
    loading: submissionsLoading,
    error: submissionsError,
    data: submissionsData,
  }, submissionsExecute] = useAxios(`${process.env.REACT_APP_API_ENDPOINT}/user/@me/submissions`, { manual: true });

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
    if (auth.isAuthenticated && auth.headers) {
      submissionsExecute({
        headers: {
          ...auth.headers,
        },
      });
    }
  }, [auth.isAuthenticated, auth.headers]);

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

    if (submissionsError) {
      snackbar.error('Error while loading your submissions.');
    }
  }, [exercisesError, modulesError, coursesError, submissionsError]);

  useEffect(() => {
    if (submissionsData) {
      setSubmissions(submissionsData.map((challenge: any) => {
        if (challenge.type === 'exercise') {
          return {
            id: challenge.id,
            name: challenge.name,
            description: challenge.description,
            isSuccess: challenge.submissions.some(
              (submission: any) => submission.execution?.success,
            ),
          };
        } if (challenge.type === 'module') {
          return challenge.exercises.map((exercise: any) => ({
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            isSuccess: exercise.submissions.some(
              (submission: any) => submission.execution?.success,
            ),
          })).flat();
        }

        return challenge.modules.map((module: any) => module.exercises.map((exercise: any) => ({
          id: exercise.id,
          name: exercise.name,
          description: exercise.description,
          isSuccess: exercise.submissions.some(
            (submission: any) => submission.execution?.success,
          ),
        }))).flat().flat();
      }).flat());
    }
  }, [submissionsData]);

  return (
    <>
      <AppBar />
      <main>
        <Hero />
        <ChallengeList
          title="Last viewed"
          skeleton={submissionsLoading}
          challenges={submissions || []}
          negativeTop
          clickable
        />
        <ChallengeList
          title="Courses"
          skeleton={coursesLoading}
          challenges={coursesData || []}
          negativeTop={!submissions}
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
