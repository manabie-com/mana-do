import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "../store/actions";
import Service from "../service";
import { Todo, TodoStatus } from "../models/todo";
import useLocalStorage from "../utils/useLocalStorage";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  const [todosLocal, setTodosLocal] = useLocalStorage<Todo[]>("todos", todos);

  const [edit, setEdit] = useState(false);

  const handleToggleInput = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || todosLocal));
    })();
  }, [todosLocal]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      setTodosLocal([...todosLocal, resp]);
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
    const index = todosLocal.findIndex((todo) => todo.id === todoId);
    todosLocal[index].status = e.target.checked
      ? TodoStatus.COMPLETED
      : TodoStatus.ACTIVE;
    setTodosLocal(todosLocal);
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    setTodosLocal([]);
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
    setTodosLocal(todosLocal.filter((todo) => todo.id !== id));
  };

  // const onEditTodo = async (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   if (e.key === "Enter") {
  //     setToggeInput(false);
  //   }
  // };

  console.log(todos);

  console.log(showing);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              {!edit ? (
                <>
                  <input
                    type="checkbox"
                    checked={showing === TodoStatus.COMPLETED ? true : false}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <span onDoubleClick={handleToggleInput}>{todo.content}</span>

                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="Todo__delete"
                  >
                    X
                  </button>
                </>
              ) : (
                <>
                  <input type="text" value={todo.content} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn">All</button>
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
