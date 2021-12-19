import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import reducer, { AppState, initialState } from "../store/reducer";
import {
  setAppState,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
  updateTheme,
  updateSelectedStatus,
} from "../store/actions";
import Service from "../service";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import { Theme, ThemeContext } from "./ThemeProvider";

const LOCAL_KEY = "appState";

type Props = {
  todos: Todo[];
  status: TodoStatus;
  dispatch: Function;
};

const ToDoPage = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setLoading] = useState<Boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, switchTheme } = useContext(ThemeContext);

  const themeList: Theme[] = ["darkgreen", "blueviolet"];

  // useEffect(() => {
  //   (async () => {
  //     const resp = await Service.getTodos();

  //     dispatch(setTodos(resp || []));
  //   })();
  // }, []);

  useEffect(() => {
    setLoading(true);
    const appStateLocal = getLocalData() || "";
    if (!appStateLocal) return;

    const loadData = JSON.parse(appStateLocal) || [];
    dispatch(setAppState(loadData));
    switchTheme(loadData.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading || !isChangeData()) return;

    saveLocalData(appState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  const isChangeData = () => {
    const oldData = getLocalData();
    const currentData = JSON.stringify(appState);
    return oldData !== currentData;
  };

  const saveLocalData = (appState: AppState) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(appState));
  };

  const getLocalData = () => {
    return localStorage.getItem(LOCAL_KEY);
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.value === "") return;

    if (e.key === "Enter" && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);

      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onChangeTheme = (theme: Theme) => {
    switchTheme(theme);
    dispatch(updateTheme(theme));
  };

  const showTodos = appState.todos.filter((todo) => {
    switch (appState.status) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const props: Props = {
    todos: showTodos,
    status: appState.status,
    dispatch,
  };

  return (
    <div>
      <div className="ToDo_theme">
        {themeList.map((item: Theme, index: number) => (
          <label className="ToDo_middle" key={index}>
            <input
              type="radio"
              name="theme"
              checked={theme === item}
              value={item}
              onChange={() => onChangeTheme(item)}
            />
            <span></span>
          </label>
        ))}
      </div>
      <div className="ToDo__container" style={{ backgroundColor: theme }}>
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        {appState.todos && appState.todos.length > 0 ? (
          <>
            <TodoList {...props} />
            <TodoAction {...props} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const TodoList: React.FC<Props> = ({ todos, status, dispatch }) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onDoubleClick = (event: any, todo: Todo) => {
    setInputText(event.target.innerText || "");
    dispatch(
      updateTodo({
        ...todo,
        contentEditable: true,
      })
    );
  };

  const onBlur = (event: any, todo: Todo) => {
    setInputText("");
    dispatch(
      updateTodo({
        ...todo,
        contentEditable: false,
      })
    );
  };

  const onChange = (event: any) => {
    setInputText(event.target.value || "");
  };

  const onKeyDown = (event: any, todo: Todo) => {
    if (event.key === "Enter") {
      if (event.target && event.target.value === "") return;

      setInputText("");
      dispatch(
        updateTodo({
          ...todo,
          content: event.target.value || "",
          contentEditable: false,
        })
      );
    }
  };

  const onFilter = (e: any) => {
    const value = e.target.value || "";
    switch (value) {
      case TodoStatus.ACTIVE:
        dispatch(updateSelectedStatus(TodoStatus.ACTIVE));
        break;
      case TodoStatus.COMPLETED:
        dispatch(updateSelectedStatus(TodoStatus.COMPLETED));
        break;
      default:
        dispatch(updateSelectedStatus(TodoStatus.ALL));
        break;
    }
  };

  return (
    <div className="ToDo__list">
      <div className="Todo_filter">
        <select
          name="filter"
          onChange={(e) => onFilter(e)}
          defaultValue={status}
        >
          <option value={TodoStatus.ALL}>All</option>
          <option value={TodoStatus.ACTIVE}>Active</option>
          <option value={TodoStatus.COMPLETED}>Completed</option>
        </select>
      </div>
      {todos.map((todo, index) => {
        return (
          <div key={index} className="ToDo__item">
            <input
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            {todo.contentEditable ? (
              <input
                ref={inputRef}
                style={{ width: "80%" }}
                value={inputText}
                onKeyDown={(e) => onKeyDown(e, todo)}
                onBlur={(e) => onBlur(e, todo)}
                onChange={onChange}
              />
            ) : (
              <span onDoubleClick={(e) => onDoubleClick(e, todo)}>
                {todo.content}
              </span>
            )}
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
  );
};

const TodoAction: React.FC<Props> = ({ todos, dispatch }) => {
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    dispatch(updateSelectedStatus(TodoStatus.ALL));
    removeLocalData();
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const removeLocalData = () => {
    localStorage.removeItem(LOCAL_KEY);
  };

  return (
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
      <div className="Todo__tabs"></div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default ToDoPage;
