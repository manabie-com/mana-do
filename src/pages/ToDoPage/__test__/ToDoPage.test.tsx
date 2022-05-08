import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from "@testing-library/react";
import { Todo, TodoStatus } from "models";
import ToDoPage from "pages/ToDoPage";
const mockupTodos: Todo[] = ['1222321', '24412311', '11231231'].map(e => {
    return {
        id: e,
        user_id: 'firstUser',
        content : 'Hello world ' + e,
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
    }
});

jest.mock('service', () => {
    const {TodoStatus} = require('models');

    return {
        getTodos: async () => Promise.resolve(mockupTodos),
        saveTodos: (todos: Todo[]) => {
            return Promise.resolve('save success')
        },
        createTodo : (content: string) => Promise.resolve({
            id: 'newTodoId-11',
            user_id: 'firstUser',
            content: content,
            status: TodoStatus.ACTIVE,
            created_date: new Date().toISOString()
        })
    };
});

describe("ToDoPage components", () => {
    it("3 todo items should be render, toggle all should be appear and button clear all should be enabled", async () => {
        const todoItemsEl = await screen.findAllByTestId('todo-item');
        expect(todoItemsEl).toHaveLength(3);

        expect(screen.getByTestId('todo-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('todo-delete-all-btn')).toBeEnabled();
    });

    beforeEach(async () => {
        render(<ToDoPage />);
        
        const todoItemsEl = await screen.findAllByTestId('todo-item');
        expect(todoItemsEl).toHaveLength(3);
    });

    describe("Interact with input component", () => {
        it("Enter newContent, todos should render additional todo with new content, total todos is 4", async () => {
            const newContent = 'Hello world new content';
            const inputEl = screen.getByTestId('todo-input');
            
            fireEvent.change(inputEl, {target:{value: newContent}});
            expect(inputEl).toHaveValue(newContent);
            
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(inputEl).toHaveValue('');
    
            expect(await screen.findByText(newContent)).toBeInTheDocument();
            
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(4);
        });
    
        it("Focus input, enter without value, todos should not add item", async () => {
            const inputEl = screen.getByTestId('todo-input');
            
            fireEvent.change(inputEl, {target:{value: 'newContent'}});
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
    
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(3);
        });
    });

    describe("Interact with todo item component", () => {
        it("Edit one todo, todos should be render with new content and still 3 todos", async () => {
            const newContent = 'Hello world edited content';
            const todoEdit = mockupTodos[1];
            const contentEditId = `todo-content-${todoEdit.id}`
            const contentEditEl = screen.getByTestId(contentEditId);
            
            fireEvent.doubleClick(contentEditEl);
            const editInputEl = screen.getByTestId(`todo-edit`);
            expect(editInputEl).toHaveValue(todoEdit.content);
    
            fireEvent.change(editInputEl, {target: {value: todoEdit.content + newContent}});
            fireEvent.keyDown(editInputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(3);
    
            expect(await screen.findByText(todoEdit.content + newContent)).toBeInTheDocument();
        });
    
        it("Check todo to completed, still 3 todos but remain todo left should be subtract 1", async () => {
            const todoEdit = mockupTodos[1];
            const checkboxId = `todo-checkbox-${todoEdit.id}`
            const checkboxEl = screen.getByTestId(checkboxId);
            
            fireEvent.click(checkboxEl);
    
            const remainText = `${mockupTodos.length - 1} items left`;
            expect(await screen.findByTestId('todo-remain')).toHaveTextContent(remainText);
        });
    
        it("When all todos are checked, toggle should be checked", async () => {
            mockupTodos.forEach((todo) => {
                const checkboxId = `todo-checkbox-${todo.id}`;
                const checkboxEl = screen.getByTestId(checkboxId);
                
                fireEvent.click(checkboxEl);
                expect(checkboxEl).toBeChecked();
            });
    
            const toggleEl = screen.getByTestId('todo-toggle');
            expect(toggleEl).toBeChecked();
        });
    });

    describe("Interact with Toolbar component", () => {
        it("Toggle all, all todos should be checked, remain = 0", async () => {
            const toggleEl = screen.getByTestId('todo-toggle');
            fireEvent.click(toggleEl);
    
            expect(await screen.findByTestId('todo-toggle')).toBeChecked();
    
            const remainText = `0 item left`;
            expect(await screen.findByTestId('todo-remain')).toHaveTextContent(remainText);
    
            mockupTodos.forEach((todo) => {
                const checkboxId = `todo-checkbox-${todo.id}`;
                const checkboxEl = screen.getByTestId(checkboxId);
                
                expect(checkboxEl).toBeChecked();
            });
        });
    
        it("Delete todo active, confirm dialog -> ok, todo should be remove", async () => {
            window.confirm = jest.fn(() => true);
            const todoEdit = mockupTodos[1];
            const deleteBtnEditId = `todo-delete-btn-${todoEdit.id}`
            const deleteBtnEditEl = screen.getByTestId(deleteBtnEditId);
            
            fireEvent.click(deleteBtnEditEl);
    
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(2);
        });
    
        it("Delete todo active, confirm dialog -> cancel, todo should not be remove", async () => {
            window.confirm = jest.fn(() => false)
            const todoEdit = mockupTodos[1];
            const deleteBtnEditId = `todo-delete-btn-${todoEdit.id}`
            const deleteBtnEditEl = screen.getByTestId(deleteBtnEditId);
            
            fireEvent.click(deleteBtnEditEl);
    
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(3);
        });
    
        it("Delete todo completed, no confirm dialog, todo should be remove", async () => {
            const todoEdit = mockupTodos[1];
            const deleteBtnEditId = `todo-delete-btn-${todoEdit.id}`
            const deleteBtnEditEl = screen.getByTestId(deleteBtnEditId);
    
            const checkboxId = `todo-checkbox-${todoEdit.id}`
            const checkboxEl = screen.getByTestId(checkboxId);
            
            fireEvent.click(checkboxEl);
            expect(checkboxEl).toBeChecked();
            
            fireEvent.click(deleteBtnEditEl);
    
            const todoItemsElThen = await screen.findAllByTestId('todo-item');
            expect(todoItemsElThen).toHaveLength(2);
        });
    
        it("Click Clear all button, still remain todo active, show confirm, ok, all todo should be remove", async () => {
            window.confirm = jest.fn(() => true);
    
            const deleteBtnEditEl = screen.getByTestId('todo-delete-all-btn');
            fireEvent.click(deleteBtnEditEl);
    
            const emptyMsgEl = await screen.findByTestId('todo-empty-msg');
            expect(emptyMsgEl).toBeInTheDocument();
        });
    
        it("Click Clear all button, all todo is completed, not show confirm, all todo should be remove", async () => {
            const toggleEl = screen.getByTestId('todo-toggle');
            fireEvent.click(toggleEl);
    
            expect(await screen.findByTestId('todo-toggle')).toBeChecked();
    
            const deleteBtnEditEl = screen.getByTestId('todo-delete-all-btn');
            fireEvent.click(deleteBtnEditEl);
    
            const emptyMsgEl = await screen.findByTestId('todo-empty-msg');
            expect(emptyMsgEl).toBeInTheDocument();
        });

        it("Complete a todo item, select button active, it should not be there and select complete button, it should be there", async () => {
            const todoEdit = mockupTodos[1];
            const checkboxId = `todo-checkbox-${todoEdit.id}`
            const checkboxEl = screen.getByTestId(checkboxId);
            
            fireEvent.click(checkboxEl);
    
            const remainText = `${mockupTodos.length - 1} items left`;
            expect(await screen.findByTestId('todo-remain')).toHaveTextContent(remainText);

            const activeBtnEl = screen.getByRole('button', {name: 'Active'});
            fireEvent.click(activeBtnEl);
        
            expect(await screen.queryByText(todoEdit.content)).toBeNull();

            const completedBtnEl = screen.getByRole('button', {name: 'Completed'});
            fireEvent.click(completedBtnEl);

            expect(await screen.queryByText(todoEdit.content)).toBeInTheDocument();
        });

        it("When todos is empty, button clear all should be disabled", async () => {
            window.confirm = jest.fn(() => true);

            fireEvent.click(screen.getByTestId('todo-delete-all-btn'));
    
            expect(await screen.findByTestId('todo-empty-msg')).toBeInTheDocument();

            expect(screen.getByTestId('todo-delete-all-btn')).toBeDisabled();
        });
    });
});