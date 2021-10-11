import React, { useEffect, useReducer, useState } from "react";
import {
  createTodo,
  setTodos,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "states/todo/actions";
import reducer, { initialState } from "states/todo/reducer";
import { useHistory } from "react-router-dom";

import Service from "service";
import { TodoStatus } from "models/todo";
import { TO_DO_KEY } from "constants/const";

import { FormToDo, ListToDo, ToolbarToDo } from "components/ToDo";
import { Button, ModalConfirm, Paper } from "components/commons";

import "./style.css";
import { getTokenLocalStorage, removeTokenLocalStorage } from "utils/storage";

export type EnhanceTodoStatus = TodoStatus | "ALL";

let initial = false;
const ToDoPage = () => {
  const history = useHistory();
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [showModalConfirm, setModalConfirm] = useState(false);
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    if (!initial) {
      initial = true;
      return;
    }
    const token = getTokenLocalStorage();
    localStorage.setItem(TO_DO_KEY, JSON.stringify({ [token]: todos }));
  }, [todos]);

  async function _handleCreateToDo(value: string): Promise<boolean> {
    const resp = await Service.createTodo(value);
    dispatch(createTodo(resp));
    return true;
  }

  function _filterByStatus(status: EnhanceTodoStatus) {
    setShowing(status);
  }

  function _handleUpdateToDoStatus(todoId: string, checked: boolean) {
    dispatch(updateTodoStatus(todoId, checked));
  }

  function _handleDeleteToDo(todoId: string) {
    dispatch(deleteTodo(todoId));
  }

  function _handleDeleteAllToDo() {
    dispatch(deleteAllTodos());
  }

  function _handleToggleAllToDo(checked: boolean) {
    dispatch(toggleAllTodos(checked));
  }

  function _handleLogout() {
    removeTokenLocalStorage();
    history.push("/");
  }

  function _toggleModalConfirm() {
    setModalConfirm((prev) => !prev);
  }

  return (
    <div className="ToDo__container">
      <ModalConfirm
        onConfirm={_handleLogout}
        onClose={_toggleModalConfirm}
        show={showModalConfirm}
        title="Are you sure want to logout ?"
        content="Are you sure want to logout ?"
      />

      <Paper className="ToDo_content p50">
        <div className="text-right mb-20">
          <Button onClick={_toggleModalConfirm}>Log out</Button>
        </div>
        <div className="ToDo_content__header mb40 text-center">TO DO LIST</div>

        <FormToDo onCreateToDo={_handleCreateToDo} />
        <ToolbarToDo
          onToggleAllToDo={_handleToggleAllToDo}
          onDeleteAllToDo={_handleDeleteAllToDo}
          onFilter={_filterByStatus}
          todos={todos}
          showing={showing}
        />
        <ListToDo
          onDeleteTodo={_handleDeleteToDo}
          onUpdateTodoStatus={_handleUpdateToDoStatus}
          showing={showing}
          onFilter={_filterByStatus}
          todos={todos}
        />
      </Paper>
    </div>
  );
};

export default ToDoPage;
