import React, { useEffect, useReducer, useRef, useState, useMemo } from "react";
import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  editTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import TodoItem from "./components/TodoItem";
import { APP_CONSTANT } from "./constants";
type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(APP_CONSTANT.LOCAL_STORAGE_KEY);
    let initialValue = [];
    if (saved) {
      initialValue = JSON.parse(saved);
    }

    dispatch(setTodos(initialValue));
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_CONSTANT.LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current.value) return;
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);

      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onEditTodo = (id: string, content: string) => {
    dispatch(editTodo(id, content));
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const filteredTodos = useMemo(() => {
    if (showing === "ALL") return todos;
    return todos.filter((todo) => todo.status === showing);
  }, [todos, showing]);

  return (
    <div className="ToDo__container">
      <h3>
        Doan The Duy - do assigment - Apply for Frontend position - Manabie
      </h3>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          required
        />
      </div>
      <div className="ToDo__list">
        {filteredTodos && filteredTodos.length > 0 ? (
          <>
            {filteredTodos.map((todo, index) => {
              return (
                <div key={index}>
                  <TodoItem
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onEditTodo={onEditTodo}
                    onUpdateTodoStatus={onUpdateTodoStatus}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <span className="Empty__data__alert">Empty data</span>
          </>
        )}
      </div>
      <div className="Todo__toolbar">
        {filteredTodos.length > 0 ? (
          <div className="Todo__selectall__area">
            <input type="checkbox" onChange={onToggleAllTodo} />
            <p>Select all</p>
          </div>
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className="Action__btn"
            onClick={() => setShowing("ALL")}
            style={{
              backgroundColor: showing === "ALL" ? "#1e3a8a" : "#3b82f6",
            }}
          >
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
            style={{
              backgroundColor:
                showing === TodoStatus.ACTIVE ? "#1e3a8a" : "#3b82f6",
            }}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
            style={{
              backgroundColor:
                showing === TodoStatus.COMPLETED ? "#1e3a8a" : "#3b82f6",
            }}
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
