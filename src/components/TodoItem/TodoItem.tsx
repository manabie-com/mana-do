import React, { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';
import { Todo, TodoStatus } from 'models/todo';
import styles from './TodoItem.module.scss';
import { useDoubleClick, useOnClickOutside } from 'hooks';
import { ReactComponent as IconTrash } from 'assets/icon-trash.svg';

type Props = {
	todo: Todo;
	onDeleteTodo: (todoId: string) => void;
	onToggleTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
	onUpdateTodoContent: (todoId: string, content: string) => void;
};

const TodoItem = ({ todo: { id, content, status }, onDeleteTodo, onToggleTodoStatus, onUpdateTodoContent }: Props) => {
	const [ editMode, setEditMode ] = useState(false);
	const [ newContent, setNewContent ] = useState(content);
	const ref = useRef<any>();

	const handleDeleteItem = useCallback(
		() => {
			onDeleteTodo(id);
		},
		[ id, onDeleteTodo ]
	);

	const handleChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
		setNewContent(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && Boolean(newContent)) {
			onUpdateTodoContent(id, newContent);
			setEditMode(false);
		}
	};

	const onToggle = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onToggleTodoStatus(event, id);
		},
		[ onToggleTodoStatus, id ]
	);

	const handleClickItem = useDoubleClick(
		() => {},
		() => {
			setEditMode(true);
		}
	);

	useOnClickOutside(ref, () => {
		setEditMode(false);
		setNewContent(content);
	});

  const isCompleted = status === TodoStatus.COMPLETED

	return (
		<div key={id} className={styles.todoItem} ref={ref} onClick={handleClickItem}>
      <div className={styles.itemInner}>
        {!editMode ? (
          <>
            <div className={styles.itemInnerLeft}>
              <input type="checkbox" onChange={onToggle} checked={isCompleted} />
              <span className={isCompleted ? styles.itemCompleted : ''}>{content}</span>
            </div>
            <button className={styles.todoDelete} onClick={handleDeleteItem}>
              <IconTrash />
            </button>
          </>
        ) : (
          <div className={styles.itemInnerLeft}>
            <input type="checkbox" onChange={onToggle} checked={isCompleted} />
            <input
              type="text"
              value={newContent}
              onChange={handleChangeContent}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>
		</div>
	);
};

export default TodoItem;
