import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import todoReducer, { initialState } from "../store/reducer";
import {
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  filterTodos,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { btnList, isTodoCompleted, onFilter, turnCounter } from "../utils";
import { usePersistedReducer } from "../store";

const storageKey = "TODO_LIST";

const ToDoPage = () => {
  const inputRef = useRef<any>(null);
  const { state, dispatch } = usePersistedReducer(
    todoReducer,
    initialState,
    storageKey
  );
  const { todos, filterState } = state;

  const [todoList, setTodoList] = useState(todos);

  const isAllowSubmit = useMemo(() => {
    return todos?.length > 0;
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value.trim()?.length) {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch(updateTodoStatus(id, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleBtn = useCallback(
    (name: string) => {
      if (!isAllowSubmit) return;
      dispatch(filterTodos(name));
      if (name === TodoStatus.CLEAR_ALL) {
        dispatch(deleteAllTodos());
      }
    },
    [dispatch, isAllowSubmit]
  );

  useEffect(() => {
    const filterResult = onFilter(filterState, todos);
    if (filterResult) {
      setTodoList(filterResult);
    }
  }, [todos, filterState]);

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
        {todoList.length
          ? todoList.map((todo) => {
              return (
                <ItemRender
                  item={todo}
                  key={todo.id}
                  onDeleteTodo={onDeleteTodo}
                  onUpdateTodoStatus={onUpdateTodoStatus}
                />
              );
            })
          : null}
      </div>
      <div className="Todo__toolbar">
        {todoList.length > 0 && (
          <input type="checkbox" onChange={onToggleAllTodo} />
        )}
        <div className="Todo__tabs">
          {btnList.map((item, idx) => {
            return (
              <button
                key={idx}
                disabled={!isAllowSubmit}
                onClick={() => handleBtn(item.name)}
                className={`Action__btn ${
                  item.name === filterState && isAllowSubmit
                    ? "Active__btn"
                    : ""
                }`}
              >
                {`${item.title} ${turnCounter(todos, item.name)}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;

const ItemRender = (props: any) => {
  const { item, onUpdateTodoStatus, onDeleteTodo } = props;
  return (
    <div className="ToDo__item">
      <input
        checked={isTodoCompleted(item)}
        type="checkbox"
        onChange={(e) => onUpdateTodoStatus(e, item?.id)}
      />
      <span
        style={
          isTodoCompleted(item)
            ? { textDecoration: "line-through", opacity: ".5" }
            : {}
        }
      >
        {item.content}
      </span>
      <button onClick={() => onDeleteTodo(item.id)} className="Todo__delete">
        X
      </button>
    </div>
  );
};
