import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Todo, TodoStatus } from '../models/todo';
import TodoItem from './TodoItem';

describe('TodoItem component', () => {
  let todo: Todo | any;
  const deleteTodo = jest.fn();
  const updateTodoStatus = jest.fn();
  const editTodo = jest.fn();

  beforeEach(() => {
    todo = {
      content: 'todo today',
      created_date: '2022-05-11T02:52:00.857Z',
      status: TodoStatus.ACTIVE,
      id: 'y_dluovoc',
      user_id: 'firstUser',
    };
  });

  afterEach(() => {
    todo = undefined;
  });

  it('should render todo item', () => {
    render(
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
        editTodo={editTodo}
      />
    );

    expect(screen.getByText(todo.content)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should render completed todo item', async () => {
    render(
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
        editTodo={editTodo}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByTestId('tick-todo'), {
        target: { checked: true },
      });
    });

    expect(screen.getByTestId('tick-todo')).toBeChecked();
  });

  it('should render editable todo item', async () => {
    render(
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
        editTodo={editTodo}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('content'));
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
