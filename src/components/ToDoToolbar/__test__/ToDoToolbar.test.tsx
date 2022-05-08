import React from "react";
import '@testing-library/jest-dom/extend-expect';
import ToDoToolbar, {ToDoToolbarProps} from 'components/ToDoToolbar/ToDoToolbar';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Todo, TodoStatus } from 'models';

const mockupTodos: Todo[] = ['12221', '24411', '11231'].map(e => {
    return {
        id: e,
        user_id: 'firstUser',
        content : 'Hello world ' + e,
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
    }
});

const onToggleAllTodo = jest.fn();
const setShowing = jest.fn();
const onDeleteAllTodo = jest.fn();

const props: ToDoToolbarProps = {
    todos: mockupTodos,
    showing: 'ALL',
    remainTodos: mockupTodos.length,
    onToggleAllTodo: onToggleAllTodo,
    setShowing: setShowing,
    onDeleteAllTodo: onDeleteAllTodo
}

describe("ToDoToolbar component", () => {
    describe("Whether all element needed in DOM original props", () => {
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("Initial with 4 buttons, checkbox, remain text", () => {
            const buttonsEl = screen.getAllByRole('button');

            expect(buttonsEl).toHaveLength(4);
            expect(screen.getByTestId('todo-toggle')).toBeInTheDocument();
            expect(screen.getByTestId('todo-remain')).toBeInTheDocument();
        });

        it("With total remain equal total todos, toggle checkbox should be unchecked", () => {
            expect(screen.getByTestId('todo-toggle')).not.toBeChecked();
        });

        it("Initial with button ALL is selected", () => {
            const allBtnEl = screen.getByRole('button', {name: 'All'});
            
            expect(allBtnEl).toHaveClass('Action__btn active');
        });

        it("Remain element should render number equal remainTodos props", () => {
            const remainEl = screen.getByTestId('todo-remain');
            
            expect(remainEl).toHaveTextContent(props.remainTodos + ' items left');
        });

        it("Button clear all should disabled when has no todos", () => {
            cleanup();
            const newProps = {...props, todos: []};
            render(<ToDoToolbar {...newProps} />);

            const deleteAllBtnEl = screen.getByTestId('todo-delete-all-btn');
            expect(deleteAllBtnEl).toBeDisabled();
        });
    });

    describe("Interact with elements original props", () => {
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("When todos is empty, toggle is hidden", () => {
            cleanup();
            const newProps = {...props, todos: []};
            render(<ToDoToolbar {...newProps} />);

            expect(screen.queryByTestId('todo-toggle')).toBeNull();
        });

        it("When all todos is complete, toggle is checked", () => {
            cleanup();
            const newTodos = mockupTodos.map(todo => {
                return {
                    ...todo,
                    status: TodoStatus.COMPLETED
                };
            });
            const newProps = {...props, todos: newTodos};
            render(<ToDoToolbar {...newProps} />);

            const toggleEl = screen.getByTestId('todo-toggle');
            expect(toggleEl).toBeInTheDocument();
            expect(toggleEl).toBeChecked();
        });

        it("onToggleAllTodo will be call one time when toggle", () => {
            const toggleEl = screen.getByTestId('todo-toggle');
            fireEvent.click(toggleEl);

            expect(onToggleAllTodo).toBeCalled();
            expect(onToggleAllTodo).toBeCalledTimes(1);
        });

        it("When props showing is COMPLETED, button completed is active, so do active button", () => {
            cleanup();
            const newProps = {...props, showing: TodoStatus.COMPLETED};
            render(<ToDoToolbar {...newProps} />);

            const completedBtnEl = screen.getByRole('button', {name: 'Completed'});
            expect(completedBtnEl).toHaveClass('Action__btn active');

            cleanup();
            const newProps1 = {...props, showing: TodoStatus.ACTIVE};
            render(<ToDoToolbar {...newProps1} />);

            const completedBtnEl1 = screen.getByRole('button', {name: 'Active'});
            expect(completedBtnEl1).toHaveClass('Action__btn active');
        });

        it("When select showing by button, setShowing should call one time with that status", () => {
            const completedBtnEl = screen.getByRole('button', {name: 'Completed'});
            fireEvent.click(completedBtnEl);

            expect(setShowing).toBeCalled();
            expect(setShowing).toBeCalledTimes(1);
            expect(setShowing).toBeCalledWith(TodoStatus.COMPLETED);
        });

        it("Click button delete all, onDeleteAllTodo should call one time", () => {
            const deleteAllBtnEl = screen.getByTestId('todo-delete-all-btn');
            fireEvent.click(deleteAllBtnEl);

            expect(onDeleteAllTodo).toBeCalled();
            expect(onDeleteAllTodo).toBeCalledTimes(1);
        });

    });
});