import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import TodoCreation from "../components/todoCreation";
import { TodosContext } from "../context";
import Service from "../service";
import { createTodo } from "../store/actions";

const TodoConainter: React.FC = () => {
  const { todosDispatch } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const history = useHistory();

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setError("");
      if (inputRef.current?.value) {
        try {
          const resp = await Service.createTodo(inputRef.current.value);
          todosDispatch?.(createTodo(resp));
          inputRef.current.value = "";
        } catch (e) {
          setError(e);
          if (e.response?.status === 401) {
            history.push("/");
          }
        }
      } else {
        setError("Please input task");
      }
    }
  };
  return <TodoCreation {...{ inputRef, onCreateTodo, error }} />;
};

export default TodoConainter;
