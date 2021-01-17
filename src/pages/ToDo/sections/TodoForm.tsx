import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormBasic from '../../../components/Forms/FormBasic';
import InputSingle from '../../../components/Inputs/InputSingle';
import Row from '../../../components/Layouts/Row';

const TodoForm = (props:
  { onCreateTodo: (todo: string) => void }
) => {
  const history = useHistory();
  const [todo, setTodo] = useState('');

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  }

  const onSubmitTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.trim().length) {
      try {
        props.onCreateTodo(todo);
        setTodo('');
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  return <Row fullWidth>
    <FormBasic fullWidth onSubmit={onSubmitTodo} data-testid="form-create-todo">
      <InputSingle
        type='text'
        fullWidth
        placeholder="What needs to be done?"
        value={todo}
        onChange={onChangeTodo}
      />
    </FormBasic>
  </Row>
}

export default TodoForm;