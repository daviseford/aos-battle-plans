import React, { useEffect, useState } from 'react'
import { Layer, Line, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { TABLE_WIDTH_QUARTER } from 'data/table'
import { ZoneRect, EnemyZone } from './ZoneRect'
import Objectives from './Objectives'
import { IScenario } from 'types/scenario'

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
      <Objectives objectives={objectives} canvas={canvas} />

      <Layer>
        {/* Enemy Deployment Zone text */}
        <Text
          align={'center'}
          fill="black"
          fontFamily={'Calibri'}
          fontSize={36}
          fontStyle={'normal'}
          stroke="black"
          text={'ENEMY\nAREA'}
          x={canvasWidth - TABLE_WIDTH_QUARTER / canvas.conversionPercentX}
          y={canvasHeight / 2}
        />

        {/* This line is created when you need to deploy X inches from the player side of the table  */}
        {playerOffset > 0 ? (
          <>
            <Line points={[playerOffset, sideOffset, playerOffset, canvasHeight - sideOffset]} stroke="red" />
            <Line
              points={[
                canvasWidth - playerOffset,
                sideOffset,
                canvasWidth - playerOffset,
                canvasHeight - sideOffset,
              ]}
              stroke="red"
            />
          </>
        ) : (
          <>
            {/* Player */}
            <Line points={[0, 0, 0, canvasHeight]} stroke="red" />
            {/* Enemy */}
            <Line points={[canvasWidth, 0, canvasWidth, canvasHeight]} stroke="red" />
          </>
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffset > 0 ? (
          <>
            {/* Player lines */}
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
            {/* Enemy lines */}
            <Line
              points={[divider + dividerOffset, sideOffset, canvasWidth - playerOffset, sideOffset]}
              stroke="red"
            />
            <Line
              points={[
                divider + dividerOffset,
                canvasHeight - sideOffset,
                canvasWidth - playerOffset,
                canvasHeight - sideOffset,
              ]}
              stroke="red"
            />
          </>
        ) : (
          <>
            <Line points={[0, 0, canvasWidth, 0]} stroke="red" />
            <Line points={[0, canvasHeight, canvasWidth, canvasHeight]} stroke="red" />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffset > 0 && (
          <>
            {/* Player side */}
            <Line
              points={[
                divider - dividerOffset,
                sideOffset,
                divider - dividerOffset,
                canvasHeight - sideOffset,
              ]}
              stroke="red"
            />
            {/* Enemy side */}
            <Line
              points={[
                divider + dividerOffset,
                sideOffset,
                divider + dividerOffset,
                canvasHeight - sideOffset,
              ]}
              stroke="red"
            />
          </>
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
        {/* Enemy area */}
        <EnemyZone x={divider} y={0} width={canvasWidth} height={canvasHeight} />

        {/* Player edge */}
        {playerOffset > 0 && <ZoneRect x={0} y={0} width={playerOffset} height={canvasHeight} />}
        {/* Enemy edge */}
        {playerOffset > 0 && (
          <ZoneRect
            x={canvasWidth - playerOffset}
            y={sideOffset}
            width={playerOffset}
            height={canvasHeight}
          />
        )}

        {/* Player sides */}
        {sideOffset > 0 && (
          <>
            {/* Top */}
            <ZoneRect x={0} y={0} width={divider - dividerOffset} height={sideOffset} />
            {/* Bottom */}
            <ZoneRect
              x={0}
              y={canvasHeight - sideOffset}
              width={divider - dividerOffset}
              height={sideOffset}
            />
          </>
        )}

        {/* Enemy sides */}
        {sideOffset > 0 && (
          <>
            {/* Top */}
            <ZoneRect x={divider} y={0} width={divider} height={sideOffset} />
            {/* Bottom */}
            <ZoneRect x={divider} y={canvasHeight - sideOffset} width={divider} height={sideOffset} />
          </>
        )}

        {/* Divider */}
        {dividerOffset > 0 && (
          <ZoneRect x={divider - dividerOffset} y={0} width={dividerOffset * 2} height={canvasHeight} />
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
