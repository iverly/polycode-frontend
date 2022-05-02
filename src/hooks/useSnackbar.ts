import { useSnackbar as useNotistack } from 'notistack';
import { useCallback } from 'react';

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistack();

  const success = useCallback((content: string, opts: Record<string, unknown> = {}) => {
    enqueueSnackbar(content, {
      variant: 'success',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      ...opts,
    });
  }, [enqueueSnackbar]);

  const error = useCallback((content: string, opts: Record<string, unknown> = {}) => {
    enqueueSnackbar(content, {
      variant: 'error',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      ...opts,
    });
  }, [enqueueSnackbar]);

  return {
    success,
    error,
  };
};

export default useSnackbar;
