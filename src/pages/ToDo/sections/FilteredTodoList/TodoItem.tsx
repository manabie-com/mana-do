import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormBasic from '../../../../components/Forms/FormBasic';
import InputSingle from '../../../../components/Inputs/InputSingle';
import Box from '../../../../components/Layouts/Box';
import Row from '../../../../components/Layouts/Row';
import TextNormal from '../../../../components/Text/TextNormal';
import DoubleClickable from '../../../../components/Wrappers/DoubleClickable';
import { Todo } from '../../../../models/todo';

const TodoItem = (props:
  { todo: Todo, onUpdateTodo: (todoId: string, newContent: string) => void }
) => {
  const history = useHistory();
  const { todo } = props;
  const [todoContent, setTodoContent] = useState(todo.content);
  useEffect(() => {
    setTodoContent(todo.content);
  }, [todo])

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(event.target.value);
  }
  const onSubmitTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContent = todoContent.trim();
    if (newContent.length) {
      try {
        props.onUpdateTodo(todo.id, newContent);
        setIsUpdating(false);
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const [isUpdating, setIsUpdating] = useState(false);

  return isUpdating
    ? <Row fullWidth>
      <FormBasic fullWidth onSubmit={onSubmitTodo} data-testid='form-update-todo'>
        <InputSingle
          autoFocus={true}
          fullWidth
          placeholder="Enter new todo..."
          value={todoContent}
          onChange={onChangeTodo}
          onBlur={() => {
            setIsUpdating(false);
            setTodoContent(todo.content);
          }}
        />
      </FormBasic>
    </Row>
    : <DoubleClickable onDoubleClick={() => setIsUpdating(true)}>
      <Box p={1}>
        <TextNormal fontSize="medium">{todoContent}</TextNormal>
      </Box>
    </DoubleClickable>
}

export default TodoItem;