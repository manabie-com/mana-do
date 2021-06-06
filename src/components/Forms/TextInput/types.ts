import { ComponentPropsWithRef, Ref } from 'react';

export type InputType = ComponentPropsWithRef<'input'> & {
  error?: boolean;
  fullWidth?: boolean;
  text?: string;
  inputRef?: Ref<any>;
};
