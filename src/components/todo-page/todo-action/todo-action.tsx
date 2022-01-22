import { Box, Button, Checkbox, ToggleButton, ToggleButtonGroup } from "@mui/material"
import React from "react"
import { TodoStatus } from "../../../models/todo"

interface ITodoActionsProps {
	isShowCheckBox: boolean
	activeTodos: boolean
	showing: TodoStatus | "ALL"
	toggleAllTodo: (todo: boolean) => void
	deleteAllTodo: () => void
	changeShowing: (status: TodoStatus | "ALL") => void
}

interface ActionModel {
	text: string
	value: TodoStatus | "ALL"
}

const TodoActions = (props: ITodoActionsProps) => {
	const { isShowCheckBox, activeTodos, showing, toggleAllTodo, deleteAllTodo, changeShowing } = props
	const actionList: ActionModel[] = [
		{
			text: "All",
			value: "ALL",
		},
		{
			text: "Active",
			value: TodoStatus.ACTIVE,
		},
		{
			text: "Completed",
			value: TodoStatus.COMPLETED,
		},
	]

	return (
		<Box display='flex' alignItems='center' justifyContent='space-between'>
			{isShowCheckBox ? <Checkbox checked={activeTodos} onChange={(e) => toggleAllTodo(e.target.checked)} /> : <div />}

			<ToggleButtonGroup size='small' color='primary' value={showing} exclusive>
				{actionList.map((action) => (
					<ToggleButton key={action.value} value={action.value} onClick={() => changeShowing(action.value)}>
						{action.text}
					</ToggleButton>
				))}
			</ToggleButtonGroup>

			<Button variant='outlined' color='error' onClick={deleteAllTodo}>
				Clear all todos
			</Button>
		</Box>
	)
}

export default TodoActions
