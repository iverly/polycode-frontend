import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChallengesPage from './pages/challenges';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import VerifyEmailPage from './pages/auth/verify/[token]/email';
import ExerciseEditorPage from './pages/exercise/[id]/editor';
import HomePage from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/verify/:token/email" element={<VerifyEmailPage />} />
      <Route path="/exercise/:exerciseId/editor" element={<ExerciseEditorPage />} />
    </Routes>
  );
}

export default App;
