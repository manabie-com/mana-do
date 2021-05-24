import React from 'react';
import TodoCell from '../todo-cell/TodoCell';
import Classes from './TodoActions.module.scss';
import RemoveButton from '../../../components/remove-button/RemoveButton';
import FilterContent from './filter-content/FilterContent';
import {Todo, TodoStatus} from '../../../models/todo'

export interface ITodoActionProps {
  todos: Todo[];
  removeAllTodos: () => void;
  toggleAllTodos: (checked: boolean) => void;
  filterStatus: string;
  setFilterStatus: (filterStatus: string) => void;
}

const TodoActions = (props: ITodoActionProps) => {
  const {
    todos,
    removeAllTodos,
    toggleAllTodos,
    filterStatus,
    setFilterStatus,
  } = props;
  const isAllTodoCompleted = todos.every(todo => todo.status === TodoStatus.COMPLETED);
  const isDisabled = todos.length === 0;
  return (
    <div className={Classes.TodoActions}>
      <TodoCell minWidth="40px" maxWidth="40px" width="40px" center={true}/>
      <TodoCell className={Classes.ToggleAllCell} maxWidth="50px" width="50px">
        <input
          className={Classes.Checkbox}
          type="checkbox"
          checked={isAllTodoCompleted}
          disabled={isDisabled}
          onChange={(e) => toggleAllTodos(e.target.checked)}
        />
      </TodoCell>
      <TodoCell minWidth="200px" grow={3} center={true}>
        <FilterContent filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
      </TodoCell>
      <TodoCell className={Classes.RemoveCell} minWidth="100px" maxWidth="130px" center={true}>
        <RemoveButton disabled={isDisabled} onClick={() => removeAllTodos()}>Remove all</RemoveButton>
      </TodoCell>
    </div>
  );
}

export default TodoActions;