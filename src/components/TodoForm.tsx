import React, { useState } from "react";

export interface TodoFormProps {
	content?: string;
	onSubmit?(content: string): void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, content = "" }) => {
	const [value, setValue] = useState<string>(content);

	const handSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(value);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	return (
		<form
			className="Todo-form"
			aria-label="todo-form"
			onSubmit={handSubmit}>
			<input
				type="text"
				value={value}
				className="w-full Todo__input"
				placeholder="What need to be done?"
				aria-label="todo-form-input-content"
				name="content"
				onChange={handleChange}
			/>
		</form>
	);
};

export default TodoForm;
