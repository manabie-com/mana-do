import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoTabs from './ToDoTabs.components';

describe('ToDoToolbar testing', () => {
  const container = document.createElement('div');

  it('Render correctly', () => {
    const props = { setShowing: jest.fn() };
    act(() => {
      ReactDOM.render(<ToDoTabs {...props} activeTab='ALL' />, container);
    });
    const buttonList = container.querySelectorAll('button');
    expect(buttonList.length).toEqual(3);
  });
});
