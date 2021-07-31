import React, { useReducer } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import Input from './index';
import reducer, { initialState } from '../../../store/reducer';

it('should add new todo', function () {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  const [, dispatch] = result.current;
  const { container } = render(<Input dispatch={dispatch} />);
  const input = container.querySelector('input');

  if (input) {
    userEvent.type(input, 'New todo');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByDisplayValue('New todo')).toBeInTheDocument();
  }
});
