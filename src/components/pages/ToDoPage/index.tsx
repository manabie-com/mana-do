import React, { useContext, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "store/actions";
import Service from "service";
import { StoreContext } from "store/provider";
import { TodoStatus } from "models/todo";
import { isTodoCompleted } from "utils";

import "./styles.css";
import { TodoControl, TodoCreation, TodoList } from "components/organisms";
import Modal from "components/atoms/Modal";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const { state, dispatch } = useContext(StoreContext);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputCreationRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [action, setAction] = useState({ name: "", value: "" });

  useEffect(() => {
    (async () => {
      const todoInLocalStorage = localStorage.getItem("TODO");
      if (todoInLocalStorage) {
        dispatch(setTodos(JSON.parse(todoInLocalStorage)));
      } else {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      }
    })();
  }, [dispatch]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputCreationRef.current) {
      console.log(inputCreationRef.current.value);
      try {
        const resp = await Service.createTodo(inputCreationRef.current.value);
        dispatch(createTodo(resp));
        inputCreationRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };
  const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputEditRef.current) {
      dispatch(updateTodo(inputEditRef.current.id, inputEditRef.current.value));
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    setAction({ name: "DELETE_ALL", value: "" });
    onToggle();
  };

  const onDeleteTodo = (todoId: string) => {
    setAction({ name: "DELETE_ONE", value: todoId });
    onToggle();
  };

  const onSetShowTodo = (status: EnhanceTodoStatus) => {
    setShowing(status);
  };

  const onToggle = () => {
    setIsShowModal(!isShowModal);
  };

  const onOk = () => {
    if (action.name === "DELETE_ALL") {
      dispatch(deleteAllTodos());
    } else {
      dispatch(deleteTodo(action.value));
    }
    onToggle();
  };

  const showTodos = state.todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = state.todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="row">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 m-auto">
        <div className="ToDoPage">
          <div className="TodoBox p-3 p-sm-5">
            <div>
              <h3>Todo List</h3>
            </div>
            <TodoCreation
              onCreateTodo={onCreateTodo}
              forwardedRef={inputCreationRef}
            />
            <TodoList
              onUpdateTodoStatus={onUpdateTodoStatus}
              onToggleAllTodo={onToggleAllTodo}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
              showTodos={showTodos}
              activeTodos={activeTodos}
              todos={state.todos}
              forwardedRef={inputEditRef}
            />
            <TodoControl
              onDeleteAllTodo={onDeleteAllTodo}
              onSetShowTodo={onSetShowTodo}
              showing={showing}
            />

            <Modal
              onToggle={onToggle}
              isOpen={isShowModal}
              title="Confirm Modal"
              onOk={onOk}
            >
              <div>
                {action.name === "DELETE_ALL"
                  ? "Are you sure you want delete all todo ?"
                  : "Are you sure you want delete this todo ?"}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
