import React from "react";
import { Todo, TodoStatus } from "../models/todo";
import TodoItem from "./TodoItem";

interface ITodoListProps {
  todoList: Array<Todo>;
  showing: string;
  onUpdateTodoStatus: any;
  onUpdateTodo: any;
  onDeleteTodo: any;
  isTodoCompleted: any;
  onToggleAllTodo: any;
}

const TodoList = ({
  todoList,
  showing,
  onUpdateTodoStatus,
  onUpdateTodo,
  onDeleteTodo,
  isTodoCompleted,
  onToggleAllTodo,
}: ITodoListProps) => {
  const showTodoList = todoList.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todoList.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="todo_list">
      {todoList.length > 0 ? (
        <>
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
            className="input_checked"
          />
          <div className="hr-gray" />
        </>
      ) : (
        <div />
      )}
      {showTodoList.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={index}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            isTodoCompleted={isTodoCompleted}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
