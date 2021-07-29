import * as React from "react";
import TodoItem from "./TodoItem";

interface ITodoListProps {}

const TodoList: React.FunctionComponent<any> = ({
  showTodos,
  isTodoCompleted,
  onUpdateTodoStatus,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  return (
    <ul className="ToDo__list">
      {showTodos.map((todo: any) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isTodoCompleted={isTodoCompleted}
            onUpdateTodoStatus={onUpdateTodoStatus}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        );
      })}
    </ul>
  );
};

export default React.memo(TodoList);
