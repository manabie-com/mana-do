import React, { LegacyRef } from "react";

interface TodoItemContentInterface {
  todoContent: string;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const TodoItemContent = (props: TodoItemContentInterface) => {
  const { isEditing, todoContent, inputRef, onChangeTodo, onPressEnter } =
    props;
  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-item__input"
          value={todoContent}
          autoFocus
          onChange={onChangeTodo}
          onKeyDown={onPressEnter}
          data-test="todo-edit"
        />
      ) : (
        todoContent
      )}
    </>
  );
};

export default React.memo(TodoItemContent);
