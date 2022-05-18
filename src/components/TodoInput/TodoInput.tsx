import React, { useState } from 'react';
import styles from './TodoInput.module.scss';

type Props = {
	onAddTodo: Function;
};

const defaultValue = '';

const TodoInput = ({ onAddTodo }: Props) => {
	const [ value, setValue ] = useState(defaultValue);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && Boolean(value)) {
			setValue(defaultValue);
			onAddTodo(value);
		}
	};

	return (
		<div className={styles.inputContainer} aria-label="todo-form">
			<div className={styles.checkDecor} />
			<input
				aria-label="todo-input"
				className={styles.input}
				placeholder="What need to be done?"
				autoFocus
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export default TodoInput;
