import "./todo-list.css";

import React, { useMemo } from "react";
import Todo from "../../models/todo";
import TotoItem from "./TodoItem";

export interface TodoListInterface {
  todoList: Array<Todo>;
  handleUpdateTodoStatus: (todo: Todo, checked: boolean) => void;
  handleUpdateTodoContent: (todo: Todo, content: string) => void;
  handleDeleteTodo: (todoId: string) => void;
}

const TodoList = (props: TodoListInterface) => {
  const {
    handleUpdateTodoStatus,
    todoList,
    handleUpdateTodoContent,
    handleDeleteTodo,
  } = props;

  const todListEmptyWithUseMemo = useMemo(() => {
    return <span data-test="nothing-to-do">You dont have anything to do</span>;
  }, []);

  return (
    <div className="todo__list">
      {todoList.length === 0
        ? todListEmptyWithUseMemo
        : todoList.map((todo, index) => {
            return (
              <TotoItem
                data-test="todo-item"
                key={index}
                todo={todo}
                handleUpdateTodoStatus={handleUpdateTodoStatus}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodoContent={handleUpdateTodoContent}
              />
            );
          })}
    </div>
  );
};

export default React.memo(TodoList);
