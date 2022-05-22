import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox, FormControlLabel,
} from '@mui/material';

export default function RHFCheckbox({ name, ...other }: any) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      name={name}
      label={name}
      control={(
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      )}
      {...other}
    />
  );
}
