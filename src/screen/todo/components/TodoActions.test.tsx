import { fireEvent, render } from '@testing-library/react';
import shortid from 'shortid';
import { TodoStatus } from '../../../models/todo';
import { TabHeader } from '../TodoPage';
import TodoActions from './TodoActions';

describe('TodoActions Test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const setShowing = jest.fn();
  const onDeleteAllTodo = jest.fn();
  const onToggleAllTodo = jest.fn();

  const todos = [
    {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    },
  ];

  it('should render the component properly', () => {
    const { getByTestId } = render(
      <TodoActions
        todos={todos}
        showing={TabHeader.ALL}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
    );

    expect(getByTestId('todo-actions')).toBeInTheDocument();
  });

  it('should trigger click showing button ', () => {
    const { getByTestId } = render(
      <TodoActions
        todos={todos}
        showing={TabHeader.ALL}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
    );

    expect(getByTestId('button-all')).toBeInTheDocument();
    fireEvent.click(getByTestId('button-all'));
    expect(setShowing).toHaveBeenCalledWith(TabHeader.ALL);

    expect(getByTestId('button-active')).toBeInTheDocument();
    fireEvent.click(getByTestId('button-active'));
    expect(setShowing).toHaveBeenCalledWith(TabHeader.ACTIVE);

    expect(getByTestId('button-complete')).toBeInTheDocument();
    fireEvent.click(getByTestId('button-complete'));
    expect(setShowing).toHaveBeenCalledWith(TabHeader.COMPLETED);
  });

  it('should trigger clear all', () => {
    const { getByTestId } = render(
      <TodoActions
        todos={todos}
        showing={TabHeader.ALL}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
    );

    expect(getByTestId('button-clear-all')).toBeInTheDocument();
    fireEvent.click(getByTestId('button-clear-all'));
    expect(onDeleteAllTodo).toBeCalled();
  });

  it('should trigger toggle all', () => {
    const { getByTestId } = render(
      <TodoActions
        todos={todos}
        showing={TabHeader.ALL}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
    );

    expect(getByTestId('toggle-all')).toBeInTheDocument();
    fireEvent.click(getByTestId('toggle-all'));
    expect(onToggleAllTodo).toBeCalled();
  });
});
