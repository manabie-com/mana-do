import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoItem from './ToDoItem.components';

describe('ToDoItem testing', () => {
  const container = document.createElement('div');
  const handleOnChangeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {};
  const handleOnChangeDelete = (): void => {};
  it('Render ToDoItem correctly', () => {
    act(() => {
      ReactDOM.render(
        <ToDoItem
          checked={true}
          content='something'
          handleOnChangeCheckBox={handleOnChangeCheckBox}
          handleOnClickDelete={handleOnChangeDelete}
        />,
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
