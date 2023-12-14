import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  CheckAllTodos,
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
  // tao state luu selectedIds
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

  const setEditInputRef = (ref: any) => {
    editInputRef = ref;
  };

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
      console.log("LOGGGG", inputRef.current.value);
    }
  };

  const getColorByStatus = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.ACTIVE:
        return "red";
      case TodoStatus.COMPLETED:
        return "blue";
      default:
        return "";
    }
  };

  const onSelectTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    // push id vo state selectedIds
    if (e.target.checked) {
      selectedIds.push(todoId);
      setSelectedIds(selectedIds);
      // getColorByStatus(TodoStatus.ACTIVE);
    } else {
      const index = selectedIds.indexOf(todoId, 0);
      if (index > -1) {
        selectedIds.splice(index, 1);
        setSelectedIds(selectedIds);
      }
      // getColorByStatus(TodoStatus.COMPLETED);
    }
  };

  const updateTodoCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
        // update status xuong local storage
       await Service.updateStatus(todoId, TodoStatus.COMPLETED)
    dispatch(updateTodoStatus(todoId, true));
  }
  const clearAllTodo = async (
  ) => {
        // update status xuong local storage
       await Service.clearAllTodo()
    dispatch(deleteAllTodos());
    console.log('asasda')
  }
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  // const onDeleteAllTodo = () => {
  //   dispatch(deleteAllTodos());
  // };


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
              if (showing !== 'ALL' && showing !== todo.status) return;

              return (
                <div key={index} className="ToDo__item">
                  <input
                    type="checkbox"
                    // defaultChecked={showing === todo.id}
                    disabled={todo.status == TodoStatus.COMPLETED}
                    onChange={(e) => updateTodoCompleted(e, todo.id)}
                  />
                  <span
                    hidden={selectedTodo === index}
                    onDoubleClick={() => setSelectedTodo(index)}
                    style={{ color: getColorByStatus(todo.status) }}
                  >
                    {todo.content}
                  </span>
                  <input
                    type="text"
                    className="Todo__change"
                    defaultValue={todo.content}
                    hidden={!(selectedTodo === index)}
                    onKeyDown={onChangeTodo}
                    ref={React.createRef}
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
              <input type="checkbox" onChange={onToggleAllTodo} hidden />
            ) : (
              <div />
            )}
            <div className="Todo__tabs">
              <button
                className="Action__btn"
                onClick={() => setShowing("ALL")}
                // onChange={() => onUpdateColorStatus}
              >
                All
              </button>
              <button
                className="Action__btn"
                onClick={() => setShowing(TodoStatus.ACTIVE)}
                // onChange={() => onUpdateTodoStatus}
              >
                Active
              </button>
              <button
                className="Action__btn"
                onClick={() => setShowing(TodoStatus.COMPLETED)}
                // onChange={() => onUpdateColorStatus}
              >
                Completed
              </button>
            </div>
            <button
              className="Action__btn Clear__btn"
              onClick={() => clearAllTodo()}
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
