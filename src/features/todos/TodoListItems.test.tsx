import React from 'react';
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import TodoListItems from "./TodoListItems";
import * as AppContext from "../../AppContext";
import {TodoStatus} from "../../models/todo";
import * as actions from "../../store/actions";
import {storeReducerStorage} from "../../utils/storeageUtils";


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
  useState: jest.fn(),
}))

const todoId = 'hfuwyr';

const mockedTodos = [
  {
    id: todoId,
    content: 'todo 1',
    user_id: 'firstUser',
    status: TodoStatus.All,
    created_date: ''
  },
  {
    id: 'orislaj',
    content: 'todo 2',
    user_id: 'firstUser',
    status: TodoStatus.All,
    created_date: ''
  },
  {
    id: 'jiwuro',
    content: 'todo 3',
    user_id: 'firstUser',
    status: TodoStatus.Active,
    created_date: ''
  },
  {
    id: 'iejals',
    content: 'todo 4',
    user_id: 'firstUser',
    status: TodoStatus.Active,
    created_date: ''
  },
  {
    id: 'jfuqos',
    content: 'todo 5',
    user_id: 'firstUser',
    status: TodoStatus.Completed,
    created_date: ''
  },
  {
    id: 'ahsyel',
    content: 'todo 6',
    user_id: 'firstUser',
    status: TodoStatus.Completed,
    created_date: ''
  },
];

beforeEach(() => {
  const mockContextValue = {
    state: {
      todos: mockedTodos,
    },
    dispatch: jest.fn()
  }

  jest
    .spyOn(AppContext, 'useAppContext')
    // @ts-ignore
    .mockImplementation(() => mockContextValue);
})

describe('snapshot', () => {
  test('should return snapshot', () => {
    const tree = renderer.create(<TodoListItems id={todoId}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('handle events', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  const mockClassListAddMethod = jest.fn();
  const setStateMock = jest.fn();
  const useStateMock = (initialValue: any) => [initialValue, setStateMock];
  const useRefMock = () => ({
    current: {
      classList: {
        add: mockClassListAddMethod
      }
    }
  });
  jest.spyOn(React, 'useRef').mockImplementation(useRefMock);
  // @ts-ignore
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  test('should update todo status after click on toggle all checkbox', () => {
    const updateTodoStatus = jest.spyOn(actions, 'updateTodoStatus');
    const event = {
      target: {
        checked: true
      }
    }
    const wrapper = shallow(<TodoListItems id={todoId}/>);
    const toggleCheckbox = wrapper.find({'data-testid': 'toggle-all'});
    const toggleCheckboxProps = toggleCheckbox.props();

    // handle on toggle
    toggleCheckboxProps.onChange(event, todoId);
    expect(updateTodoStatus).toHaveBeenCalledWith(todoId, event.target.checked)
  });

  test('should fade-out and delete a todo item by id', () => {
    jest.useFakeTimers();

    const deleteTodo = jest.spyOn(actions, 'deleteTodo');
    const wrapper = shallow(<TodoListItems id={todoId}/>);
    const deleteButton = wrapper.find({'data-testid': 'delete-all-todo-item'});
    const deleteButtonProps = deleteButton.props();

    // handle on click
    deleteButtonProps.onClick();

    jest.runAllTimers();

    expect(mockClassListAddMethod).toHaveBeenCalledWith('hidden');
    expect(deleteTodo).toHaveBeenCalledWith(todoId);
  });

  test('should update todo status live by Enter keyboard', () => {
    const event = {
      key: 'Enter',
      target: {
        value: 'todo item edited'
      }
    }

    const expectedTodos = [
      {
        id: todoId,
        content: event.target.value,
        user_id: 'firstUser',
        status: TodoStatus.All,
        created_date: ''
      },
      {
        id: 'orislaj',
        content: 'todo 2',
        user_id: 'firstUser',
        status: TodoStatus.All,
        created_date: ''
      },
      {
        id: 'jiwuro',
        content: 'todo 3',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
      {
        id: 'iejals',
        content: 'todo 4',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
      {
        id: 'jfuqos',
        content: 'todo 5',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
      {
        id: 'ahsyel',
        content: 'todo 6',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
    ]
    const updateTodoContent = jest.spyOn(actions, 'updateTodoContent');
    const wrapper = shallow(<TodoListItems id={todoId}/>);
    const inputEditTodoContent = wrapper.find({'data-testid': 'live-edit-todo-content'});
    const inputEditTodoContentProps = inputEditTodoContent.props();

    // handle on change
    inputEditTodoContentProps.onChange(event);
    expect(setStateMock).toHaveBeenCalledWith(expectedTodos);

    // handle on Enter keydown
    inputEditTodoContentProps.onKeyDown(event);
    expect(setStateMock).toHaveBeenCalledWith(expectedTodos);
    expect(updateTodoContent).toHaveBeenCalledWith(todoId, event.target.value);
  });

  test('should discard todo status live by Escape keyboard', () => {
    const event = {
      key: 'Escape',
      target: {
        value: 'todo item edited'
      }
    }

    const expectedTodos = [
      {
        id: todoId,
        content: event.target.value,
        user_id: 'firstUser',
        status: TodoStatus.All,
        created_date: ''
      },
      {
        id: 'orislaj',
        content: 'todo 2',
        user_id: 'firstUser',
        status: TodoStatus.All,
        created_date: ''
      },
      {
        id: 'jiwuro',
        content: 'todo 3',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
      {
        id: 'iejals',
        content: 'todo 4',
        user_id: 'firstUser',
        status: TodoStatus.Active,
        created_date: ''
      },
      {
        id: 'jfuqos',
        content: 'todo 5',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
      {
        id: 'ahsyel',
        content: 'todo 6',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
    ]
    const data = {
      todos: mockedTodos
    }
    // Handle Set local storage
    storeReducerStorage(data);
    const wrapper = shallow(<TodoListItems id={todoId}/>);
    const inputEditTodoContent = wrapper.find({'data-testid': 'live-edit-todo-content'});
    const inputEditTodoContentProps = inputEditTodoContent.props();

    // handle on change
    inputEditTodoContentProps.onChange(event);
    expect(setStateMock).toHaveBeenCalledWith(expectedTodos);

    // handle on Enter keydown
    inputEditTodoContentProps.onKeyDown(event);
    expect(setStateMock).toHaveBeenCalledWith(data.todos);
  });

  // TODO: discard todo status live by onblur
  // test('should discard todo status live by onblur', () => {
  //
  // });
})
