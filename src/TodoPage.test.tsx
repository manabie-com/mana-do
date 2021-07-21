import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {fireEvent} from '@testing-library/react';

import * as AppContext from './AppContext';
import * as ApiService from './service/api-frontend';
import * as actions from './store/actions';
import ToDoPage from "./ToDoPage";
import {TodoStatus} from "./models/todo";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))
  .mock('./features/footer/Footer', () => 'Footer')
  .mock('./features/todos/TodoList', () => 'TodoList')
  .mock('./Layout', () => 'Layout')

let container: any = null;
const mockDispatch = jest.fn();

beforeEach(() => {
  const mockContextValue = {
    state: {
      todos: []
    },
    dispatch: mockDispatch
  }
  jest
    .spyOn(AppContext, 'useAppContext')
    // @ts-ignore
    .mockImplementation(() => mockContextValue);

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('snapshot', () => {
  test('should return snapshot', () => {
    const tree = renderer.create(<ToDoPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('fetch todo list', () => {
  test('should fetch todo list success', async () => {
    const mockedTodos = [
      {
        id: 'hfuwyr',
        content: 'todo 1',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
      {
        id: 'orislaj',
        content: 'todo 2',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
    ]
    ApiService.default.getTodos = jest.fn().mockImplementation(() => Promise.resolve(mockedTodos));

    const setTodos = jest.spyOn(actions, 'setTodos');

    await act(async () => {
      render(<ToDoPage/>, container);
    });
    expect(setTodos).toHaveBeenCalledWith(mockedTodos);
  })

  test('should fetch todo list failed', async () => {
    const errorMessage = 'Fetch todos failed';
    ApiService.default.getTodos = jest.fn().mockImplementation(() => Promise.reject(errorMessage));

    await act(async () => {
      render(<ToDoPage/>, container);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FETCH_TODO_LIST_FAILURE'
    });
  })
})

describe('create todo list', () => {
  const setTodosValue = jest.fn();
  const mockedTodos = [
    {
      id: 'hfuwyr',
      content: 'todo 1',
      user_id: 'firstUser',
      status: TodoStatus.Active,
      created_date: ''
    },
    {
      id: 'orislaj',
      content: 'todo 2',
      user_id: 'firstUser',
      status: TodoStatus.Active,
      created_date: ''
    },
  ]
  const useStateMock = () => [mockedTodos, setTodosValue];

  // @ts-ignore
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create todo list success', async () => {
    const mockTodoCreated = {
      id: 'hljfiu',
      content: 'todo 3',
      user_id: 'firstUser',
      status: TodoStatus.Active,
      created_date: ''
    }
    const expectedTodos = [{...mockTodoCreated}, ...mockedTodos];
    ApiService.default.createTodo = jest.fn().mockImplementation(() => Promise.resolve(mockTodoCreated));

    const createTodo = jest.spyOn(actions, 'createTodo');

    await act(async () => {
      render(<ToDoPage/>, container);
      const inputTask = container.querySelector('[class="Todo__input"]');
      fireEvent.keyDown(inputTask, {key: 'Enter', code: 'Enter'})
    });

    expect(createTodo).toHaveBeenCalledWith(mockTodoCreated);
    expect(setTodosValue).toHaveBeenCalledWith(expectedTodos);
  })

  test('should create todo list failed', async () => {
    const responseError = {
      response: {
        status: 401
      }
    }
    ApiService.default.createTodo = jest.fn().mockImplementation(() => Promise.reject(responseError));

    await act(async () => {
      render(<ToDoPage/>, container);
      const inputTask = container.querySelector('[class="Todo__input"]');
      fireEvent.keyDown(inputTask, {key: 'Enter', code: 'Enter'})
    });
  //  TODO: expect history push to sign in page
  })
})
