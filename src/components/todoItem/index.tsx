import React from "react";
import { Todo, TodoStatus } from "../../models/todo";
interface todoItemType {
	todoItem: Todo;
	onUpdateTodoStatus: (
		e: React.ChangeEvent<HTMLInputElement>,
		todoId: string
	) => void;
	onDeleteTodo: (todoId: string) => void;
	onEditTodoItem: (todoItem: Todo) => void;
	showing?: string;
	id?: string;
}

const todoItem: React.FC<todoItemType> = (props) => {
	const {
		todoItem,
		onUpdateTodoStatus,
		onEditTodoItem,
		onDeleteTodo,
		showing,
		id,
	} = props;

	const handleCheck = (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: string
	) => {
		onUpdateTodoStatus(e, todoItemId);
	};

	if (showing === TodoStatus.ALL || showing === todoItem.status) {
		return (
			<div
				className="ToDo__item"
				onDoubleClick={() => onEditTodoItem(todoItem)}
				id={id}
				data-testid="todoItem"
			>
				<input
					// checked when todoItem.status === TodoStatus.COMPLETED
					checked={todoItem.status === TodoStatus.COMPLETED}
					type="checkbox"
					onChange={(e) => handleCheck(e, todoItem.id)}
				/>
				<span>{todoItem.content}</span>
				<button
					onClick={() => onDeleteTodo(todoItem.id)}
					className="Todo__delete"
				>
					X
				</button>
			</div>
		);
	}

	return null;
};

export default todoItem;
