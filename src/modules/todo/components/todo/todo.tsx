import React, { useState } from 'react';
import Input from '../../../../components/common/input/input';
import "./index.scss";
interface TodoProps {
  id: string,
  content: string,
  status: boolean,
  onChangeStatus: (id: string, status: boolean) => void,
  onDeleteItem: (id: string) => void,
  onEditTodoContent: (id: string, content: string) => void,
}

const Todo = (props: TodoProps) => {
  const { content, id, status, onChangeStatus, onDeleteItem, onEditTodoContent } = props;
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const inputValue = e.target.checked;
    onChangeStatus(id, inputValue);
  }

  const onChangeContent = (value: string) => {
    setEditedContent(value);
  }

  const onEditContent = () => {
    setEditing(true);
  }

  const onPressEnter = (event: any) => {
    onEditTodoContent(id, editedContent);
    setEditing(false);
  }

  const onClickOutsideInput = () => {
    setEditing(false);
    setEditedContent(content);
  }

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={status}
        onChange={onChangeCheckbox} />

      {!isEditing ? <span onDoubleClick={onEditContent}>{content}</span> : null}

      {isEditing ?
        <div className="content-input">
          <Input id="content" name="content" label="Content" type="text" value={content}
            onPressEnter={onPressEnter}
            onChangeValue={(name, value) => onChangeContent(value)}
            onClickOutside={onClickOutsideInput} />
        </div>

        : null}

      <button
        className="Todo__delete"
        onClick={() => onDeleteItem(id)}>x
      </button>
    </div>
  );
};

export default Todo;