import React from "react";
import { CardProps } from "../../models/todo";

function Card(props: CardProps) {
  const { id, showing, status, content, onUpdateTodoStatus, onDeleteTodo } =
    props;

  return (
    /** Fixed:
     * 1. I change key from index to todo.id because it's not recommend to use index of item to store as key.
     * 2. Bug: on calling onUpdateTodoStatus, it's a mistake calling index as todoId
     * => I change it into id of item
     */
    <div key={id} className="ToDo__item">
      <input
        type="checkbox"
        checked={showing === status}
        onChange={(e) => onUpdateTodoStatus(e, id)}
      />
      <span>{content}</span>
      <button className="Todo__delete" onClick={() => onDeleteTodo(id)}>
        X
      </button>
    </div>
  );
}

export default Card;
