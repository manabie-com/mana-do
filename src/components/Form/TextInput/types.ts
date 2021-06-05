import { ComponentPropsWithRef } from 'react';

export type InputType = ComponentPropsWithRef<'input'> & {
  error?: boolean;
};

export type TextInputPropsType = InputType & {
  text: string;
};
