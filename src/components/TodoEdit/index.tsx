import React, { useRef, useEffect } from "react";
import TodoInput from "components/TodoInput";

export interface TodoEditProps {
  value?: string;
  onSubmit: (value: string) => void;
  onCloseEdit: () => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({
  value = "",
  onSubmit,
  onCloseEdit,
}) => {
  const editRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClickOutside(event: MouseEvent) {
    if (editRef.current && !editRef.current.contains(event.target as Node)) {
      onCloseEdit();
    }
  }

  return (
    <div ref={editRef}>
      <TodoInput
        data-testid="todo-input"
        autoFocus={true}
        defaultValue={value}
        onEnter={onSubmit}
      />
    </div>
  );
};

export default TodoEdit;
