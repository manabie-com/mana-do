import { cleanup } from '@testing-library/react';
import React from 'react';
import { filterTodoWithStatus, isTodoActive, isTodoCompleted } from '..';
import { Constants } from '../../constants';
import { TodoStatus } from '../../models/todo';

const getMockTodo = (
    data = {
      id: "todo",
      user_id: "user_id",
      content: "content",
      status: TodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
    }
  ) => data;

describe("Utils", () => {
    afterEach(cleanup);

    it("isTodoCompleted", () => {
        const mockTodo = getMockTodo();

        expect(isTodoCompleted(mockTodo)).toEqual(false);

        mockTodo.status = TodoStatus.COMPLETED;

        expect(isTodoCompleted(mockTodo)).toEqual(true);
    });

    it("isTodoActive", () => {
        const mockTodo = getMockTodo();

        expect(isTodoActive(mockTodo)).toEqual(true);

        mockTodo.status = TodoStatus.COMPLETED;

        expect(isTodoActive(mockTodo)).toEqual(false);
    });

    it("filterTodoWithStatus", () => {
        const mockTodo = getMockTodo();

        expect(filterTodoWithStatus(mockTodo, Constants.ALL)).toEqual(true);

        expect(filterTodoWithStatus(mockTodo, TodoStatus.ACTIVE)).toEqual(true);

        expect(filterTodoWithStatus(mockTodo, TodoStatus.COMPLETED)).toEqual(false);
    })
})