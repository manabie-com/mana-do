import React from "react";
import Pencil from "component/Icons/Pencil";

interface InputProps {
  onSubmit: (todoInput: string) => void;
  updatedTodoValue?: string;
}

const Input = ({ onSubmit, updatedTodoValue }: InputProps) => {
  const [todoInput, setTodoInput] = React.useState(updatedTodoValue || "");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput !== undefined && todoInput !== "") {
      setError(null);
      onSubmit(todoInput);
      setTodoInput("");
    } else {
      setError("Please write something!");
    }
  };

  const handleInputChange = (content: string) => {
    setError(null);
    setTodoInput(content);
  };

  return (
    <form data-testid="todo-form" onSubmit={handleSubmit}>
      <div className="input__container">
        <Pencil />
        <input
          type="text"
          name="todo"
          data-testid="todo-input"
          onChange={(e) => handleInputChange(e.target.value)}
          value={todoInput}
          className="todo__input"
          placeholder="What needs to be done?"
          autoComplete="off"
          autoFocus={true}
        />
      </div>
      {error && (
        <p data-testid="input-error-msg" className="input__error">
          {error}
        </p>
      )}
    </form>
  );
};

export default Input;
