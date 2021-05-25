import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import deleteImg from '../../assets/img/delete.svg';
import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    editTodo
} from '../../store/actions';
import Service from '../../services';
import {Todo, TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';

import './todo.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const [editTodoAtIndex, setEditTodoAtIndex] = useState<number>(-1);
    const [editingContent, setEditingContent] = useState<string>('');

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onEditTodoContent = async (e: React.KeyboardEvent<HTMLInputElement>, content: string, todo: Todo) => {
        if (e.key === 'Enter' && todo) {
            todo.content = content;
            await Service.editTodo(todo);
            dispatch(editTodo(todo));
            toggleEditTodoContent(-1, '');
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        todo.status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        await Service.editTodo(todo);
        dispatch(editTodo(todo));
        toggleEditTodoContent(-1, '');
    }

    const onToggleAllTodo = async (checked: boolean) => {
        await Service.toggleAllTodos(checked);
        dispatch(toggleAllTodos(checked));

    }

    const onDeleteTodo = async (id: string) => {
        await Service.deleteTodo(id);
        dispatch(deleteTodo(id));
    }

    const onDeleteAllTodo = async () => {
        await Service.deleteAllTodos();
        dispatch(deleteAllTodos());
    }

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const toggleEditTodoContent = (index: number, content: string) => {
        setEditTodoAtIndex(index);
        setEditingContent(content);
    }

    return (
      <div className="todo">
          <h1>Todo List</h1>

          <div>
              <div className="todo__creation">
                  <input
                    id="todo-create"
                    type="text"
                    ref={inputRef}
                    className="todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                  />
              </div>

              <div className="todo__filter">
                  <button id="todo-all" onClick={()=>setShowing('ALL')}>
                      All
                  </button>
                  <button id="todo-active" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                      Not Completed
                  </button>
                  <button id="todo-complete" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                      Completed
                  </button>
              </div>

              <div className="todo__list">
                  {
                      showTodos.map((todo, index) => {
                          if (editTodoAtIndex === index) {
                              const editingTodo = todo;

                              return <div key={index} className="todo__edit">
                                  <input
                                    autoFocus={true}
                                    placeholder="What need to be done?"
                                    value={editingContent}
                                    onKeyDown={(e) => onEditTodoContent(e, editingContent, editingTodo)}
                                    onChange={(event) => setEditingContent(event.target.value)}
                                    onBlur={() => toggleEditTodoContent(-1, '')}
                                  />
                              </div>
                          } else {
                              return (
                                <div key={index} className="todo__item">
                                    <span
                                      className={`todo__item-content ${todo.status === TodoStatus.COMPLETED ? "complete" : ""}`}
                                      onDoubleClick={() => toggleEditTodoContent(index, todo.content)}
                                    >
                                        {todo.content}
                                    </span>
                                    <div className="todo__item-action">
                                        <input
                                          type="checkbox"
                                          checked={isTodoCompleted(todo)}
                                          onChange={(e) => onUpdateTodoStatus(e, todo)}
                                        />

                                        <button
                                          className="todo__delete"
                                          onClick={() => onDeleteTodo(todo.id)}
                                        >
                                            <img src={deleteImg} alt="Delete" />
                                        </button>
                                    </div>
                                </div>
                              );
                          }
                      })
                  }
              </div>

              <div className="todo__toolbar">
                  <button className="action__btn" onClick={() => onToggleAllTodo(activeTodos !== 0)}>
                      {activeTodos !== 0 ? 'Mark all as Completed' : 'Mark all as Not Completed'}
                  </button>
                  <button className="action__btn" onClick={onDeleteAllTodo}>
                      Clear all todos
                  </button>
              </div>
          </div>
      </div>

    );
};

export default ToDoPage;
