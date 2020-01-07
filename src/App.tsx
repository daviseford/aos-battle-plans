import React from 'react'
import { Stage } from 'react-konva'

// CSS
import './App.css'

// Redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { canvas, scenario } from 'ducks'
import CanvasContentContainer from 'components/CanvasContentContainer'

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

const persistor = persistStore(store)

/**
 * Are you wondering why the Provider is tucked inside the Stage?
 * https://github.com/konvajs/react-konva/issues/311
 */

const App = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer

  // Inches to mm
  const [tableWidth, tableHeight] = [72, 48]
  const canvasWidth = window.innerWidth
  const canvasHeight = canvasWidth * (tableHeight / tableWidth)

  return (
    <>
      <div className="container bg-info text-white">Sample toolbar color</div>
      <div className="bg-dark text-white pb-5">
        <Stage width={canvasWidth} height={canvasHeight} style={{ backgroundColor: 'white' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <CanvasContentContainer />
            </PersistGate>
          </Provider>
        </Stage>
        Bottom of Stage
      </div>
    </>
  )
}

export default App
