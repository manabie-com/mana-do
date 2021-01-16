import React from 'react';
import ButtonNeutral from '../../../components/Buttons/ButtonNeutral';
import CheckBox from '../../../components/Inputs/CheckBox';
import Center from '../../../components/Layouts/Center';
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

  return <Row>
    {todos.length > 0
      ?
      <Center>
        <CheckBox
          checked={activeTodos === 0}
          onChange={(e) => onToggleAllTodo(e.target.checked)}
        />
      </Center>
      : <div />
    }

    <ButtonNeutral onClick={onDeleteAllTodo} >
      Clear all todos
    </ButtonNeutral>
  </Row>

}

export default TodoActions;