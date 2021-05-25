import React, {ChangeEvent, useEffect, useState, useRef} from 'react';
import {Todo, TodoStatus} from '../../../models/todo';
import Classes from './TodoItem.module.scss';
import TodoCell from '../todo-cell/TodoCell';
import DraggableRow from './draggsble-row/DraggableRow';
import RemoveButton from '../../../components/remove-button/RemoveButton';
import {useOnClickOutside} from '../../../utils/hooks';

export interface ITodoItemProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, content: string) => void;
  changeTodoStatus: (id: string, status: TodoStatus) => void;
  index: number;
  isActiveRearrange: boolean
}

const TodoItem = (props: ITodoItemProps) => {
  const {
    todo,
    removeTodo,
    updateTodo,
    changeTodoStatus,
    index,
    isActiveRearrange,
  } = props;
  const [isEditMode, setEditMode] = useState(false);
  const [content, setContent] = useState(todo.content);
  const isCompleted = todo.status === TodoStatus.COMPLETED;
  const ref = useRef<HTMLInputElement>(null);
  const handleClickOutside = () =>{
    setEditMode(false);
    setContent(todo.content);
  };

  useEffect(() => {
    setContent(todo.content);
  }, [todo]);

  useOnClickOutside(ref, handleClickOutside);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && content) {
      setEditMode(false);
      updateTodo(todo.id, content);
    }
  };
  const changeToEditMode = () => {
    setEditMode(true);
  };
  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const isCompleted = e.target.checked;
    const status = isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    changeTodoStatus(todo.id, status);
  }
  const contentElement = isEditMode
    ? <input ref={ref} type="text"
             value={content}
             onKeyDown={handleKeyDown}
             onChange={(e) => setContent(e.target.value)}/>
    : todo.content;

  return (
    <DraggableRow
      draggableId={todo.id}
      index={index}
      isActiveRearrange={isActiveRearrange}>
      {() => (
        <>
          <TodoCell className={Classes.CheckboxCell} maxWidth="50px" width="50px" center={true}>
            <input onChange={handleChangeStatus} checked={isCompleted} className={Classes.Checkbox}
                   type="checkbox"/>
          </TodoCell>
          <TodoCell minWidth="200px" grow={3} onDoubleClick={changeToEditMode}>
            {contentElement}
          </TodoCell>
          <TodoCell minWidth="100px" maxWidth="130px" center={true}>
            <RemoveButton onClick={() => removeTodo(todo.id)}>Remove</RemoveButton>
          </TodoCell>
        </>
      )}
    </DraggableRow>
  );
};

export default TodoItem;