import React from "react";
import { Todo } from "models/todo";
import TodoStatusDropDown from "components/TodoStatusDropDown";

export interface TodoProps extends Todo {
	onRemove?(id: string): void;
	onTick?(id: string, checked: boolean): void;
	onChangeStatus?(id: string, status: string): void;
	onDoubleClick?(id: string): void;
	active: boolean;
}

/**
 * TodoItem accept all fields from Todo type
 * @onRemove Func fired when user click close icon
 * @onRemove Func fired when user click checkbox
 * @active Bool specific status of the component
 */
const TodoItem: React.FC<TodoProps> = ({
	active = false,
	onTick,
	onRemove,
	onChangeStatus,
	onDoubleClick,
	content,
	status,
	id,
}) => {
	const handleTick = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		if (onTick) {
			onTick(id, e.target.checked);
		}
	};

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (onRemove) {
			onRemove(id);
		}
	};

	const handleChangeStatus = (status: string) => {
		if (onChangeStatus) {
			onChangeStatus(id, status);
		}
	};

	const handleDoubleClick = () => {
		if (onDoubleClick) {
			onDoubleClick(id);
		}
	};

	return (
		<div className="ToDo__item" aria-label="todo-item">
			<div
				className="ToDo__item__click"
				onDoubleClick={handleDoubleClick}
				aria-label="todo-item-dbclick"
			/>
			<input
				aria-label="todo-item-checkbox"
				type="checkbox"
				checked={active}
				onChange={handleTick}
				onClick={(e) => e.stopPropagation()}
				className="ToDo__item__checkbox"
			/>
			<span
				className="ToDo__item__content"
				aria-label="todo-item-content">
				{content}
			</span>
			<TodoStatusDropDown
				status={status}
				onChangeStatus={handleChangeStatus}
			/>
			<button
				aria-label="todo-item-remove"
				className="ToDo__item__delete"
				onClick={handleRemove}>
				X
			</button>
		</div>
	);
};

export default TodoItem;
