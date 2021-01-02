import React, { useEffect, useRef, useState } from "react"
import { Todo } from "../../../models/todo"
import { isTodoCompleted } from "../../../utils"
import { toggleConfirmModal } from "../../shared/modal/ConfirmModal"

type TodoItemProps = {
	todo: Todo
	onUpdateTodoStatus: (
		e: React.ChangeEvent<HTMLInputElement>,
		todoId: string
	) => void
	onDeleteTodo: (todoId: string) => void
	onUpdateTodoContent: (content: string, todoId: string) => void
}
const TodoItem = (props: TodoItemProps) => {
	const { todo, onUpdateTodoStatus, onDeleteTodo, onUpdateTodoContent } = props
	const [edit, setEdit] = useState(false)
	const [newContentTodo, setNewContentTodo] = useState("")
	const todoIdInput = "toDoItemInput_" + todo.id
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setNewContentTodo(todo.content)
	}, [todo])

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
	}, [])

	const handleClickOutside = (event: any) => {
		if (
			inputRef &&
			inputRef.current &&
			!inputRef.current.contains(event.target)
		) {
			setEdit(false)
			setNewContentTodo(todo.content)
		}
	}

	const showInputEdit = () => {
		setEdit(true)
		setTimeout(() => document.getElementById(todoIdInput)?.focus())
	}

	return (
		<div className="ToDo__item">
			<input
				type="checkbox"
				checked={isTodoCompleted(todo)}
				onChange={(e) => onUpdateTodoStatus(e, todo.id)}
			/>
			{edit ? (
				<input
					ref={inputRef}
					id={todoIdInput}
					name="content"
					className="ToDo__item_input"
					value={newContentTodo}
					onChange={(e) => {
						setNewContentTodo(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onUpdateTodoContent(newContentTodo, todo.id)
							setEdit(false)
						}
					}}
				/>
			) : (
				<span
					onDoubleClick={(e) => {
						showInputEdit()
					}}
					onTouchEnd={(e) => {
						showInputEdit()
					}}
				>
					{todo.content}
				</span>
			)}
			<button
				className="Todo__delete"
				onClick={() => {
					toggleConfirmModal({
						open: true,
						title: "",
						content: `Are you sure you want to delete this todo? This cannot be undone`,
						titleButtonOk: "Remove",
						titleButtonNo: "Cancel",
						handleOk: async () => {
							onDeleteTodo(todo.id)
						},
						handleCancel: () => {},
					})
				}}
			>
				X
			</button>
		</div>
	)
}

export default TodoItem
