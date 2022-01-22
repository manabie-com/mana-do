import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import React from "react"
import shortid from "shortid"
import { Todo, TodoStatus } from "../../models/todo"
import TodoList from "../todo-page/todo-list/todo-list"

const todos = [
	{
		content: "todo_1",
		created_date: new Date().toISOString(),
		status: TodoStatus.ACTIVE,
		id: shortid(),
		user_id: "firstUser",
	} as Todo,
	{
		content: "todo_2",
		created_date: new Date().toISOString(),
		status: TodoStatus.ACTIVE,
		id: shortid(),
		user_id: "firstUser",
	} as Todo,
	{
		content: "todo_3",
		created_date: new Date().toISOString(),
		status: TodoStatus.ACTIVE,
		id: shortid(),
		user_id: "firstUser",
	} as Todo,
]

describe("todo-list", () => {
	test("render enough items", async () => {
		const { findAllByRole } = render(
			<TodoList todos={todos} updateStatus={() => {}} removeTodo={() => {}} updateTodo={() => {}} />
		)
		const buttons = await findAllByRole("button")

		expect(buttons).toHaveLength(3)
	})
})
