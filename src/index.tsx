import 'core-js/stable' // polyfills
import React from 'react'
import ReactDOM from 'react-dom'

// CSS
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

import AppComponent from './App'
import * as serviceWorker from './serviceWorker'

// Redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { canvas, scenario } from 'ducks'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const rootReducer = combineReducers({
  canvas: canvas.reducer,
  scenario: scenario.reducer,
})

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  pReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store)

// Uncomment to purge cache
persistor.purge()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppComponent />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
