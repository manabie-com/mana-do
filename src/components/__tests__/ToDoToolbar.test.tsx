import { render, fireEvent } from '@testing-library/react';
import ToDoToolbar from '../ToDoToolbar';

describe('Todo Toolbar Test', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const onFilterStatus = jest.fn();
  const onToggleAllTodo = jest.fn();
  const onDeleteAllTodo = jest.fn();

  const todos = [
    {
      content: 'test 123123',
      created_date: '2022-05-03T14:37:46.978Z',
      id: 'zo9b84NV1',
      status: 'ACTIVE',
      user_id: 'firstUser',
    }
  ];

  it('should render the component properly', () => {
    const { getByTestId } = render(<ToDoToolbar
      todos={[]}
      filter={'ALL'}
      onFilterStatus={onFilterStatus}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
    />);

    expect(getByTestId('toolbar-container')).toBeInTheDocument();
  });

  it('should trigger select all', () => {
    const { getByTestId } = render(<ToDoToolbar
      todos={todos}
      filter={'ALL'}
      onFilterStatus={onFilterStatus}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
    />);

    expect(getByTestId('select-all')).toBeInTheDocument();
    fireEvent.click(getByTestId('select-all'));
    expect(onToggleAllTodo).toBeCalled();
  });

  it('should trigger action buttons', () => {
    const { getByTestId } = render(<ToDoToolbar
      todos={todos}
      filter={'ALL'}
      onFilterStatus={onFilterStatus}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
    />);

    expect(getByTestId('action-button-0')).toBeInTheDocument();
    fireEvent.click(getByTestId('action-button-0'));
    expect(onFilterStatus).toBeCalled();

    expect(getByTestId('action-button-1')).toBeInTheDocument();
    fireEvent.click(getByTestId('action-button-1'));
    expect(onFilterStatus).toBeCalled();

    expect(getByTestId('action-button-2')).toBeInTheDocument();
    fireEvent.click(getByTestId('action-button-2'));
    expect(onFilterStatus).toBeCalled();
  });

  it('should trigger delete all', () => {
    const { getByTestId } = render(<ToDoToolbar
      todos={todos}
      filter={'ALL'}
      onFilterStatus={onFilterStatus}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
    />);

    expect(getByTestId('delete-all')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-all'));
    expect(onDeleteAllTodo).toBeCalled();
  });
});
