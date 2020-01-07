import React from 'react'
import { connect } from 'react-redux'
import { Layer, Group } from 'react-konva'
import { selectors } from 'ducks'
import { mmToInches } from 'utils/measurements'
import CircleBase from 'components/CircleBase'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { TABLE_WIDTH } from 'data/table'
import HorizontalScenarioLines from 'components/ScenarioLines/Horizontal'

interface ICCC {
  canvas: ICanvasDimensions
  scenario: IScenario
}

const CanvasContentContainerComponent: React.FC<ICCC> = props => {
  const { canvas, scenario } = props

  if (!canvas) return <></>

  const conversionPercentX = TABLE_WIDTH / canvas.canvasWidth
  const baseSize25 = mmToInches(25) / conversionPercentX
  const baseSize32 = mmToInches(32) / conversionPercentX
  const baseSize50 = mmToInches(50) / conversionPercentX

  const cohesion = 1 / conversionPercentX

  // Diameter + cohesion
  const getXSpacing = (radius: number) => radius * 2 + cohesion

  // const ScenarioLines = scenario.orientation === 'horizontal' ? HorizontalScenarioLines : VerticalScenarioLines
  const ScenarioLines =
    scenario.orientation === 'horizontal' ? HorizontalScenarioLines : HorizontalScenarioLines

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

      <ScenarioLines />
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const CanvasContentContainer = connect(mapStateToProps, null)(CanvasContentContainerComponent)

export default CanvasContentContainer
