import React, { useEffect, useState } from 'react'
import { Layer, Line, Rect, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { TABLE_WIDTH_HALF, TABLE_WIDTH_QUARTER } from 'data/table'

interface IScenarioLines {
  scenario: IScenario
  canvas: ICanvasDimensions | null
}

const VerticalScenarioLinesComponent: React.FC<IScenarioLines> = props => {
  const { canvas, scenario } = props

  const [lineInfo, setLineInfo] = useState<ILineInfo | null>(null)

  useEffect(() => {
    if (!canvas) return
    const newLineInfo = getLineInfo(canvas, scenario)
    setLineInfo(newLineInfo)
  }, [canvas, scenario])

  if (!canvas || !lineInfo) return <></>

  const { dividerOffset, divider, sideOffset, playerOffset, canvasWidth, canvasHeight } = lineInfo

  return (
    <>
      <Layer>
        {/*   If you have three points with x and y coordinates 
                you should define points property 
                as: [x1, y1, x2, y2, x3, y3]. 
                */}

        {/* Edge of play area (player side) */}
        <Line points={[1, 0, 1, canvasHeight]} stroke="red" />

        {/* This line is created when you need to deploy X inches from the player side of the table  */}
        {playerOffset > 0 && (
          <Line points={[playerOffset, sideOffset, playerOffset, canvasHeight - sideOffset]} stroke="red" />
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffset > 0 && (
          <>
            <Line points={[playerOffset, sideOffset, divider - dividerOffset, sideOffset]} stroke="red" />

            <Line
              points={[
                playerOffset,
                canvasHeight - sideOffset,
                divider - dividerOffset,
                canvasHeight - sideOffset,
              ]}
              stroke="red"
            />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffset > 0 && (
          <Line
            points={[divider - dividerOffset, sideOffset, divider - dividerOffset, canvasHeight - sideOffset]}
            stroke="red"
          />
        )}

        {/* This is the dividing line */}
        <Line points={[divider, 0, divider, canvasHeight]} stroke="black" />

        {/* Greyed out enemy area */}
        <Rect x={divider + 1} y={0} width={canvasWidth} height={canvasHeight} fill={'grey'} />

        {/* Letting the user know why this is greyed out */}
        <Text
          align={'center'}
          fill="white"
          fontFamily={'Calibri'}
          fontSize={36}
          fontStyle={'normal'}
          stroke="white"
          text={'ENEMY\nAREA'}
          x={canvasWidth - TABLE_WIDTH_QUARTER / canvas.conversionPercentX}
          y={canvasHeight / 2}
        />
      </Layer>
    </>
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const VerticalScenarioLines = connect(mapStateToProps, null)(VerticalScenarioLinesComponent)

export default VerticalScenarioLines
