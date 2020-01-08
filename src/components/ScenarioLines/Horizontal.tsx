import React, { useEffect, useState } from 'react'
import { Layer, Line, Rect, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { ILineInfo, getLineInfo } from 'utils/getLineInfo'
import { IScenario } from 'data/scenarios'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import ZoneRect from './ZoneRect'
import Objectives from './Objectives'

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
          <Line points={[sideOffset, playerOffset, canvasWidth - sideOffset, playerOffset]} stroke="red" />
        ) : (
          <Line points={[sideOffset, 0, canvasWidth, 0]} stroke="red" />
        )}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffset > 0 ? (
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
        ) : (
          <>
            <Line points={[0, 0, 0, divider]} stroke="red" />
            <Line points={[canvasWidth, 0, canvasWidth, divider]} stroke="red" />
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
        <Rect x={0} y={divider + 1} width={canvasWidth} height={canvasHeight} fill={'red'} opacity={0.15} />

        {/* Player edge */}
        {playerOffset > 0 && <ZoneRect x={0} y={0} width={canvasWidth} height={playerOffset} />}

        {/* Side */}
        {sideOffset > 0 && (
          <>
            <ZoneRect x={0} y={0} width={sideOffset} height={divider} />
            <ZoneRect x={canvasWidth - sideOffset} y={0} width={sideOffset} height={divider} />
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
