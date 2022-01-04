import React, { useEffect, useReducer, useRef, useState } from "react";
import { Todo, TodoStatus } from "models/todo";
import { AppActions } from "store/actions";
import Service from "service";
import { editTodo } from "store/actions";
import { deleteTodo, updateTodoStatus } from "store/actions";
import { ToDoWrapper } from "./Todo.styles";
import { isTodoCompleted } from "utils";

export interface propsItem {
  todo: Todo;
  index: number;
  dispatch: React.Dispatch<AppActions>;
}

const Item: React.FC<propsItem> = (props) => {
  const { index, todo, dispatch } = props;
  const [text, setText] = useState<string>(todo.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onEditTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter" && text) {
      //   const resp = await Service.editTodo(inputRef.current.value, id);
      dispatch(editTodo(id, text));
      setIsEdit(false);
    }
  };

  const handleEditContent = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsEdit(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isEdit &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsEdit(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isEdit]);

  return (
    <ToDoWrapper status={todo.status as TodoStatus}>
      <li key={index} className="Todo">
        {isEdit ? (
          <input
            ref={inputRef}
            className="Todo__edit"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => onEditTodo(e, todo.id)}
          />
        ) : (
          <div className="Todo__view">
            <input
              className="Todo__toggle"
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <label onDoubleClick={handleEditContent}>{todo.content}</label>
            <button
              className="Todo__destroy"
              onClick={() => dispatch(deleteTodo(todo.id))}
            />
          </div>
        )}

        {/* <input
          type="checkbox"
          checked={isTodoCompleted(todo)}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        /> */}
        {/* {isEdit ? (
          <input
            value={text}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={(e) => onEditTodo(e, todo.id)}
          />
        ) : (
          <span onDoubleClick={handleEditContent}>{todo.content}</span>
        )}

        <button
          className="Todo__delete"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          X
        </button> */}
      </li>
    </ToDoWrapper>
  );
};

export default Item;
