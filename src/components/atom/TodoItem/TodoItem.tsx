import React from "react";
import Checkbox from "components/atom/Checkbox";
import { Todo } from "models/todo";
import { deleteTodo } from "actions/TodoListAction";
import { isTodoCompleted } from "utils";
import GarbageSVG from "svgs/Garbage";
import EditSVG from "svgs/Edit";
import useTodoItem from "./hook";

type ToDoItemProps = {
  todo: Todo;
};

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const {
    updateContent,
    onUpdateToDoByKeydown,
    onUpdateTodoStatus,
    setUpdateContent,
    dispatch,
    inputRef,
  } = useTodoItem(todo);

  return (
    <React.Fragment>
      {updateContent ? (
        <div key={todo.id} className="ToDo__item ToDo__item--edit">
          <input
            ref={inputRef}
            className="Todo__input"
            data-testid="todo_input"
            defaultValue={todo.content}
            onKeyPress={onUpdateToDoByKeydown}
            autoFocus
          />
        </div>
      ) : (
        <div key={todo.id} className="ToDo__item">
          <Checkbox
            checked={isTodoCompleted(todo)}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            label={todo.content}
            name={todo.id}
            id={todo.id}
            fullWidth={true}
          />
          <div className="Todo__actions">
            <button
              className="Todo__action Todo__action--edit"
              onClick={() => setUpdateContent(true)}
            >
              <EditSVG />
            </button>
            <button
              className="Todo__action Todo__action--delete"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              <GarbageSVG />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ToDoItem;
