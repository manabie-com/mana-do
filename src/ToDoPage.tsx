import React, { useEffect, useReducer } from "react";

import reducer, { initialState } from "./store/reducer";
import { deleteTodo, setTodos, setTodoStatus } from "./store/actions";
import Service from "./service";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { FilterTodos } from "./components/FilterTodos";
import apiFrontend from "./service/api-frontend";

const ToDoPage = () => {
  const [{ todos, showing }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(()=> {
    apiFrontend.persistTodos(todos)
  }, [todos])

  return (
    <div className="ToDo__container">
      <CreateTodo dispatch={dispatch} />
      <TodoList
        dispatch={dispatch}
        todos={todos}
        showing={showing}
        onRemove={(todoId) => dispatch(deleteTodo(todoId))}
      />
      <FilterTodos
        todos={todos}
        dispatch={dispatch}
        setShowing={(status) => dispatch(setTodoStatus(status))}
        showing={showing}
      />
    </div>
  );
};

export default ToDoPage;
