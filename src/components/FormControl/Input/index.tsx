import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { InputWrapper } from './style';

const Input = (props: {
  name: string;
  type?: string;

  placeholder: string;
}) => {
  const { name, type, placeholder } = props;
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputWrapper>
          <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className='error-msg'>{message}</p>}
          />
        </InputWrapper>
      )}
    />
  );
};

export default Input;
