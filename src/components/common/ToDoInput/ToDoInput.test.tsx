import React from 'react';
import ReactDOM from 'react-dom';
import {
  act,
  isElement,
  isElementOfType,
  Simulate,
} from 'react-dom/test-utils';
import ToDoInput from './ToDoInput.components';

describe('ToDoInput testing', () => {
  const div = document.createElement('div');
  const handleOnSubmit = async (value: string): Promise<void> => {};
  const ToDoInputElement = <ToDoInput handleOnSubmit={handleOnSubmit} />;
  it('Render ToDoInput correctly', () => {
    isElement(ToDoInputElement);
  });
  it('Render ToDoInput with element type input correctly', () => {
    isElementOfType(ToDoInputElement, 'input');
  });
  it('Can render and submit', () => {
    act(() => {
      ReactDOM.render(ToDoInputElement, div);
    });
    const input = div.querySelector('input');
    expect(input?.placeholder).toBe('What need to be done?');
    act(() => {
      if (input) {
        Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
      }
    });
  });
});
