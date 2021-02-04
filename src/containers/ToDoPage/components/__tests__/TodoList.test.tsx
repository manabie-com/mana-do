import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { configureAppStore } from 'store/configureStore';
import { createTodo } from 'containers/ToDoPage/thunks';
import { TodoList } from '../TodoList';

describe('<TodoList />', () => {
  it('should show empty message', () => {
    const { getByText } = render(<TodoList ids={[]} />);
    expect(getByText('Nothing to show')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const store = configureAppStore();
    const todo = { id: 1, content: 'test' };
    store.dispatch({ type: createTodo.fulfilled.type, payload: todo });
    const { container } = render(
      <Provider store={store}>
        <TodoList ids={[1]} />
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
