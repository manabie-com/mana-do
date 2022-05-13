import React, { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "store/reducer";
import {
	setTodos,
	createTodo,
	toggleAllTodos,
	deleteAllTodos,
	updateTodoStatus,
	deleteTodos,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import TodoItem from "components/TodoItem";
import TodoForm from "components/TodoForm";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
	const [{ todos }, dispatch] = useReducer(reducer, initialState);
	const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

	useEffect(() => {
		(async () => {
			const resp = await Service.getTodos();
			dispatch(setTodos(resp || []));
		})();
	}, []);

	const handSubmit = async (content: string) => {
		const item = await Service.createTodo(content);
		dispatch(createTodo(item));
	};

	const onUpdateTodoStatus = (id: string, status: TodoStatus) => {
		dispatch(updateTodoStatus(id, status));
	};

	const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleAllTodos(e.target.checked));
	};

	const onDeleteAllTodo = () => {
		dispatch(deleteAllTodos());
	};

	const onDeleteTodo = async (id: string) => {
		const result = await Service.deleteTodo(id);
		if (result) {
			dispatch(deleteTodos([id]));
		}
	};

	return (
		<div className="ToDo__container">
			<div className="Todo__creation">
				<TodoForm onSubmit={handSubmit} />
			</div>
			<div className="ToDo__list">
				{todos.map((todo, index) => {
					return (
						<TodoItem
							{...todo}
							key={todo.id}
							active={showing === todo.status}
							onChangeStatus={onUpdateTodoStatus}
							onRemove={onDeleteTodo}
						/>
					);
				})}
			</div>
			<div className="Todo__toolbar">
				{todos.length > 0 ? (
					<input type="checkbox" onChange={onToggleAllTodo} />
				) : (
					<div />
				)}
				<div className="Todo__tabs">
					<button className="Action__btn">All</button>
					<button
						className="Action__btn"
						onClick={() => setShowing(TodoStatus.ACTIVE)}>
						Active
					</button>
					<button
						className="Action__btn"
						onClick={() => setShowing(TodoStatus.COMPLETED)}>
						Completed
					</button>
				</div>
				<button className="Action__btn" onClick={onDeleteAllTodo}>
					Clear all todos
				</button>
			</div>
		</div>
	);
};

export default ToDoPage;
