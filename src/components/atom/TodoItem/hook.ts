import { updateTodoContent, updateTodoStatus } from "actions/TodoListAction";
import { ToDoPageContext } from "components/organism/Todo/hooks";
import useOnClickOutside from "hooks/useOnClickOutside";
import { Todo } from "models/todo";
import React, { useContext, useRef, useState } from "react";

const useTodoItem = (todo: Todo) => {
  const { dispatch } = useContext(ToDoPageContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateContent, setUpdateContent] = useState(false);

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const handleUpdateTodoContent = () => {
    if (inputRef.current) {
      dispatch(updateTodoContent(todo.id, inputRef.current.value));
      setUpdateContent(false);
    }
  };

  // Update content item
  useOnClickOutside(inputRef, () => setUpdateContent(false));
  const onUpdateToDoByKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current && inputRef.current.value) {
      handleUpdateTodoContent();
    }
  };

  return {
    updateContent,
    onUpdateToDoByKeydown,
    onUpdateTodoStatus,
    setUpdateContent,
    dispatch,
    inputRef,
  };
};

export default useTodoItem;
