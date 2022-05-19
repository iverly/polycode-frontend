import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages';
import LoginPage from './pages/auth/Login';
import ExerciseEditor from './pages/exercise/[id]/editor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/exercise/:exerciseId/editor" element={<ExerciseEditor />} />
    </Routes>
  );
}

export default App;
