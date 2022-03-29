import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { TodoStatus } from "./models/todo";
import Service from "./service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "./store/actions";
import reducer, { initialState } from "./store/reducer";

type EnhanceTodoStatus = TodoStatus | "ALL";

type IFormInput = {
  content: string;
};

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editItemId, setEditItemId] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  //**FIXED**
  // case SET_TODO hasn't been added yet, so I complete this function. If todo does not exist create a default todo
  useEffect(() => {
    (async () => {
      let storageTodo = localStorage.getItem("todos");
      if (storageTodo) {
        dispatch(setTodos(JSON.parse(storageTodo)));
      } else {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      }
    })();
  }, []);
  //**FIXED**

  // **ADDED**
  // every time the todos variable changes save it to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);
  // **ADDED**

  //**FIXED**
  //   const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter' ) {
  //         const resp = await Service.createTodo(inputRef.current.value);
  //         dispatch(createTodo(resp));
  //     }
  // }
  // I think it is better if use a form to control the field and submit event, I use react-hook-form to control this.

  // For the function Edit Item I added an onItemClick event to save the editing item, then use submit form for control field and event.
  // In this case, clicking outside input to discard I think it is unnecessary.
  const onItemClick = (content: string, todoId: string) => {
    setValue("content", content);
    setEditItemId(todoId);
    setFocus("content");
  };

  const onSubmit = async (data: IFormInput) => {
    if (editItemId.length === 0) {
      const resp = await Service.createTodo(data.content);
      dispatch(createTodo(resp));
    } else {
      dispatch(updateTodoContent(editItemId, data.content));
    }
    reset();
    setEditItemId("");
  };
  //**FIXED**

  //**FIXED**
  // I think in case to control the status of an item, I think it is better to use dropbox or select.
  // In this case base on the checkbox this is follow I made
  // Tab All => Disabled all checkbox: because user can't know if click to checkbox that item will change to what status
  // Tab Active,Complete => Check to change status of Item.
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(
      updateTodoStatus(
        todoId,
        showing === TodoStatus.ACTIVE ? e.target.checked : !e.target.checked
      )
    );
  };
  //**FIXED**

  const onDeleteTodo = (todoId: any) => {
    dispatch(deleteTodo(todoId));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="ToDo__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Todo__creation">
          <input
            {...register("content", { required: true })}
            className="Todo__input"
            placeholder="What need to be done?"
            maxLength={100}
          />
        </div>
        {errors.content && <span>This field is required</span>}
      </form>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={showing === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                disabled={showing === "ALL"}
              />
              <span
                title="click to edit todo"
                onClick={(e) => onItemClick(todo.content, todo.id)}
              >
                {todo.id === editItemId ? "Editing..." : todo.content}
              </span>
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
          <input
            type="checkbox"
            disabled={showing === "ALL"}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`Action__btn ${
              showing === "ALL" && "Action__btn__active"
            }`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.ACTIVE && "Action__btn__active"
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.COMPLETED && "Action__btn__active"
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
