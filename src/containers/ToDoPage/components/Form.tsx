import React, { FormEvent, useRef } from 'react';

import { Input } from 'components/Input';
import { useDispatch } from 'react-redux';
import { createTodo } from '../thunks';

export interface Props {
  defaultValue?: string;
  onSubmit?: (content: string) => void;
  onBlur?: () => void;
}

export function Form(props: Props) {
  const { defaultValue, onSubmit, onBlur } = props;
  const ref = useRef<HTMLInputElement>(null!);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const content = ref.current.value;
    if (content.length > 0) {
      if (onSubmit) {
        return onSubmit(content);
      }

      dispatch(createTodo(content));
      ref.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={ref}
        placeholder="What need to be done?"
        defaultValue={defaultValue}
        autoFocus
        onBlur={onBlur}
      />
    </form>
  );
}
