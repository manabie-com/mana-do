import { render } from '@testing-library/react';
import React from 'react';
import ToDoPage from './ToDoPage';
import userEvent from '@testing-library/user-event';

describe('ToDo Page', () => {
  afterAll(() => {
    localStorage.clear();
  });

  it('should render todo page', () => {
    const { container } = render(<ToDoPage />);
    const todoContainerDiv = container.querySelector('div');
    expect(todoContainerDiv?.className).toMatch('ToDo__container');
    const todoCreationDiv = todoContainerDiv?.firstElementChild as HTMLDivElement;
    expect(todoCreationDiv.className).toMatch('Todo__creation');
  });

  it('should render todo page toolbar', () => {
    const { container } = render(<ToDoPage />);
    const todoToolbarContainerDiv = container.querySelector('.Todo__toolbar');
    expect(todoToolbarContainerDiv?.className).toMatch('Todo__toolbar');
    const todoInput = container.querySelector('.Todo__input');
    expect(todoInput?.className).toMatch('Todo__input');
  });
});
