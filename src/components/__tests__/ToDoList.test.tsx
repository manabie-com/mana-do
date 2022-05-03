import { render, fireEvent } from '@testing-library/react';
import ToDoList from '../ToDoList';

describe('Todo List Test', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

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
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={false}
      selectedTodoId={''}
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={jest.fn()}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('todo-list-container')).toBeInTheDocument();
  });

  it('should display list of todos', () => {
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={false}
      selectedTodoId={''}
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={jest.fn()}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('todo-list-container')).toBeInTheDocument();
    expect(getByTestId('todo-item-0')).toBeInTheDocument();
  });

  it('should display inline edit', () => {
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={true}
      selectedTodoId='zo9b84NV1'
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={jest.fn()}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('todo-inline-edit-0')).toBeInTheDocument();
  });

  it('should trigger edit action', () => {
    const onEditTodo = jest.fn();
    const { getByTestId, getByDisplayValue } = render(<ToDoList
      todos={todos}
      showEditField={true}
      selectedTodoId='zo9b84NV1'
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={jest.fn()}
      onEditTodo={onEditTodo}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('todo-inline-edit-0')).toBeInTheDocument();

    fireEvent.change(getByTestId('todo-inline-edit-0'), {
      target: { value: 'test-12345' }
    });
    expect(getByDisplayValue('test-12345')).toBeInTheDocument();

    fireEvent.keyDown(getByTestId('todo-inline-edit-0'), { key: 'Enter', code: 13, charCode: 13 });
    expect(onEditTodo).toBeCalledTimes(1);
  });

  it('should trigger double click', () => {
    const onHandleShowInlineEdit = jest.fn();
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={false}
      selectedTodoId=''
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={jest.fn()}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={onHandleShowInlineEdit}
    />);

    expect(getByTestId('todo-item-0')).toBeInTheDocument();
    fireEvent.doubleClick(getByTestId('todo-item-0'));
    expect(onHandleShowInlineEdit).toBeCalled();
  });

  it('should trigger update todo status', () => {
    const onUpdateTodoStatus = jest.fn();
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={false}
      selectedTodoId=''
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteToDo={jest.fn()}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('todo-checkbox-0')).toBeInTheDocument();

    fireEvent.click(getByTestId('todo-checkbox-0'));
    expect(onUpdateTodoStatus).toBeCalled();
  });

  it('should trigger delete todo from the list', () => {
    const onDeleteToDo = jest.fn();
    const { getByTestId } = render(<ToDoList
      todos={todos}
      showEditField={false}
      selectedTodoId=''
      onUpdateTodoStatus={jest.fn()}
      onDeleteToDo={onDeleteToDo}
      onEditTodo={jest.fn()}
      onHandleShowInlineEdit={jest.fn()}
    />);
    expect(getByTestId('delete-item-0')).toBeInTheDocument();

    fireEvent.click(getByTestId('delete-item-0'));
    expect(onDeleteToDo).toBeCalled();
  });
});
