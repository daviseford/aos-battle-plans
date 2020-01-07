import React, { useEffect, useState } from 'react'
import { Layer, Line, Rect, Text, Circle } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'

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

  const { dividerOffset, divider, sideOffset, playerOffset, canvasWidth, canvasHeight, objectives } = lineInfo

  return (
    <>
      <Zones {...lineInfo} />
      <Layer>
        {/*   If you have three points with x and y coordinates 
                you should define points property 
                as: [x1, y1, x2, y2, x3, y3]. 
                */}

        {/* Objectives */}
        {objectives.map(({ x, y, label }, i) => (
          <Circle
            x={x}
            y={y}
            key={i}
            radius={3 / canvas.conversionPercentX}
            draggable={false}
            stroke="black"
            fillEnabled={false}
          />
        ))}

        {/* Letting the user know this is greyed out */}
        <Text
          align={'center'}
          fill="white"
          fontFamily={'Calibri'}
          fontSize={36}
          fontStyle={'normal'}
          stroke="white"
          text={'ENEMY AREA'}
          x={canvasWidth / 2 - 100}
          y={canvasHeight - divider / 2}
        />

        {/* Edge of play area (top)  */}
        <Line points={[sideOffset, 0, canvasWidth - sideOffset, 0]} stroke="red" />

        {/* This line is created when you need to deploy X inches from the top of the table  */}
        {playerOffset > 0 && (
          <Line points={[sideOffset, playerOffset, canvasWidth - sideOffset, playerOffset]} stroke="red" />
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffset > 0 && (
          <>
            <Line points={[sideOffset, playerOffset, sideOffset, divider - dividerOffset]} stroke="red" />

            <Line
              points={[
                canvasWidth - sideOffset,
                playerOffset,
                canvasWidth - sideOffset,
                divider - dividerOffset,
              ]}
              stroke="red"
            />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffset > 0 && (
          <Line
            points={[sideOffset, divider - dividerOffset, canvasWidth - sideOffset, divider - dividerOffset]}
            stroke="red"
          />
        )}

        {/* This layer is the dividing line */}
        <Line points={[0, divider, canvasWidth, divider]} stroke="black" />
      </Layer>
    </>
  )
}

/** All of the zones we need to display for the user */
const Zones: React.FC<ILineInfo> = props => {
  const { dividerOffset, divider, sideOffset, playerOffset, canvasWidth, canvasHeight } = props

  return (
    <>
      <Layer>
        {/* Greyed out enemy area */}
        <Rect x={0} y={divider + 1} width={canvasWidth} height={canvasHeight} fill={'grey'} />

        {/* Player edge */}
        {playerOffset > 0 && <Rect x={0} y={0} width={canvasWidth} height={playerOffset} fill={'red'} />}

        {/* Side */}
        {sideOffset > 0 && (
          <>
            <Rect x={0} y={0} width={sideOffset} height={divider} fill={'red'} />
            <Rect x={canvasWidth - sideOffset} y={0} width={sideOffset} height={divider} fill={'red'} />
          </>
        )}

        {/* Divider */}
        {dividerOffset > 0 && (
          <Rect x={0} y={divider - dividerOffset} width={canvasWidth} height={dividerOffset} fill={'red'} />
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

const HorizontalScenarioLines = connect(mapStateToProps, null)(HorizontalScenarioLinesComponent)

export default HorizontalScenarioLines
