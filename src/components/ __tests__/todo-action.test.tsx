import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import React from "react"
import TodoActions from "../todo-page/todo-action/todo-action"

describe("todo-action", () => {
	test("check the component have four buttons", async () => {
		const { findAllByRole } = render(
			<TodoActions
				isShowCheckBox={true}
				activeTodos={true}
				showing='ALL'
				toggleAllTodo={() => {}}
				deleteAllTodo={() => {}}
				changeShowing={() => {}}
			/>
		)
		const buttons = await findAllByRole("button")

		expect(buttons).toHaveLength(4)
	})
})
