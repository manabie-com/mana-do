import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {RouteComponentProps} from "react-router-dom";

import reducer, {initialState} from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus, updateToDoContent,
} from "../store/actions";

import Service from "../service";
import {Todo, TodoStatus} from "../models/todo";
import {isTodoCompleted} from "../utils";
import {useUserInfo} from "../context/UserInfoContext";
import TextInput from "./TextInput";
import FilterItem from "./FilterItem";
import "./ToDoPage.scss";
import StorageController from "../utils/storage";
import ToDoItem from "./ToDoItem";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({history}: RouteComponentProps) => {
  const {state: stateInfo, dispatch: dispatchInfo} = useUserInfo();
  const [{todos}, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [toDoInput, setToDoInput] = useState("");

  const handleOnClickFilter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, status: EnhanceTodoStatus) => {
      setShowing(status)
    },
    [setShowing]
  );

  const inputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    async function fetchData() {
      if (stateInfo.isLoggedIn) {
        const resp = await Service.getTodos(stateInfo.username);
        dispatch(setTodos(resp));
      } else {
        let currentSession = StorageController.getCookieStorage();
        if (currentSession.expiration - new Date().getTime() <= 0) {
          StorageController.removeCookieStorage();
          history.push("/");
        } else {
          const resp = await Service.getTodos(currentSession.username);
          dispatch(setTodos(resp));
        }
      }
    };
    fetchData()
    return ()=>{
      dispatch(setTodos([]))
    }
  }, [stateInfo, history]);

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current) {
        try {
          inputRef.current.value = "";
          const resp = await Service.createTodo(toDoInput, stateInfo.username);
          dispatch(createTodo(resp));
        } catch (e) {
          if (e.response.status === 401) {
            history.push("/");
          }
        }
      }
    },
    [stateInfo, toDoInput, inputRef, history],
  );


  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let newToDo = [...todos];
    newToDo = newToDo.map((td)=>{
      return {
        ...td,
        status: e.target.checked ?  TodoStatus.COMPLETED : TodoStatus.ACTIVE
      }
    })
    try {
      const resp = await Service.updateListToDo(stateInfo.username, newToDo);
      dispatch(toggleAllTodos(e.target.checked));
    } catch (e) {

    }
  },[stateInfo, todos])

  const onDeleteAllTodo = useCallback(
    async () => {
      try {
        const resp = await Service.deleteAllToDo(stateInfo.username);
        dispatch(deleteAllTodos());
      } catch (e) {

      }
    },
    [stateInfo],
  );

  const showTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });
  }, [todos, showing])

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onChangeHandler = useCallback((e) => {
    setToDoInput(e.target.value);
  }, [setToDoInput]);

  const removeItem = useCallback(
    async (todo) => {
      const newToDo = [...todos];
      const index = todos.findIndex(
        (e) => e.id === todo.id
      );
      newToDo.splice(index, 1);
      try {
        const resp = await Service.updateListToDo(stateInfo.username, newToDo);
        dispatch(deleteTodo(todo.id));
      } catch (e) {

      }
    },
    [todos, stateInfo],
  );

  const onEditItem = useCallback(
    async  (todo: Todo) => {
      let newToDo = [...todos];
      const index = todos.findIndex(
        (e) => e.id === todo.id
      );
      newToDo[index].content = todo.content;
      try {
        const resp = await Service.updateListToDo(stateInfo.username, newToDo);
        dispatch(updateToDoContent(todo.id, todo.content));
      } catch (e) {

      }
    },
    [todos, stateInfo],
  );

  return (
    <div className="toDo">
      <div className="toDo__inputContainer">
        <TextInput
          name="task"
          onKeyDown={onCreateTodo}
          onChange={onChangeHandler}
          ref={inputRef}
        />
      </div>
      <div className="toDo__buttonContainer">
        <input className="toDo__buttonContainer__input" type="checkbox" onChange={onToggleAllTodo}/>

        <FilterItem title="All" onClick={(e) => {
          handleOnClickFilter(e, "ALL")
        }}/>
        <FilterItem title="Active" onClick={(e) => {
          handleOnClickFilter(e, TodoStatus.ACTIVE)
        }}/>
        <FilterItem title="Completed" onClick={(e) => {
          handleOnClickFilter(e, TodoStatus.COMPLETED)
        }}/>
        <FilterItem title="Clear all todos" onClick={onDeleteAllTodo}/>
      </div>

      <div className="toDo__itemContainer">
        {showTodos.map((todo) => {
          return (
            <ToDoItem item={todo}
                      onCheck={(e) => onUpdateTodoStatus(e, todo.id)}
                      checked={isTodoCompleted(todo)}
                      onRemoveItem={() => {
                        removeItem(todo)
                      }}
                      onEditItem={onEditItem}
                      key={todo.id}
            />
          )
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
