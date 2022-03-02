import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import { TodoItem, TodoItemProps } from 'components';
import { TodoStatus } from 'models';

const props: TodoItemProps = {
    index: 0,
    todo: {
        id: "todo_id_1",
        user_id: "tql247",
        content: "A todo",
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
    },
    onUpdateTodoStatus: jest.fn(),
    onEditingTodo: jest.fn(),
    onDeleteTodo: jest.fn(),
}


describe("TodoItem component", () => {
    describe("Todo item with Active status", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<TodoItem {...props} />);
        });

        it("should not have checked checkbox", () => {
            expect(screen.queryByTestId('todo-item-checkbox')).not.toBeChecked();
        })

        it("should contain active color", () => {
            expect(screen.queryByTestId('todo-item')).toHaveClass('todo-color-active');
        })
    })

    describe("Todo item with Completed status", () => {
        afterEach(cleanup);
        beforeEach(() => {
            props.todo.status = TodoStatus.COMPLETED;
            render(<TodoItem {...props} />);
        });

        it("should have checked checkbox", () => {
            expect(screen.queryByTestId('todo-item-checkbox')).toBeChecked();
        })

        it("should contain complete color", () => {
            expect(screen.queryByTestId('todo-item')).toHaveClass('todo-color-complete');
        })
    })

    describe("Todo item when click checkbox", () => {
        afterEach(cleanup);
        beforeEach(() => {
            props.todo.status = TodoStatus.ACTIVE;
            render(<TodoItem {...props} />);
        });

        it("Fire update status handler", () => {
            const todoItemCheckBoxEle: HTMLInputElement = screen.getByTestId('todo-item-checkbox');
            fireEvent.click(todoItemCheckBoxEle);

            expect(props.onUpdateTodoStatus).toBeCalledTimes(1);
            expect(props.onUpdateTodoStatus).toBeCalledWith(true, props.todo.id);
        })
    })

    describe("Todo item double click to edit", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<TodoItem {...props} />);
        });

        it("should not editable from start", () => {
            expect(screen.queryByTestId('todo-item-content')).toHaveAttribute('readOnly');
        })

        it("should editable after double click", () => {
            const todoItemContentEle: HTMLInputElement = screen.getByTestId('todo-item-content');
            fireEvent.doubleClick(todoItemContentEle);
            fireEvent.change(todoItemContentEle, { target: { value: 'new content' } });

            expect(screen.queryByTestId('todo-item-content')).not.toHaveAttribute('readOnly');
            expect(props.onEditingTodo).toBeCalledTimes(1);
            expect(props.onEditingTodo).toBeCalledWith('new content', props.todo.id);
        })

        it("should not editable after blur", () => {
            const todoItemContentEle: HTMLInputElement = screen.getByTestId('todo-item-content');
            fireEvent.doubleClick(todoItemContentEle);
            fireEvent.blur(todoItemContentEle);
            expect(screen.queryByTestId('todo-item-content')).toHaveAttribute('readOnly');
        })
    })

    describe("Todo item when click delete", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<TodoItem {...props} />);
        });

        it("fire event when click on delete todo", () => {
            const todoItemDeleteBtn = screen.getByTestId('todo-item-delete')
            fireEvent.click(todoItemDeleteBtn);

            expect(props.onDeleteTodo).toBeCalledTimes(1);
            expect(props.onDeleteTodo).toBeCalledWith(props.todo.id);
        })
    })
})