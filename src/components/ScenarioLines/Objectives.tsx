import React, { Fragment } from 'react'
import { Circle, Layer } from 'react-konva'
import { ICanvasDimensions } from 'types/canvas'
import { IObjective } from 'types/scenario'

interface IObjectivesProps {
  objectives: IObjective[]
  canvas: ICanvasDimensions
}

const Objectives: React.FC<IObjectivesProps> = props => {
  const { objectives, canvas } = props

  const color = '#001870'

  return (
    <Layer>
      {/* Objectives */}
      {objectives.map(({ x, y, label }, i) => (
        <Fragment key={i}>
          {/* Stroke */}
          <Circle
            x={x}
            y={y}
            key={`stroke-${i}`}
            radius={3 / canvas.conversionPercentX}
            draggable={false}
            stroke={color}
            fillEnabled={false}
          />
          {/* Fill */}
          <Circle
            x={x}
            y={y}
            key={`fill-${i}`}
            radius={3 / canvas.conversionPercentX}
            draggable={false}
            fill={color}
            fillEnabled={true}
            opacity={0.2}
          />
        </Fragment>
      ))}
    </Layer>
  )
}

export default Objectives
