import React, { useEffect, useReducer, useRef, useState, memo } from "react";

import reducer, { initialState } from "store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoStatus,
  editTodo,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import { ToDoWrapper } from "./ToDo.styles";
import { isTodoCompleted } from "utils";
import { Todo, Footer } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = memo(() => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [toggle, setToggle] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // validate empty todo when press enter
    try {
      if (e.key === "Enter" && inputRef?.current && inputRef?.current?.value) {
        const resp = await Service.createTodo(inputRef.current.value);
        if (resp) dispatch(createTodo(resp));

        inputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onToggleAllTodo = () => {
    setToggle((prev) => !prev);
    dispatch(toggleAllTodos(toggle));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onUpdateTodoStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    try {
      const resp = await Service.updateTodoStatus(todoId, e.target.checked);
      if (resp) dispatch(updateTodoStatus(resp.id, resp.value));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      const resp = await Service.deleteTodo(id);
      if (resp) dispatch(deleteTodo(resp));
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    content: string,
    handler: any
  ) => {
    try {
      if (e.key === "Enter" && content) {
        const resp = await Service.editTodo(content, id);
        if (resp) dispatch(editTodo(resp.id, resp.content));
        handler();
      }
    } catch (error) {
      console.log("error");
    }
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

  const onSetShowing = (option: EnhanceTodoStatus) => {
    setShowing(option);
  };

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <ToDoWrapper>
      <div className="title">
        <h1>Todos</h1>
      </div>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <input
          className="Todo__toggle-all"
          type="checkbox"
          checked={activeTodos === 0}
          onChange={() => {
            onToggleAllTodo();
          }}
        />
        <label htmlFor="Todo__toggle-all" onClick={onToggleAllTodo}></label>
        <ul className="ToDo__list">
          {showTodos.map((todo, index) => {
            return (
              <Todo
                onUpdateTodoStatus={onUpdateTodoStatus}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodoContent={onUpdateTodoContent}
                index={index}
                todo={todo}
              />
            );
          })}
        </ul>
        <Footer
          showing={showing}
          todoAmount={todos.length}
          onSetShowing={onSetShowing}
          activeTodos={activeTodos}
          onDeleteAllTodo={onDeleteAllTodo}
        />
      </div>
    </ToDoWrapper>
  );
});

export default ToDoPage;
