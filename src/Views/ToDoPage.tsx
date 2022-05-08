import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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
  updateTodoContent,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { btnList, isTodoCompleted, onFilter, turnCounter } from "../utils";
import { usePersistedReducer } from "../store";

const storageKey = "TODO_LIST";

const ToDoPage = () => {
  const inputRef = useRef<any>(null);
  const inputContentRef = useRef<any>(null);
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

  const handleBlur = (id: string) => {
    const textUpdate = inputContentRef.current.returnText();
    dispatch(updateTodoContent(id, textUpdate));
  };

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
                  handleBlur={handleBlur}
                  ref={inputContentRef}
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

const ItemRender = forwardRef((props: any, ref) => {
  const { item, onUpdateTodoStatus, onDeleteTodo, handleBlur } = props;
  const [text, setText] = useState(item.content);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    returnText: () => text,
  }));

  return (
    <div className="ToDo__item">
      <div className="Todo__left__content">
        <input
          checked={isTodoCompleted(item)}
          type="checkbox"
          onChange={(e) => onUpdateTodoStatus(e, item?.id)}
        />
        <input
          className="Todo__content"
          type="text"
          onChange={handleChange}
          onBlur={() => handleBlur(item?.id)}
          style={
            isTodoCompleted(item)
              ? { textDecoration: "line-through", opacity: ".5" }
              : {}
          }
          value={text}
        />
      </div>
      <button onClick={() => onDeleteTodo(item.id)} className="Todo__delete">
        X
      </button>
    </div>
  );
});
