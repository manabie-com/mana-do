import React from 'react';
import ToDoToolbar from '../ToDoToolbar';
import { render } from '@testing-library/react';
import { AppContext } from '../../../context/toDoContext';
import { spawnToDos } from '../utils';
import { AppState } from '../../../store/reducer';

describe('ToDoToolbar', () => {
  it('Should match snapshot', () => {
    const { container } = render(<ToDoToolbar />);
    expect(container).toMatchSnapshot();
  });
});

describe('Render ToDoToolbar', () => {
  it('Toggle all checkbox should not checked', async () => {
    const todos = spawnToDos(1);
    const state = { todos, filter: 'ALL' } as AppState;
    const { findByLabelText } = render(
      <AppContext.Provider value={{ state, dispatch: jest.fn() }}>
        <ToDoToolbar />
      </AppContext.Provider>,
    );
    expect(await findByLabelText(/toggle-all-todos/i)).not.toBeChecked();
  });

  it('Toggle all checkbox should checked', async () => {
    const todos = spawnToDos(1);
    todos[0].status = 'COMPLETED';
    const state = { todos, filter: 'ALL' } as AppState;
    const { findByLabelText } = render(
      <AppContext.Provider value={{ state, dispatch: jest.fn() }}>
        <ToDoToolbar />
      </AppContext.Provider>,
    );
    expect(await findByLabelText(/toggle-all-todos/i)).toBeChecked();
  });

  it('Should render select element', () => {
    const { getByLabelText } = render(<ToDoToolbar />);
    expect(getByLabelText(/view/i)).toBeInTheDocument();
  });

  it('Should render Clear all todos button', () => {
    const { getByText } = render(<ToDoToolbar />);
    expect(getByText(/clear all todos/i)).toBeInTheDocument();
  });
});
