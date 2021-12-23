import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoPageProvider from '../../context/ToDoPageProvider';
import { Todo, TodoStatus } from '../../models/todo';
import ToDoPage from './ToDoPage';

let container: Element | DocumentFragment | null = null;
const toDoList = localStorage.getItem('todo-list');
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container = null;
  }
});

describe('ToDoPage testing', () => {
  it('Render correctly', () => {
    act(() => {
      ReactDOM.render(
        <ToDoPageProvider>
          <ToDoPage />
        </ToDoPageProvider>,
        container
      );
    });
    const todoListContainer = container?.querySelector('div.ToDo__List');
    const todoItems = todoListContainer?.querySelectorAll('>*');
    if (toDoList) {
      expect(todoItems?.length).toEqual(JSON.parse(toDoList));
    }
  });
  it('Clear all ToDo', () => {
    act(() => {
      ReactDOM.render(
        <ToDoPageProvider>
          <ToDoPage />
        </ToDoPageProvider>,
        container
      );
    });
    const clearAllToDosBtn = container?.querySelector(
      '[data-testid=clear-all-todos]'
    );
    expect(clearAllToDosBtn).toBeDefined();
    act(() => {
      clearAllToDosBtn?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });
    if (toDoList) {
      expect(JSON.parse(toDoList).length).toBe(0);
    }
  });

  it('render toggle all button correctly', () => {
    act(() => {
      ReactDOM.render(
        <ToDoPageProvider>
          <ToDoPage />
        </ToDoPageProvider>,
        container
      );
    });
    const toggleAllToDosBtn = container?.querySelector(
      '[data-testid=toggle-all-todos]'
    );
    expect(toggleAllToDosBtn).toBeDefined();
    if (toDoList) {
      const lengthOfToDoList = JSON.parse(toDoList).length > 0;
      lengthOfToDoList
        ? expect(toggleAllToDosBtn).toBeTruthy()
        : expect(toggleAllToDosBtn).toBeNull();
      if (lengthOfToDoList) {
        act(() => {
          toggleAllToDosBtn?.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
          );
        });
        expect(
          JSON.parse(toDoList).every(
            (todo: Todo) => todo.status === TodoStatus.COMPLETED
          )
        ).toBeTruthy();
        act(() => {
          toggleAllToDosBtn?.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
          );
        });
        expect(
          JSON.parse(toDoList).every(
            (todo: Todo) => todo.status === TodoStatus.ACTIVE
          )
        ).toBeTruthy();
      }
    }
  });
});
