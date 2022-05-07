import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import reducer, {initialState} from '../store/reducer';

import {
    updateTodoStatus,
} from '../store/actions';

test('Change todo status', () => {

    var state = initialState;

    var newTodo = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    state = {...state, todos: [newTodo]};

    var todoAfterChangeStatus = {...newTodo, status: TodoStatus.COMPLETED};

    expect(reducer(state, updateTodoStatus(newTodo.id, true)))
        .toEqual({...state, todos:[todoAfterChangeStatus]});
})
