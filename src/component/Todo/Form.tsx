import React from "react";
import { createTodo, CreateTodoAction } from "store/actions";
import Service from "service";
import { useHistory } from "react-router";

import Input from "component/Todo/InputWithErrorCheck";

const Form = ({ dispatch }: { dispatch: React.Dispatch<CreateTodoAction> }) => {
  const history = useHistory();

  const onSubmit = async (todoInput: string) => {
    if (todoInput.trim() !== "") {
      try {
        const resp = await Service.createTodo(todoInput);
        dispatch(createTodo(resp));
      } catch (err) {
        if (err.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  return <Input onSubmit={onSubmit} />;
};

export default Form;
