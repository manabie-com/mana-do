import { Action, Todo } from "src/redux/types"
import { call, put, takeLatest, select } from "redux-saga/effects"
import { GET_TODOS, GET_TODOS_SAGA, CREATE_TODO, CREATE_TODO_SAGA } from "src/redux/reducers/todo"
import { getTodosAPI, createTodoAPI } from "src/redux/services"

function* getTodosSaga() {
    try {
        const data: Promise<Todo[] | undefined> = yield call(getTodosAPI)
        if (Boolean(data)) {
            yield put({
                type: GET_TODOS_SAGA,
                data
            })
        } else {
            throw new Error()
        }
    } catch (err) {
        console.log(err)
    }
}
export function* getTodos() {
    yield takeLatest(GET_TODOS, getTodosSaga)
}

function* createTodoSaga(action: Action) {
    try {
        const { data } = action,
            { auth: { userId } } = yield select(),
            todo: Promise<Todo | undefined> = yield call(createTodoAPI, data, userId)
        if (Boolean(todo)) {
            yield put({
                type: CREATE_TODO_SAGA,
                data: todo
            })
        } else {
            throw new Error()
        }
    } catch (err) {
        console.log(err)
    }
}
export function* createTodo() {
    yield takeLatest(CREATE_TODO, createTodoSaga)
}
