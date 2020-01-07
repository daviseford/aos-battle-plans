import React from 'react'
import { Layer, Line } from 'react-konva'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors, scenario } from 'ducks'
import Scenarios, { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'

interface IScenarioLines {
  scenario: IScenario | null
  canvas: ICanvasDimensions | null
  setScenario: (payload: IScenario) => void
}

const ScenarioLinesComponent: React.FC<IScenarioLines> = props => {
  const { canvas, scenario, setScenario } = props

  if (!scenario) {
    setScenario(Scenarios[0])
    return <></>
  }

  if (!canvas) return <></>

  const dividerY = canvas.canvasHeight / 2

  const { setupRestrictions } = scenario
  const { fromBoardEgeInches = 0, fromDividerInches = 0 } = setupRestrictions

  const { tableWidth, canvasWidth, tableHeight, canvasHeight } = canvas

  const conversionPercentX = tableWidth / canvasWidth
  const conversionPercentY = tableHeight / canvasHeight

  let boardEdgeOffsetX = fromBoardEgeInches ? fromBoardEgeInches / conversionPercentX : 0
  let dividerOffsetY = fromDividerInches ? fromDividerInches / conversionPercentY : 0

  debugger

  console.log(boardEdgeOffsetX, canvasWidth)

  return (
    <>
      <Layer>
        {/*   If you have three points with x and y coordinates 
                you should define points property 
                as: [x1, y1, x2, y2, x3, y3]. 
                */}
        {/* This layer will be the midline */}
        <Line points={[10, dividerY, canvasWidth - 10, dividerY]} stroke="black" />

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffsetY && (
          <Line
            points={[
              boardEdgeOffsetX,
              dividerY - dividerOffsetY,
              canvasWidth - boardEdgeOffsetX,
              dividerY - dividerOffsetY,
            ]}
            stroke="blue"
          />
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffsetY && (
          <Line
            points={[boardEdgeOffsetX, dividerOffsetY, canvasWidth - boardEdgeOffsetX, dividerOffsetY]}
            stroke="blue"
          />
        )}
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const ScenarioLines = connect(mapStateToProps, { setScenario: scenario.actions.setScenario })(
  ScenarioLinesComponent
)

export default ScenarioLines
