import React, { useRef, useState, useEffect, useCallback } from "react";
import { Todo, TodoStatus } from "../../models/todo";
import InlineEditable from "./components/InlineEditable";
import { handleRequest } from "../../utils/request";
import Service from "../../service";
import { isTodoCompleted, isToggleAllTodo } from "../../utils";
// import SecurityLayout from "../../layouts/SecurityLayout";
import "./todo.css";
import TodoItem from "./components/TodoItem";

export const OPTIONS = {
  ALL: {
    label: "All",
    value: "ALL",
  },
  ACTIVE: {
    label: "Active",
    value: TodoStatus.ACTIVE,
  },
  COMPLETED: {
    label: "Complete",
    value: TodoStatus.COMPLETED,
  },
};

const ToDoPage = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [params, setParams] = useState({ filter: OPTIONS.ALL.value });
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchTodos = useCallback(async () => {
    const todos: any = await handleRequest(Service.getTodos(params));
    setTodos(todos);
  }, [params]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current && inputRef.current.value) {
      await handleRequest(Service.createTodo(inputRef.current.value));
      fetchTodos();
      inputRef.current.value = "";
    }
  };

  const onDeleteTodo = async (todoId: string) => {
    await handleRequest(Service.deleteTodo(todoId));
    fetchTodos();
  };

  const onUpdateTodoStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    await handleRequest(Service.updateTodoStatus(todoId, e.target.checked));
    fetchTodos();
  };

  const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleRequest(Service.updateAllTodo(e.target.checked));
    fetchTodos();
  };

  const onDeleteAllTodo = async () => {
    await handleRequest(Service.deleteAllTodo());
    setParams({ filter: OPTIONS.ALL.value });
  };

  const onEditTodo = async (todoId: string, value: string) => {
    await handleRequest(Service.updateTodo(todoId, value));
    fetchTodos();
  };

  return (
    /**
     * For some issue with setup test and environment for testing
     * I do not open the SecurityLayout component here
     */
    // <SecurityLayout>
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
        {todos.map((todo) => {
          return (
            <TodoItem
              isCompleted={isTodoCompleted(todo)}
              key={todo.id}
              todo={todo}
              onDelete={onDeleteTodo}
              onUpdateStatus={onUpdateTodoStatus}
              onEdit={onEditTodo}
            />
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={isToggleAllTodo(todos)}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          {Object.keys(OPTIONS).map((key) => (
            <button
              key={key}
              className={
                key === params.filter ? "Active__action__btn" : "Action__btn"
              }
              onClick={() => setParams({ filter: (OPTIONS as any)[key].value })}
            >
              {(OPTIONS as any)[key].label}
            </button>
          ))}
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
    //</SecurityLayout>
  );
};

export default ToDoPage;
