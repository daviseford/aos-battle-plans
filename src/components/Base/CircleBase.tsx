import React, { useCallback, useEffect } from 'react'
import { Circle } from 'react-konva'
import { DEFAULT_DRAGGABLE_COLOR } from 'theme/colors'
import { connect } from 'react-redux'
import { baseGroups, IUpdateBasePayload } from 'ducks'
import { IBaseGroup, IBase } from 'types/bases'

interface ICircleBase {
  base: IBase
  radius: number
  baseGroup: IBaseGroup
  updateBase: (payload: IUpdateBasePayload) => void
}

const CircleBaseComponent: React.FC<ICircleBase> = ({ base, radius, baseGroup, updateBase }) => {
  useEffect(() => {
    // Only run on mount
    updateBase({ base, groupId: baseGroup.id })
    // eslint-disable-next-line
  }, [])

  const handleClick = useCallback(
    e => {
      const payload = {
        base: {
          ...base,
          draggable: !base.draggable,
        },
        groupId: baseGroup.id,
      }
      updateBase(payload)
    },
    [base, baseGroup.id, updateBase]
  )

  const handleDragEnd = useCallback(
    e => {
      const payload = {
        base: {
          ...base,
          x: e.target.x(),
          y: e.target.y(),
        },
        groupId: baseGroup.id,
      }
      updateBase(payload)
    },
    [base, baseGroup.id, updateBase]
  )

  return (
    <Circle
      x={base.x}
      y={base.y}
      radius={radius}
      perfectDrawEnabled={false}
      fill={base.draggable ? DEFAULT_DRAGGABLE_COLOR : baseGroup.color}
      shadowBlur={5}
      onClick={handleClick}
      onDragEnd={handleDragEnd}
      draggable={base.draggable}
    />
  )
}

const CircleBase = connect(null, {
  updateBase: baseGroups.actions.updateBase,
})(CircleBaseComponent)

export default CircleBase
