import React, { useEffect, useState } from 'react'
import { Layer, Line, Text } from 'react-konva'
import { connect } from 'react-redux'
import { selectors } from 'ducks'
import { IDiagonalLineInfo, getDiagonalInfo } from 'utils/getLineInfo'
import { ICanvasDimensions } from 'types/canvas'
import { IStore } from 'types/store'
// import { ZoneRect, EnemyZone } from './ZoneRect'
import Objectives from './Objectives'
import { IScenario } from 'types/scenario'

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
      {/* <Zones {...lineInfo} /> */}
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
            <Line points={[sideOffsetX, sideOffsetY, canvasWidth - sideOffsetY, sideOffsetY]} stroke="red" />

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
                divider.startX,
                divider.startY + dividerOffsetY,
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
// const Zones: React.FC<IDiagonalLineInfo> = props => {
//   const { dividerOffset, divider, sideOffsetX, playerOffset, canvasWidth, canvasHeight } = props

//   return (
//     <>
//       <Layer>
//         {/* Enemy area */}
//         <EnemyZone x={0} y={divider + 1} width={canvasWidth} height={canvasHeight} />

//         {/* Player edge */}
//         {playerOffset > 0 && <ZoneRect x={0} y={0} width={canvasWidth} height={playerOffset} />}
//         {/* Enemy edge */}
//         {playerOffset > 0 && (
//           <ZoneRect x={0} y={canvasHeight - playerOffset} width={canvasWidth} height={playerOffset} />
//         )}

//         {/* Side */}
//         {sideOffsetX > 0 && (
//           <>
//             {/* Player */}
//             <ZoneRect x={0} y={0} width={sideOffsetX} height={divider} />
//             <ZoneRect x={canvasWidth - sideOffsetX} y={0} width={sideOffsetX} height={divider} />
//             {/* Enemy */}
//             <ZoneRect x={0} y={divider + dividerOffset} width={sideOffsetX} height={divider} />
//             <ZoneRect
//               x={canvasWidth - sideOffsetX}
//               y={divider + dividerOffset}
//               width={sideOffsetX}
//               height={divider}
//             />
//           </>
//         )}

//         {/* Divider */}
//         {dividerOffset > 0 && (
//           <ZoneRect x={0} y={divider - dividerOffset} width={canvasWidth} height={dividerOffset * 2} />
//         )}
//       </Layer>
//     </>
//   )
// }

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
  scenario: selectors.getScenario(state),
  canvas: selectors.getCanvas(state),
})

const DiagonalScenarioLines = connect(mapStateToProps, null)(DiagonalScenarioLinesComponent)

export default DiagonalScenarioLines
