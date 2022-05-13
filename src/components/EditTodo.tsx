import React, { useState, useEffect, useRef } from "react";
import { Todo } from "models/todo";
import TodoForm from "components/TodoForm";
import Service from "service";

export interface EditTodoProps {
	todoId?: string;
	onCancel?(): void;
	onConfirm?(todo: Todo): void;
}

const EditTodo: React.FC<EditTodoProps> = ({ onConfirm, onCancel, todoId }) => {
	const [todo, setTodo] = useState<Todo | null>(null);
	const formInRef = useRef<HTMLInputElement>(null);

	const handSubmit = async (content: string) => {
		if (onConfirm && todo) {
			onConfirm({
				...todo,
				content,
			});
		}
	};

	useEffect(() => {
		formInRef.current?.focus();
	}, []);

	useEffect(() => {
		(async () => {
			if (todoId) {
				const result = await Service.findById(todoId);
				setTodo(result);
			}
		})();
	}, [todoId]);

	if (!todo) {
		return null;
	}

	return (
		<div className="modal" aria-label="edit-todo-form">
			<div
				className="modal__backdrop"
				aria-label="edit-todo-backdrop"
				onClick={onCancel}></div>
			<div className="modal__inner">
				<div className="modal__header">
					<h2>Edit</h2>
					<div
						className="modal__close"
						aria-label="edit-todo-close-btn"
						onClick={onCancel}>
						<svg
							fill="#000000"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24px"
							height="24px">
							<path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
						</svg>
					</div>
				</div>
				<div className="modal__body">
					<TodoForm onSubmit={handSubmit} content={todo?.content} />
				</div>
			</div>
		</div>
	);
};

export default EditTodo;
