import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ChallengeCard from './ChallengeCard';

export interface ChallengeListProps {
  title?: string;
  negativeTop?: boolean;
}

const cards = [1, 2, 3];

export default function ChallengeList({ title, negativeTop }: ChallengeListProps) {
  return (
    <Container sx={{ pb: 4, mt: negativeTop ? -14 : null }} maxWidth="lg">
      <Typography variant="h5" color={negativeTop ? 'primary.contrastText' : 'text.primary'} noWrap sx={{ py: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={6}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <ChallengeCard
              key={card}
              title="Learn Arrays.map() function"
              description="Learn how to use the map() function to transform an array of numbers into an array of strings."
              isModule
              isSuccess
              progress={0.5}
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
};
