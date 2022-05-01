import React, { useReducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import shortid from "shortid";

import { TodoStatus } from '../../../../models/todo';
import reducer, { initialState } from '../../../../store/reducer';
import { createTodo } from '../../../../store/actions';

import TodoList from '../TodoList';

describe("TodoList Init", () => {
    it("should return the initial state",  () => {
        expect(reducer(initialState, { type: "" })).toEqual(initialState);
    });

    it("create new todo", () => {
        const todo = {
            content: "test 1",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser"
        };
        
        expect(reducer(initialState, createTodo(todo))).toEqual({ todos: [todo] });
    });

    it("render todo list component if todos is not empty", () => {
        const todos = [
            {
                content: "test 1",
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: "firstUser"
            }
        ];
        const { getByTestId } = render(<TodoList todos={todos} showing="ALL" />);
        const todoItem = getByTestId("todo__item");
        expect(todoItem).toBeTruthy();
    });

    it("don't show todo list component if todos is empty", () => {
        const todos = [];
        const { getByTestId } = render(<TodoList todos={todos} showing="ALL" />);
        const noTodoMessage = getByTestId("no__todo__message");
        expect(noTodoMessage).toBeTruthy();
    });
});