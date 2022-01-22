import { Box, Grid, TextField, Typography } from "@mui/material"
import React, { useEffect, useReducer, useRef, useState } from "react"
import { TodoStatus } from "../../models/todo"
import Service from "../../service"
import {
	createTodo,
	deleteAllTodos,
	deleteTodo,
	setTodos,
	toggleAllTodos,
	updateTodoContent,
	updateTodoStatus,
} from "../../store/actions"
import reducer, { initialState } from "../../store/reducer"
import { isTodoCompleted } from "../../utils"
import TodoActions from "./todo-action/todo-action"
import TodoList from "./todo-list/todo-list"

type EnhanceTodoStatus = TodoStatus | "ALL"

const ToDoPage = () => {
	const [{ todos }, dispatch] = useReducer(reducer, initialState)
	const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		;(async () => {
			const resp = await Service.getTodos()

			dispatch(setTodos(resp || []))
		})()
	}, [])

	const onCreateTodo = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputRef.current && inputRef.current.value) {
			const resp = await Service.createTodo(inputRef.current.value)
			dispatch(createTodo(resp))
			inputRef.current.value = ""
		}
	}

	const onUpdateTodoStatus = async (check: boolean, todoId: string) => {
		await Service.toggleTodo(todoId, check)
		dispatch(updateTodoStatus(todoId, check))
	}

	const onToggleAllTodo = async (check: boolean) => {
		await Service.toggleAll(check)
		dispatch(toggleAllTodos(check))
	}

	const onDeleteAllTodo = async () => {
		await Service.deleteTodoAll()
		dispatch(deleteAllTodos())
	}

	const onRemoveTodo = async (todoId: string) => {
		await Service.deleteTodo(todoId)
		dispatch(deleteTodo(todoId))
	}

	const onUpdateTodoContent = async (todoId: string, content: string) => {
		await Service.updateTodoContent(todoId, content)
		dispatch(updateTodoContent(todoId, content))
	}

	const onChangeShowing = (status: EnhanceTodoStatus) => {
		if (status === showing) return
		setShowing(status)
	}

	const activeTodos = todos.reduce(function (accum, todo) {
		return isTodoCompleted(todo) ? accum : accum + 1
	}, 0)

	const showTodos = todos.filter((todo) => {
		switch (showing) {
			case TodoStatus.ACTIVE:
				return todo.status === TodoStatus.ACTIVE
			case TodoStatus.COMPLETED:
				return todo.status === TodoStatus.COMPLETED
			default:
				return true
		}
	})

	return (
		<Grid container justifyContent='center' alignItems='center' marginTop='56px'>
			<Grid item xs={6}>
				<Box padding='24px' borderRadius='4px' border='1px solid #50a6d9'>
					<Box paddingBottom='16px'>
						<TextField
							fullWidth
							inputRef={inputRef}
							className='mb-4'
							placeholder='What need to be done?'
							onKeyDown={onCreateTodo}
							data-testid='todos__input'
						/>
					</Box>

					<Typography variant='h6' color='text.secondary'>
						Your To-dos
					</Typography>

					<TodoList
						todos={showTodos}
						updateStatus={onUpdateTodoStatus}
						removeTodo={onRemoveTodo}
						updateTodo={onUpdateTodoContent}
					/>

					<TodoActions
						isShowCheckBox={todos.length > 0}
						showing={showing}
						toggleAllTodo={onToggleAllTodo}
						deleteAllTodo={onDeleteAllTodo}
						changeShowing={onChangeShowing}
						activeTodos={activeTodos === 0}
					/>
				</Box>
			</Grid>
		</Grid>
	)
}

export default ToDoPage
