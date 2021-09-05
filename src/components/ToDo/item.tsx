import React, { FunctionComponent, useState } from "react";
import ClickOutsideHandler from "../../hooks/onClickOutside";
import { Todo, TodoStatus } from "../../models/todo";
import Button from "../common/button";
import Checkbox from "../common/inputs/checkbox";

interface Props {
  todo: Todo;
  isTodoCompleted: (todo: Todo) => boolean;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
}

const ToDoItem: FunctionComponent<Props> = ({
  todo,
  isTodoCompleted,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState(todo.content);

  const onDoubleClick = () => {
    setToggle(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const clickOutside = () => {
    setToggle(true);
    onUpdateTodo({
      ...todo,
      content,
    }) 
  };

  const onChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
    onUpdateTodo({
      ...todo,
      status,
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickOutside()
    }
  }

  return (
    <div className="ToDo__item">
      <Checkbox
        checked={isTodoCompleted(todo)}
        onChange={onChage}
      />
      {toggle ? (
        <span onDoubleClick={onDoubleClick}>{todo.content}</span>
      ) : (
        <ClickOutsideHandler className="ToDo__item_content" callback={clickOutside}>
          <input
            type="text"
            value={content}
            onChange={handleChange}
            onKeyDown={(e) => onKeyDown(e)}
          />
        </ClickOutsideHandler>
      )}
      <Button
        className="Todo__delete"
        label="X"
        onClick={() => onDeleteTodo(todo.id)}
      />
    </div>
  );
};

export default ToDoItem;
