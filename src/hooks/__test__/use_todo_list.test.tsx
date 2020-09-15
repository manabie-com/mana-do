import React from 'react';
import { shallow } from 'enzyme';
import { renderHook } from "@testing-library/react-hooks";
import useTodoList from '../useTodoList';
import TodoAPI from '../../api-service/todo.service';
import { ITodo, ETodoStatus } from '../../types/todo';

jest.mock('../../api-service/todo.service');

const mockedTodoAPI = TodoAPI as jest.Mocked<typeof TodoAPI>;


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
    mockedTodoAPI.getList.mockResolvedValueOnce(todoListMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTodoList()
    );
    expect(result.current.list).toHaveLength(0);
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.loading).toBeFalsy();
  });

  it('Should add new todo into first todos', async () => {
    const newTodoMock = {...todoListMock[0], id: '2' };
    mockedTodoAPI.getList.mockResolvedValueOnce(todoListMock);
    mockedTodoAPI.create.mockResolvedValueOnce(newTodoMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTodoList()
    );
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.loading).toBeFalsy();
    result.current.createTodo('HIEU');
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(2);
  });

  it('Should edit new content', async () => {
    const updatedTodoMock = {...todoListMock[0], content: 'CHANGE' };
    mockedTodoAPI.getList.mockResolvedValueOnce(todoListMock);
    mockedTodoAPI.edit.mockResolvedValueOnce(updatedTodoMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTodoList()
    );
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.loading).toBeFalsy();
    result.current.updateTodo('1', 'CHANGE');
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.list).toEqual([updatedTodoMock]);
  });

  it('Should delete todo', async () => {
    mockedTodoAPI.getList.mockResolvedValueOnce(todoListMock);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTodoList()
    );
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(1);
    expect(result.current.loading).toBeFalsy();
    result.current.deleteTodo('1');
    await waitForNextUpdate();
    expect(result.current.list).toHaveLength(0);
    expect(result.current.list).toEqual([]);
  });

});

