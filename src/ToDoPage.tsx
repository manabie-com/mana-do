import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoId,
  deleteTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus, Todo } from "./models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  let storageJobs: any;

  const [jobs, setJobs] = useState(() => {
    const test = localStorage.getItem("todos");
    // let storageJobs: any;
    if (test !== null) {
      storageJobs = JSON.parse(test || "");
    }
    return storageJobs;
  });
  // const [{ todos }, dispatch] = useReducer(reducer, jobs || []);
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [isEditTodoId, setIsEditTodoId] = useState("");
  const [isEditTodoContent, setIsEditTodoContent] = useState("");
  const [isUpdateTodoContent, setIsUpdateTodoContent] = useState(false);
  const [keyDown, setKeyDown] = useState(false);

  // console.log("todos:", todos);

  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<any>(null);
  const ref = useRef<any>(null);
  useEffect(() => {
    // (async () => {
    //   const resp = await Service.getTodos();
    //   console.log("resp: ", resp);
    //   dispatch(setTodos(resp || []));
    // })();
    // every the first time, improve behavior focus on Input field
    jobs && dispatch(setTodos(jobs));
    inputRef.current.focus();
  }, []);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyDown(!keyDown);
    }
  };

  const onHandleEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsUpdateTodoContent(!isUpdateTodoContent);
    }
  };

  useEffect(() => {
    const handleCreate = async () => {
      const resp = await Service.createTodo(todo);
      dispatch(createTodo(resp));
    };
    todo && handleCreate();

    setTodo("");
  }, [keyDown]);

  useEffect(() => {
    const handleUpdateTodo = () => {
      console.log("IsEditTodoId: ", isEditTodoId);
      console.log("isEditTodoContent: ", isEditTodoContent);
      dispatch(updateTodoId(isEditTodoId, isEditTodoContent));
    };
    handleUpdateTodo();

    setTodo("");
  }, [isUpdateTodoContent]);

  const handleChangeTodo = (e: any) => {
    setTodo(e.target.value);
  };

  const onEditTodo = (e: any, todoId: string) => {
    console.log("e: ", e.target.value);
    setIsEditTodoContent(e.target.value);
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    console.log("e: ", e.target.checked);
    console.log("todoId: ", todoId);
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    inputRef.current.focus();
  };
  const handleDeleteTodo = (id: string) => {
    console.log("id: ", id);
    dispatch(deleteTodo(id));
    inputRef.current.focus();
  };
  const handleDoubleClick = (content: string, id: string) => {
    console.log("content: ", content);
    setIsEditTodo(!isEditTodo);
    setIsMenuOpen(true);
    // setIsMenuOpen((oldState) => !oldState);
    setIsEditTodoContent(content);
    setIsEditTodoId(id);
    // dispatch(deleteTodo(id));
    // inputRef.current.focus();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          value={todo}
          onChange={(e) => handleChangeTodo(e)}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list" ref={ref}>
        {todos &&
          todos.map((todo, index) => {
            return (
              <div key={index} className="ToDo__item">
                <input
                  type="checkbox"
                  checked={showing === todo.status}
                  // onChange={(e) => onUpdateTodoStatus(e, index)}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                {todo.status === "COMPLETED" && (
                  // {isMenuOpen && (
                  <input
                    type="input"
                    onChange={(e) => onEditTodo(e, todo.id)}
                    value={isEditTodoContent}
                    onKeyDown={onHandleEditTodo}
                    // onKeyDown={() => setIsUpdateTodoContent(!isUpdateTodoContent)
                  />
                )}
                <span
                  onDoubleClick={() => handleDoubleClick(todo.content, todo.id)}
                >
                  {todo.content}
                </span>
                {/* {isMenuOpen ? (
                  <input
                    type="input"
                    onChange={(e) => onEditTodo(e, todo.id)}
                    value={isEditTodoContent}
                    onKeyDown={onHandleEditTodo}
                    // onKeyDown={() => setIsUpdateTodoContent(!isUpdateTodoContent)
                  />
                ) : (
                  <span
                    // onDoubleClick={() => setIsMenuOpen((oldState) => !oldState)}
                    onDoubleClick={() =>
                      handleDoubleClick(todo.content, todo.id)
                    }
                  >
                    {todo.content}
                  </span>
                )} */}
                <span>{todo.status}</span>
                <button
                  className="Todo__delete"
                  onClick={() => handleDeleteTodo(todo.id)}
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
