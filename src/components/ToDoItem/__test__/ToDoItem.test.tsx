import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ToDoItem, { ToDoItemProps } from "components/ToDoItem";
import { Todo, TodoStatus } from "models";
import userEvent from '@testing-library/user-event';

const mockupTodo: Todo = {
    id: 'qwerty',
    content: 'Hello world',
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
    user_id: 'firstUser'
}

const onUpdateTodoStatus = jest.fn();
const onDeleteTodo = jest.fn();
const onEnterEditTodo = jest.fn();

const props: ToDoItemProps = {
    todo: mockupTodo,
    onUpdateTodoStatus: onUpdateTodoStatus,
    onDeleteTodo: onDeleteTodo,
    onEnterEditTodo: onEnterEditTodo
}

describe("ToDoItem component", () => {
    describe("Whether all element needed in DOM original props", () => {
        beforeEach(() => {
            render(<ToDoItem {...props} />)
        });

        it("Initial Todo item with checkbox and it unchecked", () => {
            expect(screen.getByTestId(`todo-checkbox-${mockupTodo.id}`)).toBeInTheDocument();
            expect(screen.getByTestId(`todo-checkbox-${mockupTodo.id}`)).not.toBeChecked();
        });

        it("Initial Todo item with content, delete button, create date", () => {
            expect(screen.getByTestId(`todo-content-${mockupTodo.id}`)).toBeInTheDocument();
            expect(screen.getByTestId(`todo-delete-btn-${mockupTodo.id}`)).toBeInTheDocument();
            expect(screen.getByTestId(`todo-created-date-${mockupTodo.id}`)).toBeInTheDocument();
        });

        it("Initial Todo item without todo edit", () => {
            expect(screen.queryByTestId('todo-edit')).not.toBeInTheDocument();
        });
    });

    describe("Interact with elements original props", () => {
        beforeEach(() => {
            render(<ToDoItem {...props} />);
        });

        it("Render todo-item with todo status complete, should checkbox checked and content has class complete", () => {
            cleanup();
            const newTodoWithCompleteStatus = {...mockupTodo, status: TodoStatus.COMPLETED};
            const newProps = {...props, todo: newTodoWithCompleteStatus};
            render(<ToDoItem {...newProps} />);

            const checkboxEl = screen.getByTestId(`todo-checkbox-${mockupTodo.id}`);
            expect(checkboxEl).toBeChecked();

            const contentEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);
            expect(contentEl).toHaveClass('Todo__content completed');
        });

        it("Double click content, content disappear, edit input appear", () => {
            const contentEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);

            fireEvent.doubleClick(contentEl);
            expect(contentEl).not.toBeInTheDocument();

            const editInputEl = screen.getByTestId('todo-edit');
            expect(editInputEl).toBeInTheDocument();
        });

        it("At edit mode, blur edit input will back to origin", () => {
            const contentEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);

            fireEvent.doubleClick(contentEl);
            expect(contentEl).not.toBeInTheDocument();

            const editInputEl = screen.getByTestId('todo-edit');
            expect(editInputEl).toBeInTheDocument();

            editInputEl.blur();

            expect(editInputEl).not.toBeInTheDocument();

            const contentThenEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);
            expect(contentThenEl).toBeInTheDocument();
        });

        it("Turn to edit mode, input existing value like original content", () => {
            const contentEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);
            const content = contentEl.textContent;
            fireEvent.doubleClick(contentEl);
            
            const editInputEl = screen.getByTestId('todo-edit');
            expect(editInputEl).toHaveValue(content);
        });

        it("At edit mode, Enter edit, onEnterEditTodo should be call in one time with newInput and todoId", () => {
            const contentEl = screen.getByTestId(`todo-content-${mockupTodo.id}`);
            const newContent = 'Hello World 111';
            fireEvent.doubleClick(contentEl);
            
            const editInputEl = screen.getByTestId('todo-edit');
            fireEvent.change(editInputEl, {target: {value: newContent}});
            fireEvent.keyDown(editInputEl, {key: 'Enter', code: 'Enter', charCode: 13});

            expect(editInputEl).toHaveValue(newContent);

            expect(onEnterEditTodo).toBeCalled();
            expect(onEnterEditTodo).toBeCalledTimes(1);
            expect(onEnterEditTodo).toBeCalledWith(mockupTodo.id, newContent);
        });

        it("Click button delete todo, onDeleteTodo should be call one time with todoId", () => {
            const deleteEl = screen.getByTestId(`todo-delete-btn-${mockupTodo.id}`);
            fireEvent.click(deleteEl);
            
            expect(onDeleteTodo).toBeCalled();
            expect(onDeleteTodo).toBeCalledTimes(1);
            expect(onDeleteTodo).toBeCalledWith(mockupTodo.id);
        });
    });
});