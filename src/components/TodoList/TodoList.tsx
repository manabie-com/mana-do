import React from "react";

export default function TodoList({ todos = [] }): JSX.Element {
  return (
    <div className="ToDo__list">
      {todos.map((todo, index) => {
        return (
          <div key={index} className="ToDo__item">
            <input
              type="checkbox"
              //   onChange={(e) => onUpdateTodoStatus(e, index)}
            />
            {/* <span>{todo.content}</span> */}
            <button className="Todo__delete">X</button>
          </div>
        );
      })}
    </div>
  );
}
