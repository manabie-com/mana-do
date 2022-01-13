import React from "react";
import Todo from "../../models/todo";
import TotoItem from "./TodoItem";

export interface TodoListInterface {
  todoList: Array<Todo>;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  handleUpdateTodo: (todoId: string, content: string) => void;
  handleDeleteTodo: (todoId: string) => void;
}

const TodoList = (props: TodoListInterface) => {
  const { onUpdateTodoStatus, todoList, handleUpdateTodo, handleDeleteTodo } =
    props;

  return (
    <div className="todo__list">
      {todoList.length === 0 ? (
        <span data-test="nothing-to-do">You dont have anything to do</span>
      ) : (
        todoList.map((todo, index) => {
          return (
            <TotoItem
              data-test="todo-item"
              key={index}
              todo={todo}
              onUpdateTodoStatus={onUpdateTodoStatus}
              deleteTodo={handleDeleteTodo}
              updateTodo={handleUpdateTodo}
            />
          );
        })
      )}
    </div>
  );
};

export default TodoList;
