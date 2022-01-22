import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import React from "react"
import ToDoPage from "../todo-page/todo-page"

describe("todo-page", () => {
	test("check the component have input", () => {
		const { getByTestId } = render(<ToDoPage />)
		const child = getByTestId("todos__input")

		expect(child).toBeInTheDocument()
	})

	test("check the component have your to-dos label", () => {
		const { getByText } = render(<ToDoPage />)
		const label = getByText("Your To-dos")

		expect(label).toBeInTheDocument()
	})
})
