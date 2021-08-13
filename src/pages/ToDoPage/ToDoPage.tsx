import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ToDoPage.scss";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateContentTodo,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../constants/todo";
import { isTodoCompleted } from "../../utils";
import { useClickOutside } from "../../hooks";
import { BlockShadow, Button } from "../../components";
import { Banner, ItemTodo, LabelTodo, Toolbar } from "./components";

type EnhanceTodoStatus = TodoStatus | "ALL";

export const ToDoPage = () => {
  const history = useHistory();
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editing, setEditing] = useState(-1);
  const [valueContent, setValueContent] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outSideInput = useRef<HTMLInputElement>(null);

  //intital state
  useEffect(() => {
    //you can use localStorage instead of calling remote APIs
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      const resp: Array<Todo> = JSON.parse(localTodos);
      dispatch(setTodos(resp || []));
    }
  }, []);

  // Anytime, when todos is update new state, this useffect will run to update localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //onCreateTodo
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (!inputRef.current.value) {
        alert("Your todo is empty!!!");
        return;
      }
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        inputRef.current.value = "";
        dispatch(createTodo(resp));
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  //onUpdateTodoStatus
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  //onToggleAllTodo
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  //onDeleteAllTodo
  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  //showTodos
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

  // Handle Click outside to dicard
  const onClickOutside = () => setEditing(-1);
  useClickOutside(outSideInput, onClickOutside);

  // Handle change value content todo
  const handleChangeContentTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueContent(e.target.value);
  };

  // Handle Update Content Todo
  const handleUpdateContentTodo = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter") {
      dispatch(
        updateContentTodo({
          todoId,
          content: valueContent === null ? "" : valueContent,
        })
      );
      setEditing(-1);
      setValueContent(null);
    }
  };

  //activeTodos
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="to-do">
      <Banner ref={inputRef} onKeyDown={onCreateTodo} />
      <div className="to-do__container">
        <BlockShadow className="to-do__main">
          <LabelTodo
            title="Your list todos"
            hasCheckAll
            todos={todos}
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />

          {showTodos.map((todo, index) => {
            return (
              <ItemTodo
                key={index}
                checked={isTodoCompleted(todo)}
                editing={editing === index}
                onDelete={() => dispatch(deleteTodo(todo.id))}
                valueContent={valueContent}
                toDoContent={todo.content}
                ref={outSideInput}
                handleChangeContentTodo={handleChangeContentTodo}
                handleUpdateContentTodo={(e) =>
                  handleUpdateContentTodo(e, todo.id)
                }
                onChangeChecbox={(e) => onUpdateTodoStatus(e, todo.id)}
                onDoubleClick={() => setEditing(index)}
              />
            );
          })}

          <Button onClick={onDeleteAllTodo} isRed>
            Clear all todos
          </Button>
        </BlockShadow>
        <Toolbar
          onClickAll={() => setShowing("ALL")}
          onClickActive={() => setShowing(TodoStatus.ACTIVE)}
          onClickCompleted={() => setShowing(TodoStatus.COMPLETED)}
          showing={showing}
        />
      </div>
    </div>
  );
};
