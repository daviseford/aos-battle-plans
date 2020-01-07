import React from 'react'
import { Stage, Layer, Group } from 'react-konva'
import './App.css'
import { mmToInches } from 'utils/measurements'
import CircleBase from 'components/CircularBase'
import ScenarioLinesComponent from 'components/ScenarioLines'

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
  const [tableX, tableY] = [72, 48]
  const canvasX = window.innerWidth
  const conversionPercentX = tableX / canvasX

  const canvasY = canvasX * (tableY / tableX)

  const baseSize25 = mmToInches(25) / conversionPercentX
  const baseSize32 = mmToInches(32) / conversionPercentX
  const baseSize50 = mmToInches(50) / conversionPercentX

  const cohesion = 1 / conversionPercentX

  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesion

  return (
    <>
      <div className="container bg-info text-white">Sample toolbar color</div>
      <div className="bg-dark text-white pb-5">
        <Stage width={canvasX} height={canvasY} style={{ backgroundColor: 'white' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layer>
                <Group draggable={true}>
                  {[...Array(5)].map((x, i) => (
                    <CircleBase key={i} x={30 + getXSpacing(baseSize25) * i} y={50} radius={baseSize25} />
                  ))}
                </Group>
                <Group draggable={true}>
                  {[...Array(5)].map((x, i) => (
                    <CircleBase
                      key={i}
                      x={30 + getXSpacing(baseSize32) * i}
                      y={50 + getXSpacing(baseSize32)}
                      radius={baseSize32}
                    />
                  ))}
                </Group>
                <Group draggable={true}>
                  {[...Array(5)].map((x, i) => (
                    <CircleBase
                      key={i}
                      x={30 + getXSpacing(baseSize50) * i}
                      y={50 + getXSpacing(baseSize32) + getXSpacing(baseSize50)}
                      radius={baseSize50}
                    />
                  ))}
                </Group>
              </Layer>

              <ScenarioLinesComponent />
            </PersistGate>
          </Provider>
        </Stage>
        Bottom of Stage
      </div>
    </>
  )
}

export default App
