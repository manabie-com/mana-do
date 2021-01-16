import React from 'react';
import Center from '../../../../components/Layouts/Center';
import Row from '../../../../components/Layouts/Row';
import { TodoFilters } from '../../../../models/todo';
import FilterItem from './FilterItem';

const TodoFiltersList = (props: {
  filter: TodoFilters, setTodoFilter: (todo: TodoFilters) => void
}) => {
  const { filter, setTodoFilter } = props;

  return <Center>
    <Row justifyContent='flex-start'>
      <FilterItem
        name='All'
        value={TodoFilters.ALL}
        checked={filter === TodoFilters.ALL}
        onChange={() => setTodoFilter(TodoFilters.ALL)}
        label="All &#10000;"
      />
      <FilterItem
        name="Active"
        value={TodoFilters.ACTIVE}
        checked={filter === TodoFilters.ACTIVE}
        onChange={() => setTodoFilter(TodoFilters.ACTIVE)}
        label="Active &#10132;"
      />
      <FilterItem
        name="Completed"
        value={TodoFilters.COMPLETED}
        checked={filter === TodoFilters.COMPLETED}
        onChange={() => setTodoFilter(TodoFilters.COMPLETED)}
        label="Completed 	&#10004;"
      />
    </Row>
  </Center>
}

export default TodoFiltersList;