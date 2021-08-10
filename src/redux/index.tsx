import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware, { SagaMiddleware } from "redux-saga"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import reducers from "./reducers"
import sagas from "./sagas"

const sagaMiddleware: SagaMiddleware = createSagaMiddleware(),
    middleware: any[] = [sagaMiddleware]
if (process.env.NODE_ENV === "development") {
    middleware.push(logger)
}
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
},
    persistedReducer = persistReducer(persistConfig, reducers),
    store = createStore(persistedReducer, applyMiddleware(...middleware)),
    persistor = persistStore(store)

export {
    store,
    persistor
}

sagaMiddleware.run(sagas)