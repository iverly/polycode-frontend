/* eslint-disable no-unused-vars */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

export interface ChallengeCardProps {
  title: string;
  description: string;
  isModule?: boolean;
  isCourse?: boolean;
  isSuccess?: boolean;
  progress?: number;
  sx?: React.CSSProperties;
  skeleton?: boolean;
  onClick?: () => void;
}

export default function ChallengeCard({
  title, description, isModule, isCourse, isSuccess, progress, sx, skeleton, onClick,
}: ChallengeCardProps) {
  const shouldIncludeProgress = isModule || isCourse;
  const shouldShowSuccess = isSuccess || (shouldIncludeProgress && progress === 1);

  if (skeleton) {
    return (
      <Card
        sx={{
          height: '100%', display: 'flex', flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h3">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column', ...sx,
      }}
      onClick={onClick}
    >
      {(shouldIncludeProgress || shouldShowSuccess) && (
        <CardHeader
          action={shouldShowSuccess && (
            <CheckCircleOutlineIcon color="success" />
          )}
          titleTypographyProps={{ variant: 'h6' }}
          title={title}
          sx={{ mb: 0, pb: 0 }}
        />
      )}
      {!shouldIncludeProgress && !shouldShowSuccess && (
        <CardHeader
          action={
            <ArrowForwardIcon />
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={title}
          sx={{ mb: 0, pb: 0 }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ mb: shouldIncludeProgress ? 2 : 0 }}>
          {description}
        </Typography>
        <Typography sx={{ mb: shouldIncludeProgress ? 2 : 0 }}>
          {description}
        </Typography>
        {shouldIncludeProgress && (
          <LinearProgressWithLabel value={(progress || 0) * 100} />
        )}
      </CardContent>
    </Card>
  );
}

ChallengeCard.defaultProps = {
  isModule: false,
  isCourse: false,
  isSuccess: false,
  progress: 0,
  sx: {},
  skeleton: false,
  onClick: () => null,
};
