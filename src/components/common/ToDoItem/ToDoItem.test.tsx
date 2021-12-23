import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoPageProvider from '../../../context/ToDoPageProvider';
import ToDoItem from './ToDoItem.components';

describe('ToDoItem testing', () => {
  const container = document.createElement('div');
  it('Render ToDoItem correctly', () => {
    const props = {
      id: '123456',
      checked: true,
      content: 'something',
    };
    act(() => {
      ReactDOM.render(
        <ToDoPageProvider>
          <ToDoItem {...props} />
        </ToDoPageProvider>,
        container
      );
    });
    const input = container.querySelector('input');
    const span = container.querySelector('span');
    const button = container.querySelector('button');
    expect(span?.textContent).toBe('something');
    expect(input?.checked).toBeTruthy();
    expect(button?.textContent).toBe('X');
    act(() => {});
  });
});
