import reducer, { initialState } from "./reducer";
import shortid from "shortid";
import {TodoStatus} from '../models/todo';
import {
    CREATE_TODO,
    UPDATE_TODO_STATUS,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
    DELETE_ALL_TODOS,
    CreateTodoAction,
    UpdateTodoStatusAction,
    ToggleAllTodosAction,
    UpdateTodoAction,
    DeleteTodoAction,
    DeleteAllTodosAction
  } from "./actions";



const manabie_todos = [
  {
    "content": "a",
    "created_date": "2022-05-18T06:44:01.143Z",
    "status": "ACTIVE",
    "id": "B9pG8_o91",
    "user_id": "firstUser"
  },
  {
    "content": "b",
    "created_date": "2022-05-18T06:44:02.258Z",
    "status": "ACTIVE",
    "id": "ZMp2V73BG",
    "user_id": "firstUser"
  },
  {
    "content": "c",
    "created_date": "2022-05-18T06:44:02.995Z",
    "status": "ACTIVE",
    "id": "VROyRazyUe",
    "user_id": "firstUser"
  }
]


describe('Create new todo', () => { 
     it('Should return new data right', () => {
        const state = { todos: initialState.todos };
        const action: CreateTodoAction = {
          type: CREATE_TODO,
          payload: {
            content: "to do test 1",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
          },
        };

        const createToDo = reducer(state, action);
        const newTodo = createToDo.todos[createToDo.todos.length - 1];
        expect(newTodo.content).toEqual("to do test 1");
        expect(newTodo.user_id).toEqual("firstUser");
        expect(newTodo.status).toEqual(TodoStatus.ACTIVE);
        expect(newTodo.created_date).toBeTruthy();
        expect(newTodo.id).toBeTruthy();
      });


      it('Do not add an empty content todo', () => {
        const state = { todos: initialState.todos };
        const oldState = state;
        const action: CreateTodoAction = {
          type: CREATE_TODO,
          payload: {
            content: "",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
          },
        };
        const createToDo = reducer(state, action);

        expect(createToDo.todos.length).toEqual(oldState.todos.length);
        
      });
});

describe('Update todo status', () => {
  it('Update right todo object', () => {
  const state = { todos: manabie_todos };
  const action: UpdateTodoStatusAction = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: 'ZMp2V73BG', 
      checked: true
    },
  };

  const updateToDo = reducer(state, action);
  const updatedTodo = updateToDo.todos.find(i => i.id === 'ZMp2V73BG');
  expect(updatedTodo?.status).toEqual('COMPLETED');
  
  });

  it('Return same array length', () => {
  const state = { todos: manabie_todos };
  const oldState = state;
  
  const action: UpdateTodoStatusAction = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: 'ZMp2V73BG', 
      checked: true
    },
  };

  const updateToDo = reducer(state, action);
  expect(updateToDo.todos.length).toEqual(oldState.todos.length);
  
  });
  
});

describe('Mark done/undone all todo', () => {
  it('All todo must be done undone', () => {
  const status = true;
  const state = { todos: manabie_todos };
  const action: ToggleAllTodosAction = {
    type: TOGGLE_ALL_TODOS,
    payload: status
  };

  const updateToDo = reducer(state, action);
  const notDoneTodoList =  updateToDo.todos.filter(i => status ? i.status !== 'COMPLETED' : i.status === 'COMPLETED');

  expect(notDoneTodoList.length).toEqual(0);

  });

  it('Return same array length', () => {
    const status = true;
    const state = { todos: manabie_todos };
    const oldState = state;
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: status
    };
  
    const updateToDo = reducer(state, action);
    expect(oldState.todos.length).toEqual(updateToDo.todos.length);
  });
  
});


describe('Update todo', () => {
  it('Update right todo object', () => {
  const state = { todos: manabie_todos };
  const action: UpdateTodoAction =  {
    type: UPDATE_TODO,
    payload:
    {
      content: "update this todo item",
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: 'B9pG8_o91',
      user_id: "firstUser",
    },
    todoId: 'B9pG8_o91'
  };

  const updateToDo = reducer(state, action);

  const updatedItem = updateToDo.todos.find(i => i.id === 'B9pG8_o91');


  expect(updatedItem?.content).toEqual("update this todo item");

  });

  it('Return same array length', () => {
    const state = { todos: manabie_todos };
    const oldState = state;
    const action: UpdateTodoAction =  {
      type: UPDATE_TODO,
      payload:
      {
        content: "update this todo item",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: 'B9pG8_o91',
        user_id: "firstUser",
      },
      todoId: 'B9pG8_o91'
    };
  
    const updateToDo = reducer(state, action);
    expect(updateToDo.todos.length).toEqual(oldState.todos.length);
  
  });
  
});


describe('Delete todo', () => {
  it('Return 1 shorter array length', () => {
    const state = { todos: manabie_todos };
    const oldStateLength  = state.todos.length;
    const action: DeleteTodoAction =  {
      type: DELETE_TODO,
      payload:'B9pG8_o91'
    };
  
    const updateToDo = reducer(state, action);    
    expect(updateToDo.todos.length).toEqual(oldStateLength - 1);

  });

  it('Delete right todo object', () => {
  const state = { todos: manabie_todos };
  const action: DeleteTodoAction =  {
    type: DELETE_TODO,
    payload:'B9pG8_o91'
  };

  const updateToDo = reducer(state, action);
  const deletedItem = updateToDo.todos.find(i => i.id === 'B9pG8_o91');
  expect(deletedItem).toEqual(undefined);

  });
});


describe('Delete all todo', () => {
  it('return empty array', () => {
    const state = { todos: manabie_todos };
    const action: DeleteAllTodosAction =  {
      type: DELETE_ALL_TODOS,
    };
  
    const updateToDo = reducer(state, action);    
    expect(updateToDo.todos.length).toEqual(0);
  });
});