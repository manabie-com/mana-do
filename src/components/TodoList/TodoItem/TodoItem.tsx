import React, { memo, useRef, useState } from "react"
import clsx from "clsx"

import styles from "./TodoItem.module.scss"

import { Todo } from "models/todo";
import { getTodoStatus, isTodoCompleted } from "utils";
import { deleteTodo, updateTodoContent, updateTodoStatus } from "store/action-creators";

import Checkbox from "components/Checkbox";
import Input from "components/Input";
import OutsideClickHandler from "components/OutsideClickHandler";

export interface ITodoItemProps extends Todo {
  className?: string,
  dispatch: Function,
}

const TodoItem = (props: ITodoItemProps) => {
  const { 
    className,
    dispatch,
    id, content, status
  } = props;
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    dispatch(updateTodoStatus(id, getTodoStatus(checked)))
  }

  const handleDeleteTodo = (): void => {
    dispatch(deleteTodo(id));
  } 

  const handleUpdateTodoContent = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter' && inputRef.current) {
      const value = inputRef.current.value;
      if (!value) return; // do nothing if empty value
      dispatch(updateTodoContent(id, value))
      setEditing(false);
    }
  }

  const handleDoubleClick = (): void => {
    setEditing(true);
  }

  const handleClickOutside = (): void => {
    if (editing) setEditing(false)
  }
  return (
    <div className={clsx(styles.root, className && className, editing && styles.editing)} data-test="todo-item">
      <Checkbox 
        checked={isTodoCompleted(status)} 
        onChange={handleUpdateTodoStatus} 
        className={clsx(styles.checkbox, editing && styles.hiddenCheckbox)}
        data-test="todo-item-checkbox"
      />
      { editing ?
        <OutsideClickHandler onClose={handleClickOutside} closeOnEscPress>
          <Input 
            className={styles.input}
            ref={inputRef}
            defaultValue={content}
            onKeyDown={handleUpdateTodoContent}
            data-test="edit-field"
          /> 
        </OutsideClickHandler> :
        <span 
          className={clsx(styles.content, isTodoCompleted(status) && styles.active)}
          data-test="content"
          onDoubleClick={handleDoubleClick}
        >
          {content}
        </span>
      }
      { !editing &&
        <div 
          onClick={handleDeleteTodo} 
          className={styles.deleteButton} 
          data-test="delete-button"
        >
          X
        </div>
      }
    </div>
  )
}

export default memo(TodoItem)