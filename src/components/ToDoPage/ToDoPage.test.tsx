import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoPage from './ToDoPage';
import { TODOS_KEY } from '../../constants';

const todos = [
  {
    content: 'Go swimming',
    created_date: '2021-12-21T09:06:46.986Z',
    status: 'ACTIVE',
    id: 'fmZF6Tx2g',
    user_id: 'firstUser',
  },
  {
    content: 'Go shopping',
    created_date: '2021-12-21T09:06:46.986Z',
    status: 'ACTIVE',
    id: 'fmZF6Tx2t',
    user_id: 'firstUser',
  },
];

describe('ToDoPage', () => {
  afterEach(() => {
    window.localStorage.setItem(TODOS_KEY, JSON.stringify([]));
  });

  it('should render correctly', () => {
    render(<ToDoPage />);

    expect(screen.getByText('ToDo App')).toBeInTheDocument();
  });

  it('should render todos if exist in local storage', async () => {
    window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

    render(<ToDoPage />);

    expect(await screen.findByText(/Go swimming/i)).toBeInTheDocument();
    expect(await screen.findByText(/Go shopping/i)).toBeInTheDocument();
  });

  it('should create todo', async () => {
    render(<ToDoPage />);
    const input = screen.getByPlaceholderText(/What need to be done\?/i);
    userEvent.type(input, 'Go swimming{enter}');
    const todo = await screen.findByText(/Go swimming/i);
    expect(todo).toBeInTheDocument();
    expect(
      JSON.parse(window.localStorage.getItem(TODOS_KEY) ?? '').length
    ).toBe(1);
  });

  it('should update todo content', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText(/What need to be done\?/i);
    userEvent.type(input, 'Go swimming{enter}');

    const todo = await screen.findByText(/Go swimming/i);
    expect(todo).toBeInTheDocument();

    userEvent.dblClick(screen.getByTestId('todo-content'));
    userEvent.type(
      screen.getByTestId('edit-input'),
      '{space}and shopping{enter}'
    );

    expect(
      await screen.findByText(/Go swimming and shopping/i)
    ).toBeInTheDocument();
  });

  it('should update todo status', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText(/What need to be done\?/i);
    userEvent.type(input, 'Go swimming{enter}');
    await screen.findByText(/Go swimming/i);

    const checkbox: HTMLInputElement = screen.getByTestId('todo-checkbox-0');
    userEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    expect(screen.getByTestId('todo-text-0').className).toMatch(
      'Todo__content--completed'
    );
  });

  it('should update toggle all todo status', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText(/What need to be done\?/i);
    userEvent.type(input, 'Go swimming{enter}');
    await screen.findByText(/Go swimming/i);
    userEvent.type(input, 'Go shopping{enter}');
    await screen.findByText(/Go shopping/i);

    const checkbox: HTMLInputElement = screen.getByTestId('todo-checkbox-0');
    const checkbox2: HTMLInputElement = screen.getByTestId('todo-checkbox-1');
    userEvent.click(checkbox);
    userEvent.click(checkbox2);

    expect(checkbox.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(screen.getByTestId('todo-text-0').className).toMatch(
      'Todo__content--completed'
    );
    expect(screen.getByTestId('todo-text-1').className).toMatch(
      'Todo__content--completed'
    );
  });

  it('should clear all todos', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText('What need to be done?');
    userEvent.type(input, 'Go swimming{enter}');
    const todo = await screen.findByText(/Go swimming/i);
    userEvent.type(input, 'Go shopping{enter}');
    const todo2 = await screen.findByText(/Go shopping/i);
    userEvent.click(screen.getByRole('button', { name: 'Clear all todos' }));

    expect(todo).not.toBeInTheDocument();
    expect(todo2).not.toBeInTheDocument();
    expect(
      JSON.parse(window.localStorage.getItem(TODOS_KEY) ?? '').length
    ).toBe(0);
  });

  it('should only show todo completed', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText('What need to be done?');
    userEvent.type(input, 'Go swimming{enter}');
    const todo = await screen.findByText(/Go swimming/i);
    userEvent.type(input, 'Go shopping{enter}');
    const todo2 = await screen.findByText(/Go shopping/i);

    const checkbox: HTMLInputElement = screen.getByTestId('todo-checkbox-0');
    userEvent.click(checkbox);
    const completeButton = screen.getByRole('button', { name: /Completed/i });
    userEvent.click(completeButton);

    expect(todo).toBeInTheDocument();
    expect(todo2).not.toBeInTheDocument();
  });

  it('should only show active todo', async () => {
    render(<ToDoPage />);

    const input = screen.getByPlaceholderText('What need to be done?');
    userEvent.type(input, 'Go swimming{enter}');
    const todo = await screen.findByText(/Go swimming/i);
    userEvent.type(input, 'Go shopping{enter}');
    const todo2 = await screen.findByText(/Go shopping/i);

    const checkbox: HTMLInputElement = screen.getByTestId('todo-checkbox-0');
    userEvent.click(checkbox);
    const activeButton = screen.getByRole('button', { name: /Active/i });
    userEvent.click(activeButton);

    expect(todo).not.toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });
});
