import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Layer, Group } from 'react-konva'
import { selectors, canvas } from 'ducks'
import { mmToInches } from 'utils/measurements'
import CircleBase from 'components/CircleBase'
import ScenarioLinesComponent from 'components/ScenarioLines'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'

interface ICCC {
  canvas: ICanvasDimensions
  scenario: IScenario
  setCanvas: (payload: number) => void
}

const CanvasContentContainerComponent: React.FC<ICCC> = props => {
  const { canvas, setCanvas } = props

  // Handle window resizes and initial sizing
  useEffect(() => {
    const handleResize = () => setCanvas(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setCanvas])

  if (!canvas) return <></>

  const { tableX, canvasX } = canvas

  const conversionPercentX = tableX / canvasX
  const baseSize25 = mmToInches(25) / conversionPercentX
  const baseSize32 = mmToInches(32) / conversionPercentX
  const baseSize50 = mmToInches(50) / conversionPercentX

  const cohesion = 1 / conversionPercentX

  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesion

  return (
    <>
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
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const CanvasContentContainer = connect(mapStateToProps, { setCanvas: canvas.actions.setCanvas })(
  CanvasContentContainerComponent
)

export default CanvasContentContainer
