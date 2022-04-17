import React, { useEffect, useRef, useState } from 'react';
import { TodoStatus, Todo } from '../../models/todo';
import useClickOutside from '../../hooks/useClickOutside';

interface TodoItemProps {
  todo: Todo;
  onDelete?: (id: string) => void;
  onComplete?: (id: string, isComplete: boolean) => void;
  onUpdateContent?: (id: string, content: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const [isUpdateContent, setIsUpdateContent] = useState<boolean>(false);
  const [editingContent, setEditingContent] = useState<string>();
  const itemRef = useRef<HTMLDivElement>(null);
  const editingContentRef = useRef<HTMLTextAreaElement>(null);

  useClickOutside(itemRef, () => {
    if (isUpdateContent === true) {
      setIsUpdateContent(false);
    }
  });

  useEffect(() => {
    if (isUpdateContent) {
      const length = editingContentRef.current?.value.length || null;
      editingContentRef.current?.setSelectionRange(length, length);
      editingContentRef.current?.focus();
    }
  }, [isUpdateContent]);

  const onEnableUpdateContent = (e: React.MouseEvent<HTMLParagraphElement>) => {
    // double click
    if (e.detail === 2) {
      setEditingContent(props.todo.content);
      setIsUpdateContent(true);
    }
  };

  const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && editingContent?.trim()) {
      props.onUpdateContent &&
        props.onUpdateContent(props.todo.id, editingContent.trim());
      setIsUpdateContent(false);
    }
  };

  return (
    <div ref={itemRef} className="item">
      {isUpdateContent ? (
        <textarea
          ref={editingContentRef}
          className="item__content item__content-edit"
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          onKeyDown={onUpdateTodoContent}
        />
      ) : (
        <p
          className="item__content item__content-noedit"
          onClick={onEnableUpdateContent}
        >
          {props.todo.content}
        </p>
      )}

      <div className="item__actions">
        <button
          className="item__delete"
          onClick={() => props.onDelete && props.onDelete(props.todo.id)}
        >
          X
        </button>
        <div className="action__checkbox">
          <input
            id={`completed-${props.todo.id}`}
            type="checkbox"
            checked={TodoStatus.COMPLETED === props.todo.status}
            onChange={(e) =>
              props.onComplete &&
              props.onComplete(props.todo.id, e.target.checked)
            }
          />
          <label htmlFor={`completed-${props.todo.id}`}>Completed</label>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
