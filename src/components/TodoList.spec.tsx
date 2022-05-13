import { render, screen } from '@testing-library/react';
import { Todo, TodoStatus } from '../models/todo';
import { ALL } from '../views/ToDoPage';
import TodoList from './TodoList';

describe('TodoList component', () => {
  let todos: Array<Todo>;
  const deleteTodo = jest.fn();
  const updateTodoStatus = jest.fn();
  const editTodo = jest.fn();

  beforeEach(() => {
    todos = [
      {
        content: 'active todo',
        created_date: '2022-05-11T02:52:00.857Z',
        status: TodoStatus.ACTIVE,
        id: 'y_dluovoc',
        user_id: 'firstUser',
      },
      {
        content: 'completed todo',
        created_date: '2022-05-11T02:52:01.412Z',
        status: TodoStatus.COMPLETED,
        id: 'YA1R1EPMf',
        user_id: 'firstUser',
      },
    ];
  });

  it('should render list of todo', () => {
    render(
      <TodoList
        todos={todos}
        filter={ALL}
        deleteTodo={deleteTodo}
        updateTodoStatus={updateTodoStatus}
        editTodo={editTodo}
      />
    );

    expect(screen.getByText(todos[0].content)).toBeInTheDocument();
    expect(screen.getByText(todos[1].content)).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { checked: false })
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  });
});
