import React, { useEffect } from 'react'
import { Stage } from 'react-konva'

// CSS
import './App.css'

// Redux
import { store, persistor } from 'index'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { canvas, selectors } from 'ducks'

// Elements
import CanvasContentContainer from 'components/CanvasContentContainer'
import TopToolbar from 'components/TopToolbar'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'

/**
 * Are you wondering why the Provider is tucked inside the Stage?
 * https://github.com/konvajs/react-konva/issues/311
 */

interface IApp {
  canvas: ICanvasDimensions
  setCanvas: (payload: number) => void
}

const AppComponent: React.FC<IApp> = props => {
  const { canvas, setCanvas } = props

  // Handle window resizes and initial sizing
  useEffect(() => {
    const handleResize = () => setCanvas(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setCanvas])

  if (!canvas) return <></>

  return (
    <>
      <TopToolbar />

      <div className="stage">
        <Stage width={canvas.canvasWidth} height={canvas.canvasHeight} style={{ backgroundColor: 'white' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <CanvasContentContainer />
            </PersistGate>
          </Provider>
        </Stage>
      </div>

      <div className="bg-dark text-white text-center py-2">Bottom of Stage</div>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
})

const App = connect(mapStateToProps, { setCanvas: canvas.actions.setCanvas })(AppComponent)

export default App
