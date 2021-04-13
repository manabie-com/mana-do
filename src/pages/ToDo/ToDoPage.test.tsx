import React, { useReducer } from 'react';
import { testSnapshots } from '../../utils/test';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen, getByTestId, act } from '@testing-library/react';
import reducer, { initialState } from '../../store/reducer';
import { TodoStatus } from '../../models/todo';
import TodoPage from './ToDoPage';
import Service from '../../service';
import ToDoPage from './ToDoPage';

describe('render To do page', () => {
  testSnapshots(TodoPage, [
    {
      props: {},
      description: 'render deafult'
    }
  ]);
});

describe('Test logic', () => {
  test('Create new todo', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { value: 'abc' } });
    const newTodo = {
      content: 'abc',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: '123',
      user_id: 'firstUser'
    };
    Service.createTodo = jest.fn().mockResolvedValue(newTodo);

    const { container } = render(<ToDoPage />);
    const input = getByTestId(container, 'input_create');
    act(async () => {
      const { result, waitForNextUpdate } = renderHook(() => useReducer(reducer, initialState));
      const [state, dispatch] = result.current;
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
      dispatch({ type: 'CREATE_TODO', payload: newTodo });
      await waitForNextUpdate();
      expect(state).toEqual({ todos: [newTodo] });
    });
  });
});
