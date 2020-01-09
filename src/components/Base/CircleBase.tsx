import React, { useState, useCallback, useEffect } from 'react'
import { Circle } from 'react-konva'
import { DEFAULT_DRAGGABLE_COLOR } from 'theme/colors'
import { connect } from 'react-redux'
import { IStore } from 'types/store'
import { baseGroups, IUpdateBasePayload } from 'ducks'
import { IBaseGroup, IBase } from 'types/bases'

interface ICircleBase {
  base: IBase
  radius: number
  baseGroup: IBaseGroup
  updateBase: (payload: IUpdateBasePayload) => void
}

const CircleBaseComponent: React.FC<ICircleBase> = ({ base, radius, baseGroup, updateBase }) => {
  // TODO use useReducer for all of these updates
  const [color, setColor] = useState(baseGroup.color)
  const [draggable, setDraggable] = useState(false)

  useEffect(() => {
    updateBase({ base, groupId: baseGroup.id })

    // Run on mount
  }, [])

  useEffect(() => {
    if (color !== DEFAULT_DRAGGABLE_COLOR && color !== baseGroup.color) {
      setColor(baseGroup.color)
    }
  }, [color, baseGroup.color])

  const handleClick = useCallback(
    e => {
      const newColor = color !== DEFAULT_DRAGGABLE_COLOR ? DEFAULT_DRAGGABLE_COLOR : baseGroup.color
      setColor(newColor)
      setDraggable(newColor === DEFAULT_DRAGGABLE_COLOR)
    },
    [baseGroup, color]
  )

  const handleDragEnd = e => {
    updateBase({
      base: {
        ...base,
        x: e.target.x(),
        y: e.target.y(),
      },
      groupId: baseGroup.id,
    })
  }

  return (
    <Circle
      x={base.x}
      y={base.y}
      radius={radius}
      perfectDrawEnabled={false}
      fill={color}
      shadowBlur={5}
      onClick={handleClick}
      onDragEnd={handleDragEnd}
      draggable={draggable}
    />
  )
}

const mapStateToProps = (state: IStore, ownProps) => ({
  ...ownProps,
})

const CircleBase = connect(mapStateToProps, {
  updateBase: baseGroups.actions.updateBase,
})(CircleBaseComponent)

export default CircleBase
