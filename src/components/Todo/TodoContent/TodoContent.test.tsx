import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoContent from './TodoContent';

const props = {
  rowIndex: 1,
  content: 'content row 1',
  onContentChange: jest.fn(),
};
const setup = () => {
  let wrapper = render(<TodoContent {...props} />);
  return { ...wrapper };
};

describe('<TodoContent />', () => {
  it('Render correct content', () => {
    let { getByTestId } = setup();
    let contentDiv = getByTestId('todo-content');
    expect(contentDiv).toHaveTextContent(props.content);
  });

  it('Render input on double click', () => {
    let { getByTestId } = setup();
    let contentDiv = getByTestId('todo-content');
    userEvent.dblClick(contentDiv);

    let contentInput = getByTestId('todo-input');

    expect(contentInput).toBeVisible();
    expect(contentDiv).not.toBeVisible();
  });
});
