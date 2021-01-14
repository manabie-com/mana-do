import React from 'react';
import ButtonConfirm from '../../../components/Buttons/ButtonConfirm';
import CheckBox from '../../../components/Inputs/CheckBox';
import Box from '../../../components/Layouts/Box';
import Column from '../../../components/Layouts/Column';
import Row from '../../../components/Layouts/Row';
import TextNormal from '../../../components/Text/TextNormal';
import TextWarning from '../../../components/Text/TextWarning';
import { Todo, TodoFilters, TodoStatus } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';

const FilteredTodoList = (props: {
  todos: Todo[]
  filter: TodoFilters
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
  onDeleteTodo: (todoId: string) => void
}) => {
  const { todos, filter, onUpdateTodoStatus, onDeleteTodo } = props;

  const shownTodos = todos.filter((todo) => {
    switch (filter) {
      case TodoFilters.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoFilters.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      case TodoFilters.ALL:
        return true;
      default:
        return false;
    }
  });

  return <Column>
    {
      shownTodos?.length
        ? shownTodos.map((todo, index) => {
          return (
            <Row key={index}>
              <CheckBox
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <Box fullWidth>
                <TextNormal >{todo.content}</TextNormal>
              </Box>
              <ButtonConfirm onClick={() => onDeleteTodo(todo.id)}>
                X
          </ButtonConfirm>
            </Row>
          );
        })
        : <TextWarning>You do not have any todo that matches this filter</TextWarning>
    }
  </Column>
}

export default FilteredTodoList;