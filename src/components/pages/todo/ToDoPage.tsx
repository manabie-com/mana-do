import React, { useEffect, useReducer, useRef, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import reducer, { initialState } from "../../../store/reducer"
import {
	setTodos,
	createTodo,
	deleteTodo,
	toggleAllTodos,
	deleteAllTodos,
	updateTodoStatus,
	updateTodoContent,
} from "../../../store/actions"
import Service from "../../../service"
import { Todo, TodoStatus } from "../../../models/todo"
import { isTodoCompleted } from "../../../utils"
import { ROUTE_PATHS } from "../../../constants/url-config"
import TodoItem from "./TodoItem"
import { LocalConstants } from "../../../constants/local"
import { toggleConfirmModal } from "../../shared/modal/ConfirmModal"

type EnhanceTodoStatus = TodoStatus | "ALL"

const ToDoPage = ({ history }: RouteComponentProps) => {
	const [{ todos }, dispatch] = useReducer(reducer, initialState)
	const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		;(async () => {
			const resp = await Service.getTodos()

			dispatch(setTodos(resp || []))
		})()
	}, [])

	useEffect(() => {
		localStorage.setItem(LocalConstants.Todos, JSON.stringify(todos))
	}, [todos])

	const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputRef.current) {
			try {
				const resp = await Service.createTodo(inputRef.current.value)
				dispatch(createTodo(resp))
				inputRef.current.value = ""
			} catch (e) {
				if (e.response.status === 401) {
					history.push(ROUTE_PATHS.SignIn)
				}
			}
		}
	}

	const onUpdateTodoStatus = (
		e: React.ChangeEvent<HTMLInputElement>,
		todoId: string
	) => {
		dispatch(updateTodoStatus(todoId, e.target.checked))
	}

	const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleAllTodos(e.target.checked))
	}

	const onUpdateTodoContent = (content: string, todoId: string) => {
		dispatch(updateTodoContent(todoId, content))
	}

	const onDeleteTodo = (todoId: string) => {
		dispatch(deleteTodo(todoId))
	}

	const onDeleteAllTodo = () => {
		dispatch(deleteAllTodos())
	}

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

	const activeTodos = todos.reduce(function (accum, todo) {
		return isTodoCompleted(todo) ? accum : accum + 1
	}, 0)

	return (
		<div className="ToDo__container">
			<div className="Todo__creation">
				<input
					ref={inputRef}
					className="Todo__input"
					placeholder="What need to be done?"
					onKeyDown={onCreateTodo}
				/>
			</div>
			<div className="ToDo__list">
				{showTodos.map((todo) => {
					return (
						<TodoItem
							key={todo.id}
							todo={todo}
							onUpdateTodoStatus={onUpdateTodoStatus}
							onDeleteTodo={onDeleteTodo}
							onUpdateTodoContent={onUpdateTodoContent}
						/>
					)
				})}
			</div>
			<div className="Todo__toolbar">
				{todos.length > 0 ? (
					<input
						data-testid="checkboxAll"
						type="checkbox"
						checked={activeTodos === 0}
						onChange={onToggleAllTodo}
					/>
				) : (
					<div />
				)}
				<div className="Todo__tabs">
					<button
						data-testid="btnShowAll"
						className={"Action__btn" + (showing === "ALL" ? " Active_btn" : "")}
						onClick={() => setShowing("ALL")}
					>
						All
					</button>
					<button
						data-testid="btnShowActive"
						className={
							"Action__btn" +
							(showing === TodoStatus.ACTIVE ? " Active_btn" : "")
						}
						onClick={() => setShowing(TodoStatus.ACTIVE)}
					>
						Active
					</button>
					<button
						data-testid="btnShowComplete"
						className={
							"Action__btn" +
							(showing === TodoStatus.COMPLETED ? " Active_btn" : "")
						}
						onClick={() => setShowing(TodoStatus.COMPLETED)}
					>
						Completed
					</button>
				</div>
				<div>
					<button
						data-testid="btnClearAll"
						className="Action__btn Clear_btn"
						onClick={() => {
							if (todos.length)
								toggleConfirmModal({
									open: true,
									title: "",
									content: `Are you sure you want to delete all todos? This cannot be undone`,
									titleButtonOk: "Remove",
									titleButtonNo: "Cancel",
									handleOk: async () => {
										onDeleteAllTodo()
									},
									handleCancel: () => {},
								})
						}}
					>
						Clear all todos
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToDoPage
