import { Box } from "@mui/material"
import React from "react"
import { Todo } from "../../../models/todo"
import TodoItem from "../todo-item/todo-item"

interface ITodoListProps {
	todos: Todo[]
	updateStatus: (e: boolean, todoId: string) => void
	removeTodo: (todoId: string) => void
	updateTodo: (todoId: string, content: string) => void
}

const TodoList = (props: ITodoListProps) => {
	const { todos, updateStatus, removeTodo, updateTodo } = props

	return (
		<Box marginBottom='16px'>
			{todos.length > 0 ? (
				todos.map((todo) => {
					return (
						<TodoItem
							todo={todo}
							key={todo.id}
							data-testId={`todo_item`}
							updateStatus={updateStatus}
							removeTodo={removeTodo}
							updateTodo={updateTodo}
						/>
					)
				})
			) : (
				<Box textAlign='center'>No to-dos yet.</Box>
			)}
		</Box>
	)
}

export default TodoList
