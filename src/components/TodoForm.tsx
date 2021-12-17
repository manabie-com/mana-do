import React, { useState, useContext } from "react";
import { AppContext } from "../store/AppProvider";
import { createTodo } from "../store/actions";
import shortid from "shortid";
import { Todo, TodoStatus } from "../models/todo";

const TodoForm = () => {
  const { dispatch } = useContext(AppContext);
  const [name, setName] = useState("");

  const createNewTodo = (content: string): Todo => {
    return {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name) {
      const todo = createNewTodo(name);
      // const resp = await Service.createTodo(name);
      dispatch(createTodo(todo));
      setName("");
    }
  };

  // const onNewTodo = async (todoContent: string) => {
  //   Service.createTodo(todoContent)
  //     .then((resp) => {
  //       dispatch(createTodo(resp));
  //     })
  //     .catch((e) => {
  //       if (e.response.status === 401) {
  //         console.log("There is error");
  //       }
  //     });
  // };

  // const handleCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   //Ignore enter key when there is no value
  //   if (e.key === "Enter" && name) {
  //     // const resp = await Service.createTodo(name);
  //     onNewTodo(name);
  //     setName("");
  //   }
  // };

  return (
    <div className="Todo__creation" data-testid="todo-form">
      <input
        value={name}
        className="Todo__input"
        placeholder="What need to be done?"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default TodoForm;
