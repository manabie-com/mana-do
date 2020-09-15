import React from 'react';
import { shallow } from 'enzyme';
import { renderHook } from "@testing-library/react-hooks";
import useTodoList from '../useTodoList';
import TodoAPI from '../../api-service/todo.service';
import { ITodo, ETodoStatus } from '../../types/todo';

jest.mock('../../api-service/todo.service');

const mockedTodoAPI = TodoAPI as jest.Mocked<typeof TodoAPI>;

function setup() {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useTodoList())
    return null
  }
  shallow(<TestComponent />)
  return returnVal
}

describe('Test useTodoList', () => {
  const todoListMock: ITodo[] = [
    {
      id: '1',
      content: 'content',
      created_date: new Date().toISOString(),
      status: ETodoStatus.ACTIVE,
      user_id: 'user'
    }
  ];
  it('Should fetch data when init', async () => {
    mockedTodoAPI.getList.mockResolvedValue(todoListMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTodoList()
    );
    expect(result.current.list).toHaveLength(0);
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.loading).toBeFalsy();
  });
});

