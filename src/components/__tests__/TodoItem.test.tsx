import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoStatus } from '../../models/todo';
import ToDoItem from '../ToDoItem';

const todoItem = {
  id: '1',
  content: 'Todo 1',
  user_id: 'user1',
  created_date: new Date().toUTCString(),
  status: TodoStatus.ACTIVE,
};

describe('ToDoItem', () => {
  it('test show todo item successfully', () => {
    const renderer = render(
      <ToDoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
        onUpdateTodoContent={() => { }}
        onDeleteTodo={() => { }}
      />
    );
    expect(renderer.getByRole('checkbox')).not.toBeChecked();
    expect(renderer.getByText(/Todo 1/i)).toBeInTheDocument();
  });

  it('test checkbox is checked if status is COMPLETED', () => {
    const completedTodo = { ...todoItem, status: TodoStatus.COMPLETED };
    const renderer = render(
      <ToDoItem
        todo={completedTodo}
        onUpdateTodoStatus={() => { }}
        onUpdateTodoContent={() => { }}
        onDeleteTodo={() => { }}
      />
    );
    expect(renderer.getByRole('checkbox')).toBeChecked();
  });

  it('test delete todo', async () => {
    const renderer = render(
      <ToDoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
        onUpdateTodoContent={() => { }}
        onDeleteTodo={() => { }}
      />
    );
    fireEvent.click(renderer.getByText('X'));
    expect(document.querySelector('div#ToDo__item')).toBeNull();
  });

  it('test update todo', async () => {
    const onUpdateTodoContent = jest.fn();
    const renderer = render(
      <ToDoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
        onUpdateTodoContent={onUpdateTodoContent}
        onDeleteTodo={() => { }}
      />
    );
    fireEvent.doubleClick(renderer.getByTestId('Todo__content'));
    const input = await renderer.findByDisplayValue(todoItem.content);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'changed' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onUpdateTodoContent).toHaveBeenCalledTimes(1);
  });
});
