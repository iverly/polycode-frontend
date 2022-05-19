/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import {
  Box, Button, Grid, Typography,
} from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import MEditor from '@monaco-editor/react';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../Scrollbar';

export interface EditorProps {
  statement: string;
  language: string;
  defaultSource: string;
  loading: boolean;
  onSubmit: (source: string) => void;
}

export default function Editor({
  statement, language, defaultSource, onSubmit, loading,
}: EditorProps) {
  const [source, setSource] = useState<string>(defaultSource);

  const handleRun = useCallback(() => {
    onSubmit(source);
  }, [source]);

  const handleReset = useCallback(() => {
    setSource(defaultSource);
  }, [defaultSource]);

  return (
    <Box minWidth="xl" sx={{ height: '100%' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sm={6} sx={{ borderRight: '2px solid #e0e0e0' }}>
          <Scrollbar sx={{ height: `${window.innerHeight - 70}px` }}>
            <Box sx={{ p: 2 }}>
              <MuiMarkdown
                overrides={{
                  h1: {
                    component: Typography,
                    props: {
                      variant: 'h4',
                      sx: {
                        fontWeight: 'bold',
                        mb: 2,
                      },
                    },
                  },
                  h2: {
                    component: Typography,
                    props: {
                      variant: 'h5',
                      sx: {
                        fontWeight: 'bold',
                        mb: 2,
                      },
                    },
                  },
                  h3: {
                    component: Typography,
                    props: {
                      variant: 'h6',
                      sx: {
                        fontWeight: 'bold',
                        mb: 2,
                      },
                    },
                  },
                  h4: {
                    component: Typography,
                    props: {
                      variant: 'h6',
                      sx: {
                        mb: 2,
                      },
                    },
                  },
                  h5: {
                    component: Typography,
                    props: {
                      variant: 'h6',
                      sx: {
                        mb: 2,
                      },
                    },
                  },
                  h6: {
                    component: Typography,
                    props: {
                      variant: 'h6',
                      sx: {
                        mb: 2,
                      },
                    },
                  },
                  p: {
                    component: Typography,
                    props: {
                      variant: 'body1',
                      sx: {
                        mb: 2,
                      },
                    },
                  },
                }}
              >
                {statement}
              </MuiMarkdown>
            </Box>
          </Scrollbar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `${window.innerHeight - 70}px`,
          }}
          >
            <MEditor
              height="80vh"
              width="100%"
              defaultLanguage={language}
              value={source}
              onChange={(value) => setSource(value || '')}
            />
            <Box sx={{
              borderTop: '2px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2,
            }}
            >
              <LoadingButton variant="contained" color="success" onClick={handleRun} loading={loading}>
                Run
              </LoadingButton>
              <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
