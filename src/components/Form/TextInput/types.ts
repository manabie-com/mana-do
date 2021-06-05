import { ComponentPropsWithoutRef } from 'react';

export type TextInputPropsType = ComponentPropsWithoutRef<'input'> & {
  text: string;
};

export type InputType = ComponentPropsWithoutRef<'input'> & {
  error: string;
};
