import React, { useEffect, useReducer, useRef, useState } from "react";
import { Todo, TodoStatus } from "models/todo";
import { AppActions } from "store/actions";
import Service from "service";
import { editTodo } from "store/actions";
import { deleteTodo, updateTodoStatus } from "store/actions";
import { ToDoWrapper } from "./Todo.styles";
import { useOutSideClick } from "hooks";
import { isTodoCompleted } from "utils";

export interface PropsTodoItem {
  todo: Todo;
  index: number;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodoContent: (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    content: string,
    handler: () => void
  ) => void;
}

const Item: React.FC<PropsTodoItem> = (props) => {
  const { index, todo, onUpdateTodoContent, onUpdateTodoStatus, onDeleteTodo } =
    props;
  const [text, setText] = useState<string>(todo.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleEdit = () => {
    setIsEdit(false);
  };

  const handleEditContent = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsEdit(true);
  };

  useOutSideClick(inputRef, handleToggleEdit);

  return (
    <ToDoWrapper status={todo.status as TodoStatus}>
      <li key={index} className="Todo">
        {isEdit ? (
          <input
            ref={inputRef}
            data-testid="todo-edit"
            className="Todo__edit"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              onUpdateTodoContent(e, todo.id, text, () => {
                handleToggleEdit();
              });
            }}
          />
        ) : (
          <div data-testid="todo-view" className="Todo__view">
            <input
              className="Todo__toggle"
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <label onDoubleClick={handleEditContent}>{todo.content}</label>
            <button
              data-testid="btn"
              className="Todo__destroy"
              onClick={() => onDeleteTodo(todo.id)}
            />
          </div>
        )}
      </li>
    </ToDoWrapper>
  );
};

export default Item;
