import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ToDoPage } from '..';
import { configureAppStore } from 'store/configureStore';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { TodoStatus } from 'models/todo';

const history = createMemoryHistory();
const renderTodoPage = store =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <ToDoPage />
      </Router>
    </Provider>,
  );

describe('<ToDoPage />', () => {
  let component: ReturnType<typeof renderTodoPage>;
  let store: ReturnType<typeof configureAppStore>;

  beforeEach(() => {
    localStorage.setItem('token', 'test');
    store = configureAppStore();
    component = renderTodoPage(store);
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });

  it('should handle filter button click', () => {
    const button = component.getByText('Show active');
    fireEvent.click(button);
    expect(store.getState().todoPage.filter).toBe(TodoStatus.ACTIVE);
  });

  it('should redirect to login page', () => {
    localStorage.clear();
    component.unmount();
    component = renderTodoPage(store);
    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});
