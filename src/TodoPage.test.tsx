import { fireEvent, render, screen } from "@testing-library/react"
import React from 'react'
import ToDoPage from "./ToDoPage"


describe('AddInput', () => {
    it('should be able to type in input', () => {
        render(<ToDoPage />)

        const inputEle = screen.getByLabelText(/add-input/i) as HTMLInputElement;
        fireEvent.change(inputEle, { target: { value: "Test content" } })

        expect(inputEle.value).toBe("Test content")
    })
})