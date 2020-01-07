import React, { useEffect, useState } from 'react'
import { Layer, Line, Rect, Text, Circle } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { TABLE_WIDTH_QUARTER } from 'data/table'

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

  const { dividerOffset, divider, sideOffset, playerOffset, canvasWidth, canvasHeight, objectives } = lineInfo

  return (
    <>
      <Zones {...lineInfo} />
      <Layer>
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

        {/* Letting the user know why the enemy area is greyed out */}
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
        <Rect x={divider + 1} y={0} width={canvasWidth} height={canvasHeight} fill={'grey'} />

        {/* Player edge */}
        {playerOffset > 0 && (
          <Rect x={0} y={sideOffset} width={playerOffset} height={canvasHeight} fill={'red'} />
        )}

        {/* Side */}
        {sideOffset > 0 && (
          <>
            {/* Top */}
            <Rect x={0} y={0} width={divider - dividerOffset} height={sideOffset} fill={'red'} />
            {/* Bottom */}
            <Rect
              x={0}
              y={canvasHeight - sideOffset}
              width={divider - dividerOffset}
              height={sideOffset}
              fill={'red'}
            />
          </>
        )}

        {/* Divider */}
        {dividerOffset > 0 && (
          <Rect x={divider - dividerOffset} y={0} width={dividerOffset} height={canvasHeight} fill={'red'} />
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

const VerticalScenarioLines = connect(mapStateToProps, null)(VerticalScenarioLinesComponent)

export default VerticalScenarioLines
