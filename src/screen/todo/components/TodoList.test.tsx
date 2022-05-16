import { fireEvent, render } from '@testing-library/react';
import shortid from 'shortid';
import { TodoStatus } from '../../../models/todo';
import TodoList from './TodoList';

describe('TodoActions Test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const onUpdateTodoStatus = jest.fn();
  const onDeleteTodo = jest.fn();
  const onUpdateTodoContent = jest.fn();

  const todos = [
    {
      content: 'have dinner',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    },
  ];
  const testItemId = `todo-item-${todos[0].id}`;

  it('should render the component properly', () => {
    const { getByTestId } = render(
      <TodoList
        todos={todos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    );
    expect(getByTestId('todo-list')).toBeInTheDocument();
  });

  it('should display todo item', () => {
    const { getByTestId } = render(
      <TodoList
        todos={todos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    );
    expect(getByTestId('todo-list')).toBeInTheDocument();
    expect(getByTestId(testItemId)).toBeInTheDocument();
  });

  it('should trigger edit item', () => {
    const { getByTestId, getByDisplayValue } = render(
      <TodoList
        todos={todos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    );

    expect(getByTestId(testItemId)).toBeInTheDocument();
    fireEvent.doubleClick(getByTestId(testItemId));
    fireEvent.change(getByTestId(testItemId), {
      target: { value: 'write a song' },
    });
    expect(getByDisplayValue('write a song')).toBeInTheDocument();
    fireEvent.keyDown(getByTestId(testItemId), { key: 'Enter', code: 13, charCode: 13 });
    expect(onUpdateTodoContent).toBeCalledTimes(1);
  });

  it('should trigger update todo status', () => {
    const { getByTestId } = render(
      <TodoList
        todos={todos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    );

    expect(getByTestId(testItemId)).toBeInTheDocument();
    fireEvent.click(getByTestId(`todo-item-checkbox-${todos[0].id}`));
    expect(onUpdateTodoStatus).toBeCalledTimes(1);
  });

  it('should trigger delete todo', () => {
    const { getByTestId } = render(
      <TodoList
        todos={todos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoContent={onUpdateTodoContent}
      />
    );

    expect(getByTestId(testItemId)).toBeInTheDocument();
    fireEvent.click(getByTestId(`todo-item-remove-${todos[0].id}`));
    expect(onDeleteTodo).toBeCalledTimes(1);
  });
});
