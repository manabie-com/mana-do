import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [selectedTodo, setSelectedTodo] = useState(-1);
  const inputRef = useRef<any>(null);
  var editInputRef = useRef<any>(null);

  const setEditInputRef = (ref: any) => {
    editInputRef = ref
  }

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onChangeTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
     console.log("LOGGGG", inputRef.current.value)
    }
  }
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="ToDo__overlay">
      <div className="ToDo__main">
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
                  <input
                    type="checkbox"
                    checked={showing === todo.state}
                    onChange={(e) => onUpdateTodoStatus(e, index)}
                  />
                  <span hidden={(selectedTodo === index)} onDoubleClick={() => setSelectedTodo(index)} 
                  >{todo.content}</span>
                  <input type="text" className="Todo__change" defaultValue={todo.content} hidden={!(selectedTodo === index)} onKeyDown={onChangeTodo} ref={React.createRef}
                  />
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
              <input type="checkbox" onChange={onToggleAllTodo} />
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
            <button
              className="Action__btn Clear__btn"
              onClick={onDeleteAllTodo}
            >
              Clear all todos
            </button>
          </div>
        </div>
        <div className="image">
          <img
            src="https://images.pexels.com/photos/2481177/pexels-photo-2481177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="computer"
            id="img"
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
