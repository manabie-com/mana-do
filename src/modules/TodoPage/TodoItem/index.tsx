import React, { useState, useRef, useEffect } from 'react';
import "./styles.css"
import { Todo, TodoStatus } from '../../../models/todo';

interface TodoItemProps {
  todo: Todo,
  onChangeStatus: Function,
  onDeleteTodo: Function,
  onUpdateTodoContent: Function
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, onChangeStatus, onDeleteTodo, onUpdateTodoContent } = props
  const [edit, setEdit] = useState(false)
  const spanRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (spanRef.current && !spanRef.current.contains(event.target)) {
        spanRef.current.textContent = todo.content
        setEdit(false)
      }
    }

    if (edit) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit])

  const handleUpdateStatus = (todoId: any, e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeStatus(todoId, e)
  }
  const handleDeleteTodo = (todoId: any) => {
    onDeleteTodo(todoId)
  }
  const handleEditContent = () => {
    setEdit(true)
  }
  const onHandleTodoContent = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onUpdateTodoContent(todo.id, spanRef.current.textContent)
      setEdit(false)
    }
  }
  return (
    <div
      className={todo.status === TodoStatus.ACTIVE ? "ToDo__item" : "ToDo__item__completed"}
      onDoubleClick={handleEditContent}
    >
      <div className='Todo__content'>
        <input
          type="checkbox"
          checked={todo.status === TodoStatus.COMPLETED}
          onChange={e => handleUpdateStatus(todo.id, e)}
          onDoubleClick={e => e.stopPropagation()}
        />
        <span
          ref={spanRef}
          contentEditable={edit}
          onDoubleClick={handleEditContent}
          onKeyDown={onHandleTodoContent}
          suppressContentEditableWarning={true}
          children={todo.content}
        />
      </div>
      <button
        className="Todo__delete"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        X
      </button>
    </div >
  );
};

export default TodoItem;