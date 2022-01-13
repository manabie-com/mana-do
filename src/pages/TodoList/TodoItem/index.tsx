import React, { useEffect, useRef, useState } from "react";
import Todo from "../../../models/todo";
import "./todo-item.css"

interface TodoItemInterface {
  todo: Todo; 
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  deleteTodo: (todoID: string) => void;
  updateTodo: (todoID: string, todoContent: string) => void;
}

const TotoItem = (props: TodoItemInterface) => {
  const { todo, onUpdateTodoStatus, deleteTodo, updateTodo } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const [totoContent, setTotoContent] = useState(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  const handleEditTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 2) {
      setIsEditing(!isEditing);
    }
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotoContent(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { 
    if (e.key === "Enter") {
      saveTodo(totoContent);
    }
  };

  const saveTodo = (content: string) => {
    updateTodo(todo.id, content);
    setIsEditing(false);
  };

  const handleClickOutside = (event: Event) => {
    const { current } = inputRef;
    const { target } = event;
 
    if (current && !current.contains(target as Node)) { 
      saveTodo(current.value);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.isTodoCompleted()}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <span className="todo-item__content" onClick={handleEditTodo}>
        {isEditing ? (
          <input
            className="todo-item__input"
            value={totoContent}
            ref={inputRef}
            autoFocus
            onChange={onChangeTodo}
            onKeyDown={onPressEnter}
          />
        ) : (
          todo.content
        )}
      </span>
      <button className="todo-item__delete" onClick={() => deleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
};

export default TotoItem;
