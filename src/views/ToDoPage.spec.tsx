import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Todo, TodoStatus } from '../models/todo';
import ToDoPage from './ToDoPage';

const todos: Array<Todo> = [
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

jest.mock('../service', () => ({
  getTodos() {
    return Promise.resolve([
      {
        content: 'active todo',
        created_date: '2022-05-11T02:52:00.857Z',
        status: 'ACTIVE',
        id: 'y_dluovoc',
        user_id: 'firstUser',
      },
      {
        content: 'completed todo',
        created_date: '2022-05-11T02:52:01.412Z',
        status: 'COMPLETED',
        id: 'YA1R1EPMf',
        user_id: 'firstUser',
      },
    ]);
  },
  createTodo(content: string) {
    return Promise.resolve({
      content,
      created_date: '2022-05-11T02:52:02.030Z',
      status: 'ACTIVE',
      id: 'MH1oxSVPIF',
      user_id: 'firstUser',
    });
  },
  deleteAllTodos: jest.fn(),
  deleteTodo: jest.fn(),
  editTodo: jest.fn(),
  toggleAllTodos: jest.fn(),
}));

describe('ToDoPage component', () => {
  it('should display only active todo item', async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('btn-active'));
    });

    expect(screen.getByText(todos[0].content)).toBeInTheDocument();
  });

  it('should display only completed todo item', async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('btn-complete'));
    });

    expect(screen.getByText(todos[1].content)).toBeInTheDocument();
  });

  it('should clear all todo items', async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      expect(screen.getByText(todos[0].content)).toBeInTheDocument();
      expect(screen.getByText(todos[1].content)).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('btn-clear'));
    });

    expect(screen.queryByText(todos[0].content)).not.toBeInTheDocument();
    expect(screen.queryByText(todos[1].content)).not.toBeInTheDocument();
  });

  it('should delete a todo item', async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId('btn-delete')[0]);
    });

    expect(screen.queryByText(todos[0].content)).not.toBeInTheDocument();
  });

  it('should add a new todo item', async () => {
    const content = 'new todo';

    render(<ToDoPage />);

    const inputEl = screen.getByTestId('input-todo');
    await waitFor(() => {
      fireEvent.change(inputEl, { target: { value: content } });
    });
    await waitFor(() => {
      fireEvent.keyDown(inputEl, { key: 'Enter' });
    });

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('should be able to edit todo item', async () => {
    const content = 'edited todo';
    render(<ToDoPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(todos[0].content));
      fireEvent.change(screen.getByTestId('edit-todo'), {
        target: { value: content },
      });
    });
    await waitFor(() => {
      fireEvent.keyDown(screen.getByTestId('edit-todo'), { key: 'Enter' });
    });

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('should toggle all todo items to be done', async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('btn-toggle'));
    });

    screen.getAllByTestId('tick-todo').forEach(el => {
      expect(el).toBeChecked();
    });
  });
});
