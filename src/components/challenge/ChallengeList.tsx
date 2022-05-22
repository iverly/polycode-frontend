import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';
import { Course, Exercise, Module } from '../../types/challenges';

export interface ChallengeListProps<T> {
  title?: string;
  negativeTop?: boolean;
  clickable?: boolean;
  skeleton?: boolean;
  challenges: T[];
}

export default function ChallengeList(
  {
    title, negativeTop, challenges, clickable, skeleton,
  }: ChallengeListProps<Exercise | Module | Course>,
) {
  const navigate = useNavigate();

  if (!skeleton && !challenges.length) {
    return (
      <div />
    );
  }

  return (
    <Container sx={{ pb: 4, mt: negativeTop ? -14 : null }} maxWidth="lg">
      <Typography variant="h5" color={negativeTop ? 'primary.contrastText' : 'text.primary'} noWrap sx={{ py: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={6}>
        {skeleton && Array.from({ length: 3 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <ChallengeCard
              title=""
              description=""
              skeleton
            />
          </Grid>
        ))}
        {!skeleton && challenges.map((challenge) => (
          <Grid
            item
            key={challenge.id}
            xs={12}
            sm={6}
            md={4}
          >
            <ChallengeCard
              key={challenge.id}
              title={challenge.name}
              description={challenge.description}
              isCourse={(challenge as Module).exercises && !!(challenge as Course).modules}
              isModule={(challenge as Module).exercises && !(challenge as Course).modules}
              sx={{ ...(clickable && { cursor: 'pointer' }) }}
              onClick={() => { if (clickable) navigate(`/exercise/${challenge.id}/editor`); }}
              progress={Math.random() * 1}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

ChallengeList.defaultProps = {
  title: '',
  negativeTop: false,
  clickable: false,
  skeleton: false,
};
