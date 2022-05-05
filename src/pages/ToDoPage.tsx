import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";
import Service from "../service";
import {
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoName,
  updateTodoStatus,
} from "../store/actions";
import reducer, { initialState } from "../store/reducer";

const ToDoPage = () => {
  const DEFAULT_TODO = {
    content: "",
    created_date: "",
    id: "",
    status: TodoStatus.ACTIVE,
    user_id: "",
  };
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputEditRef = useRef<HTMLInputElement | null>(null);
  const [todoEdit, setTodoEdit] = useState<Todo>({
    ...DEFAULT_TODO,
  });
  const [statusCheckAll, setStatusCheckAll] = useState<boolean>(false);

  /**
   * Handle create todo element
   * @param e KeyboardEvent<HTMLInputElement>
   * @return void
   */
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value) {
        const resp: Todo = await Service.createTodo(inputRef.current.value);
        const arrNew: Todo[] = [...todos];
        arrNew.push(resp);

        dispatch(setTodos(arrNew));

        inputRef.current.value = "";
      } else {
        alert("Please enter what you wanna do!");
      }
    }
  };

  /**
   * Handle update status of todo
   * @param todoId: string
   * @param e ChangeEvent<HTMLInputElement>
   * @return void
   */
  const onUpdateTodoStatus =
    (todoId: string) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (!e.target.checked) {
        setStatusCheckAll(false);
      } else {
        const arrNew = [...todos];

        const indexFind = arrNew.findIndex((item) => item.id === todoId);
        if (indexFind !== -1) arrNew[indexFind].status = TodoStatus.COMPLETED;

        const statusCheckAll: boolean = arrNew.every(
          (item) => item.status === TodoStatus.COMPLETED
        );

        setStatusCheckAll(statusCheckAll);
      }
      dispatch(updateTodoStatus(todoId, e.target.checked));
    };

  /**
   * Handle select all todo
   * @param e ChangeEvent<HTMLInputElement>
   * @return void
   */
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStatusCheckAll(e.target.checked);
    dispatch(toggleAllTodos(e.target.checked));
  };

  /**
   * Handle delete all todo
   * @return void
   */
  const onDeleteAllTodo = (): void => {
    if (inputRef.current) inputRef.current.value = "";
    dispatch(deleteAllTodos());
  };

  /**
   * Handle delete todo
   * @return void
   */
  const onDeleteTodo = (todoId: string) => (): void => {
    dispatch(deleteTodo(todoId));
  };

  /**
   * Handle select active todo
   * @return void
   */
  const handleSelectActive = (): void => {
    setShowing(TodoStatus.ACTIVE);
  };

  /**
   * Handle select completed todo
   * @return void
   */
  const handleSelectCompleted = (): void => {
    setShowing(TodoStatus.COMPLETED);
  };

  /**
   * Handle select all todo
   * @return void
   */
  const handleSelectAll = (): void => {
    setShowing("ALL");
  };

  /**
   * Handle get data todo from API
   * @return void
   */
  const getDataTodo = async () => {
    const resp = await Service.getTodos();

    const statusCheckAll: boolean = resp.every(
      (item) => item.status === TodoStatus.COMPLETED
    );

    setStatusCheckAll(statusCheckAll);

    dispatch(setTodos(resp || []));
  };

  /**
   * Handle edit todo
   * @param todo Todo
   * @return void
   */
  const handleEditTodo = (todo: Todo) => (): void => {
    setTodoEdit(todo);
  };

  /**
   * Handle cancel edit todo
   * @return void
   */
  const handleCancelEdit = () => {
    setTodoEdit({
      ...DEFAULT_TODO,
    });
  };

  /**
   * Handle confirm edit todo
   * @return void
   */
  const handleConfirmEdit =
    (todoId: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputEditRef.current)
        dispatch(updateTodoName(todoId, inputEditRef.current.value as string));
      setTodoEdit({
        ...DEFAULT_TODO,
      });
    };

  useEffect(() => {
    getDataTodo();
  }, []);

  useEffect(() => {
    if (todoEdit) {
      inputEditRef.current?.focus();
    }
  }, [todoEdit]);

  return (
    <Fragment>
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyPress={onCreateTodo}
          />
        </div>
        <div className="ToDo__list">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`ToDo__item ${
                showing === "ALL" || todo.status === showing
                  ? "show"
                  : "disabled"
              }`}
            >
              <input
                disabled={!(showing === "ALL" || todo.status === showing)}
                type="checkbox"
                checked={todo.status === "COMPLETED"}
                onChange={onUpdateTodoStatus(todo.id)}
              />
              {todo.id === todoEdit.id ? (
                <input
                  defaultValue={todoEdit.content}
                  ref={inputEditRef}
                  className="Todo__input Edit__input"
                  placeholder="What need to be done?"
                  onKeyPress={handleConfirmEdit(todoEdit.id)}
                  onBlur={handleCancelEdit}
                />
              ) : (
                <span
                  className="Todo_content"
                  onDoubleClick={handleEditTodo(todo)}
                >
                  {todo.content}
                </span>
              )}

              {(showing === "ALL" || todo.status === showing) && (
                <button
                  className="Todo__delete"
                  onClick={onDeleteTodo(todo.id)}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="Todo__toolbar">
          {todos.length > 0 && showing === "ALL" && (
            <input
              type="checkbox"
              checked={statusCheckAll}
              onChange={onToggleAllTodo}
            />
          )}
          <div className="Todo__tabs">
            <button
              className={`Action__btn ${showing === "ALL" ? "active" : ""}`}
              onClick={handleSelectAll}
            >
              All
            </button>
            <button
              className={`Action__btn ${showing === "ACTIVE" ? "active" : ""}`}
              onClick={handleSelectActive}
            >
              Active
            </button>
            <button
              className={`Action__btn ${
                showing === "COMPLETED" ? "active" : ""
              }`}
              onClick={handleSelectCompleted}
            >
              Completed
            </button>
          </div>
          <button className="Action__btn Clear__btn" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ToDoPage;
