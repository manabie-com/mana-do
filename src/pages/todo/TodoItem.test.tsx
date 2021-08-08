import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('<Actions />', () => {
  test('Should render content correctly', () => {
    const mockTodo = {
      id: '123',
      user_id: '123',
      content: 'abc',
      status: 'ACTIVE',
      created_date: '123',
    };
    const fn = jest.fn();

    const { getByText } = render(
      <TodoItem todo={mockTodo} isTodoCompleted={fn} />
    );

    const content = getByText(/abc/i);

    expect(content).toBeInTheDocument();
  });

  test('Should handle click delete icon', () => {
    const mockTodo = {
      id: '123',
      user_id: '123',
      content: 'abc',
      status: 'ACTIVE',
      created_date: '123',
    };
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const utils = render(
      <TodoItem todo={mockTodo} isTodoCompleted={fn1} onDeleteTodo={fn2} />
    );

    const deleteBtn = utils.getByText(/x/i);
    fireEvent.click(deleteBtn);
    expect(fn2).toBeCalled();
  });

  test('Should handle click checkbox', () => {
    const mockTodo = {
      id: '123',
      user_id: '123',
      content: 'abc',
      status: 'ACTIVE',
      created_date: '123',
    };
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const utils = render(
      <TodoItem
        todo={mockTodo}
        isTodoCompleted={fn1}
        onUpdateTodoStatus={fn2}
      />
    );

    const checkbox = utils.getByRole('checkbox', { checked: true });
    fireEvent.click(checkbox);
    expect(fn2).toBeCalled();
  });
});
