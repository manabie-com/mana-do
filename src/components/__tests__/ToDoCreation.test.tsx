import { render, fireEvent } from '@testing-library/react';
import ToDoCreation from '../ToDoCreation';

describe('Todo Creation Test', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the component properly', () => {
    const onCreateTodo = jest.fn();
    const { getByTestId } = render(<ToDoCreation onCreateTodo={onCreateTodo} />);
    expect(getByTestId('create-input-field')).toBeInTheDocument();
  });

  it('should create new todo', () => {
    const onCreateTodo = jest.fn();
    const { getByTestId, getByDisplayValue } = render(<ToDoCreation onCreateTodo={onCreateTodo} />);
    expect(getByTestId('create-input-field')).toBeInTheDocument();

    const createField = getByTestId('create-input-field');
    fireEvent.change(createField, {
      target: { value: 'test-12345' }
    });
    expect(getByDisplayValue('test-12345')).toBeInTheDocument();

    fireEvent.keyDown(createField, { key: 'Enter', code: 13, charCode: 13 });
    expect(onCreateTodo).toBeCalledTimes(1);
  });
});
