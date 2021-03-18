import React, { useContext, useEffect, useRef, useState } from "react";
import "./TodoPage.module.css";

import { useHistory } from "react-router-dom";

import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "../../store/actions/todoActions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import { TodoContext } from "../../store/contexts/todoContext";
import ManaDoContainer from "../../components/ManaDoContainer";
import Header from "../../components/Header";
import TodoFeatureSection from "../../components/TodoFeatureSection";
import Footer from "../../components/Footer";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const history = useHistory();
  const [{ todos }, dispatch] = useContext(TodoContext);
  // const [{ todos }, dispatch] = useReducer(reducer, initialState); Implement ContextAPI
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, [dispatch]);

  // const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && inputRef.current) {
  //     try {
  //       const resp = await Service.createTodo(inputRef.current.value);
  //       dispatch(createTodo(resp));
  //       inputRef.current.value = "";
  //     } catch (e) {
  //       if (e.response.status === 401) {
  //         history.push("/");
  //       }
  //     }
  //   }
  // };

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

  return (
    <>
      <ManaDoContainer>
        {/* <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
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
      </div> */}
        <Header />
        <TodoFeatureSection />
      </ManaDoContainer>
      <Footer />
    </>
  );
};

export default ToDoPage;
