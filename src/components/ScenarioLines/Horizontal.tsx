import React, { useEffect, useState } from 'react'
import { Layer, Line, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { ZoneRect, EnemyZone } from './ZoneRect'
import Objectives from './Objectives'
import { IScenario } from 'types/scenario'

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
      <Objectives objectives={objectives} canvas={canvas} />

      <Layer>
        {/* Enemy Deployment Zone text */}
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

        {/* This line is created when you need to deploy X inches from the top of the table  */}
        {playerOffset > 0 ? (
          <>
            {/* Player */}
            <Line points={[sideOffset, playerOffset, canvasWidth - sideOffset, playerOffset]} stroke="red" />
            {/* Enemy */}
            <Line
              points={[
                sideOffset,
                canvasHeight - playerOffset,
                canvasWidth - sideOffset,
                canvasHeight - playerOffset,
              ]}
              stroke="red"
            />
          </>
        ) : (
          <>
            {/* Player */}
            <Line points={[sideOffset, 0, canvasWidth - sideOffset, 0]} stroke="red" />
            {/* Enemy */}
            <Line points={[sideOffset, canvasHeight, canvasWidth - sideOffset, canvasHeight]} stroke="red" />
          </>
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffset > 0 ? (
          <>
            {/* Player */}
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
            {/* Enemy */}
            <Line
              points={[sideOffset, divider + dividerOffset, sideOffset, canvasHeight - playerOffset]}
              stroke="red"
            />
            <Line
              points={[
                canvasWidth - sideOffset,
                divider + dividerOffset,
                canvasWidth - sideOffset,
                canvasHeight - playerOffset,
              ]}
              stroke="red"
            />
          </>
        ) : (
          <>
            {/* Player */}
            <Line points={[0, 0, 0, canvasHeight]} stroke="red" />
            <Line points={[canvasWidth, 0, canvasWidth, canvasHeight]} stroke="red" />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffset > 0 && (
          <>
            {/* Player */}
            <Line
              points={[
                sideOffset,
                divider - dividerOffset,
                canvasWidth - sideOffset,
                divider - dividerOffset,
              ]}
              stroke="red"
            />
            {/* Enemy */}
            <Line
              points={[
                sideOffset,
                divider + dividerOffset,
                canvasWidth - sideOffset,
                divider + dividerOffset,
              ]}
              stroke="red"
            />
          </>
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
        {/* Enemy area */}
        <EnemyZone x={0} y={divider + 1} width={canvasWidth} height={canvasHeight} />

        {/* Player edge */}
        {playerOffset > 0 && <ZoneRect x={0} y={0} width={canvasWidth} height={playerOffset} />}
        {/* Enemy edge */}
        {playerOffset > 0 && (
          <ZoneRect x={0} y={canvasHeight - playerOffset} width={canvasWidth} height={playerOffset} />
        )}

        {/* Side */}
        {sideOffset > 0 && (
          <>
            {/* Player */}
            <ZoneRect x={0} y={0} width={sideOffset} height={divider} />
            <ZoneRect x={canvasWidth - sideOffset} y={0} width={sideOffset} height={divider} />
            {/* Enemy */}
            <ZoneRect x={0} y={divider + dividerOffset} width={sideOffset} height={divider} />
            <ZoneRect
              x={canvasWidth - sideOffset}
              y={divider + dividerOffset}
              width={sideOffset}
              height={divider}
            />
          </>
        )}

        {/* Divider */}
        {dividerOffset > 0 && (
          <ZoneRect x={0} y={divider - dividerOffset} width={canvasWidth} height={dividerOffset * 2} />
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
