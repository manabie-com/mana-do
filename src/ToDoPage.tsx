import React, { useEffect, useReducer, useRef, useState } from "react";
import { TodoStatus } from "./models/todo";
import Service from "./service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  editTodo,
  getActiveTodo,
  getAllTodo,
  getCompletedTodo,
  toggleAllTodos,
  updateTodoStatus,
} from "./store/actions";
import reducer, { initialState } from "./store/reducer";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [inputTodoValue, setInputTodoValue] = useState("");
  const [inputEditTodoValue, setInputEditTodoValue] = useState("");
  const [activeEditTodoId, setActiveEditTodoId] = useState<
    string | undefined
  >();
  const inputRef = useRef<any>(null);

  // get init
  useEffect(() => {
    dispatch(getAllTodo());
  }, []);

  useEffect(() => {
    if (activeEditTodoId) {
      inputRef.current.focus();
    }
  }, [activeEditTodoId]);

  const getTodoActiveStatus = () => {
    dispatch(getActiveTodo());
  };

  const getTodoCompletedStatus = () => {
    dispatch(getCompletedTodo());
  };

  const getTodoAllStatus = () => {
    dispatch(getAllTodo());
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodoValue(e.target.value);
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check enter keyboards event and input blank
    if (e.key === "Enter" && inputTodoValue.trim() !== "") {
      const resp = await Service.createTodo(inputTodoValue);
      dispatch(createTodo(resp));
      // clear input
      setInputTodoValue("");
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

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // Edit Todo
  const showEditTodoInput = (id: string, currentContent: string) => {
    setActiveEditTodoId(id);
    setInputEditTodoValue(currentContent);
  };

  const onEditTodoSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    // check enter keyboards event and input blank
    if (e.key === "Enter" && inputEditTodoValue.trim() !== "") {
      dispatch(editTodo(id, inputEditTodoValue));
      // clear input
      setInputEditTodoValue("");
      setActiveEditTodoId(undefined);
    }
  };

  const onCancelEdit = () => {
    setActiveEditTodoId(undefined);
  };

  const onChangeEditInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditTodoValue(e.target.value);
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          value={inputTodoValue}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          onChange={onChangeInputValue}
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <div className="Item__left-side">
                <input
                  type="checkbox"
                  checked={todo.status === TodoStatus.COMPLETED}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                {activeEditTodoId !== todo.id ? (
                  <span
                    onDoubleClick={() =>
                      showEditTodoInput(todo.id, todo.content)
                    }
                  >
                    {todo.content}
                  </span>
                ) : (
                  <input
                    type="text"
                    ref={inputRef}
                    value={inputEditTodoValue}
                    onKeyDown={(e) => onEditTodoSubmit(e, todo.id)}
                    onChange={onChangeEditInputValue}
                    onBlur={onCancelEdit}
                  />
                )}
              </div>
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
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
          <button className="Action__btn" onClick={getTodoAllStatus}>
            All
          </button>
          <button className="Action__btn" onClick={getTodoActiveStatus}>
            Active
          </button>
          <button className="Action__btn" onClick={getTodoCompletedStatus}>
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
