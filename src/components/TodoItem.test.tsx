import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import mockData from '../mock/todos';

describe('<TodoItem /> tests', () => {
  it('should render todo item properly', () => {
    const screen = render(
      <TodoItem
        todo={mockData[0]}
        deleteTodo={jest.fn}
        updateTodo={jest.fn}
        updateTodoStatus={jest.fn}
      />
    );

    expect(screen.queryByText(mockData[0].content)).toBeInTheDocument();
    expect(screen.getByTestId(`todo-checkbox-${mockData[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`todo-delete-${mockData[0].id}`)).toBeInTheDocument();
  });

  it('should render input edit todo when user double click to todo content', () => {
    const screen = render(
      <TodoItem
        todo={mockData[0]}
        deleteTodo={jest.fn}
        updateTodo={jest.fn}
        updateTodoStatus={jest.fn}
      />
    );

    const todoContentEl = screen.queryByText(mockData[0].content);

    expect(todoContentEl).toBeInTheDocument();
    fireEvent.dblClick(todoContentEl);
    const todoEditInputEl = screen.getByTestId(`todo-content-${mockData[0].id}`);
    expect(todoEditInputEl).toHaveValue(mockData[0].content)
  });
});
