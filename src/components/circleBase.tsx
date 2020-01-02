import React, { useState } from 'react'
import { Circle } from 'react-konva'
import Konva from 'konva'

interface ICircleBase {
  x: number
  y: number
  radius: number
}

const CircleBase: React.FC<ICircleBase> = ({ x, y, radius }) => {
  const [color, setColor] = useState('green')
  // TODO it may be unnecessary to keep this in state
  const [pos, setPos] = useState({ x, y })

  const onDragEnd = e => {
    setPos({
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  return (
    <Circle
      x={pos.x}
      y={pos.y}
      radius={radius}
      fill={color}
      shadowBlur={5}
      onClick={() => setColor(Konva.Util.getRandomColor())}
      onDragEnd={onDragEnd}
      draggable={true}
    />
  )
}

export default CircleBase
