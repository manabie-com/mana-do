import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editTodos,
} from "../../store/actions";
// import Service from "../../service";
import { Todo, TodoEdited, TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import { ActionButton, Header, TodoItem } from "../../components";
import shortid from "shortid";

type EnhanceTodoStatus = TodoStatus | "ALL";

/** NewCreateTodos */
const createNewTodo = (content: string): Todo => {
  return {
    content: content,
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  };
};

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  //set id for item clicked by user
  const [idClick, setIdClick] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  /** Button Array */
  const actionButton: Array<IBtn> = [
    { title: "All", status: "ALL", onClick: () => setShowing("ALL") },
    {
      title: "Active",
      status: TodoStatus.ACTIVE,
      onClick: () => setShowing(TodoStatus.ACTIVE),
    },
    {
      title: "Completed",
      status: TodoStatus.COMPLETED,
      onClick: () => setShowing(TodoStatus.COMPLETED),
    },
  ];

  /** Remove calling remote APIs */
  // useEffect(() => {
  //   (async () => {
  //     const resp = await Service.getTodos();

  //     // dispatch(setTodos(resp || []));
  //   })();
  // }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value !== ""
    ) {
      // const resp = await Service.createTodo(inputRef.current.value);
      /** Remove remote APIs*/
      const todo = createNewTodo(inputRef.current.value);

      dispatch(createTodo(todo));
      inputRef.current.value = "";
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

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  /** Edit Feature */
  const handleEditTodos = (todo: TodoEdited) => {
    dispatch(editTodos(todo));
    setIdClick("");
  };
  /** Life Cycle */
  /** Use localStorage to keep todos */
  useEffect(() => {
    if (localStorage.getItem("tempTodos") === null) {
      localStorage.setItem("tempTodos", JSON.stringify([]));
    } else {
      let listTodos = JSON.parse(localStorage.getItem("tempTodos")!);
      dispatch(setTodos(listTodos || []));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tempTodos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Fragment>
      <Header title="MANA-DO" />
      <div className="ToDo__container">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
            data-testid="MainToDo_input"
          />
        </div>
        <div className="ToDo__list">
          {showTodos.map((todo, index) => {
            return (
              <TodoItem
                key={index}
                id={todo.id}
                content={todo.content}
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                onClick={() => dispatch(deleteTodo(todo.id))}
                idClick={idClick}
                setIdClick={setIdClick}
                handleEditTodos={handleEditTodos}
              />
            );
          })}
        </div>
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
          <div className="Todo__tabs">
            {actionButton &&
              actionButton.map((item, index) => (
                <ActionButton
                  key={index}
                  actionBtn={item}
                  statusCheck={showing}
                />
              ))}
          </div>
          <ActionButton
            actionBtn={{ title: "Clear all todos", onClick: onDeleteAllTodo }}
            border="1px solid #f44336"
            boxShadow="2px 0 2px #f44336"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ToDoPage;
