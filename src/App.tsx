import React, { useEffect, useRef } from 'react'
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
import TopToolbar from 'components/Toolbar/TopToolbar'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import GenericButton from 'components/Input/GenericButton'
import { IScenario } from 'types/scenario'
import PageHeader from 'components/Page/Header'
import PageFooter from 'components/Page/Footer'
import { FaFileImage } from 'react-icons/fa'
import { logPageView } from 'utils/analytics'
import { STAGE_BG_COLOR } from 'theme/colors'

/**
 * Are you wondering why the Provider is tucked inside the Stage?
 * https://github.com/konvajs/react-konva/issues/311
 */

interface IApp {
  canvas: ICanvasDimensions
  scenario: IScenario
  setCanvas: (payload: number) => void
}

const AppComponent: React.FC<IApp> = props => {
  const { canvas, setCanvas, scenario } = props

  const stageRef = useRef()

  // Handle window resizes and initial sizing
  useEffect(() => {
    const handleResize = () => {
      setCanvas(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setCanvas])

  useEffect(() => {
    logPageView()
  }, [])

  if (!canvas) return <></>

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSaveImage = event => {
    event.preventDefault()
    // @ts-ignore
    const dataURL = stageRef.current.toDataURL()
    downloadURI(dataURL, `${scenario.name}.png`)
  }

  const goToKofi = e => {
    window.open('https://ko-fi.com/darrenwatson', '_blank')
  }
  const goToPaypal = e => {
    window.open('https://www.paypal.me/daviseford', '_blank')
  }

  return (
    <>
      <PageHeader />

      <TopToolbar />

      <div className="stage">
        <Stage
          width={canvas.canvasWidth}
          height={canvas.canvasHeight}
          style={{ backgroundColor: STAGE_BG_COLOR }}
          // @ts-ignore
          ref={stageRef}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <CanvasContentContainer />
            </PersistGate>
          </Provider>
        </Stage>
      </div>

      <div className="row bg-dark text-white text-center py-2 justify-content-center">
        <div className="col-3">
          <GenericButton onClick={handleSaveImage}>
            <FaFileImage className="mr-2" />
            Save PNG
          </GenericButton>
        </div>
        <div className="col-3">
          <GenericButton onClick={goToKofi}>Darren's Ko-Fi</GenericButton>
        </div>
        <div className="col-3">
          <GenericButton onClick={goToPaypal}>Davis' PayPal</GenericButton>
        </div>
      </div>

      <PageFooter />
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  canvas: selectors.getCanvas(state),
  scenario: selectors.getScenario(state),
})

const App = connect(mapStateToProps, { setCanvas: canvas.actions.setCanvas })(AppComponent)

export default App
