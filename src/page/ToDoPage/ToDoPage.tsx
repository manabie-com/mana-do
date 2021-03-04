import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TodoItem from "../../components/TodoItem";
import { userConfig } from "../../config/user";
import { Todo, TodoStatus } from "../../models/todo";
import Service from "../../service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "../../store/actions";
import reducer, { initialState } from "../../store/reducer";
import { isTodoCompleted } from "../../utils";
import "./styles.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

interface ValueEdit {
  id: string;
  content: string;
}

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();

    // cleanup function
    // component will unmount
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  // add change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value.length > 0 // not create toto with content empty
    ) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
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
    dispatch(deleteAllTodos());
  };

  // add type Todo
  const showTodos = todos.filter((todo: Todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  // add type accum
  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  // callback recieve data from child component
  const handleDeleteTodoItem = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodoContent = (id: string, content: string) => {
    dispatch(updateTodoContent(id, content));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push(userConfig.loginPath);
  };

  return (
    <div className="ToDo__container">
      {/* <button className="ToDo__btn " onClick={handleLogout}>
        X
      </button> */}
      <div className="ToDo__creation">
        <input
          ref={inputRef}
          className="ToDo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
        <label htmlFor="date_todo">Thursday, March 04 2021</label>
      </div>
      <div className="ToDo__list">
        {/* add type for todo, change key = todo.id  */}
        {/* index as a key is an anti-pattern */}
        {showTodos.map((todo: Todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />

              <TodoItem
                id={todo.id}
                content={todo.content}
                deleteItem={handleDeleteTodoItem}
                updateItem={handleUpdateTodoContent}
              />
            </div>
          );
        })}
      </div>
      <div className="ToDo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="ToDo__tabs">
          <button className="Action__btn" onClick={() => setShowing("ALL")}>
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
