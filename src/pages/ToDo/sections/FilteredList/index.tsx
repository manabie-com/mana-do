import React from "react";
import { Todo, TodoFilters, TodoStatus } from "../../../../models/todo";
import { isTodoCompleted } from "../../../../utils";
import TodoItems from "./TodoItems";

const FilteredList = (props: {
  todos: Todo[];
  filter: TodoFilters;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onUpdateTodo: (todoId: string, newContent: string) => void;
  onDeleteTodo: (todoId: string) => void;
}) => {
  const { todos, filter, onUpdateTodoStatus, onDeleteTodo, onUpdateTodo } =
    props;

  const showTodos = todos.filter((todo) => {
    switch (filter) {
      case TodoFilters.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoFilters.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      case TodoFilters.ALL:
        return true;
      default:
        return true;
    }
  });
  return (
    <div>
      {showTodos?.length ? (
        showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>
                <TodoItems todo={todo} onUpdateTodo={onUpdateTodo} />
              </span>
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <p>You do not have any todo that matches this filter</p>
      )}
    </div>
  );
};

export default FilteredList;
