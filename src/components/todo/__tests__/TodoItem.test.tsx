import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TodoItem from '../TodoItem';
import { Todo, TodoStatus } from '../../../models/todo';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

it('renders with or without a todo', () => {
  const todo: Todo = {
    content: 'content',
    created_date: '',
    id: '1',
    user_id: '',
    status: TodoStatus.COMPLETED,
  };

  act(() => {
    render(<TodoItem todo={todo} />, container);
  });
  expect(container!.querySelector('p.item__content')?.textContent).toBe(
    todo.content
  );
  expect(
    container!.querySelector('input[type="checkbox"]:checked')
  ).toBeTruthy();

  act(() => {
    render(<TodoItem todo={null as any} />, container);
  });
  expect(container!.querySelector('p.item__content')?.textContent).toBe('');
  expect(
    container!.querySelector('input[type="checkbox"]:checked')
  ).toBeFalsy();
});

it('emit delete and complete events', () => {
  const todo: Todo = {
    content: 'content',
    created_date: '',
    id: '1',
    user_id: '',
    status: TodoStatus.COMPLETED,
  };
  const onDelete = jest.fn();
  const onComplete = jest.fn();
  const onUpdateContent = jest.fn();

  act(() => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onComplete={onComplete}
        onUpdateContent={onUpdateContent}
      />,
      container
    );
  });

  const deleteBtn = document.querySelector('button.item__delete');
  act(() => {
    deleteBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith(todo.id);

  const completeCheckbox = document.querySelector('input[type="checkbox"]');
  act(() => {
    completeCheckbox!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledWith(
    todo.id,
    todo.status === TodoStatus.COMPLETED ? false : true
  );
});

it('emit update content events', () => {
  const todo: Todo = {
    content: 'content',
    created_date: '',
    id: '1',
    user_id: '',
    status: TodoStatus.COMPLETED,
  };
  const onUpdateContent = jest.fn();

  act(() => {
    render(
      <div>
        <TodoItem todo={todo} onUpdateContent={onUpdateContent} />
        <div id="outside">outside</div>
      </div>,
      container
    );
  });

  const enableUpdateContentArea = document.querySelector('p.item__content');
  act(() => {
    enableUpdateContentArea!.dispatchEvent(
      new MouseEvent('dblclick', { bubbles: true })
    );
  });
  expect(container!.querySelector('textarea.item__content')).toBeTruthy();

  const updateContentArea = document.querySelector('textarea.item__content');
  act(() => {
    updateContentArea!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
  });
  expect(onUpdateContent).toHaveBeenCalledTimes(1);
  expect(onUpdateContent).toHaveBeenCalledWith(todo.id, todo.content);
  expect(container!.querySelector('textarea.item__content')).toBeFalsy();

  const enableUpdateContentArea1 = document.querySelector('p.item__content');
  act(() => {
    enableUpdateContentArea1!.dispatchEvent(
      new MouseEvent('dblclick', { bubbles: true })
    );
  });
  expect(container!.querySelector('textarea.item__content')).toBeTruthy();

  const outsideUpdateContent = document.querySelector('#outside');
  act(() => {
    outsideUpdateContent!.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  });
  expect(container!.querySelector('textarea.item__content')).toBeFalsy();
});
