import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export default function RHFTextField({ name, ...other }: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field, fieldState: { error } }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
