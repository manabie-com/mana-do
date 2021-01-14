import React from 'react';
import ButtonConfirm from '../../../components/Buttons/ButtonConfirm';
import Row from '../../../components/Layouts/Row';
import { TodoFilters } from '../../../models/todo';

const TodoFiltersList = (props: {
  setShowing: (todo: TodoFilters) => void
}) => {
  const { setShowing } = props;

  return <Row>
    <Row>
      <ButtonConfirm onClick={() => setShowing(TodoFilters.ALL)}>
        All
    </ButtonConfirm>
      <ButtonConfirm onClick={() => setShowing(TodoFilters.ACTIVE)}>
        Active
    </ButtonConfirm>
      <ButtonConfirm onClick={() => setShowing(TodoFilters.COMPLETED)}>
        Completed
    </ButtonConfirm>
    </Row>
  </Row>
}

export default TodoFiltersList;