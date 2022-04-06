import React, { useRef } from "react";
import { CardProps, TodoStatus } from "../../models/todo";
import "./Card.css";

function Card(props: CardProps) {
  const inputRef = useRef<any>(null);
  const { id, showing, status, content, onUpdateTodoStatus, onDeleteTodo } =
    props;

  const isShowing = () => showing === "ALL" || status === showing;

  return (
    /** Updated:
     * 1. I change key from index to todo.id because it's not recommend to use index of item to store as key.
     * 2. Bug: on calling onUpdateTodoStatus, it's a mistake calling index as todoId
     * => I change it into id of item
     * 3. I change condition whether Todo is render or not
     *  3.1. It's rendered when showing equal to "ALL" or showing equal to todo's status
     *  3.2. Checkbox is now checked if todo is completed and not checked if it's still active
     */
    <div
      className={`ToDo__item ${status} ${isShowing() ? "" : "d-none"}`}
      onClick={() => onUpdateTodoStatus(!inputRef.current.checked, id)}
    >
      <input
        type="checkbox"
        checked={status === TodoStatus.COMPLETED}
        onChange={(e) => onUpdateTodoStatus(e.target.checked, id)}
        ref={inputRef}
      />
      <span>{content}</span>
      <button className="Todo__delete" onClick={() => onDeleteTodo(id)}>
        X
      </button>
    </div>
  );
}

export default Card;
