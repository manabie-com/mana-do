import * as React from "react";
import todoAction from "../store/todo.action";
import { useTodoContext } from "../TodoContext";
import "./styles.scss";

const TodoAction = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoContext();

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      dispatch(todoAction.createTodoRequest(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default TodoAction;
