import { compose, createStore, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'
//Middleware
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
//Custom Data
import reducers from './reducers'
import saga from './sagas'

export const history = createHistory()

function configureStore(initialState){
  const sagaMiddleware = createSagaMiddleware()
  const loggerMiddleware = createLogger()
  const store = createStore(
    reducers,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            loggerMiddleware,
        ),
        autoRehydrate()
    ),
  )
  sagaMiddleware.run(saga)
  return store
}

const store = configureStore()
persistStore(store, {whitelist: ['user']})
export default store
