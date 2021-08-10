import { all } from "redux-saga/effects"

import { login } from "./auth"
import { getTodos, createTodo } from "./todo"

function* rootSaga() {
    yield all([
        login(),
        getTodos(),
        createTodo()
    ])
}

export default rootSaga