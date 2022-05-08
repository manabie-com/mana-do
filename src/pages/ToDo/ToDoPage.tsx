import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';
import Service from '../../service';
import ToDoToolbar from './ToDoToolbar';
import { setTodos } from '../../store/actions';
import { AppContext } from '../../context/toDoContext';
import { TransitionGroup } from 'react-transition-group';
import { saveToLocalStorage } from '../../utils/localStorage';

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
      <div className='ToDo__list'>
        <TransitionGroup>
          {/* Using array index as the key is unreliable. That can cause strange behaviors.
          https://reactjs.org/docs/lists-and-keys.html#keys */}
          {state.todos.map(todo => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </TransitionGroup>
      </div>
      <ToDoToolbar />
    </div>
  );
}
