import React from 'react';
import { render } from '@testing-library/react';
import shortid from "shortid";

import { TodoStatus } from '../../../../models/todo';

import TodoToolbar from '../TodoToolbar';

describe("Toolbar Init", () => {
    it("render checkbox toggle all todo if todos is not empty", () => {
        const todos = [
            {
                content: "test 1",
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: "firstUser"
            }
        ];
        const { getByTestId } = render(<TodoToolbar todos={todos}/>);
        const toggleAllTodo = getByTestId("toggle__all__todo");
        expect(toggleAllTodo).toBeTruthy();
    });
});