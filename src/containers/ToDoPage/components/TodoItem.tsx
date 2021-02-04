import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { RootState } from 'store/RootState';
import { Todo, TodoStatus } from 'models/todo';
import { isTodoCompleted } from 'utils';
import { actions } from '../slice';
import { selectVisibleTodo } from '../selectors';
import { Form } from './Form';

export interface Props {
  id: string;
}

export function TodoItem(props) {
  const { id } = props;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const todo = useSelector<RootState>(state =>
    selectVisibleTodo(state, id),
  ) as Todo;

  if (!todo) return null;

  const { content } = todo;
  const checked = isTodoCompleted(todo);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    dispatch(actions.updateTodo({ id, changes: { ...todo, status } }));
  };

  const handleRemove = () => {
    dispatch(actions.deleteTodo(id));
  };

  const handleSubmit = (value: string) => {
    dispatch(actions.updateTodo({ id, changes: { ...todo, content: value } }));
    setEdit(false);
  };

  const handleBlur = () => {
    setEdit(false);
  };

  if (edit) {
    return (
      <Form
        defaultValue={content}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <Wrapper>
      <Checkbox id={id} checked={checked} onChange={handleCheck} />
      <Content onDoubleClick={() => setEdit(true)}>{content}</Content>
      <Button onClick={handleRemove}>x</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Content = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
