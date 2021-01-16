import React from 'react';
import ButtonNegative from '../../../../components/Buttons/ButtonNegative';
import CheckBox from '../../../../components/Inputs/CheckBox';
import Box from '../../../../components/Layouts/Box';
import Center from '../../../../components/Layouts/Center';
import Column from '../../../../components/Layouts/Column';
import Row from '../../../../components/Layouts/Row';
import RulerHorizontal from '../../../../components/Ruler/RulerHorizontal';
import TextWarning from '../../../../components/Text/TextWarning';
import { Todo, TodoFilters, TodoStatus } from '../../../../models/todo';
import { isTodoCompleted } from '../../../../utils';
import TodoItem from './TodoItem';
const FilteredTodoList = (props: {
  todos: Todo[]
  filter: TodoFilters
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
  onUpdateTodo: (todoId: string, newContent: string) => void
  onDeleteTodo: (todoId: string) => void
}) => {
  const { todos, filter, onUpdateTodoStatus, onDeleteTodo, onUpdateTodo } = props;

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

  return <Column g={1}>
    {
      shownTodos?.length
        ? shownTodos.map((todo, index) => {
          return (
            <Column>
              <Row key={index}>
                <Center>
                  <CheckBox
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                </Center>
                <Box fullWidth>
                  <TodoItem todo={todo} onUpdateTodo={onUpdateTodo} />
                </Box>
                <ButtonNegative onClick={() => onDeleteTodo(todo.id)}>
                  Remove
              </ButtonNegative>
              </Row>
              <RulerHorizontal />
            </Column>
          );
        })
        : <TextWarning>You do not have any todo that matches this filter</TextWarning>
    }
  </Column>
}

export default FilteredTodoList;