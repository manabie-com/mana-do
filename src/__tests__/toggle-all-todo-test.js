import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import reducer, {initialState} from '../store/reducer';

import {
    toggleAllTodos
} from '../store/actions';

test('Remove a todo in todos', () => {

    var state = initialState;

    var todo1 = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    var todo2 = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    state = {...state, todos: [todo1,todo2]}

    var todo1AfterChangeStatus = {...todo1, status: TodoStatus.COMPLETED};
    var todo2AfterChangeStatus = {...todo2, status: TodoStatus.COMPLETED};

    expect(reducer(state, toggleAllTodos(true)))
        .toEqual({...state, todos:[todo1AfterChangeStatus, todo2AfterChangeStatus]});
})
