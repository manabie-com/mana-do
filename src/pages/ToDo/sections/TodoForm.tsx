import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TodoForm = (props: { onCreateTodo: (todo: string) => void }) => {
  const history = useHistory();
  const [todo, setTodo] = useState("");

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const onSubmitTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.trim().length) {
      try {
        props.onCreateTodo(todo);
        setTodo("");
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmitTodo} className="Todo__creation">
      <input
        type="text"
        className="Todo__input"
        placeholder="What need to be done?"
        value={todo}
        onChange={onChangeTodo}
      />
    </form>
  );
};

export default TodoForm;
