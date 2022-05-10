import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';
import Service from '../../service';
import ToDoToolbar from './ToDoToolbar';
import { setTodos } from '../../store/actions';
import { AppContext } from '../../context/toDoContext';
import { TransitionGroup } from 'react-transition-group';
import { saveToLocalStorage } from '../../utils/localStorage';
import { AppState } from '../../store/reducer';

export default function ToDoPage() {
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, [dispatch]);

  React.useEffect(() => {
    saveToLocalStorage(state.todos);
  }, [state.todos]);

  return (
    <div className='ToDo__container'>
      <ToDoInput />
      <FilteredToDoList state={state} />
      <ToDoToolbar />
    </div>
  );
}

function FilteredToDoList({ state }: { state: AppState }) {
  const { todos, filter } = state;
  if (filter === 'ALL') {
    return (
      <div className='ToDo__list'>
        <TransitionGroup>
          {todos.map(todo => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </TransitionGroup>
      </div>
    );
  }

  const filteredTodos = todos.filter(todo => todo.status === filter);
  return (
    <div className='ToDo__list'>
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </TransitionGroup>
    </div>
  );
}
