import React, { useEffect, useReducer, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TodoCreation from "../../components/TodoCreation";
import TodoItem from "../../components/TodoItem";
import TodoToolbar from "../../components/TodoToolbar";
import { Todo, TodoStatus } from "../../models/todo";
import Service from "../../service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "../../store/actions";
import reducer, { initialState } from "../../store/reducer";
import { isTodoCompleted } from "../../utils";
import "./styles.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (content: string) => {
    try {
      const resp = await Service.createTodo(content);
      dispatch(createTodo(resp));
      setShowing("ALL");
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        history.push("/");
      }
    }
  };

  const handleSetShowing = (status: EnhanceTodoStatus) => {
    setShowing(status);
  };

  const onToggleAllTodo = (checked: boolean) => {
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  // add type Todo
  const showTodos = todos
    .filter((todo: Todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    })
    .sort((a: Todo, b: Todo) => (a.created_date > b.created_date ? -1 : 1));

  // add type accum
  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const handleDeleteTodoItem = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodoContent = (id: string, content: string) => {
    dispatch(updateTodoContent(id, content));
  };

  const handleUpdateStatus = (todoId: string, status: boolean) => {
    dispatch(updateTodoStatus(todoId, status));
  };

  return (
    <div className="ToDo__container">
      <TodoCreation createTodo={onCreateTodo} />

      <div className="ToDo__list">
        {/* index as a key is an anti-pattern */}
        {showTodos.map((todo: Todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteItem={handleDeleteTodoItem}
              updateContent={handleUpdateTodoContent}
              updateStatus={handleUpdateStatus}
            />
          );
        })}
      </div>

      <TodoToolbar
        todos={todos}
        activeTodos={activeTodos}
        handleSetShowing={handleSetShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
      />
    </div>
  );
};

export default ToDoPage;
