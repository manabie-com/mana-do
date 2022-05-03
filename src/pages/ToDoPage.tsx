import { useEffect, useReducer, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
  createToDo,
  toggleAllToDos,
  deleteAllToDos,
  updateToDoStatus,
  deleteToDo,
  editToDo,
  filterToDos
} from '../store/actions';
import Service from '../service';
import { EnhanceTodoStatus, KeyboardKeys } from '../components/types';
import { ToDoCreation, ToDoList, ToDoToolbar } from '../components';
import { ToDoPageContainer } from '../components/styles';
import { TodoStatus } from '../types/types';
import { isValid } from '../utils/validateEntry';
import HeaderLogo from '../assets/images/header.jpg';
import { StyledHeaderLogo } from '../styles/styles';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const [showEditField, setShowEditField] = useState(false);
  const [selectedTodoId, setSelectedToDoId] = useState('');
  const [filter, setFilter] = useState<EnhanceTodoStatus | 'ALL'>('ALL');

  const inputRef = useRef<HTMLInputElement>(null);
  const todoIdRef = useRef('');

  useEffect(() => { // add click event listener. this will be used to determine if we need to close the inline edit field.
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof HTMLInputElement) { // check if target is input element.
      const target = e.target as HTMLInputElement;
      console.log(selectedTodoId);
      const dataId = target.getAttribute('data-id'); // get the data-id from the element. this will be used to determine if the inline edit field is clicked.
      if (dataId !== todoIdRef.current) setShowEditField(false); // check if todo ids are not equal, if not equal, it will close the inline edit field.
    } else setShowEditField(false);
  };

  const onHandleShowInlineEdit = (hasInlineEdit: boolean, todoId: string) => {
    setShowEditField(hasInlineEdit);
    setSelectedToDoId(todoId);
    todoIdRef.current = todoId;
  };

  const onCreateTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyboardKeys.ENTER && inputRef?.current?.value && isValid(todos, inputRef.current.value)) {
      const resp = await Service.createTodo(inputRef.current.value);
      setFilter('ALL');
      dispatch(filterToDos('ALL'));
      dispatch(createToDo(resp));
      inputRef.current.value = '';
    }
  };

  const onEditTodo = async (e: KeyboardEvent<HTMLInputElement>, todoId: string, todoContent: string ) => dispatch(editToDo(todoId, todoContent));

  const onUpdateTodoStatus = (e: ChangeEvent<HTMLInputElement>, todoId: string) => dispatch(updateToDoStatus(todoId, e.target.checked));

  const onToggleAllTodo = (e: ChangeEvent<HTMLInputElement>) => todos.length && dispatch(toggleAllToDos(e.target.checked));

  const onDeleteToDo = (toDoId: string) => dispatch(deleteToDo(toDoId));

  const onDeleteAllTodo = () => dispatch(deleteAllToDos());

  const onFilterStatus = (todoStatus: TodoStatus | 'ALL') => {
    setFilter(todoStatus);
    dispatch(filterToDos(todoStatus));
  };

  return (
    <ToDoPageContainer>
      <StyledHeaderLogo src={HeaderLogo} />
      <ToDoCreation inputRef={inputRef} onCreateTodo={onCreateTodo} />
      <ToDoToolbar
        todos={todos}
        filter={filter}
        onFilterStatus={onFilterStatus}
        onToggleAllTodo={onToggleAllTodo}
        onDeleteAllTodo={onDeleteAllTodo}
      />
      <ToDoList
        todos={todos}
        showEditField={showEditField}
        selectedTodoId={selectedTodoId}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteToDo={onDeleteToDo}
        onEditTodo={onEditTodo}
        onHandleShowInlineEdit={onHandleShowInlineEdit}
      />
    </ToDoPageContainer>
  );
};

export default ToDoPage;
