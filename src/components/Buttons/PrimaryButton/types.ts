import { ComponentPropsWithRef } from 'react';
export type ButtonVariantType = 'primary' | 'secondary' | 'gray';

export type ButtonPropsType = ComponentPropsWithRef<'button'> & {
  variant?: ButtonVariantType;
  width?: string;
  active?: boolean;
};
