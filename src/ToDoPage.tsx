import React, { useEffect, useReducer, useState, useMemo } from "react";
import cs from "classnames";
import reducer, { initialState } from "store/reducer";
import {
	setTodos,
	createTodo,
	toggleAllTodos,
	updateTodoStatus,
	deleteTodos,
	toggleTickTodoAction,
	toggleTickALLTodosAction,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import TodoItem from "components/TodoItem";
import TodoForm from "components/TodoForm";

const ALL_ITEM = "ALL";
type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
	const [{ todos, selectedItemIds }, dispatch] = useReducer(
		reducer,
		initialState,
	);
	const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

	const itemsAfterFilter = useMemo(() => {
		if (showing === ALL_ITEM) {
			return todos;
		}
		return todos.filter((item) => item.status === showing);
	}, [showing, todos]);

	const itemsSelectedAfterFilter = useMemo(() => {
		return itemsAfterFilter.filter((item) => {
			return selectedItemIds.indexOf(item.id) >= 0;
		});
	}, [itemsAfterFilter, selectedItemIds]);

	const tickAllTodos =
		itemsSelectedAfterFilter.length === itemsAfterFilter.length;

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

	// remove items are selected. If itemsSelectedAfterFilter is empty We will delete all items are filterd by filter menu
	const onDeleteAllTodo = async () => {
		let ids = [];

		if (itemsSelectedAfterFilter.length) {
			ids = itemsSelectedAfterFilter.map((i) => i.id);
		} else {
			ids = itemsAfterFilter.map((i) => i.id);
		}

		const result = await Service.batchDelete(ids);
		if (result) {
			dispatch(deleteTodos(ids));
		}
	};

	const onDeleteTodo = async (id: string) => {
		const result = await Service.deleteTodo(id);
		if (result) {
			dispatch(deleteTodos([id]));
		}
	};

	const onTickTodo = (id: string, checked: boolean) => {
		dispatch(toggleTickTodoAction(id, checked));
	};

	const onTickAllTodos = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleTickALLTodosAction(e.target.checked));
	};

	return (
		<div className="ToDo__container">
			<div className="Todo__creation">
				<TodoForm onSubmit={handSubmit} />
			</div>
			<div className="ToDo__list">
				{itemsAfterFilter.map((todo) => {
					return (
						<TodoItem
							{...todo}
							key={todo.id}
							active={selectedItemIds.indexOf(todo.id) >= 0}
							onChangeStatus={onUpdateTodoStatus}
							onRemove={onDeleteTodo}
							onTick={onTickTodo}
						/>
					);
				})}
			</div>
			<div className="Todo__toolbar">
				{itemsAfterFilter.length > 0 ? (
					<input
						aria-label="todo-page-check-all"
						type="checkbox"
						checked={tickAllTodos}
						onChange={onTickAllTodos}
					/>
				) : (
					<div />
				)}
				<div className="Todo__tabs">
					<button
						aria-label="todo-page-filter-all"
						className={cs("Action__btn", {
							"Action__btn--primary": showing === ALL_ITEM,
						})}
						onClick={() => setShowing(ALL_ITEM)}>
						All
					</button>
					<button
						aria-label="todo-page-filter-active"
						className={cs("Action__btn", {
							"Action__btn--primary":
								showing === TodoStatus.ACTIVE,
						})}
						onClick={() => setShowing(TodoStatus.ACTIVE)}>
						Active
					</button>
					<button
						aria-label="todo-page-filter-completed"
						className={cs("Action__btn", {
							"Action__btn--primary":
								showing === TodoStatus.COMPLETED,
						})}
						onClick={() => setShowing(TodoStatus.COMPLETED)}>
						Completed
					</button>
				</div>
				<button
					aria-label="todo-page-delete"
					className="Action__btn Todo__toolbar__delete-all"
					onClick={onDeleteAllTodo}>
					{tickAllTodos || !itemsSelectedAfterFilter.length
						? "Clear all todos"
						: `Clear ${itemsSelectedAfterFilter.length} todo(s) selected`}
				</button>
			</div>
		</div>
	);
};

export default ToDoPage;
