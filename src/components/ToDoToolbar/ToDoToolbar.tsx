import { FC, useEffect, useRef } from 'react';
import { Toolbar, ToolbarTabs, ActionButton } from './styles';
import {ToDoToolbarProps } from './types';
import { StyledInput } from './styles';
import { TodoStatus } from '../../types/types';
import { ButtonLabels } from './constants';
import { checkToDoStatus } from '../utils';
import { getActiveToDos } from './utils';

const ToDoToolbar: FC<ToDoToolbarProps> = ({
  todos,
  filter,
  onFilterStatus,
  onToggleAllTodo,
  onDeleteAllTodo
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkboxRef.current) return;
    if (!checkToDoStatus(todos) && getActiveToDos(todos).length < todos.length) checkboxRef.current.indeterminate = true; // set indeterminate to true, this will show checkbox like this [-] if some of the todos are completed.
    else checkboxRef.current.indeterminate = false; // set indeterminate to false if all todos are completed or all todos are in active status. this will remove [-] in checkbox.
  }, [todos]);

  const onHandleClick = (toDoStatus: TodoStatus | 'ALL') => () => onFilterStatus(toDoStatus);

  const toolbarTabButtons = [
    { // All button
      filterKey: 'ALL',
      label: ButtonLabels.ALL
    },
    { // Active button
      filterKey: TodoStatus.ACTIVE,
      label: ButtonLabels.ACTIVE,
    },
    { // Completed button
      filterKey: TodoStatus.COMPLETED,
      label: ButtonLabels.COMPLETED,
    }
  ];

  return (
    <Toolbar data-testid="toolbar-container">
      <StyledInput
        data-testid="select-all"
        ref={checkboxRef}
        type="checkbox"
        checked={checkToDoStatus(todos)}
        onChange={onToggleAllTodo}
        className={!todos.length ? 'hidden' : ''} // use to hide the field to prevent other elements from moving.
      />
      <ToolbarTabs>
        { toolbarTabButtons.map((button, index) => (
          <ActionButton
            key={index}
            data-testid={`action-button-${index}`}
            className={filter === button.filterKey ? 'active' : ''}
            onClick={onHandleClick(button.filterKey as TodoStatus | 'ALL')}
          >
            { button.label }
          </ActionButton>
        ))}
      </ToolbarTabs>
      <ActionButton data-testid="delete-all" onClick={onDeleteAllTodo}>{ ButtonLabels.CLEAR_ALL_TODOS }</ActionButton>
    </Toolbar>
  );
};

export default ToDoToolbar;
