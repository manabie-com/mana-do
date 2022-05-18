import React, { useEffect, useReducer } from 'react';

import { TodoList } from 'components';
import TodoInput from 'components/TodoInput';
import TodoToolbar from 'components/TodoToolbar';
import Service from 'service';
import styles from './Todo.module.scss';
import {
	createTodo,
	deleteTodo,
	deleteAllTodos,
	setTodos,
	updateTodoStatus,
	updateTodoContent,
	changeFilter,
} from 'store/actions';
import reducer, { initialState } from 'store/reducer';
import { FilterType, TodoStatus } from 'models/todo';
import { isTodoActive, isTodoCompleted } from 'utils';

const ToDoPage = () => {
	const [ { todos, filter }, dispatch ] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			const resp = await Service.getTodos();

			dispatch(setTodos(resp || []));
		})();
	}, []);

	const handleCreateTodo = async (content: string) => {
		const resp = await Service.createTodo(content);
		dispatch(createTodo(resp));
	};

	const handleUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
		const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
		if (await Service.updateTodo(todoId, { status })) dispatch(updateTodoStatus(todoId, status));
	};

	const handleUpdateTodoContent = async (todoId: string, content: string) => {
		if (await Service.updateTodo(todoId, { content })) dispatch(updateTodoContent(todoId, content));
	};

	const showTodos =
		filter === FilterType.ALL
			? todos
			: todos.filter((todo) => (filter === FilterType.COMPLETED ? isTodoCompleted(todo) : isTodoActive(todo)));

	const itemsLeftCount = todos.filter((todo) => isTodoActive(todo)).length;

	const handleChangeFilter = (f: FilterType) => {
		dispatch(changeFilter(f));
	};

	const handleDeleteAllTodo = async () => {
		if (await Service.deleteAllTodos()) dispatch(deleteAllTodos());
	};

	const handleDeleteTodo = async (todoId: string) => {
		if (await Service.deleteTodo(todoId)) dispatch(deleteTodo(todoId));
	};

	return (
		<div className={styles.container} aria-label="todo-container">
			<TodoInput onAddTodo={handleCreateTodo} />
			<TodoList
				todos={showTodos}
				onDeleteTodo={handleDeleteTodo}
				onToggleTodoStatus={handleUpdateTodoStatus}
				onUpdateTodoContent={handleUpdateTodoContent}
			/>
			<TodoToolbar
				onDeleteAllTodo={handleDeleteAllTodo}
				onChangeFilter={handleChangeFilter}
				filter={filter}
				itemsLeftCount={itemsLeftCount}
			/>
		</div>
	);
};

export default ToDoPage;
