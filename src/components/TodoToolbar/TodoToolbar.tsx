import React from 'react';
import { FilterType } from 'models/todo';
import styles from './TodoToolbar.module.scss';

type Props = {
	onDeleteAllTodo: React.MouseEventHandler<HTMLButtonElement>;
	onChangeFilter: (f: FilterType) => void;
	filter: FilterType;
	itemsLeftCount: number;
};

const TodoToolbar = ({ onDeleteAllTodo, onChangeFilter, filter, itemsLeftCount }: Props) => {
	const changeFilterActiveStatus = () => {
		onChangeFilter(FilterType.ACTIVE);
	};
	const changeFilterCompletedStatus = () => {
		onChangeFilter(FilterType.COMPLETED);
	};
	const changeFilterAll = () => {
		onChangeFilter(FilterType.ALL);
	};

	return (
		<div className={styles.todoToolbar} aria-label="todo-toolbar">
			<div className={styles.note}>
				{itemsLeftCount} item{itemsLeftCount > 1 ? 's' : ''} left
			</div>
			<div className={styles.todoTabs}>
				<button
					aria-label="todo-toolbar-filter-all"
					className={filter === FilterType.ALL ? styles.btnActive : ''}
					onClick={changeFilterAll}>
					All
				</button>
				<button
					aria-label="todo-toolbar-filter-active"
					className={filter === FilterType.ACTIVE ? styles.btnActive : ''}
					onClick={changeFilterActiveStatus}>
					Active
				</button>
				<button
					aria-label="todo-toolbar-filter-completed"
					className={filter === FilterType.COMPLETED ? styles.btnActive : ''}
					onClick={changeFilterCompletedStatus}>
					Completed
				</button>
			</div>
			<button onClick={onDeleteAllTodo}>Clear all todos</button>
		</div>
	);
};

export default TodoToolbar;
