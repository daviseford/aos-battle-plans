import React, { useEffect, useState } from 'react'
import { Layer, Line } from 'react-konva'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { selectors } from 'ducks'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'

interface IScenarioLines {
  scenario: IScenario
  canvas: ICanvasDimensions | null
}

const HorizontalScenarioLinesComponent: React.FC<IScenarioLines> = props => {
  const { canvas, scenario } = props

  const [lineInfo, setLineInfo] = useState<ILineInfo | null>(null)

  useEffect(() => {
    if (!canvas) return
    const newLineInfo = getLineInfo(canvas, scenario)
    setLineInfo(newLineInfo)
  }, [canvas, scenario])

  if (!canvas || !lineInfo) return <></>

  const { dividerOffsetY, dividerY, sideOffsetX, topOffsetY, canvasWidth } = lineInfo

  return (
    <>
      <Layer>
        {/*   If you have three points with x and y coordinates 
                you should define points property 
                as: [x1, y1, x2, y2, x3, y3]. 
                */}

        {/* Edge of play area (top)  */}
        <Line points={[sideOffsetX, 0, canvasWidth - sideOffsetX, 0]} stroke="red" />

        {/* This line is created when you need to deploy X inches from the top of the table  */}
        {topOffsetY > 0 && (
          <Line points={[sideOffsetX, topOffsetY, canvasWidth - sideOffsetX, topOffsetY]} stroke="blue" />
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffsetX > 0 && (
          <>
            <Line points={[sideOffsetX, topOffsetY, sideOffsetX, dividerY - dividerOffsetY]} stroke="red" />

            <Line
              points={[
                canvasWidth - sideOffsetX,
                topOffsetY,
                canvasWidth - sideOffsetX,
                dividerY - dividerOffsetY,
              ]}
              stroke="red"
            />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffsetY > 0 && (
          <Line
            points={[
              sideOffsetX,
              dividerY - dividerOffsetY,
              canvasWidth - sideOffsetX,
              dividerY - dividerOffsetY,
            ]}
            stroke="red"
          />
        )}

        {/* This layer is the dividing line */}
        <Line points={[10, dividerY, canvasWidth - 10, dividerY]} stroke="black" />
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const HorizontalScenarioLines = connect(mapStateToProps, null)(HorizontalScenarioLinesComponent)

export default HorizontalScenarioLines
