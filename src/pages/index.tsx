import React from 'react';
import Hero from '../components/Hero';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import ChallengeList from '../components/challenge/ChallengeList';

export default function Home() {
  return (
    <>
      <AppBar />
      <main>
        <Hero />
        <ChallengeList title="Last viewed" negativeTop />
        <ChallengeList title="Courses" />
      </main>
      <Footer />
    </>
  );
}
