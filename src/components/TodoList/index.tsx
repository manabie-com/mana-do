import React from "react";
import { Todo } from "../../models/todo";
import ItemTodo from "./ItemTodo";
import styled from "styled-components";

const NoData = styled.div`
  text-align: center;
  text-transform: uppercase;
`;

interface TodoListProps {
  dataTodos: Todo[];
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onUpdateTodo: (todoId: string, newContent: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <div id="list--container">
      <ul className="list">
        {props.dataTodos.length === 0 && <NoData>No data</NoData>}
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
      </ul>
    </div>
  );
};

export default TodoList;
