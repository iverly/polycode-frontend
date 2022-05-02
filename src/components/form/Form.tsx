import React from 'react';
import {
  FieldValues,
  FormProvider, UseFormReturn,
} from 'react-hook-form';

export interface FormProps<T extends FieldValues = any> {
  children: React.ReactNode;
  methods: UseFormReturn<T, any>;
  onSubmit: any;
}

export default function Form({ children, onSubmit, methods }: FormProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <form onSubmit={(onSubmit as any)}>{children}</form>
    </FormProvider>
  );
}
