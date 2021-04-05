import "./index.css";

import React, { useEffect, useMemo, useReducer, useState } from "react";

/* Services */
import Service from "src/service";

/* Actions */
import { setTodos } from "src/store/actions";

/* Reducers */
import reducer, { initialState } from "src/store/reducer";

/* Models */
import { EnhanceTodoStatus } from "src/models/todo";

/* Utils */
import { isTodoCompleted } from "src/utils";

/* Components */
import TodoCreation from "src/components/Creation/Creation";
import TodoList from "src/components/List/List";
import TodoToolbar from "src/components/Toolbar/Toolbar";
import TodoHeader from "src/components/Header/Header";

/* Hook */
import {
  useCreate,
  useUpdate,
  useUpdateAll,
  useDelete,
  useDeleteAll,
} from "src/pages/Todo/handleApi";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  const {
    handleCreateTodo,
    clearErrorCreate,
    errorCreate,
    messageCreate,
  } = useCreate(dispatch);
  const {
    handleUpdateTodo,
    clearErrorUpdate,
    errorUpdate,
    messageUpdate,
  } = useUpdate(dispatch);
  const { handleUpdateAllTodo } = useUpdateAll(dispatch);
  const { handleDeleteTodo } = useDelete(dispatch);
  const { handleDeleteAllTodo } = useDeleteAll(dispatch);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp || []));
  };

  const activeTodos = useMemo(() => {
    return todos.reduce(function (accum, todo) {
      return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
  }, [todos]);

  return (
    <div className="todo__container">
      <TodoHeader showing={showing} />
      <TodoCreation
        handleCreateTodo={handleCreateTodo}
        clearErrorCreate={clearErrorCreate}
        errorCreate={errorCreate}
        messageCreate={messageCreate}
      />
      <TodoList
        todos={todos}
        showing={showing}
        handleUpdateTodo={handleUpdateTodo}
        clearErrorUpdate={clearErrorUpdate}
        errorUpdate={errorUpdate}
        messageUpdate={messageUpdate}
        handleDeleteTodo={handleDeleteTodo}
      />
      <TodoToolbar
        setShowing={setShowing}
        activeTodos={activeTodos === 0}
        showCheckBox={todos.length > 0}
        handleDeleteAllTodo={handleDeleteAllTodo}
        handleUpdateAllTodo={handleUpdateAllTodo}
      />
    </div>
  );
};

export default ToDoPage;
