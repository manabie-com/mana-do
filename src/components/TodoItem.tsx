import { Todo, TodoStatus } from "../models/todo";
import { Context as TodoContext } from "../context/TodoContext";
import { useContext, useRef, useState } from "react";
import { deleteTodo, updateTodo, updateTodoStatus } from "../store/actions";
import React from "react";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  const [edit, setEdit] = useState(false);
  const [todoEdit, setTodoEdit] = useState(todo.content);

  const editInputRef = useRef<any>(null);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onTodoEdit = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(updateTodo(id, editInputRef.current.value));
      setEdit(false);
    }
  };

  const onDoubleClickTodo = (value: string) => {
    setEdit(!edit);
    setTodoEdit(value);
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <div key={todo.id} className="ToDo__item">
        <input
          type="checkbox"
          checked={todo.status === TodoStatus.COMPLETED ? true : false}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        />
        {!edit && (
          <div
            className="ToDo__text"
            onDoubleClick={() => onDoubleClickTodo(todo.content)}
          >
            {todo.content}
          </div>
        )}
        {edit && (
          <input
            ref={editInputRef}
            type="text"
            defaultValue={todoEdit}
            autoFocus
            onKeyPress={(e) => onTodoEdit(todo.id, e)}
          />
        )}

        <button onClick={() => onDeleteTodo(todo.id)} className="Todo__delete">
          X
        </button>
      </div>
    </>
  );
};
