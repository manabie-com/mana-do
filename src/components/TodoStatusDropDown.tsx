import React from "react";
import { TodoStatus } from "models/todo";

export interface TodoStatusDropDownProps {
	onChangeStatus?(status: string): void;
	status: TodoStatus;
}

const TodoStatusDropDown: React.FC<TodoStatusDropDownProps> = ({
	status,
	onChangeStatus,
}) => {
	const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.stopPropagation();
		if (onChangeStatus) {
			onChangeStatus(e.target.value);
		}
	};
	return (
		<select
			className="ToDo__item__status"
			aria-label="todo-item-status"
			value={status}
			onChange={handleChangeStatus}>
			{Object.keys(TodoStatus).map((key: string) => {
				return (
					<option key={key} value={key}>
						{key}
					</option>
				);
			})}
		</select>
	);
};

export default TodoStatusDropDown;
