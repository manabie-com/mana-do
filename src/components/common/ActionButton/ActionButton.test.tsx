import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ActionButton from './ActionButton.components';

describe('ActionButton testing', () => {
  const container = document.createElement('div');
  it('Render correctly', () => {
    act(() => {
      ReactDOM.render(<ActionButton>Testing</ActionButton>, container);
    });
    const button = container.querySelector('button');
    expect(button?.textContent).toContain('Testing');
    expect(button?.className).toContain('Action__btn');
    
  });
});
