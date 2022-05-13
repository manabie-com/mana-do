import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { ImageButton } from '../components/ImageButton';
import { Todo, TodoStatus } from '../models/todo';

interface Props {
  task: Todo;
  onDelete: (todoId: string) => void;
  onToogleActive: (todoId: string, status: TodoStatus) => void;
  onCheckboxChange: (todoId: string, isChecked: boolean) => void;
  onChangeContent: (todoId: string, newContent: string) => void;
  onChange2Doing?: (todoId: string) => void;
  isSelected: boolean;
}

export const Task = ({
  task,
  onDelete,
  onToogleActive,
  isSelected,
  onCheckboxChange,
  onChangeContent,
  onChange2Doing = () => {},
}: Props) => {
  const [value, setValue] = useState(task.content || '');
  const [isFocus, setFocus] = useState(false);
  const isDone = task.status === TodoStatus.COMPLETED;
  const isActive = task.status === TodoStatus.ACTIVE;
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    setValue(task.content || '');
  };

  const onSaveContent = () => {
    onChangeContent?.(task.id, value);
    setOpenModal(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSaveContent();
    }
  };

  const onBlur = () => {
    setFocus(false);
    if (value !== task.content) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div
        key={task.id}
        className={clsx('ToDo__item', isFocus && 'ToDo__item__focus')}
      >
        <input
          className={clsx(isDone && 'ToDo__item__checkbox_done')}
          type="checkbox"
          checked={isDone || isSelected}
          onChange={(e) =>
            isDone
              ? onChange2Doing(task.id)
              : onCheckboxChange(task.id, e.target.checked)
          }
        />
        <input
          className={clsx(
            'Task__input',
            isActive && 'Task__input__active',
            isDone && 'Task__input__done'
          )}
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={onBlur}
          disabled={isDone}
        />
        <div className="Todo__tabs">
          {!isDone && (
            <ImageButton
              activeColor={'#FDC508'}
              active={isActive}
              IconComponent={isActive ? StarIcon : StarBorder}
              onPress={() =>
                onToogleActive(
                  task.id,
                  !isActive ? TodoStatus.ACTIVE : TodoStatus.NEW
                )
              }
            />
          )}
          <ImageButton
            onPress={() => onDelete(task.id)}
            defaultColor={'red'}
            IconComponent={DeleteForeverIcon}
          />
        </div>
      </div>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to save this task?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSaveContent} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
