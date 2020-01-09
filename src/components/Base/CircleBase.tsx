import React, { useState, useCallback } from 'react'
import { Circle } from 'react-konva'
import { DEFAULT_BASE_COLOR, DEFAULT_DRAGGABLE_COLOR } from 'theme/colors'

interface ICircleBase {
  x: number
  y: number
  radius: number
}

const CircleBase: React.FC<ICircleBase> = ({ x, y, radius }) => {
  // TODO use useReducer for all of these updates
  const [color, setColor] = useState(DEFAULT_BASE_COLOR)
  const [draggable, setDraggable] = useState(false)
  // TODO it may be unnecessary to keep pos in state
  const [pos, setPos] = useState({ x, y })

  const handleClick = useCallback(
    e => {
      const newColor = color === DEFAULT_DRAGGABLE_COLOR ? DEFAULT_BASE_COLOR : DEFAULT_DRAGGABLE_COLOR
      setColor(newColor)
      setDraggable(newColor === DEFAULT_BASE_COLOR)
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
