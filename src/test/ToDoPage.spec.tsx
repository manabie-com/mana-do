import {
    fireEvent,
    render,
    getByLabelText,
    queryByTestId,
    getByText,
    getByTestId,
    findByTestId,
    findByText
} from '@testing-library/react';
import ToDoPage from "../ToDoPage";
import React from "react";
import '@testing-library/jest-dom'

jest.mock("../service",() => {
    const {TodoStatus} = require("../models/todo")
    // const shortid = require("shortid")
    return {
        createTodo: (content: string) => {
            return {
                content: content,
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: "id",
                user_id: "firstUser",
            }
        }
    }
});

describe('ToDo', () => {

    it('should add ToDo when enter text in input field', async () => {
        const { container } = render(<ToDoPage />)
        expect(queryByTestId(container, "todoItem0")).not.toBeInTheDocument()
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(await findByText(container,'first Todo')).toBeInTheDocument()
    })

    it('should delete single ToDo when click delete button', async () => {
        const { container } = render(<ToDoPage />)
        expect(queryByTestId(container, "todoItem0")).not.toBeInTheDocument()
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(await findByText(container,'first Todo')).toBeInTheDocument()
        const deleteBtn = getByTestId(container, 'todoDelete0')
        fireEvent.click(deleteBtn)
        expect(queryByTestId(container,"todoItem0")).not.toBeInTheDocument()
    })

    it('should change ToDo status when click checkbox', async () => {
        const { container } = render(<ToDoPage />)
        expect(queryByTestId(container, "todoItem0")).not.toBeInTheDocument()
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(await findByText(container,'first Todo')).toBeInTheDocument()
        const checkbox = getByTestId(container,'todoStatus0')
        expect(checkbox.checked).toEqual(false)
        fireEvent.click(checkbox)
        expect(checkbox.checked).toEqual(true)
    })

    it('should change Todo content when double click on Todo and edit the input then press enter', async() => {
        const { container } = render(<ToDoPage />)
        expect(queryByTestId(container, "todoItem0")).not.toBeInTheDocument()
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(await findByText(container,'first Todo')).toBeInTheDocument()
        const todoContent = getByTestId(container, "todoContent0")
        fireEvent.doubleClick(todoContent)
        expect(getByTestId(container, "todoEdit0")).toBeInTheDocument()
        const editTodo = getByTestId(container, "todoEdit0")
        fireEvent.change(editTodo,{target: {value: 'edited first Todo'}})
        fireEvent.keyDown(editTodo, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(getByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(getByText(container,'edited first Todo')).toBeInTheDocument()
    })

    it('should show all ToDo when click All button, show only active ToDo when click Active button, show only Completed ToDo when click Completed button', async () => {
        const { container } = render(<ToDoPage />)
        expect(queryByTestId(container, "todoItem0")).not.toBeInTheDocument()
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem0")).toBeInTheDocument()
        expect(await findByText(container,'first Todo')).toBeInTheDocument()
        const checkbox = getByTestId(container,'todoStatus0')
        expect(checkbox.checked).toEqual(false)
        fireEvent.click(checkbox)
        expect(checkbox.checked).toEqual(true)
        fireEvent.change(input,{target: {value: 'second Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(await findByTestId(container,"todoItem1")).toBeInTheDocument()
        expect(await findByText(container,'second Todo')).toBeInTheDocument()
        const showAllBtn = getByTestId(container,'showAll')
        const showActiveBtn = getByTestId(container,'showActive')
        const showCompletedBtn = getByTestId(container,'showCompleted')
        fireEvent.click(showActiveBtn)
        expect(queryByTestId(container,"todoItem0")).not.toBeInTheDocument()
        expect(queryByTestId(container,"todoItem1")).toBeInTheDocument()
        fireEvent.click(showCompletedBtn)
        expect(queryByTestId(container,"todoItem1")).not.toBeInTheDocument()
        expect(queryByTestId(container,"todoItem0")).toBeInTheDocument()
        fireEvent.click(showAllBtn)
        expect(queryByTestId(container,"todoItem1")).toBeInTheDocument()
        expect(queryByTestId(container,"todoItem0")).toBeInTheDocument()
    })

    const getItem = jest.spyOn(Storage.prototype, 'getItem')
    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    it('should get todo list when render', () => {
        const { container } = render(<ToDoPage />)
        expect(getItem).toHaveBeenCalledWith("todos")
        expect(setItem).toHaveBeenCalledWith("todos", JSON.stringify([]))
        const input = getByLabelText(container,'addTodo')
        fireEvent.change(input,{target: {value: 'first Todo'}})
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(setItem).toHaveBeenCalledWith("todos", JSON.stringify([]))
    })
})
