import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";
import TodoItem from "./components/TodoItem";
import Checkbox from "./components/ResourceComponents/Checkbox";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(
    reducer,
    // persistent - load saved state
    localStorage.getItem("todoState")
      ? JSON.parse(localStorage.getItem("todoState") as string)
      : initialState
  );
  const [showList, setShowList] = useState<Array<Todo>>([...todos]);
  const [movingOutList, setMovingOutList] = useState<Array<string>>([]);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    /***
      showList hold the current showing items, if todos (upcoming changes) has less items than showList 
      then add the removed items' ids to movingOut[] in order to show moving out animation for those items,
    ***/
    if (todos.length < showList.length) {
      let ids = todos.map((i) => i.id);
      let movingOut = [];
      for (let i = 0; i < showList.length; i++) {
        if (!ids.includes(showList[i].id)) {
          movingOut.push(showList[i].id);
        }
      }
      setMovingOutList(movingOut);
      //after moving out animation of removed items, update showList = todos
      setTimeout(
        () => {
          setMovingOutList([]);
          setShowList([...todos]); //for comparing lengths in the begining, showList and todos must not refer to the same array
        },
        todos.length === 0 ? 600 + (showList.length - 1) * 100 : 600
      );
    } else {
      setShowList([...todos]);
    }
  }, [todos, todos.length]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value === "") return;
      if (showing === TodoStatus.COMPLETED) setShowing("ALL");
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onToggleAllTodo = (checked: boolean) => {
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };
  /*** 
    deleting, updating actions on a specific todo item are moved to the TodoItem.jsx
  ***/
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
      <div
        className={`ToDo__list_empty${showList.length === 0 ? " show" : ""}`}
      >
        You haven't got any tasks yet!
      </div>
      <div className="ToDo__list">
        {showList.map((todo, index) => (
          /***
            craete a new component for todo items since they have their own data and state (editing...)
            -> reduce the number of code lines 
            -> make use of react & hooks
          ***/
          <TodoItem
            data={todo}
            showing={showing === todo.status || showing === "ALL"}
            key={todo.id}
            moveOutAnimation={movingOutList.includes(todo.id)}
            offsetAnimation={todos.length === 0 ? index * 0.1 : 0}
            dispatch={dispatch}
          />
        ))}
      </div>
      <div className="Todo__toolbar">
        <span
          className={`Todo__toggle_all${
            todos.length > 0 ? " active" : " hiden"
          }`}
        >
          {<Checkbox onChange={onToggleAllTodo} />}
        </span>
        <div className="Todo__tabs">
          <button
            className={`Action__btn${showing === "ALL" ? " active" : ""}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn${
              showing === "ALL"
                ? " included"
                : showing === TodoStatus.ACTIVE
                ? " active"
                : ""
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn${
              showing === "ALL"
                ? " included"
                : showing === TodoStatus.COMPLETED
                ? " active"
                : ""
            }`}
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
