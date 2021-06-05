import { ComponentPropsWithoutRef } from 'react';

export type InputType = ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
};

export type TextInputPropsType = InputType & {
  text: string;
};
