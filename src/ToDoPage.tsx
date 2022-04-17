import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus, EnhanceTodoStatus } from "./models/todo";
import { EditTodoStateStore } from "./models/editTodosState";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [editTodosState, setEditTodosState] = useState<EditTodoStateStore>({});
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
      checkDefaultCheckedAll(resp || []);
    })();
  }, []);

  const checkDefaultCheckedAll = (todosArg: Todo[]) => {
    let isChecked = true;
    for (let todo of todosArg) {
      if (todo.status !== TodoStatus.COMPLETED) {
        isChecked = false;
        break;
      }
    }
    setCheckAll(isChecked);
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value?.trim().length === 0)
        alert("Content cannot be empty");
      else {
        const resp = await Service.createTodo(inputRef.current.value.trim());
        dispatch(createTodo(resp));
        inputRef.current.value = "";
        setCheckAll(false);
      }
    }
  };

  const onChangeHandler =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditTodosState({
        ...editTodosState,
        [id]: { content: e.currentTarget.value },
      });
    };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
    const tempTodos = [...todos];
    let todo = tempTodos.find((i) => i.id === todoId);
    if (todo)
      todo.status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    if (showing === "ALL") checkDefaultCheckedAll(tempTodos);
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked, showing));
    setCheckAll(e.target.checked);
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    setCheckAll(false);
  };

  const removeTodo = (id: string) => () => {
    dispatch(deleteTodo(id));
  };

  const setFilter = (state: EnhanceTodoStatus) => () => {
    setShowing(state);
    if (state === TodoStatus.ACTIVE) setCheckAll(false);
    else if (state === TodoStatus.COMPLETED) setCheckAll(true);
    else checkDefaultCheckedAll(todos);
  };

  const handleUpdateTodoContent =
    (id: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        dispatch(updateTodoContent(id, editTodosState[id]["content"]));
        setEditTodosState({});
      }
    };

  const editTodo = (id: string, content: string) => () => {
    setEditTodosState({
      ...editTodosState,
      [id]: { content },
    });
  };

  const cancelEdit = () => {
    setEditTodosState({});
  };

  const todoList = todos.map((todo: Todo) => {
    if (showing === "ALL" || todo.status === showing)
      return (
        <div key={todo.id} className="ToDo__item">
          <input
            type="checkbox"
            checked={todo.status === TodoStatus.COMPLETED}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            className="mr-2 cursor-pointer"
          />
          {todo.id in editTodosState ? (
            <TextField
              autoFocus
              inputProps={{
                disableunderline: todo.id in editTodosState ? "true" : "false",
                style: {
                  padding: "2px 5px",
                },
              }}
              variant={todo.id in editTodosState ? "outlined" : "standard"}
              className="z-50 w-full"
              onDoubleClick={editTodo(todo.id, todo.content)}
              defaultValue={todo.content}
              onChange={onChangeHandler(todo.id)}
              onKeyPress={handleUpdateTodoContent(todo.id)}
            />
          ) : (
            <span
              className="text-red-400"
              onDoubleClick={editTodo(todo.id, todo.content)}
            >
              {todo.content}
            </span>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={removeTodo(todo.id)}
            style={{
              maxWidth: "35px",
              maxHeight: "30px",
              minWidth: "35px",
              minHeight: "30px",
              paddingLeft: "15px",
            }}
          >
            <DeleteIcon />
          </Button>
        </div>
      );
    else return null;
  });
  return (
    <div className="ToDo__container">
      {Object.keys(editTodosState).length !== 0 && (
        <div
          className="absolute left-0 top-0 w-screen h-screen z-10"
          onClick={cancelEdit}
        ></div>
      )}
      <div className="Todo__creation">
        <TextField
          id="outlined-basic"
          label="Add new todo"
          variant="outlined"
          inputRef={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">{todoList}</div>
      <div className="Todo__toolbar">
        {todoList.filter((i: Todo | null) => i !== null).length > 0 ? (
          <input
            type="checkbox"
            onChange={onToggleAllTodo}
            checked={checkAll}
            className="cursor-pointer"
          />
        ) : (
          <></>
        )}
        <div className="Todo__tabs">
          <Button
            variant={showing === "ALL" ? "contained" : "outlined"}
            className="Action__btn"
            onClick={setFilter("ALL")}
          >
            All
          </Button>
          <Button
            variant={showing === TodoStatus.ACTIVE ? "contained" : "outlined"}
            className="Action__btn"
            onClick={setFilter(TodoStatus.ACTIVE)}
          >
            Active
          </Button>
          <Button
            variant={
              showing === TodoStatus.COMPLETED ? "contained" : "outlined"
            }
            className="Action__btn"
            onClick={setFilter(TodoStatus.COMPLETED)}
          >
            Completed
          </Button>
          <Button
            variant="outlined"
            className="Action__btn"
            onClick={onDeleteAllTodo}
          >
            Clear all todos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
