import React, { useCallback } from 'react';
import {
  Alert, Box, Button, Modal, Typography,
} from '@mui/material';
import MuiMarkdown from 'mui-markdown';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  '&:focus': {
    outline: 'none',
  },
  '&:focus-active': {
    outline: 'none',
  },
};

export interface ModalResultProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  stdout: string;
  stderr: string;
  success: boolean;
}

export default function ModalResult({
  open, stdout, stderr, success, setOpen,
}: ModalResultProps) {
  const parseStd = useCallback((std: string) => `\`\`\`\n${std}\n\`\`\``, []);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        {!success && <Alert severity="error">Error while executing your submission!</Alert>}
        {success && <Alert severity="success">Execution successful!</Alert>}
        {stdout && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Standard output
            </Typography>
            <MuiMarkdown>
              {parseStd(stdout)}
            </MuiMarkdown>
          </Box>
        )}
        {stderr && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Error output
            </Typography>
            <MuiMarkdown>
              {parseStd(stderr)}
            </MuiMarkdown>
          </Box>
        )}
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 4,
        }}
        >
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}
