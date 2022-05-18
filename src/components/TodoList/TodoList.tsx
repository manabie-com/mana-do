import React from 'react';
import { Todo } from 'models/todo';
import TodoItem from 'components/TodoItem';

import styles from './TodoList.module.scss';

type Props = {
	todos: Todo[];
	onDeleteTodo: (todoId: string) => void;
	onUpdateTodoContent: (todoId: string, content: string) => void;
	onToggleTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
};

function TodoList({ todos, onDeleteTodo, onToggleTodoStatus, onUpdateTodoContent }: Props) {
	return (
		<div className={styles.wrapper}>
			{todos.map((todo) => {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onDeleteTodo={onDeleteTodo}
						onToggleTodoStatus={onToggleTodoStatus}
						onUpdateTodoContent={onUpdateTodoContent}
					/>
				);
			})}
		</div>
	);
}

export default TodoList;
