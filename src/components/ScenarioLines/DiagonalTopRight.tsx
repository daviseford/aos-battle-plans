import React, { useEffect, useState } from 'react'
import { Layer, Line } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { IDiagonalLineInfo, getDiagonalInfo } from 'utils/getLineInfo'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
import { ZoneRect } from './ZoneRect'
import Objectives from './Objectives'
import { IScenario } from 'types/scenario'
import { ENEMY_AREA_FILL_COLOR, NEUTRAL_AREA_FILL_COLOR } from 'theme/colors'

interface IScenarioLines {
  scenario: IScenario
  canvas: ICanvasDimensions | null
}

const DiagonalScenarioLinesComponent: React.FC<IScenarioLines> = props => {
  const { canvas, scenario } = props

  const [lineInfo, setLineInfo] = useState<IDiagonalLineInfo | null>(null)

  useEffect(() => {
    if (!canvas) return
    const newLineInfo = getDiagonalInfo(canvas, scenario)
    setLineInfo(newLineInfo)
  }, [canvas, scenario])

  if (!canvas || !lineInfo) return <></>

  const {
    dividerOffsetX,
    dividerOffsetY,
    divider,
    sideOffsetY,
    sideOffsetX,
    canvasWidth,
    canvasHeight,
    objectives,
  } = lineInfo

  console.log(lineInfo, canvas)
  return (
    <>
      <Zones {...lineInfo} />
      <Objectives objectives={objectives} canvas={canvas} />

      <Layer>
        {/* Enemy Deployment Zone text */}
        {/* <Text
          align={'center'}
          fill="white"
          fontFamily={'Calibri'}
          fontSize={36}
          fontStyle={'normal'}
          stroke="white"
          text={'ENEMY AREA'}
          x={canvasWidth / 2 - 100}
          y={canvasHeight / 2}
        /> */}

        {/* These lines are created when you have to deploy X inches from the sides  */}
        {sideOffsetX > 0 ? (
          <>
            <Line points={[sideOffsetX, sideOffsetY, sideOffsetX, canvasHeight - sideOffsetY]} stroke="red" />
            <Line points={[sideOffsetX, sideOffsetY, canvasWidth - sideOffsetX, sideOffsetY]} stroke="red" />

            <Line
              points={[
                canvasWidth - sideOffsetX,
                sideOffsetY,
                canvasWidth - sideOffsetX,
                canvasHeight - sideOffsetY,
              ]}
              stroke="red"
            />
            <Line
              points={[
                sideOffsetX,
                canvasHeight - sideOffsetY,
                canvasWidth - sideOffsetX,
                canvasHeight - sideOffsetY,
              ]}
              stroke="red"
            />
          </>
        ) : (
          <>
            <Line points={[0, 0, canvasWidth, 0]} stroke="red" />
            <Line points={[canvasWidth, 0, canvasWidth, canvasHeight]} stroke="red" />

            <Line points={[0, 0, 0, canvasHeight]} stroke="red" />
            <Line points={[canvasWidth, 0, canvasWidth, canvasHeight]} stroke="red" />
          </>
        )}

        {/* This line is created when you need to deploy X inches from the midline  */}
        {dividerOffsetX > 0 && (
          <>
            <Line
              points={[
                divider.startX,
                divider.startY - dividerOffsetY,
                divider.endX - dividerOffsetX,
                divider.endY,
              ]}
              stroke="red"
            />
            <Line
              points={[
                divider.startX + dividerOffsetX,
                divider.startY,
                divider.endX,
                divider.endY + dividerOffsetY,
              ]}
              stroke="red"
            />
          </>
        )}

        {/* This layer is the dividing line */}
        <Line points={[divider.startX, divider.startY, divider.endX, divider.endY]} stroke="black" />
      </Layer>
    </>
  )
}

/** All of the zones we need to display for the user */
const Zones: React.FC<IDiagonalLineInfo> = props => {
  const {
    dividerOffsetY,
    dividerOffsetX,
    divider,
    sideOffsetX,
    sideOffsetY,
    canvasWidth,
    canvasHeight,
  } = props

  return (
    <>
      <Layer>
        {/* Friendly area */}
        {/* <Line
          points={[
            divider.startX,
            divider.startY - dividerOffsetY,
            divider.endX - dividerOffsetX,
            divider.endY,
            sideOffsetX,
            sideOffsetY,
          ]}
          fill={ENEMY_AREA_FILL_COLOR}
          closed={true}
        /> */}

        {/* Enemy area */}
        <Line
          points={[
            divider.startX + dividerOffsetX,
            divider.startY,
            divider.endX,
            divider.endY + dividerOffsetY,
            canvasWidth - sideOffsetX,
            canvasHeight - sideOffsetY,
          ]}
          fill={ENEMY_AREA_FILL_COLOR}
          closed={true}
        />

        {/* Side */}
        {sideOffsetX + sideOffsetY > 0 && (
          <>
            <ZoneRect x={0} y={0} width={canvasWidth} height={sideOffsetY} />
            <ZoneRect x={0} y={canvasHeight - sideOffsetY} width={canvasWidth} height={sideOffsetY} />
            <ZoneRect x={0} y={0} width={sideOffsetX} height={canvasHeight} />
            <ZoneRect x={canvasWidth - sideOffsetX} y={0} width={sideOffsetX} height={canvasHeight} />
          </>
        )}

        {/* Divider */}
        {dividerOffsetX > 0 && (
          <Line
            points={[
              divider.startX,
              divider.startY,
              divider.startX,
              divider.startY - dividerOffsetY,
              divider.endX - dividerOffsetX,
              divider.endY,
              divider.endX,
              divider.endY,
              divider.endX,
              divider.endY + dividerOffsetY,
              divider.startX + dividerOffsetX,
              divider.startY,
            ]}
            fill={NEUTRAL_AREA_FILL_COLOR}
            closed={true}
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

const DiagonalScenarioLines = connect(mapStateToProps, null)(DiagonalScenarioLinesComponent)

export default DiagonalScenarioLines
