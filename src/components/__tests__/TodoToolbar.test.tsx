import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import { ToDoToolbar, TodoToolbarProps } from 'components';
import { TodoStatus } from 'models';

const props: TodoToolbarProps = {
    todoLength: 0,
    showing: 'ALL',
    onToggleAllTodo: jest.fn(),
    onSetShowing: jest.fn(),
    onDeleteAllTodo: jest.fn(),
}


describe("TodoToolbar component", () => {
    describe("Initstate with 0 todo", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("Toggle all should not appear", () => {
            expect(screen.queryByTestId('todo-toolbar-toggleall')).not.toBeInTheDocument();
        })

        it("Tab all is selected", () => {
            expect(screen.getByText('All')).toHaveClass('active');
        })
    })

    describe("Initstate with 3 todos", () => {
        afterEach(cleanup);
        beforeEach(() => {
            props.todoLength = 3
            render(<ToDoToolbar {...props} />);
        });

        it("Toggle all should appear with not checked", () => {
            expect(screen.queryByTestId('todo-toolbar-toggleall')).toBeInTheDocument();
            expect(screen.queryByTestId('todo-toolbar-toggleall')).not.toBeChecked();
        })
    })

    describe("Click Toggle All ", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("Should call onToggleAllTodo", () => {
            const todoToolbarToggleAll = screen.getByTestId('todo-toolbar-toggleall')
            fireEvent.click(todoToolbarToggleAll)

            expect(props.onToggleAllTodo).toHaveBeenCalledTimes(1)
            expect(props.onToggleAllTodo).toHaveBeenCalledWith(true)
        })
    })

    describe("Set showing", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("Set showing all todos when click all btn", () => {
            const allBtn:HTMLInputElement = screen.getByText('All')
            fireEvent.click(allBtn)

            expect(props.onSetShowing).toBeCalledTimes(1);
            expect(props.onSetShowing).toBeCalledWith(TodoStatus.ALL)
        })

        it("Set showing active todos when click active btn", () => {
            const activeBtn:HTMLInputElement = screen.getByText('Active')
            fireEvent.click(activeBtn)

            expect(props.onSetShowing).toBeCalledTimes(1);
            expect(props.onSetShowing).toBeCalledWith(TodoStatus.ACTIVE)
        })

        it("Set showing completed todos when click complete btn", () => {
            const completeBtn:HTMLInputElement = screen.getByText('Completed')
            fireEvent.click(completeBtn)

            expect(props.onSetShowing).toBeCalledTimes(1);
            expect(props.onSetShowing).toBeCalledWith(TodoStatus.COMPLETED)
        })
    })

    describe("Click delete all Todo", () => {
        afterEach(cleanup);
        beforeEach(() => {
            render(<ToDoToolbar {...props} />);
        });

        it("should call onDeleteAllTodo", () => {
            const deleteAllTodo:HTMLInputElement = screen.getByTestId('todo-toolbar-deleteall')
            fireEvent.click(deleteAllTodo)

            expect(props.onDeleteAllTodo).toHaveBeenCalledTimes(1)
        })
    })
})