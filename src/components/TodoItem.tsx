import * as React from "react";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";
import useDoubleClick from "use-double-click";
import { useClickAway } from "react-use";

interface TodoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo;
  onUpdate: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onRemove: (todoId: string) => void;
  onToggle?: (todoId: string, checked: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
}

export const TodoItem = (props: TodoItemProps) => {
  const { todo, onUpdate, onRemove, onToggle = () => {}, onEdit } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isEdit, setEdit] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useDoubleClick({
    onSingleClick: () => {
      onToggle(todo.id, !(todo.status === TodoStatus.COMPLETED));
    },
    onDoubleClick: () => {
      setEdit(true);
      inputRef.current?.focus();
    },
    ref: containerRef,
    latency: 250,
  });

  useClickAway(containerRef, () => {
    setEdit(false);
  });

  const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      onEdit(todo.id, inputRef.current.value);
      inputRef.current.value = "";
      setEdit(false);
    }
  };

  return (
    <div className="ToDo__item" ref={containerRef} data-testid="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdate(e, todo.id)}
      />
      {isEdit ? (
        <div className="Todo__edit">
          <input
            ref={inputRef}
            defaultValue={todo.content}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onEditTodo}
            onBlur={() => setEdit(false)}
          />
        </div>
      ) : (
        <span>{todo.content}</span>
      )}
      <button className="Todo__delete" onClick={() => onRemove(todo.id)}>
        X
      </button>
    </div>
  );
};
