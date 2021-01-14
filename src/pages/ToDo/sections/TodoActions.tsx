import React, { useState } from 'react';
import ButtonConfirm from '../../../components/Buttons/ButtonConfirm';
import Row from '../../../components/Layouts/Row';
import { Todo } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';

const TodoActions = (props:
  {
    todos: Todo[],
    onToggleAllTodo: (status: boolean) => void
    onDeleteAllTodo: () => void
  }
) => {
  const { todos, onDeleteAllTodo, onToggleAllTodo } = props;

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const [isButtonActivatingTodos, setIsButtonActivatingTodos] = useState(true);

  return <Row>
    {todos.length > 0
      ?
      <ButtonConfirm onClick={() => {
        onToggleAllTodo(isButtonActivatingTodos);
        setIsButtonActivatingTodos(!isButtonActivatingTodos)
      }} >
        {activeTodos > 0 ? 'Complete' : 'Active'} all todos
      </ButtonConfirm>
      : <div />
    }
    <ButtonConfirm onClick={onDeleteAllTodo} >
      Clear all todos
    </ButtonConfirm>
  </Row>

}

export default TodoActions;