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
				<svg
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 64"
					width="64px"
					height="64px">
					<path d="M 28 6 C 25.791 6 24 7.791 24 10 L 24 12 L 23.599609 12 L 10 14 L 10 17 L 54 17 L 54 14 L 40.400391 12 L 40 12 L 40 10 C 40 7.791 38.209 6 36 6 L 28 6 z M 28 10 L 36 10 L 36 12 L 28 12 L 28 10 z M 12 19 L 14.701172 52.322266 C 14.869172 54.399266 16.605453 56 18.689453 56 L 45.3125 56 C 47.3965 56 49.129828 54.401219 49.298828 52.324219 L 51.923828 20 L 12 19 z M 20 26 C 21.105 26 22 26.895 22 28 L 22 51 L 19 51 L 18 28 C 18 26.895 18.895 26 20 26 z M 32 26 C 33.657 26 35 27.343 35 29 L 35 51 L 29 51 L 29 29 C 29 27.343 30.343 26 32 26 z M 44 26 C 45.105 26 46 26.895 46 28 L 45 51 L 42 51 L 42 28 C 42 26.895 42.895 26 44 26 z" />
				</svg>
			</button>
		</div>
	);
};

export default TodoItem;
