import React from "react";
// import '@testing-library/jest-dom/extend-expect' fixed error toBeInTheDocument() is not a function
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from "@testing-library/react";
import ToDoInput, { ToDoInputProps } from "components/ToDoInput";

const onCreateTodo = jest.fn();

const props: ToDoInputProps = {
    onCreateTodo: onCreateTodo
}

describe("ToDoInput component", () => {
    describe("Check all needed element in DOM", () => {
        beforeEach(() => {
            render(<ToDoInput {...props}/>);
        });

        it("Render component without crash", () => {
            expect(screen.getByTestId('todo-input')).toBeInTheDocument();
        });
    
        it("Initial input value is empty", () => {
            expect(screen.getByTestId('todo-input')).toHaveTextContent('');
        });

        it("Initial input with placeholder", () => {
            expect(screen.getByPlaceholderText(/What need to be done?/i)).toBeInTheDocument();
        });
    });

    describe("Testing function element", () => {
        const inputText = 'hello input';

        beforeEach(() => {
            render(<ToDoInput {...props}/>);
        });

        it("Enter input, input should be empty", async () => {
            const inputEl: HTMLInputElement = screen.getByTestId('todo-input');
    
            fireEvent.change(inputEl, {target: {value: inputText}})
            expect(inputEl.value).toBe(inputText);
            
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(inputEl.value).toBe('');
        });
        
        it("Enter input without value input, onCreateTodo should not call", async () => {
            const inputEl: HTMLInputElement = screen.getByTestId('todo-input');
            
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(onCreateTodo).not.toBeCalled();
        });
        
        it("Enter input with value input, onCreateTodo should call and call one time", async () => {
            const inputEl: HTMLInputElement = screen.getByTestId('todo-input');

            fireEvent.change(inputEl, {target: {value: inputText}})
            expect(inputEl.value).toBe(inputText);
            
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(onCreateTodo).toBeCalled();
            expect(onCreateTodo).toBeCalledTimes(1);
        });
    });

});