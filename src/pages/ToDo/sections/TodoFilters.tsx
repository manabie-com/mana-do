import React from 'react';
import Box from '../../../components/Layouts/Box';
import Row from '../../../components/Layouts/Row';
import { TodoFilters } from '../../../models/todo';

const TodoFiltersList = (props: {
  filter: TodoFilters, setTodoFilter: (todo: TodoFilters) => void
}) => {
  const { filter, setTodoFilter } = props;

  return <Row justifyContent='flex-start'>
    <Box>
      <input
        type="radio"
        name="filter"
        value={TodoFilters.ALL}
        checked={filter === TodoFilters.ALL}
        onChange={() => setTodoFilter(TodoFilters.ALL)}
      />
      <label>All</label>
    </Box>
    <Box>
      <input
        type="radio"
        name="filter"
        value={TodoFilters.ACTIVE}
        checked={filter === TodoFilters.ACTIVE}
        onChange={() => setTodoFilter(TodoFilters.ACTIVE)}
      />
      <label >Active</label>
    </Box>
    <Box>
      <input
        type="radio"
        name="filter"
        value={TodoFilters.COMPLETED}
        checked={filter === TodoFilters.COMPLETED}
        onChange={() => setTodoFilter(TodoFilters.COMPLETED)}
      />
      <label >Completed</label>
    </Box>
  </Row>
}

export default TodoFiltersList;