import React, { useState, useCallback } from 'react'
import { Circle } from 'react-konva'

const DRAGGABLE = 'red'
const NON_DRAGGABLE = 'green'

interface ICircleBase {
  x: number
  y: number
  radius: number
}

const CircleBase: React.FC<ICircleBase> = ({ x, y, radius }) => {
  // TODO use useReducer for all of these updates
  const [color, setColor] = useState(NON_DRAGGABLE)
  const [draggable, setDraggable] = useState(false)
  // TODO it may be unnecessary to keep pos in state
  const [pos, setPos] = useState({ x, y })

  const handleClick = useCallback(
    e => {
      const newColor = color === NON_DRAGGABLE ? DRAGGABLE : NON_DRAGGABLE
      setColor(newColor)
      setDraggable(newColor === DRAGGABLE)
    },
    [color]
  )

  const handleDragEnd = e => {
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
      perfectDrawEnabled={false}
      fill={color}
      shadowBlur={5}
      onClick={handleClick}
      // onDragEnd={onDragEnd}
      draggable={draggable}
    />
  )
}

export default CircleBase
