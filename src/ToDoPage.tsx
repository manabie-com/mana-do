import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
	setTodos,
	createTodo,
	toggleAllTodos,
	deleteAllTodos,
	updateTodoStatus,
	deleteTodo,
	editTodoItem,
} from "./store/actions";
import { getLocalStorage } from "./utils/index";
import Service from "./service";
import { TodoStatus, Todo } from "./models/todo";
import TodoItem from "./components/todoItem";

type EnhanceTodoStatus = TodoStatus;

const ToDoPage: React.FC = () => {
	const initialEditedTodoItem = {
		content: "",
		created_date: "",
		status: "",
		id: "",
		user_id: "",
	};
	const [{ todos }, dispatch] = useReducer(reducer, initialState);
	const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
	const [input, setInput] = useState("");
	const [editedTodoItem, setEditedTodoItem] = useState<Todo>(
		initialEditedTodoItem
	);
	const todoContainerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	/// Add ref type input element

	/// Get local storage todos
	useEffect(() => {
		const todos = getLocalStorage("todos") || [];
		dispatch(setTodos(todos || []));
	}, []);
	//handle click outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			console.log("here");
			if (
				todoContainerRef.current &&
				!todoContainerRef.current.contains(e.target as Node)
			) {
				setEditedTodoItem(initialEditedTodoItem);
				setInput("");
				inputRef.current?.focus();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Remove duplicate todo item
		const findEditedTodoItem = todos.find(
			(todoItem) => todoItem.id === editedTodoItem.id
		);
		if (e.key === "Enter") {
			if (findEditedTodoItem) {
				editedTodoItem.content = input;
				dispatch(editTodoItem(editedTodoItem));
			} else {
				const resp: Todo = await Service.createTodo(input);
				dispatch(createTodo(resp));
			}
			setEditedTodoItem(initialEditedTodoItem);
			setInput("");
		}
	};
	const onUpdateTodoStatus = (
		e: React.ChangeEvent<HTMLInputElement>,
		todoId: string
	) => {
		dispatch(updateTodoStatus(todoId, e.target.checked));
	};

	const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleAllTodos(e.target.checked));
	};

	const onDeleteAllTodo = () => {
		dispatch(deleteAllTodos());
	};

	const onDeleteTodo = (todoId: string) => {
		dispatch(deleteTodo(todoId));
	};

	const onEditTodoItem = (todoItem: Todo) => {
		setInput(todoItem.content);
		setEditedTodoItem(todoItem);
		inputRef.current?.focus();
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value);
	return (
		<div className="ToDo__container" ref={todoContainerRef}>
			<p
				style={{
					color: "red",
				}}
			>
				Mode{" "}
				<strong>
					{editedTodoItem?.content.length > 0
						? "Edit todo item"
						: "Add todo item"}
				</strong>
			</p>
			<div className="Todo__creation">
				<input
					ref={inputRef}
					value={input}
					placeholder="What need to be done?"
					onKeyPress={onCreateTodo}
					onChange={handleInput}
					className="Todo__input"
					id="todoInput"
					data-testid="todoInput"
				/>
			</div>
			<div className="ToDo__list">
				{todos.map((todo) => {
					return (
						/// Create todo item component
						<TodoItem
							onDeleteTodo={onDeleteTodo}
							onUpdateTodoStatus={onUpdateTodoStatus}
							onEditTodoItem={onEditTodoItem}
							key={todo.id}
							showing={showing}
							todoItem={todo}
							id={todo.id}
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
					<button
						onClick={() => setShowing(TodoStatus.ALL)}
						className="Action__btn"
					>
						All
					</button>
					<button
						data-testid="activeFilterButton"
						className="Action__btn"
						onClick={() => setShowing(TodoStatus.ACTIVE)}
					>
						Active
					</button>
					<button
						data-testid="completedFilterButton"
						className="Action__btn"
						onClick={() => setShowing(TodoStatus.COMPLETED)}
					>
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
