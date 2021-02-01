import React from "react";
import { Todo } from "../../models/todo";
import ItemTodo from "./ItemTodo";

interface TodoListProps {
  dataTodos: Todo[];
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onUpdateTodo: (todoId: string, newContent: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <div className="ToDo__list">
      {props.dataTodos.length === 0 && (
        <div className="ToDo__Nodata">No data todo</div>
      )}
      {props.dataTodos.map((todo, index) => {
        return (
          <ItemTodo
            key={todo.id}
            todo={todo}
            listTodos={props.dataTodos}
            onUpdateTodoStatus={props.onUpdateTodoStatus}
            onUpdateTodo={props.onUpdateTodo}
            onDeleteTodo={props.onDeleteTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
