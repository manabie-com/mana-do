import React, { useContext } from "react";
import { AppContext } from "../store/AppProvider";
import { TodoStatus, TodoListInterface } from "../models/todo";
import { isTodoCompleted } from "../utils";
import { updateTodoStatus, deleteTodo } from "../store/actions";
import TodoEdit from "./TodoEdit";
import { MdDelete } from "react-icons/md";

const TodoList = ({ todos, showing }: TodoListInterface) => {
  const { dispatch } = useContext(AppContext);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const showTodos =
    todos &&
    todos.filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });

  return (
    <div className="ToDo__list" data-testid="todo-list">
      {showTodos &&
        showTodos.map((todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                data-testid="todo-checkbox"
              />
              <TodoEdit todo={todo} />
              <MdDelete
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
