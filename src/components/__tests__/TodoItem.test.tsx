import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoStatus } from '../../models/todo';
import TodoItem from '../TodoItem';

const todoItem = {
  id: '1',
  content: 'Todo 1',
  user_id: 'user1',
  created_date: new Date().toUTCString(),
  status: TodoStatus.ACTIVE,
};

describe('TodoItem', () => {
  it('test show todo item successfully', () => {
    const renderer = render(
      <TodoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
      />
    );
    expect(renderer.getByRole('checkbox')).not.toBeChecked();
    expect(renderer.getByText(/Todo 1/i)).toBeInTheDocument();
  });

  it('test checkbox is checked if status is COMPLETED', () => {
    const completedTodo = { ...todoItem, status: TodoStatus.COMPLETED };
    const renderer = render(
      <TodoItem
        todo={completedTodo}
        onUpdateTodoStatus={() => { }}
      />
    );
    expect(renderer.getByRole('checkbox')).toBeChecked();
  });

  it('test delete todo', async () => {
    const renderer = render(
      <TodoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
      />
    );
    fireEvent.click(renderer.getByText('X'));
    expect(document.querySelector('div#ToDo__item')).toBeNull();
  });

  it('test update todo', async () => {
    const renderer = render(
      <TodoItem
        todo={todoItem}
        onUpdateTodoStatus={() => { }}
      />
    );
    fireEvent.doubleClick(renderer.getByTestId('Todo__content'));
    const input = renderer.getByRole('textbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(renderer.queryByText('changed')).toBeInTheDocument();
  });
});
