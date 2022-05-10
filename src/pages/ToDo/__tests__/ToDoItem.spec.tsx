import React from 'react';
import ToDoItem from '../ToDoItem';
import { render } from '@testing-library/react';
import { spawnToDos } from '../utils';
import * as mojs from '../../../utils/mojs';

beforeEach(() => {
  jest.spyOn(mojs, 'playCheckedEffect').mockImplementation(() => null);
});

const todos = spawnToDos(1);

describe('ToDoItem', () => {
  it('Should match snapshot', () => {
    const { container } = render(<ToDoItem todo={todos[0]} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Render ToDoItem', () => {
  it('Should render a checkbox', () => {
    const { getByLabelText } = render(<ToDoItem todo={todos[0]} />);
    expect(getByLabelText('todo-item-checkbox')).not.toBeChecked();
  });

  it('Should render a todo content', () => {
    const { getByText } = render(<ToDoItem todo={todos[0]} />);
    expect(getByText(/content/i)).toBeInTheDocument();
  });

  it('Should render a delete button', async () => {
    const { getByLabelText } = render(<ToDoItem todo={todos[0]} />);
    expect(getByLabelText('delete-todo-button')).toBeInTheDocument();
  });
});
