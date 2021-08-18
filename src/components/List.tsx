import React, { useRef } from "react";
import "./List.css";
import { Todo } from "../models/todo";
import { useDispatch } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { actionCreators } from "../store";
import Editable from "./Editable";

type Props = {
  showTodos: Array<Todo>;
  isTodoCompleted: (todo: Todo) => boolean;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
};

const List: React.FC<Props> = ({
  showTodos,
  isTodoCompleted,
  onUpdateTodoStatus,
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { deleteTodo, updateTodoContent } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const renderList = () => {
    return showTodos.map((todo, index) => {
      return (
        <div key={index} className="ToDo__item">
          <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
          />
          <Editable
            text={todo.content}
            type="input"
            placeholder=""
            todo={todo}
            childRef={inputRef}
          >
            <input
              type="text"
              name="task"
              placeholder="Delete by enter"
              value={todo.content}
              onChange={(e) => updateTodoContent(todo.id, e.target.value)}
              ref={inputRef}
            />
          </Editable>
          <button className="Todo__delete" onClick={() => deleteTodo(todo.id)}>
            X
          </button>
        </div>
      );
    });
  };
  return <div className="ToDo__list">{renderList()}</div>;
};

export default List;
