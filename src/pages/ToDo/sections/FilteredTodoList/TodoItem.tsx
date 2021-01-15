import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormBasic from '../../../../components/Forms/FormBasic';
import InputSingle from '../../../../components/Inputs/InputSingle';
import Row from '../../../../components/Layouts/Row';
import TextNormal from '../../../../components/Text/TextNormal';
import Clickable from '../../../../components/Wrappers/Clickable';
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
      <FormBasic fullWidth onSubmit={onSubmitTodo} >
        <InputSingle
          autoFocus={true}
          fullWidth
          placeholder="What needs to be done?"
          value={todoContent}
          onChange={onChangeTodo}
          onBlur={() => {
            setIsUpdating(false);
            setTodoContent(todo.content);
          }}
        />
      </FormBasic>
    </Row>
    : <Clickable onClick={() => setIsUpdating(true)}>
      <TextNormal >{todoContent}</TextNormal>
    </Clickable>
}

export default TodoItem;