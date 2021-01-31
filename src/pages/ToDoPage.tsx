import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { getClassNameActiveByType, isTodoCompleted } from "../utils";
import Input from "../components/Input";
import Button from "../components/Button";
import { Helmet } from "react-helmet";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        // if (e.response.status === 401) {
        //   history.push("/");
        // }
      }
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(updateTodoStatus(value, checked));
  };

  return (
    <div className="ToDo__container">
      <Helmet>
        <title>Todo Page</title>
      </Helmet>
      <div className="Todo__creation">
        <Input
          inputRef={inputRef}
          name="nameTodo"
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.length === 0 && (
          <div className="ToDo__Nodata">No data todo</div>
        )}
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <Input
                type="checkbox"
                valueWidth="20px"
                name={`${todo.id}`}
                checked={isTodoCompleted(todo)}
                value={todo.id}
                onChange={onChangeCheckBox}
              />
              <span>{todo.content}</span>
              <Button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
                name={todo.id}
                label="X"
              />
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <div className="Todo__CompleteAll">
            <div className="mb-10 ">Complete all</div>
            <Input
              name="checkAll"
              type="checkbox"
              valueWidth="20px"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            />
          </div>
        ) : (
          <div />
        )}
        {todos.length > 0 && (
          <div className="Todo__tabs">
            <div className="mb-10 ">{`Filter by status: ${showing}`}</div>
            <div className="Todo__WrapperButtons">
              <Button
                className={`Action__btn ${getClassNameActiveByType(
                  showing,
                  "ALL"
                )} mr-3`}
                onClick={() => setShowing("ALL")}
                name="buttonShowAll"
                label="All"
              />
              <Button
                className={`Action__btn ${getClassNameActiveByType(
                  showing,
                  TodoStatus.ACTIVE
                )} mr-3`}
                onClick={() => setShowing(TodoStatus.ACTIVE)}
                name="buttonActive"
                label="Active"
              />
              <Button
                className={`Action__btn ${getClassNameActiveByType(
                  showing,
                  TodoStatus.COMPLETED
                )} mr-3`}
                onClick={() => setShowing(TodoStatus.COMPLETED)}
                name="buttonCompleted"
                label="Completed"
              />
              <Button
                className="Action__btn Button__ClearAll"
                onClick={onDeleteAllTodo}
                name="buttonClearAll"
                label="Clear all todos"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoPage;
