import * as React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { configureAppStore } from 'store/configureStore';
import { createTodo } from 'containers/ToDoPage/thunks';
import { TodoStatus } from 'models/todo';
import { TodoItem, Props } from '../TodoItem';

const renderTodoItem = (props: Props, store) =>
  render(
    <Provider store={store}>
      <TodoItem {...props} />
    </Provider>,
  );

describe('<TodoItem />', () => {
  let store;

  beforeEach(() => {
    store = configureAppStore();
    const todo = { id: 'test', content: 'test content' };
    store.dispatch({ type: createTodo.fulfilled.type, payload: todo });
  });

  it('should return null', () => {
    const component = renderTodoItem({ id: 'invalid' }, store);
    expect(component.container.firstChild).toBe(null);
  });

  it('should render item', () => {
    const { getByText } = renderTodoItem({ id: 'test' }, store);
    expect(getByText('test content')).toBeInTheDocument();
  });

  it('should handleCheck', () => {
    const { container } = renderTodoItem({ id: 'test' }, store);
    const checkbox = container.querySelector('input[type=checkbox]');
    fireEvent.click(checkbox!);
    expect(store.getState().todoPage.entities['test'].status).toBe(
      TodoStatus.COMPLETED,
    );
  });

  it('should handleRemove', () => {
    const { container } = renderTodoItem({ id: 'test' }, store);
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(store.getState().todoPage.entities['test']).toBe(undefined);
  });

  it('should show form when double-clicking', () => {
    const { container, getByText } = renderTodoItem({ id: 'test' }, store);
    const content = getByText('test content');
    fireEvent.dblClick(content!);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should handle form submit', () => {
    const { container, getByText } = renderTodoItem({ id: 'test' }, store);
    const content = getByText('test content');
    fireEvent.dblClick(content!);
    const input = container.querySelector('input');
    const form = container.querySelector('form');
    const newValue = 'new content';
    fireEvent.change(input!, { target: { value: newValue } });
    fireEvent.submit(form!);
    expect(getByText(newValue)).toBeInTheDocument();
  });
});
