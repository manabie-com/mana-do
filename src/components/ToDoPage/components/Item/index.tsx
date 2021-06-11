import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';
import { Todo, TodoStatus } from '../../../../models/todo';
import DisplayText from '../../../DisplayText';
import Checkbox from '../../../Checkbox';
import EditableText from '../EditableText';
import Icon from '../../../Icon';

interface ItemProps {
  todo: Todo;
  onChange: (value: Todo) => void;
  onDelete: (id: string) => void;
}

const Item = ({ todo, onChange, onDelete }: ItemProps) => {
  const { content, id, status } = todo;
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleOnSaveContent = (content: string) => {
    setEditing(false);
    onChange({
      ...todo,
      content,
    });
  };

  const handleOnChangeStatus = (checked: boolean) => {
    onChange({
      ...todo,
      status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    });
  };

  const handleOnDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className={styles.Item}>
      <Checkbox id={id} checked={status === TodoStatus.COMPLETED} onChange={handleOnChangeStatus} />
      {editing ? (
        <EditableText value={content} onSave={handleOnSaveContent} />
      ) : (
        <div className={styles.Content}>
          <div
            className={classNames(styles.TextWrapper, status === TodoStatus.COMPLETED && styles.Completed)}
            onDoubleClick={handleEdit}
            onClick={handleEdit}
          >
            <DisplayText>{content}</DisplayText>
          </div>
          <div className={styles.Spacing} />
          <div className={styles.Delete} onClick={handleOnDelete}>
            <Icon name="delete" color="danger" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
