import React from 'react';
import ButtonConfirm from '../../../components/Buttons/ButtonConfirm';
import Row from '../../../components/Layouts/Row';
import { Todo } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';

const TodoActions = (props:
  {
    todos: Todo[],
    onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDeleteAllTodo: () => void
  }
) => {
  const { todos, onDeleteAllTodo, onToggleAllTodo } = props;

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return <Row>
    {todos.length > 0 ?
      <input
        type="checkbox"
        checked={activeTodos === 0}
        onChange={onToggleAllTodo}
      /> : <div />
    }
    <ButtonConfirm onClick={onDeleteAllTodo} >
      Clear all todos
    </ButtonConfirm>
  </Row>

}

export default TodoActions;