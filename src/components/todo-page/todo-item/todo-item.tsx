import { HighlightOffTwoTone } from "@mui/icons-material"
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useEffect, useRef, useState } from "react"
import { Todo } from "../../../models/todo"
import { isTodoCompleted } from "../../../utils"

const useStyles = makeStyles({
	listItem: {
		paddingLeft: 0,
		fontSize: "16px",
		"& .MuiListItemButton-root": {
			paddingLeft: 0,
		},
		"& .MuiListItemSecondaryAction-root button svg": {
			color: "#e95050",
		},

		"& .MuiTypography-root": {
			marginRight: 40,
		},
	},
})

interface ITodoItemProps {
	todo: Todo
	updateStatus: (check: boolean, todoId: string) => void
	removeTodo: (todoId: string) => void
	updateTodo: (todoId: string, content: string) => void
}

const TodoItem = (props: ITodoItemProps) => {
	const { todo, updateStatus, removeTodo, updateTodo } = props
	const [isEdit, setIsEdit] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const classes = useStyles()

	useEffect(() => {
		if (isEdit) inputRef.current?.focus()
	}, [isEdit])

	const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputRef.current && inputRef.current.value) {
			updateTodo(todo.id, inputRef.current.value)
			setIsEdit((pre) => !pre)
		}
	}

	const renderButtonIcon = () => {
		if (isEdit) return null
		return (
			<IconButton edge='end' aria-label='comments' onClick={() => removeTodo(todo.id)}>
				<HighlightOffTwoTone />
			</IconButton>
		)
	}

	return (
		<ListItem secondaryAction={renderButtonIcon()} disablePadding className={classes.listItem}>
			<>
				{isEdit ? (
					<TextField
						name={todo.id}
						defaultValue={todo.content}
						onBlur={() => setIsEdit((pre) => !pre)}
						inputRef={inputRef}
						onKeyDown={onUpdateTodo}
						fullWidth
					/>
				) : (
					<>
						<ListItemIcon>
							<Checkbox checked={isTodoCompleted(todo)} onChange={(e) => updateStatus(e.target.checked, todo.id)} />
						</ListItemIcon>
						<ListItemText id={todo.id} primary={todo.content} onDoubleClick={() => setIsEdit((pre) => !pre)} />
					</>
				)}
			</>
		</ListItem>
	)
}

export default TodoItem
